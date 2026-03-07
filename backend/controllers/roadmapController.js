const { query } = require('../config/db');
const { generateAllRoadmaps } = require('../utils/routeOptimizer');
const { estimateExpenses } = require('../utils/expenseEstimator');

// ===== GENERATE ROADMAP OPTIONS =====
exports.generateRoadmap = async (req, res, next) => {
    try {
        const { destination, days, budget, travelType, groupType, accommodationPerNight } = req.body;

        if (!destination || !days || !budget) {
            return res.status(400).json({ success: false, message: 'destination, days, and budget are required.' });
        }

        // 1. Fetch destination info
        const destResult = await query(
            `SELECT destination_id, name, state, description FROM destinations WHERE LOWER(name) = LOWER($1)`,
            [destination]
        );

        if (destResult.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Destination '${destination}' not found in database.` });
        }

        const dest = destResult.rows[0];

        // 2. Fetch places for destination (optionally filtered by travel type)
        let placesQuery, placesParams;
        if (travelType) {
            placesQuery = `
                SELECT p.place_id, p.name, p.latitude, p.longitude, p.entry_fee, p.avg_visit_time,
                       tt.name AS travel_type
                FROM places p
                LEFT JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
                WHERE p.destination_id = $1 AND LOWER(tt.name) = LOWER($2)
            `;
            placesParams = [dest.destination_id, travelType];
        } else {
            placesQuery = `
                SELECT p.place_id, p.name, p.latitude, p.longitude, p.entry_fee, p.avg_visit_time,
                       tt.name AS travel_type
                FROM places p
                LEFT JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
                WHERE p.destination_id = $1
            `;
            placesParams = [dest.destination_id];
        }

        const placesResult = await query(placesQuery, placesParams);

        if (placesResult.rowCount === 0) {
            return res.status(404).json({ success: false, message: `No places found for '${destination}'.` });
        }

        const places = placesResult.rows;

        // 3. Generate 4 roadmap options using NNA
        const roadmaps = generateAllRoadmaps(places);

        // 4. Estimate expenses for each roadmap style
        const stayPerNight = accommodationPerNight || 1500; // default mid-range hotel cost

        const expenseStyle = budget < 3000 ? 'budget' : budget < 8000 ? 'standard' : 'premium';

        const roadmapsWithExpenses = {};
        for (const [style, rm] of Object.entries(roadmaps)) {
            if (!rm) continue;
            const expenses = estimateExpenses({
                days: parseInt(days),
                accommodationPerNight: stayPerNight,
                totalDistanceKm: rm.totalDistanceKm,
                places: rm.orderedPlaces,
                groupType: groupType || 'Solo',
                style: expenseStyle,
            });
            roadmapsWithExpenses[style] = { ...rm, expenses };
        }

        res.json({
            success: true,
            destination: dest,
            requestedDays: parseInt(days),
            budget: parseFloat(budget),
            groupType: groupType || 'Solo',
            travelType: travelType || 'All',
            totalPlaces: places.length,
            roadmaps: roadmapsWithExpenses,
        });
    } catch (err) {
        next(err);
    }
};

// ===== SAVE SELECTED ROADMAP =====
exports.saveRoadmap = async (req, res, next) => {
    try {
        const { destination_id, roadmap_type, total_distance, estimated_cost, places, hotel_id } = req.body;

        if (!destination_id || !roadmap_type) {
            return res.status(400).json({ success: false, message: 'destination_id and roadmap_type are required.' });
        }

        // Find or insert roadmap type
        const typeResult = await query(
            `SELECT roadmap_type_id FROM roadmap_types WHERE LOWER(type_name) = LOWER($1)`,
            [roadmap_type]
        );

        let roadmap_type_id;
        if (typeResult.rowCount > 0) {
            roadmap_type_id = typeResult.rows[0].roadmap_type_id;
        } else {
            const newType = await query(
                `INSERT INTO roadmap_types (type_name) VALUES ($1) RETURNING roadmap_type_id`,
                [roadmap_type]
            );
            roadmap_type_id = newType.rows[0].roadmap_type_id;
        }

        // Insert roadmap
        const rmResult = await query(
            `INSERT INTO roadmaps (user_id, destination_id, roadmap_type_id, total_distance, estimated_cost)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [req.user.userId, destination_id, roadmap_type_id, total_distance || 0, estimated_cost || 0]
        );

        const roadmap = rmResult.rows[0];

        // Insert roadmap places (day-wise)
        if (places && places.length > 0) {
            for (const p of places) {
                await query(
                    `INSERT INTO roadmap_places (roadmap_id, place_id, day_number, visit_order, estimated_start_time, estimated_end_time)
                     VALUES ($1, $2, $3, $4, $5, $6)`,
                    [roadmap.roadmap_id, p.place_id, p.day_number, p.visit_order, p.estimated_start || null, p.estimated_end || null]
                );
            }
        }

        // Insert accommodation if hotel selected
        if (hotel_id) {
            await query(
                `INSERT INTO roadmap_accommodations (roadmap_id, hotel_id, day_number) VALUES ($1, $2, $3)`,
                [roadmap.roadmap_id, hotel_id, 1]
            );
        }

        res.status(201).json({ success: true, message: 'Roadmap saved.', roadmapId: roadmap.roadmap_id });
    } catch (err) {
        next(err);
    }
};

