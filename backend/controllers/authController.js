const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/db');

/**
 * Generate a signed JWT for a user
 */
const generateToken = (user) => {
    return jwt.sign(
        { userId: user.user_id, name: user.name, email: user.email, role: user.role_name.toLowerCase() },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

// ===== VALIDATION RULES =====
exports.registerValidation = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('gender').optional().isIn(['MALE', 'FEMALE', 'OTHER']).withMessage('Gender must be MALE, FEMALE, or OTHER'),
];

exports.loginValidation = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

// ===== REGISTER =====
exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, password, phone, gender } = req.body;

        // Check if user already exists
        const existing = await query('SELECT user_id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ success: false, message: 'Email already registered.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Get traveler role_id (role_id = 1)
        const roleResult = await query("SELECT role_id FROM roles WHERE LOWER(role_name) = 'traveler' LIMIT 1");
        const role_id = roleResult.rows[0]?.role_id || 1;

        // Insert user
        const result = await query(
            `INSERT INTO users (name, email, password_hash, phone, gender, role_id, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, true)
             RETURNING user_id, name, email, phone, gender, role_id, created_at`,
            [name, email, password_hash, phone || null, (gender || 'OTHER').toUpperCase(), role_id]
        );

        const user = result.rows[0];
        user.role_name = 'Traveler';

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'Registration successful.',
            token,
            user: {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: 'traveler',
            },
        });
    } catch (err) {
        next(err);
    }
};

// ===== LOGIN =====
exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        // Fetch user with role
        const result = await query(
            `SELECT u.user_id, u.name, u.email, u.password_hash, u.phone, u.gender,
                    u.is_active, r.role_name
             FROM users u
             LEFT JOIN roles r ON u.role_id = r.role_id
             WHERE u.email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(403).json({ success: false, message: 'Account is deactivated. Contact admin.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login successful.',
            token,
            user: {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: (user.role_name || 'Traveler').toLowerCase(),
            },
        });
    } catch (err) {
        next(err);
    }
};
