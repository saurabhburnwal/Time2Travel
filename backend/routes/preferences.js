const express = require('express');
const router = express.Router();
const { getMyPreferences, savePreference, updatePreference, deletePreference } = require('../controllers/preferencesController');
const verifyToken = require('../middleware/auth');

// All preference routes require auth

// GET /api/preferences
router.get('/', verifyToken, getMyPreferences);

// POST /api/preferences
router.post('/', verifyToken, savePreference);

// PUT /api/preferences/:id
router.put('/:id', verifyToken, updatePreference);

// DELETE /api/preferences/:id
router.delete('/:id', verifyToken, deletePreference);

module.exports = router;
