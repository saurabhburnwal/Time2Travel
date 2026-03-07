const { query } = require('../config/db');

// ===== GET ALL DESTINATIONS =====
exports.getAllDestinations = async (req, res, next) => {
    try {
        const { state } = req.query;
        let sql = `SELECT destination_id, name, state, description, best_season FROM destinations`;
        const params = [];

        if (state) {
            sql += ` WHERE state = $1`;
            params.push(state);
        }

        sql += ` ORDER BY state, name`;
        const result = await query(sql, params);

        res.json({ success: true, count: result.rowCount, destinations: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== GET SINGLE DESTINATION =====
exports.getDestinationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await query(
            `SELECT destination_id, name, state, description, best_season FROM destinations WHERE destination_id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Destination not found.' });
        }

        res.json({ success: true, destination: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== GET PLACES FOR DESTINATION =====
exports.getPlacesForDestination = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { travel_type } = req.query;

        let sql = `
            SELECT p.place_id, p.name, p.latitude, p.longitude, p.entry_fee, p.avg_visit_time,
                   tt.name AS travel_type
            FROM places p
            LEFT JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
            WHERE p.destination_id = $1
        `;
        const params = [id];

        if (travel_type) {
            sql += ` AND LOWER(tt.name) = LOWER($2)`;
            params.push(travel_type);
        }

        sql += ` ORDER BY p.place_id`;

        const result = await query(sql, params);
        res.json({ success: true, count: result.rowCount, places: result.rows });
    } catch (err) {
        next(err);
    }
};
