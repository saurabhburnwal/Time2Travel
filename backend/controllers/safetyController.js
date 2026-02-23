const { query } = require('../config/db');

// ===== GET OWN SAFETY CONTACTS =====
exports.getMyContacts = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT contact_id, name, phone FROM safety_contacts WHERE user_id = $1 ORDER BY contact_id`,
            [req.user.userId]
        );
        res.json({ success: true, contacts: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== ADD SAFETY CONTACT =====
exports.addContact = async (req, res, next) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ success: false, message: 'name and phone are required.' });
        }

        const result = await query(
            `INSERT INTO safety_contacts (user_id, name, phone) VALUES ($1, $2, $3) RETURNING *`,
            [req.user.userId, name, phone]
        );

        res.status(201).json({ success: true, message: 'Safety contact added.', contact: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== DELETE SAFETY CONTACT =====
exports.deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query(
            `DELETE FROM safety_contacts WHERE contact_id = $1 AND user_id = $2`,
            [id, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Contact not found.' });
        }

        res.json({ success: true, message: 'Contact removed.' });
    } catch (err) {
        next(err);
    }
};
