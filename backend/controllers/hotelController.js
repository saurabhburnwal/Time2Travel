const { query } = require('../config/db');

// ===== GET HOTELS FOR DESTINATION =====
exports.getHotelsByDestination = async (req, res, next) => {
    try {
        let { destination_id, destination } = req.query;

        // Accept destination name as well as destination_id
        if (!destination_id && destination) {
            const destRes = await query(
                `SELECT destination_id FROM destinations WHERE LOWER(name) = LOWER($1) LIMIT 1`,
                [destination]
            );
            if (destRes.rowCount === 0) {
                return res.status(404).json({ success: false, message: `Destination '${destination}' not found.` });
            }
            destination_id = destRes.rows[0].destination_id;
        }

        if (!destination_id) {
            return res.status(400).json({ success: false, message: 'destination_id or destination query param is required.' });
        }

        const result = await query(
            `SELECT h.hotel_id, h.name, h.price_per_night, h.rating, h.latitude, h.longitude,
                    d.name AS destination, d.state
             FROM hotels h
             LEFT JOIN destinations d ON h.destination_id = d.destination_id
             WHERE h.destination_id = $1
             ORDER BY h.rating DESC`,
            [destination_id]
        );

        res.json({ success: true, count: result.rowCount, hotels: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== GET SINGLE HOTEL =====
exports.getHotelById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await query(
            `SELECT h.hotel_id, h.name, h.price_per_night, h.rating, h.latitude, h.longitude,
                    d.name AS destination, d.state
             FROM hotels h
             LEFT JOIN destinations d ON h.destination_id = d.destination_id
             WHERE h.hotel_id = $1`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Hotel not found.' });
        }

        res.json({ success: true, hotel: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== ADD CUSTOM HOTEL (user-entered) =====
exports.addCustomHotel = async (req, res, next) => {
    try {
        const { name, address, destination, latitude, longitude, price_per_night } = req.body;

        if (!name || !destination) {
            return res.status(400).json({ success: false, message: 'name and destination are required.' });
        }

        // Resolve destination
        const destRes = await query(
            `SELECT destination_id FROM destinations WHERE LOWER(name) = LOWER($1) LIMIT 1`,
            [destination]
        );
        if (destRes.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Destination '${destination}' not found.` });
        }
        const destination_id = destRes.rows[0].destination_id;

        const result = await query(
            `INSERT INTO hotels (destination_id, name, price_per_night, rating, latitude, longitude)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [destination_id, name, price_per_night || 0, 3.0, latitude || 0, longitude || 0]
        );

        res.status(201).json({ success: true, hotel: result.rows[0] });
    } catch (err) {
        next(err);
    }
};
