const express = require('express');
const router = express.Router();
const { getReviewsByRoadmap, getRecentReviews, createReview, createHostReview, updateReview, deleteReview, getUserReviews, getHostReviews } = require('../controllers/reviewController');
const verifyToken = require('../middleware/auth');

// GET /api/reviews/me — auth required
router.get('/me', verifyToken, getUserReviews);

// GET /api/reviews/host?host_name=...  — public
router.get('/host', getHostReviews);

// GET /api/reviews?roadmap_id=1  — public
router.get('/', getReviewsByRoadmap);

// GET /api/reviews/recent  — public (landing page)
router.get('/recent', getRecentReviews);

// POST /api/reviews  — auth required
router.post('/', verifyToken, createReview);

// POST /api/reviews/host — auth required
router.post('/host', verifyToken, createHostReview);

// PUT /api/reviews/:id  — auth required (own reviews only)
router.put('/:id', verifyToken, updateReview);

// DELETE /api/reviews/:id  — auth required (own reviews only)
router.delete('/:id', verifyToken, deleteReview);

module.exports = router;
