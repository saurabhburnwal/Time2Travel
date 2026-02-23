const { query } = require('../config/db');

// ===== GET HOTELS FOR DESTINATION =====
exports.getHotelsByDestination = async (req, res, next) => {
    try {
        const { destination_id } = req.query;

        if (!destination_id) {
            return res.status(400).json({ success: false, message: 'destination_id query param is required.' });
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
