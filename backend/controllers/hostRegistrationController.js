const { query } = require('../config/db');

// ===== SUBMIT HOST REGISTRATION =====
exports.submitHostRegistration = async (req, res, next) => {
    try {
        const {
            user_id,
            name,
            phone,
            state,
            destination,
            address,
            description,
            amenities,
            property_type,
            max_guests,
            provides_food,
            pricing_info,
            image_urls
        } = req.body;

        // Validate required fields
        if (!name || !destination) {
            return res.status(400).json({
                success: false,
                message: 'Name and destination are required.'
            });
        }

        // Insert into host_registrations table
        const result = await query(
            `INSERT INTO host_registrations (
                user_id, name, phone, state, destination, address, description,
                amenities, property_type, max_guests, provides_food, pricing_info,
                image_urls, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *`,
            [
                user_id || (req.user ? req.user.userId : null),
                name,
                phone,
                state,
                destination,
                address,
                description,
                amenities,
                property_type,
                max_guests || 1,
                provides_food || false,
                pricing_info,
                image_urls,
                'pending'
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Host registration submitted successfully.',
            registration: result.rows[0]
        });
    } catch (err) {
        next(err);
    }
};

// ===== GET ALL HOST REGISTRATIONS (Admin) =====
exports.getAllHostRegistrations = async (req, res, next) => {
    try {
        const { status } = req.query;

        let sql = `
            SELECT hr.*, u.email 
            FROM host_registrations hr
            LEFT JOIN users u ON hr.user_id = u.user_id
        `;

        const params = [];
        if (status) {
            sql += ` WHERE hr.status = $1`;
            params.push(status);
        }

        sql += ` ORDER BY hr.created_at DESC`;

        const result = await query(sql, params);
        
        res.json({
            success: true,
            count: result.rowCount,
            registrations: result.rows
        });
    } catch (err) {
        next(err);
    }
};

// ===== UPDATE REGISTRATION STATUS (Admin) =====
exports.updateRegistrationStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, rejection_reason } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status must be pending, approved, or rejected.'
            });
        }

        const result = await query(
            `UPDATE host_registrations 
             SET status = $1, rejection_reason = $2, updated_at = NOW()
             WHERE id = $3
             RETURNING *`,
            [status, rejection_reason || null, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Host registration not found.'
            });
        }

        // If approved, optionally create a host_profile entry
        if (status === 'approved') {
            const registration = result.rows[0];
            // You might want to create a host_profile here
            // or handle it through a separate admin action
        }

        res.json({
            success: true,
            message: `Registration ${status}.`,
            registration: result.rows[0]
        });
    } catch (err) {
        next(err);
    }
};

// ===== GET MY REGISTRATION STATUS =====
exports.getMyRegistration = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT * FROM host_registrations 
             WHERE user_id = $1 
             ORDER BY created_at DESC 
             LIMIT 1`,
            [req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'No registration found.'
            });
        }

        res.json({
            success: true,
            registration: result.rows[0]
        });
    } catch (err) {
        next(err);
    }
};