// ===== GET MY ROADMAPS =====
exports.getMyRoadmaps = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT r.roadmap_id, r.created_at, r.total_distance, r.estimated_cost,
                    d.name AS destination, d.state,
                    rt.type_name AS roadmap_type
             FROM roadmaps r
             LEFT JOIN destinations d ON r.destination_id = d.destination_id
             LEFT JOIN roadmap_types rt ON r.roadmap_type_id = rt.roadmap_type_id
             WHERE r.user_id = $1
             ORDER BY r.created_at DESC`,
            [req.user.userId]
        );

        res.json({ success: true, count: result.rowCount, roadmaps: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== GET ROADMAP DETAIL =====
exports.getRoadmapById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const rmResult = await query(
            `SELECT r.roadmap_id, r.created_at, r.total_distance, r.estimated_cost,
                    d.name AS destination, d.state, d.description,
                    rt.type_name AS roadmap_type
             FROM roadmaps r
             LEFT JOIN destinations d ON r.destination_id = d.destination_id
             LEFT JOIN roadmap_types rt ON r.roadmap_type_id = rt.roadmap_type_id
             WHERE r.roadmap_id = $1 AND r.user_id = $2`,
            [id, req.user.userId]
        );

        if (rmResult.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Roadmap not found.' });
        }

        const roadmap = rmResult.rows[0];

        // Fetch places for this roadmap
        const placesResult = await query(
            `SELECT rp.day_number, rp.visit_order, rp.estimated_start_time, rp.estimated_end_time,
                    p.place_id, p.name, p.latitude, p.longitude, p.entry_fee, p.avg_visit_time,
                    tt.name AS travel_type
             FROM roadmap_places rp
             LEFT JOIN places p ON rp.place_id = p.place_id
             LEFT JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
             WHERE rp.roadmap_id = $1
             ORDER BY rp.day_number, rp.visit_order`,
            [id]
        );

        // Fetch expense breakdown
        const expResult = await query(
            `SELECT * FROM expenses WHERE roadmap_id = $1`,
            [id]
        );

        // Group places by day
        const dayMap = {};
        for (const row of placesResult.rows) {
            if (!dayMap[row.day_number]) dayMap[row.day_number] = [];
            dayMap[row.day_number].push(row);
        }

        roadmap.itinerary = Object.entries(dayMap).map(([day, places]) => ({
            day: parseInt(day),
            places,
        }));

        roadmap.expenses = expResult.rows[0] || null;

        res.json({ success: true, roadmap });
    } catch (err) {
        next(err);
    }
};

// ===== DELETE ROADMAP =====
exports.deleteRoadmap = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query(
            `DELETE FROM roadmaps WHERE roadmap_id = $1 AND user_id = $2`,
            [id, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Roadmap not found.' });
        }

        res.json({ success: true, message: 'Roadmap deleted.' });
    } catch (err) {
        next(err);
    }
};
