const express = require('express');
const router = express.Router();
const {
    register, login, getMe, logout,
    verifyEmail, resendVerification,
    registerValidation, loginValidation,
} = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', registerValidation, register);

// POST /api/auth/login
router.post('/login', loginValidation, login);

// GET /api/auth/me  — verify session cookie and return current user
router.get('/me', getMe);

// POST /api/auth/logout — clear the HttpOnly session cookie
router.post('/logout', logout);

// GET /api/auth/verify-email?token=... — validate email token from inbox link
router.get('/verify-email', verifyEmail);

// POST /api/auth/resend-verification — resend verification email
router.post('/resend-verification', resendVerification);

// POST /api/auth/forgot-password — initiate reset
router.post('/forgot-password', require('../controllers/authController').forgotPassword);

// POST /api/auth/verify-otp — verify reset code
router.post('/verify-otp', require('../controllers/authController').verifyOTP);

// POST /api/auth/reset-password — set new password
router.post('/reset-password', require('../controllers/authController').resetPassword);

module.exports = router;
