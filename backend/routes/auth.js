const express = require('express');
const router = express.Router();
const { register, login, getMe, logout, registerValidation, loginValidation } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', registerValidation, register);

// POST /api/auth/login
router.post('/login', loginValidation, login);

// GET /api/auth/me  — verify session cookie and return current user
router.get('/me', verifyToken, getMe);

// POST /api/auth/logout — clear the HttpOnly session cookie
router.post('/logout', logout);

module.exports = router;
