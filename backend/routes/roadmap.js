const express = require('express');
const router = express.Router();
const { generateRoadmap, saveRoadmap, getMyRoadmaps, getRoadmapById, deleteRoadmap } = require('../controllers/roadmapController');
const verifyToken = require('../middleware/auth');

// IMPORTANT: Named routes must come BEFORE the /:id wildcard to avoid
//            /my and /save being captured as id params.

// POST /api/roadmap/generate  — generate 4 roadmap styles (auth required)
router.post('/generate', verifyToken, generateRoadmap);

// POST /api/roadmap/save  — save selected roadmap
router.post('/save', verifyToken, saveRoadmap);

// POST /api/roadmap/email-pdf — email PDF to user (auth required)
const { emailTripPDF } = require('../controllers/roadmapController');
router.post('/email-pdf', verifyToken, emailTripPDF);

// GET /api/roadmap/my  — alias used by the frontend to fetch the user's saved roadmaps
router.get('/my', verifyToken, getMyRoadmaps);

// GET /api/roadmap  — also returns the user's saved roadmaps (same handler, two paths)
router.get('/', verifyToken, getMyRoadmaps);

// GET /api/roadmap/:id  — get roadmap detail with itinerary
router.get('/:id', verifyToken, getRoadmapById);

// DELETE /api/roadmap/:id  — delete roadmap (user can only delete their own)
router.delete('/:id', verifyToken, deleteRoadmap);

module.exports = router;
