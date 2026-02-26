const express = require('express');
const router = express.Router();
const { getMe, updateMe, getAllUsers, updateUserStatus, updateUserRole } = require('../controllers/userController');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleCheck');

// GET /api/users/me  — own profile
router.get('/me', verifyToken, getMe);

// PUT /api/users/me  — update own profile
router.put('/me', verifyToken, updateMe);

// GET /api/users    — admin: all users
router.get('/', verifyToken, requireRole('admin'), getAllUsers);

// PATCH /api/users/:id/status  — admin: activate/deactivate
router.patch('/:id/status', verifyToken, requireRole('admin'), updateUserStatus);

// PATCH /api/users/:id/role  — admin: change role
router.patch('/:id/role', verifyToken, requireRole('admin'), updateUserRole);

module.exports = router;
