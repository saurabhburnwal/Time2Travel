const { query } = require('../config/db');
const { generateAllRoadmaps } = require('../utils/routeOptimizer');
const { estimateExpenses } = require('../utils/expenseEstimator');
const { sendTripConfirmationEmail } = require('../utils/emailService');

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

        let placesResult = await query(placesQuery, placesParams);

        // Fallback: If no places found for this specific travel type, ignore the filter and fetch all places for the destination
        if (placesResult.rowCount === 0 && travelType) {
            placesQuery = `
                SELECT p.place_id, p.name, p.latitude, p.longitude, p.entry_fee, p.avg_visit_time,
                       tt.name AS travel_type
                FROM places p
                LEFT JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
                WHERE p.destination_id = $1
            `;
            placesParams = [dest.destination_id];
            placesResult = await query(placesQuery, placesParams);
        }

        if (placesResult.rowCount === 0) {
            return res.status(404).json({ success: false, message: `No places found for '${destination}'.` });
        }

        const places = placesResult.rows;

        // 3. Generate roadmap options using NNA, limited by trip days
        const roadmaps = generateAllRoadmaps(places, parseInt(days));

        // 4. Estimate expenses for each roadmap style
        const stayPerNight = (accommodationPerNight !== undefined && accommodationPerNight !== null) ? Number(accommodationPerNight) : 1500; // default mid-range hotel cost if missing

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

