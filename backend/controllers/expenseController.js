const { query } = require('../config/db');

// ===== GET EXPENSE BREAKDOWN FOR A ROADMAP =====
exports.getExpensesByRoadmap = async (req, res, next) => {
    try {
        const { roadmapId } = req.params;

        // Verify user owns the roadmap
        const rmCheck = await query(
            `SELECT roadmap_id FROM roadmaps WHERE roadmap_id = $1 AND user_id = $2`,
            [roadmapId, req.user.userId]
        );

        if (rmCheck.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Roadmap not found.' });
        }

        const result = await query(
            `SELECT * FROM expenses WHERE roadmap_id = $1`,
            [roadmapId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'No expense record found for this roadmap.' });
        }

        res.json({ success: true, expenses: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== SAVE EXPENSE RECORD =====
exports.saveExpenses = async (req, res, next) => {
    try {
        const { roadmapId } = req.params;
        const { accommodation, food, transport, entry_fees } = req.body;

        // Verify ownership
        const rmCheck = await query(
            `SELECT roadmap_id FROM roadmaps WHERE roadmap_id = $1 AND user_id = $2`,
            [roadmapId, req.user.userId]
        );

        if (rmCheck.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Roadmap not found.' });
        }

        // Upsert (delete old + insert new for simplicity)
        await query(`DELETE FROM expenses WHERE roadmap_id = $1`, [roadmapId]);

        const result = await query(
            `INSERT INTO expenses (roadmap_id, accommodation, food, transport, entry_fees, currency)
             VALUES ($1, $2, $3, $4, $5, 'INR') RETURNING *`,
            [roadmapId, accommodation || 0, food || 0, transport || 0, entry_fees || 0]
        );

        res.status(201).json({ success: true, message: 'Expenses saved.', expenses: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== UPDATE EXPENSE RECORD =====
exports.updateExpenses = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { accommodation, food, transport, entry_fees } = req.body;

        const result = await query(
            `UPDATE expenses SET
                accommodation = COALESCE($1, accommodation),
                food = COALESCE($2, food),
                transport = COALESCE($3, transport),
                entry_fees = COALESCE($4, entry_fees),
                last_updated = NOW()
             WHERE expense_id = $5
             RETURNING *`,
            [accommodation || null, food || null, transport || null, entry_fees || null, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Expense record not found.' });
        }

        res.json({ success: true, message: 'Expenses updated.', expenses: result.rows[0] });
    } catch (err) {
        next(err);
    }
};
