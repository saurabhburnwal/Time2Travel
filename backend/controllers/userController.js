const { query } = require('../config/db');

// ===== GET OWN PROFILE =====
exports.getMe = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT u.user_id, u.name, u.email, u.phone, u.gender,
                    u.is_active, u.created_at, r.role_name
             FROM users u
             LEFT JOIN roles r ON u.role_id = r.role_id
             WHERE u.user_id = $1`,
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = result.rows[0];
        res.json({
            success: true,
            user: {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: (user.role_name || 'Traveler').toLowerCase(),
                isActive: user.is_active,
                joinedDate: new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            },
        });
    } catch (err) {
        next(err);
    }
};

// ===== UPDATE OWN PROFILE =====
exports.updateMe = async (req, res, next) => {
    try {
        const { name, phone, gender } = req.body;

        const result = await query(
            `UPDATE users SET
                name = COALESCE($1, name),
                phone = COALESCE($2, phone),
                gender = COALESCE($3, gender)
             WHERE user_id = $4
             RETURNING user_id, name, email, phone, gender`,
            [name || null, phone || null, gender ? gender.toUpperCase() : null, req.user.userId]
        );

        res.json({ success: true, message: 'Profile updated.', user: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== GET ALL USERS (Admin) =====
exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT u.user_id, u.name, u.email, u.phone, u.gender,
                    u.is_active, u.created_at, r.role_name
             FROM users u
             LEFT JOIN roles r ON u.role_id = r.role_id
             ORDER BY u.created_at DESC`
        );

        res.json({ success: true, count: result.rowCount, users: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== UPDATE USER STATUS (Admin) =====
exports.updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;

        if (typeof is_active !== 'boolean') {
            return res.status(400).json({ success: false, message: 'is_active must be a boolean.' });
        }

        const result = await query(
            `UPDATE users SET is_active = $1 WHERE user_id = $2 RETURNING user_id, name, is_active`,
            [is_active, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.json({ success: true, message: `User ${is_active ? 'activated' : 'deactivated'}.`, user: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== UPDATE USER ROLE (Admin) =====
exports.updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role_name } = req.body;

        if (!role_name) {
            return res.status(400).json({ success: false, message: 'role_name is required.' });
        }

        const roleResult = await query(
            `SELECT role_id FROM roles WHERE LOWER(role_name) = LOWER($1)`,
            [role_name]
        );

        if (roleResult.rowCount === 0) {
            return res.status(404).json({ success: false, message: `Role '${role_name}' not found.` });
        }

        const role_id = roleResult.rows[0].role_id;

        const result = await query(
            `UPDATE users SET role_id = $1 WHERE user_id = $2 RETURNING user_id, name, role_id`,
            [role_id, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.json({ success: true, message: `User role updated to ${role_name}.`, user: result.rows[0] });
    } catch (err) {
        next(err);
    }
};