// ===== EMAIL PDF ITINERARY =====
exports.emailTripPDF = async (req, res, next) => {
    try {
        const { userName, email, tripData, pdfBase64 } = req.body;

        if (!email || !pdfBase64) {
            return res.status(400).json({ success: false, message: 'Email and PDF data are required.' });
        }

        const emailSent = await sendTripConfirmationEmail(userName, email, tripData, pdfBase64);

        if (emailSent) {
            res.json({ success: true, message: 'Trip itinerary emailed successfully.' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
        }
    } catch (err) {
        console.error("Email PDF Error: ", err);
        next(err);
    }
};

const createHostBookingIfSelected = async (roadmap, userId) => {
    if (roadmap.stay_type === 'host' && roadmap.selected_stay) {
        try {
            // Ensure table exists safely
            await query(`
                CREATE TABLE IF NOT EXISTS host_bookings (
                    booking_id SERIAL PRIMARY KEY,
                    host_id INTEGER REFERENCES host_profiles(host_id),
                    property_id INTEGER REFERENCES host_properties(property_id),
                    traveler_id INTEGER REFERENCES users(user_id),
                    roadmap_id INTEGER REFERENCES roadmaps(roadmap_id),
                    check_in_day DATE,
                    check_out_day DATE,
                    status VARCHAR(50) DEFAULT 'pending',
                    contribution_received DECIMAL(10,2) DEFAULT 0,
                    host_notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            const propRes = await query(`SELECT property_id, host_id FROM host_properties WHERE property_name = $1`, [roadmap.selected_stay]);
            if (propRes.rowCount > 0) {
                const { property_id, host_id } = propRes.rows[0];

                const existBook = await query(`SELECT booking_id FROM host_bookings WHERE roadmap_id = $1 AND traveler_id = $2`, [roadmap.roadmap_id, userId]);
                if (existBook.rowCount === 0) {
                    await query(
                        `INSERT INTO host_bookings (host_id, property_id, traveler_id, roadmap_id, status)
                         VALUES ($1, $2, $3, $4, 'pending')`,
                        [host_id, property_id, userId, roadmap.roadmap_id]
                    );
                }
            }
        } catch (bokErr) {
            console.warn('Error creating host booking:', bokErr.message);
        }
    }
};

// ===== SAVE SELECTED ROADMAP =====
exports.saveRoadmap = async (req, res, next) => {
    try {
        const { destination, route_style, total_distance_km, estimated_cost, ordered_places, stay_type, selected_stay } = req.body;

        if (!destination || !route_style) {
            return res.status(400).json({ success: false, message: 'destination and route_style are required.' });
        }

        // 1. Fetch destination info
        const destResult = await query(
            `SELECT destination_id FROM destinations WHERE LOWER(name) = LOWER($1) LIMIT 1`,
            [destination]
        );

        let destination_id;
        if (destResult.rowCount > 0) {
            destination_id = destResult.rows[0].destination_id;
        } else {
            const newDest = await query(
                `INSERT INTO destinations (name) VALUES ($1) RETURNING destination_id`,
                [destination]
            );
            destination_id = newDest.rows[0].destination_id;
        }

        // Find or insert roadmap type (route_style)
        const typeResult = await query(
            `SELECT roadmap_type_id FROM roadmap_types WHERE LOWER(type_name) = LOWER($1)`,
            [route_style]
        );

        let roadmap_type_id;
        if (typeResult.rowCount > 0) {
            roadmap_type_id = typeResult.rows[0].roadmap_type_id;
        } else {
            const newType = await query(
                `INSERT INTO roadmap_types (type_name) VALUES ($1) RETURNING roadmap_type_id`,
                [route_style]
            );
            roadmap_type_id = newType.rows[0].roadmap_type_id;
        }

        // Make sure the columns exist if they don't already
        await query(`ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS stay_type VARCHAR(20)`);
        await query(`ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS selected_stay VARCHAR(200)`);

        // Insert roadmap
        const rmResult = await query(
            `INSERT INTO roadmaps (user_id, destination_id, roadmap_type_id, total_distance, estimated_cost, stay_type, selected_stay)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [req.user.userId, destination_id, roadmap_type_id, total_distance_km || 0, estimated_cost || 0, stay_type || null, selected_stay || null]
        );

        const roadmap = rmResult.rows[0];

        // Insert roadmap places (day-wise)
        if (ordered_places && ordered_places.length > 0) {
            for (const p of ordered_places) {
                await query(
                    `INSERT INTO roadmap_places (roadmap_id, place_id, day_number, visit_order, estimated_start_time, estimated_end_time)
                     VALUES ($1, $2, $3, $4, $5, $6)`,
                    [roadmap.roadmap_id, p.place_id, p.day_number || 1, p.visitOrder || 1, p.estimatedStart || null, p.estimatedEnd || null]
                );
            }
        }

        // Insert accommodation if hotel selected
        if (stay_type === 'hotel' && selected_stay) {
            const hotelResult = await query(
                `SELECT hotel_id FROM hotels WHERE LOWER(name) = LOWER($1) AND destination_id = $2`,
                [selected_stay, destination_id]
            );
            if (hotelResult.rowCount > 0) {
                const hotel_id = hotelResult.rows[0].hotel_id;
                await query(
                    `INSERT INTO roadmap_accommodations (roadmap_id, hotel_id, day_number) VALUES ($1, $2, $3)`,
                    [roadmap.roadmap_id, hotel_id, 1]
                );
            }
        }

        // AUTO-BOOK if host
        await createHostBookingIfSelected(roadmap, req.user.userId);

        res.status(201).json({ success: true, message: 'Roadmap saved.', roadmapId: roadmap.roadmap_id });
    } catch (err) {
        console.error("Save Roadmap Error: ", err);
        next(err);
    }
};

// ===== GET MY ROADMAPS =====
exports.getMyRoadmaps = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT r.roadmap_id, r.created_at, r.total_distance, r.estimated_cost,
                    d.name AS destination, d.state,
                    rt.type_name AS roadmap_type,
                    r.stay_type, r.selected_stay
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
                    r.stay_type, r.selected_stay,
                    d.name AS destination, d.state, d.description, d.destination_id,
                    rt.type_name AS roadmap_type,
                    hb.host_id
             FROM roadmaps r
             LEFT JOIN destinations d ON r.destination_id = d.destination_id
             LEFT JOIN roadmap_types rt ON r.roadmap_type_id = rt.roadmap_type_id
             LEFT JOIN host_bookings hb ON r.roadmap_id = hb.roadmap_id
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

// ===== MARK ROADMAP AS COMPLETED =====
exports.completeRoadmap = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Ensure is_completed column exists (safe to run multiple times)
        await query(`ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS is_completed BOOLEAN DEFAULT FALSE`);
        await query(`ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS stay_type VARCHAR(20)`);
        await query(`ALTER TABLE roadmaps ADD COLUMN IF NOT EXISTS selected_stay VARCHAR(200)`);

        const result = await query(
            `UPDATE roadmaps SET is_completed = TRUE WHERE roadmap_id = $1 AND user_id = $2 RETURNING *`,
            [id, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Roadmap not found.' });
        }

        const roadmap = result.rows[0];

        // Ensure host booking exists (in case it wasn't caught during save)
        await createHostBookingIfSelected(roadmap, req.user.userId);

        res.json({ success: true, message: 'Trip marked as completed.', roadmap });
    } catch (err) {
        next(err);
    }
};
