const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const emailController = require('../controllers/emailController');

// POST /api/email/send-trip-pdf — Send trip confirmation email with PDF attachment
router.post('/send-trip-pdf', verifyToken, emailController.sendTripEmail);

module.exports = router;
