const { query } = require('../config/db');

// ===== GET ALL PLACES =====
exports.getAllPlaces = async (req, res, next) => {
    try {
        const { destination_id, travel_type } = req.query;

        let sql = `
            SELECT p.place_id, p.name, p.latitude, p.longitude, p.entry_fee, p.avg_visit_time,
                   d.name AS destination, d.state, tt.name AS travel_type
            FROM places p
            LEFT JOIN destinations d ON p.destination_id = d.destination_id
            LEFT JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
            WHERE 1=1
        `;
        const params = [];

        if (destination_id) {
            params.push(destination_id);
            sql += ` AND p.destination_id = $${params.length}`;
        }

        if (travel_type) {
            params.push(travel_type);
            sql += ` AND LOWER(tt.name) = LOWER($${params.length})`;
        }

        sql += ` ORDER BY d.name, p.name`;

        const result = await query(sql, params);
        res.json({ success: true, count: result.rowCount, places: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== GET SINGLE PLACE =====
exports.getPlaceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await query(
            `SELECT p.place_id, p.name, p.latitude, p.longitude, p.entry_fee, p.avg_visit_time,
                    d.name AS destination, d.state, tt.name AS travel_type
             FROM places p
             LEFT JOIN destinations d ON p.destination_id = d.destination_id
             LEFT JOIN travel_types tt ON p.travel_type_id = tt.travel_type_id
             WHERE p.place_id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Place not found.' });
        }

        res.json({ success: true, place: result.rows[0] });
    } catch (err) {
        next(err);
    }
};
