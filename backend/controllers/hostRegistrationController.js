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

        // If approved, auto-provision a host_profile and promote user role
        if (status === 'approved') {
            const registration = result.rows[0];

            // Promote user role to 'host' (role_id = 3)
            if (registration.user_id) {
                const hostRoleRes = await query(
                    `SELECT role_id FROM roles WHERE LOWER(role_name) = 'host' LIMIT 1`
                );
                const hostRoleId = hostRoleRes.rows[0]?.role_id || 3;
                await query(
                    `UPDATE users SET role_id = $1 WHERE user_id = $2`,
                    [hostRoleId, registration.user_id]
                );
            }

            // Look up destination_id from destination name
            let destId = null;
            if (registration.destination) {
                const destRes = await query(
                    `SELECT destination_id FROM destinations WHERE LOWER(name) = LOWER($1) LIMIT 1`,
                    [registration.destination]
                );
                if (destRes.rowCount > 0) destId = destRes.rows[0].destination_id;
            }

            // Provision host_profiles using safe SELECT → INSERT or UPDATE
            if (registration.user_id && destId) {
                const existing = await query(
                    `SELECT host_id FROM host_profiles WHERE user_id = $1`,
                    [registration.user_id]
                );

                if (existing.rowCount > 0) {
                    // Update existing profile
                    await query(
                        `UPDATE host_profiles
                         SET destination_id         = $1,
                             max_guests             = $2,
                             provides_food          = $3,
                             verified               = true,
                             is_active              = true
                         WHERE user_id = $4`,
                        [destId, registration.max_guests || 1, registration.provides_food || false, registration.user_id]
                    );
                } else {
                    // Insert new profile
                    await query(
                        `INSERT INTO host_profiles
                             (user_id, destination_id, max_guests, provides_food, voluntary_min_amount, verified, is_active)
                         VALUES ($1, $2, $3, $4, 0, true, true)`,
                        [registration.user_id, destId, registration.max_guests || 1, registration.provides_food || false]
                    );
                }
            }
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

// ===== DELETE HOST REGISTRATION (Admin) =====
exports.deleteRegistration = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query(
            `DELETE FROM host_registrations WHERE id = $1 RETURNING id`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Host registration not found.' });
        }

        res.json({ success: true, message: 'Host registration deleted.' });
    } catch (err) {
        next(err);
    }
};
