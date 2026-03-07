const { query } = require('../config/db');

exports.getHostsByDestination = async (req, res, next) => {
    try {
        const { destination_id } = req.query;

        let sql = `
            SELECT hp.host_id, hp.max_guests, hp.provides_food, hp.verified,
                    hp.is_active,
                    hp.voluntary_min_amount, u.name AS host_name,
                    d.name AS destination, d.state,
                    u.email, u.phone
             FROM host_profiles hp
             LEFT JOIN users u ON hp.user_id = u.user_id
             LEFT JOIN destinations d ON hp.destination_id = d.destination_id
             WHERE 1=1
        `;
        const params = [];

        if (destination_id) {
            sql += ` AND hp.destination_id = $1`;
            params.push(destination_id);
        } else {
            // Optional: for non-admins, we might require destination_id, but the frontend admin
            // dashboard calls this without destination_id to get ALL hosts.
        }

        sql += ` ORDER BY hp.verified DESC, hp.voluntary_min_amount ASC`;

        const result = await query(sql, params);

        res.json({ success: true, count: result.rowCount, hosts: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== REGISTER AS HOST =====
exports.registerHost = async (req, res, next) => {
    try {
        const { destination_id, max_guests, provides_food, voluntary_min_amount } = req.body;

        if (!destination_id) {
            return res.status(400).json({ success: false, message: 'destination_id is required.' });
        }

        // Check if already registered as host
        const existing = await query(
            `SELECT host_id FROM host_profiles WHERE user_id = $1`,
            [req.user.userId]
        );

        if (existing.rowCount > 0) {
            return res.status(409).json({ success: false, message: 'You are already registered as a host.' });
        }

        const result = await query(
            `INSERT INTO host_profiles (user_id, destination_id, max_guests, provides_food, voluntary_min_amount, verified, is_active)
             VALUES ($1, $2, $3, $4, $5, false, true) RETURNING *`,
            [req.user.userId, destination_id, max_guests || 1, provides_food || false, voluntary_min_amount || 0]
        );

        res.status(201).json({ success: true, message: 'Host registered. Pending verification.', host: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== GET OWN HOST PROFILE =====
exports.getMyHostProfile = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT hp.host_id, hp.max_guests, hp.provides_food, hp.verified,
                    hp.voluntary_min_amount, hp.is_active,
                    d.name AS destination, d.state
             FROM host_profiles hp
             LEFT JOIN destinations d ON hp.destination_id = d.destination_id
             WHERE hp.user_id = $1`,
            [req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Host profile not found.' });
        }

        res.json({ success: true, host: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== UPDATE OWN HOST PROFILE =====
exports.updateMyHostProfile = async (req, res, next) => {
    try {
        const { destination_id, max_guests, provides_food, voluntary_min_amount } = req.body;

        const result = await query(
            `UPDATE host_profiles SET
                destination_id = COALESCE($1, destination_id),
                max_guests = COALESCE($2, max_guests),
                provides_food = COALESCE($3, provides_food),
                voluntary_min_amount = COALESCE($4, voluntary_min_amount)
             WHERE user_id = $5 RETURNING *`,
            [destination_id || null, max_guests || null, provides_food ?? null, voluntary_min_amount || null, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Host profile not found.' });
        }

        res.json({ success: true, message: 'Host profile updated.', host: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== VERIFY A HOST (Admin) =====
exports.verifyHost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { verified } = req.body;

        if (typeof verified !== 'boolean') {
            return res.status(400).json({ success: false, message: 'verified must be a boolean.' });
        }

        const result = await query(
            `UPDATE host_profiles SET verified = $1 WHERE host_id = $2 RETURNING host_id, verified`,
            [verified, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Host not found.' });
        }

        res.json({ success: true, message: `Host ${verified ? 'verified' : 'unverified'}.`, host: result.rows[0] });
    } catch (err) {
        next(err);
    }
};
