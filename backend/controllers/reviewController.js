const { query } = require('../config/db');

// ===== GET REVIEWS FOR A ROADMAP =====
exports.getReviewsByRoadmap = async (req, res, next) => {
    try {
        const { roadmap_id } = req.query;

        if (!roadmap_id) {
            return res.status(400).json({ success: false, message: 'roadmap_id query param is required.' });
        }

        const result = await query(
            `SELECT rv.review_id, rv.rating, rv.comment, rv.created_at, u.name AS user_name
             FROM reviews rv
             LEFT JOIN users u ON rv.user_id = u.user_id
             WHERE rv.roadmap_id = $1
             ORDER BY rv.created_at DESC`,
            [roadmap_id]
        );

        res.json({ success: true, count: result.rowCount, reviews: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== GET RECENT REVIEWS (Landing Page) =====
exports.getRecentReviews = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 6;

        const result = await query(
            `SELECT rv.review_id, rv.rating, rv.comment, rv.created_at,
                    u.name AS user_name, d.name AS destination, d.state
             FROM reviews rv
             LEFT JOIN users u ON rv.user_id = u.user_id
             LEFT JOIN roadmaps r ON rv.roadmap_id = r.roadmap_id
             LEFT JOIN destinations d ON r.destination_id = d.destination_id
             ORDER BY rv.created_at DESC
             LIMIT $1`,
            [limit]
        );

        res.json({ success: true, reviews: result.rows });
    } catch (err) {
        next(err);
    }
};

// ===== SUBMIT A REVIEW =====
exports.createReview = async (req, res, next) => {
    try {
        const { roadmap_id, rating, comment } = req.body;

        if (!roadmap_id || !rating) {
            return res.status(400).json({ success: false, message: 'roadmap_id and rating are required.' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
        }

        // Verify the user owns this roadmap
        const rmCheck = await query(
            `SELECT roadmap_id FROM roadmaps WHERE roadmap_id = $1 AND user_id = $2`,
            [roadmap_id, req.user.userId]
        );

        if (rmCheck.rowCount === 0) {
            return res.status(403).json({ success: false, message: 'You can only review your own roadmaps.' });
        }

        const result = await query(
            `INSERT INTO reviews (user_id, roadmap_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *`,
            [req.user.userId, roadmap_id, rating, comment || null]
        );

        res.status(201).json({ success: true, message: 'Review submitted.', review: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== EDIT OWN REVIEW =====
exports.updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
        }

        const result = await query(
            `UPDATE reviews SET
                rating = COALESCE($1, rating),
                comment = COALESCE($2, comment)
             WHERE review_id = $3 AND user_id = $4 RETURNING *`,
            [rating || null, comment || null, id, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Review not found.' });
        }

        res.json({ success: true, message: 'Review updated.', review: result.rows[0] });
    } catch (err) {
        next(err);
    }
};

// ===== DELETE OWN REVIEW =====
exports.deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query(
            `DELETE FROM reviews WHERE review_id = $1 AND user_id = $2`,
            [id, req.user.userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: 'Review not found.' });
        }

        res.json({ success: true, message: 'Review deleted.' });
    } catch (err) {
        next(err);
    }
};
