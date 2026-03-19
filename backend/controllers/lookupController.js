const { query } = require('../config/db');

// ===== GET ALL STATES =====
exports.getStates = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT DISTINCT state FROM destinations WHERE state IS NOT NULL ORDER BY state`
        );
        const states = result.rows.map(r => r.state);
        res.json({ success: true, states });
    } catch (err) {
        next(err);
    }
};

// ===== GET DESTINATIONS BY STATE =====
exports.getDestinations = async (req, res, next) => {
    try {
        const { state, travelType } = req.query;
        if (!state) {
            return res.status(400).json({ success: false, message: 'state query param is required.' });
        }

        // Base destination query
        const result = await query(
            `SELECT destination_id, name, description, best_season
             FROM destinations WHERE state = $1 ORDER BY name`,
            [state]
        );

        let destinations = result.rows;

        // If travelType provided, count matching places per destination
        if (travelType && destinations.length > 0) {
            const destIds = destinations.map(d => d.destination_id);
            const placeCounts = await query(
                `SELECT p.destination_id, COUNT(*) AS place_type_count
                 FROM places p
                 JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
                 WHERE p.destination_id = ANY($1)
                   AND LOWER(tt.name) = LOWER($2)
                 GROUP BY p.destination_id`,
                [destIds, travelType]
            );

            const countMap = {};
            for (const row of placeCounts.rows) {
                countMap[row.destination_id] = parseInt(row.place_type_count);
            }

            destinations = destinations.map(d => ({
                ...d,
                place_type_count: countMap[d.destination_id] || 0,
            }));
        }

        res.json({ success: true, destinations });
    } catch (err) {
        next(err);
    }
};

// ===== GET ALL TRAVEL TYPES =====
exports.getTravelTypes = async (req, res, next) => {
    try {
        const result = await query(`SELECT travel_type_id AS id, name FROM travel_types ORDER BY travel_type_id`);
        res.json({ success: true, travelTypes: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== GET ALL GROUP TYPES =====
exports.getGroupTypes = async (req, res, next) => {
    try {
        const result = await query(`SELECT group_type_id AS id, type_name AS name FROM group_types ORDER BY group_type_id`);
        res.json({ success: true, groupTypes: result.rows });
    } catch (err) {
        next(err);
    }
};
