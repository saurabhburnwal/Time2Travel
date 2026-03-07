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
        const { state } = req.query;
        if (!state) {
            return res.status(400).json({ success: false, message: 'state query param is required.' });
        }

        const result = await query(
            `SELECT destination_id, name, description, best_season
             FROM destinations WHERE state = $1 ORDER BY name`,
            [state]
        );

        res.json({ success: true, destinations: result.rows });
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
