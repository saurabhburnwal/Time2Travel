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
        const { name, email, phone, gender, password, currentPassword } = req.body;
        const userId = req.user.userId;

        // If a new password is provided, verify the current password first
        if (password) {
            if (!currentPassword) {
                return res.status(400).json({ success: false, message: 'Current password is required to set a new password.' });
            }

            const userRes = await query(`SELECT password_hash FROM users WHERE user_id = $1`, [userId]);
            if (userRes.rows.length === 0) {
                 return res.status(404).json({ success: false, message: 'User not found.' });
            }

            const isMatch = await require('bcryptjs').compare(currentPassword, userRes.rows[0].password_hash);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Incorrect current password.' });
            }
            
            // Hash the new password
            const salt = await require('bcryptjs').genSalt(10);
            const password_hash = await require('bcryptjs').hash(password, salt);

            await query(`UPDATE users SET password_hash = $1 WHERE user_id = $2`, [password_hash, userId]);
        }

        // If email is being changed, check for uniqueness (optional but good practice)
        if (email) {
            const emailCheck = await query(`SELECT user_id FROM users WHERE email = $1 AND user_id != $2`, [email, userId]);
            if (emailCheck.rows.length > 0) {
                return res.status(400).json({ success: false, message: 'Email is already in use by another account.' });
            }
        }

        const result = await query(
            `UPDATE users SET
                name = COALESCE($1, name),
                email = COALESCE($2, email),
                phone = COALESCE($3, phone),
                gender = COALESCE($4, gender)
             WHERE user_id = $5
             RETURNING user_id, name, email, phone, gender`,
            [name || null, email || null, phone || null, gender ? gender.toUpperCase() : null, userId]
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

// ===== DELETE USER (Admin) =====
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting themselves
        if (parseInt(id) === req.user.userId) {
            return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
        }

        // Check user exists first
        const userCheck = await query(`SELECT name FROM users WHERE user_id = $1`, [id]);
        if (userCheck.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Remove dependent rows to satisfy FK constraints (no ON DELETE CASCADE in schema)
        await query(`DELETE FROM travel_preferences WHERE user_id = $1`, [id]);
        await query(`DELETE FROM safety_contacts WHERE user_id = $1`, [id]);
        await query(`DELETE FROM reviews WHERE user_id = $1`, [id]);
        await query(`DELETE FROM host_profiles WHERE user_id = $1`, [id]);
        await query(`DELETE FROM host_registrations WHERE user_id = $1`, [id]);
        await query(`DELETE FROM roadmaps WHERE user_id = $1`, [id]);

        await query(`DELETE FROM users WHERE user_id = $1`, [id]);

        res.json({ success: true, message: `User '${userCheck.rows[0].name}' deleted.` });
    } catch (err) {
        next(err);
    }
};
// ===== DELETE OWN ACCOUNT (User) =====
exports.deleteMe = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        // Remove dependent rows to satisfy FK constraints before deleting the user
        await query(`DELETE FROM travel_preferences WHERE user_id = $1`, [userId]);
        await query(`DELETE FROM safety_contacts WHERE user_id = $1`, [userId]);
        await query(`DELETE FROM reviews WHERE user_id = $1`, [userId]);
        await query(`DELETE FROM host_profiles WHERE user_id = $1`, [userId]);
        await query(`DELETE FROM host_registrations WHERE user_id = $1`, [userId]);
        await query(`DELETE FROM roadmaps WHERE user_id = $1`, [userId]);

        const result = await query(
            `DELETE FROM users WHERE user_id = $1 RETURNING name`,
            [userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Clear the auth cookie with the same options used when it was set
        res.clearCookie('tt_token', {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            secure: process.env.NODE_ENV === 'production',
        });

        res.json({ success: true, message: 'Your account has been permanently deleted.' });
    } catch (err) {
        next(err);
    }
};
