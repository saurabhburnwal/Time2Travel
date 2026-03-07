const express = require('express');
const router = express.Router();
const { getHostsByDestination, registerHost, getMyHostProfile, updateMyHostProfile, verifyHost } = require('../controllers/hostController');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleCheck');

// GET /api/hosts?destination_id=1  — public: view active hosts
router.get('/', getHostsByDestination);

// POST /api/hosts/register  — register as host (any logged in user)
router.post('/register', verifyToken, registerHost);

// GET /api/hosts/me  — get own host profile
router.get('/me', verifyToken, getMyHostProfile);

// PUT /api/hosts/me  — update own host profile
router.put('/me', verifyToken, updateMyHostProfile);

// PATCH /api/hosts/:id/verify  — admin: verify/unverify a host
router.patch('/:id/verify', verifyToken, requireRole('admin'), verifyHost);

module.exports = router;
