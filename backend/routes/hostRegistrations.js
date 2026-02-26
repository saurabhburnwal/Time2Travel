const express = require('express');
const router = express.Router();
const {
    submitHostRegistration,
    getAllHostRegistrations,
    updateRegistrationStatus,
    getMyRegistration
} = require('../controllers/hostRegistrationController');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleCheck');

// POST /api/host-registrations  — submit host registration (any user, even non-logged-in)
router.post('/', submitHostRegistration);

// GET /api/host-registrations  — get all registrations (admin only)
router.get('/', verifyToken, requireRole('admin'), getAllHostRegistrations);

// GET /api/host-registrations/pending — get pending registrations (admin only)
router.get('/pending', verifyToken, requireRole('admin'), (req, res, next) => {
    req.query.status = 'pending';
    getAllHostRegistrations(req, res, next);
});

// GET /api/host-registrations/me  — get my registration status (logged in users)
router.get('/me', verifyToken, getMyRegistration);

// PATCH /api/host-registrations/:id  — update registration status (admin only)
router.patch('/:id', verifyToken, requireRole('admin'), updateRegistrationStatus);

module.exports = router;
