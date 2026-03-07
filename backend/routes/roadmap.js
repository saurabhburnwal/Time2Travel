const express = require('express');
const router = express.Router();
const { generateRoadmap, saveRoadmap, getMyRoadmaps, getRoadmapById, deleteRoadmap } = require('../controllers/roadmapController');
const verifyToken = require('../middleware/auth');

// POST /api/roadmap/generate  — generate 4 roadmap styles (auth required)
router.post('/generate', verifyToken, generateRoadmap);

// POST /api/roadmap/save  — save selected roadmap
router.post('/save', verifyToken, saveRoadmap);

// GET /api/roadmap  — get user's saved roadmaps
router.get('/', verifyToken, getMyRoadmaps);

// GET /api/roadmap/:id  — get roadmap detail with itinerary
router.get('/:id', verifyToken, getRoadmapById);

// DELETE /api/roadmap/:id  — delete roadmap
router.delete('/:id', verifyToken, deleteRoadmap);

module.exports = router;
