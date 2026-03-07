const { query } = require('../config/db');

// ===== GET OWN PREFERENCES =====
exports.getMyPreferences = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT tp.preference_id, tp.days, tp.budget,
                    tt.name AS travel_type, gt.type_name AS group_type,
                    d.name AS destination, d.state
             FROM travel_preferences tp
             LEFT JOIN travel_types tt ON tp.travel_type_id = tt.travel_type_id
             LEFT JOIN group_types gt ON tp.group_type_id = gt.group_type_id
             LEFT JOIN destinations d ON tp.destination_id = d.destination_id
             WHERE tp.user_id = $1
             ORDER BY tp.preference_id DESC`,
            [req.user.userId]
        );

        res.json({ success: true, preferences: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== SAVE NEW PREFERENCE =====
exports.savePreference = async (req, res, next) => {
    try {
        const { travel_type_id, destination_id, days, budget, group_type_id } = req.body;

        if (!days || !budget) {
            return res.status(400).json({ success: false, message: 'days and budget are required.' });
        }

        const result = await query(
            `INSERT INTO travel_preferences (user_id, travel_type_id, destination_id, days, budget, group_type_id)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [req.user.userId, travel_type_id || null, destination_id || null, days, budget, group_type_id || null]
        );

        res.status(201).json({ success: true, message: 'Preference saved.', preference: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== UPDATE PREFERENCE =====
exports.updatePreference = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { travel_type_id, destination_id, days, budget, group_type_id } = req.body;

        // Ensure user owns this preference
        const check = await query(
            `SELECT preference_id FROM travel_preferences WHERE preference_id = $1 AND user_id = $2`,
            [id, req.user.userId]
        );

        if (check.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Preference not found.' });
        }

        const result = await query(
            `UPDATE travel_preferences SET
                travel_type_id = COALESCE($1, travel_type_id),
                destination_id = COALESCE($2, destination_id),
                days = COALESCE($3, days),
                budget = COALESCE($4, budget),
                group_type_id = COALESCE($5, group_type_id)
             WHERE preference_id = $6
             RETURNING *`,
            [travel_type_id || null, destination_id || null, days || null, budget || null, group_type_id || null, id]
        );

        res.json({ success: true, message: 'Preference updated.', preference: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== DELETE PREFERENCE =====
exports.deletePreference = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query(
            `DELETE FROM travel_preferences WHERE preference_id = $1 AND user_id = $2`,
            [id, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Preference not found.' });
        }

        res.json({ success: true, message: 'Preference deleted.' });
    } catch (err) {
        next(err);
    }
};
