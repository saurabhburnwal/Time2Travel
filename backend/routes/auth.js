const express = require('express');
const router = express.Router();
const { register, login, registerValidation, loginValidation } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', registerValidation, register);

// POST /api/auth/login
router.post('/login', loginValidation, login);

// GET /api/auth/verify — validate token and return user payload
router.get('/verify', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user, // { userId, name, email, role }
    });
});

module.exports = router;
