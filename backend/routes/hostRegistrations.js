const express = require('express');
const router = express.Router();
const {
    submitHostRegistration,
    getAllHostRegistrations,
    updateRegistrationStatus,
    getMyRegistration,
    getMyRegistrations,
    deleteRegistration
} = require('../controllers/hostRegistrationController');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleCheck');

// POST /api/host-registrations  — submit host registration (must be logged in)
router.post('/', verifyToken, submitHostRegistration);


// GET /api/host-registrations  — get all registrations (admin only)
router.get('/', verifyToken, requireRole('admin'), getAllHostRegistrations);

// GET /api/host-registrations/pending — get pending registrations (admin only)
router.get('/pending', verifyToken, requireRole('admin'), (req, res, next) => {
    req.query.status = 'pending';
    getAllHostRegistrations(req, res, next);
});

// GET /api/host-registrations/my  — get my recent registration status
router.get('/my', verifyToken, getMyRegistration);

// GET /api/host-registrations/my-all  — get all my registrations
router.get('/my-all', verifyToken, getMyRegistrations);

// PATCH /api/host-registrations/:id  — update registration status (admin only)
router.patch('/:id', verifyToken, requireRole('admin'), updateRegistrationStatus);

// POST /api/host-registrations/:id/approve  — approve a registration (admin only)
router.post('/:id/approve', verifyToken, requireRole('admin'), (req, res, next) => {
    req.body.status = 'approved';
    req.body.rejection_reason = null;
    updateRegistrationStatus(req, res, next);
});

// POST /api/host-registrations/:id/reject  — reject a registration (admin only)
router.post('/:id/reject', verifyToken, requireRole('admin'), (req, res, next) => {
    req.body.status = 'rejected';
    req.body.rejection_reason = req.body.reason || null;
    updateRegistrationStatus(req, res, next);
});

// DELETE /api/host-registrations/:id  — delete a registration (admin only)
router.delete('/:id', verifyToken, requireRole('admin'), deleteRegistration);

module.exports = router;
