const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/db');
const { sendVerificationEmail } = require('../utils/emailService');

// ── Cookie config ────────────────────────────────────────────────────────────
const COOKIE_NAME = 'tt_token';

/**
 * Cookie options for the JWT.
 *  - httpOnly  : JS cannot read it → XSS-safe
 *  - sameSite  : 'strict' → CSRF-safe (cookie not sent from foreign origins)
 *  - secure    : true in production (HTTPS only); false in dev so localhost works
 *  - maxAge    : matches JWT expiry (7 days)
 */
const cookieOptions = (res) => ({
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days in ms
});

/**
 * Set the JWT inside an HttpOnly cookie.
 * Does NOT include the token in the JSON response body.
 */
function setAuthCookie(res, token) {
    res.cookie(COOKIE_NAME, token, cookieOptions(res));
}

/**
 * Clear the auth cookie (logout).
 */
function clearAuthCookie(res) {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
}

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

/**
 * Generate a secure random verification token (hex string)
 */
function generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
}

// ── Validation rules ─────────────────────────────────────────────────────────
exports.registerValidation = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').optional({ checkFalsy: true })
        .matches(/^[0-9+\-\s()]{7,15}$/).withMessage('Invalid phone number'),
    body('gender').optional({ checkFalsy: true }).isIn(['MALE', 'FEMALE', 'OTHER']).withMessage('Gender must be MALE, FEMALE, or OTHER'),
];

exports.loginValidation = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

// ── GET /api/auth/me ─────────────────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT u.user_id, u.name, u.email, u.phone, u.gender, r.role_name, u.is_email_verified
             FROM users u
             LEFT JOIN roles r ON u.role_id = r.role_id
             WHERE u.user_id = $1 AND u.is_active = true`,
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            clearAuthCookie(res);
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = result.rows[0];
        res.json({
            success: true,
            user: {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: (user.role_name || 'Traveler').toLowerCase(),
                isEmailVerified: user.is_email_verified,
            },
        });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/register ───────────────────────────────────────────────────
exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, password, phone, gender, role } = req.body;

        // Check if user already exists
        const existing = await query('SELECT user_id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ success: false, message: 'Email already registered.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Resolve role: use provided role (traveler or host), default to traveler
        const requestedRole = (role || 'traveler').toLowerCase();
        const roleResult = await query(
            `SELECT role_id, role_name FROM roles WHERE LOWER(role_name) = $1 LIMIT 1`,
            [requestedRole]
        );
        const role_id = roleResult.rows[0]?.role_id || 2;
        const role_name = roleResult.rows[0]?.role_name || 'Traveler';

        // Generate email verification token (expires in 24 hours)
        const verificationToken = generateVerificationToken();
        const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // +24h

        // Insert user — NOT verified yet, NO auth cookie issued
        const result = await query(
            `INSERT INTO users (name, email, password_hash, phone, gender, role_id, is_active,
                                is_email_verified, verification_token, token_expires_at)
             VALUES ($1, $2, $3, $4, $5, $6, true, false, $7, $8)
             RETURNING user_id, name, email, phone, gender, role_id, created_at`,
            [name, email, password_hash, phone || null, (gender || 'OTHER').toUpperCase(),
                role_id, verificationToken, tokenExpiresAt]
        );

        const user = result.rows[0];
        user.role_name = role_name;

        // Send verification email (non-blocking — log on failure)
        try {
            await sendVerificationEmail(email, name, verificationToken);
        } catch (emailErr) {
            console.error('[authController] Failed to send verification email:', emailErr.message);
            // Don't fail registration — user can request resend
        }

        // No cookie set — account requires email verification before login
        res.status(201).json({
            success: true,
            requiresVerification: true,
            message: 'Registration successful. Please check your email to verify your account.',
            email: user.email,
        });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/login ──────────────────────────────────────────────────────
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
                    u.is_active, u.is_email_verified, r.role_name
             FROM users u
             LEFT JOIN roles r ON u.role_id = r.role_id
             WHERE u.email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Email not registered.' });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(403).json({ success: false, message: 'Account is deactivated. Contact admin.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password.' });
        }

        // Block login if email not verified
        if (!user.is_email_verified) {
            return res.status(403).json({
                success: false,
                message: 'email_not_verified',
                email: user.email,
                hint: 'Please verify your email address before logging in. Check your inbox or request a new verification email.',
            });
        }

        const token = generateToken(user);
        setAuthCookie(res, token);   // ← JWT goes into HttpOnly cookie, NOT response body

        res.json({
            success: true,
            message: 'Login successful.',
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

// ── GET /api/auth/verify-email?token=... ─────────────────────────────────────
exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ success: false, message: 'Verification token is required.' });
        }

        // Look up user by token
        const result = await query(
            `SELECT user_id, name, email, is_email_verified, token_expires_at
             FROM users
             WHERE verification_token = $1`,
            [token]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Invalid or already-used verification link.',
            });
        }

        const user = result.rows[0];

        // Check expiry
        if (user.token_expires_at && new Date() > new Date(user.token_expires_at)) {
            return res.status(410).json({
                success: false,
                expired: true,
                message: 'This verification link has expired. Please request a new one.',
                email: user.email,
            });
        }

        // Mark as verified and clear token
        await query(
            `UPDATE users
             SET is_email_verified = true,
                 verification_token = NULL,
                 token_expires_at = NULL
             WHERE user_id = $1`,
            [user.user_id]
        );

        res.json({
            success: true,
            message: 'Email verified successfully! You can now log in.',
            name: user.name,
        });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/resend-verification ───────────────────────────────────────
exports.resendVerification = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        const result = await query(
            `SELECT user_id, name, email, is_email_verified FROM users WHERE email = $1`,
            [email.toLowerCase()]
        );

        // Always return 200 to prevent email enumeration
        if (result.rows.length === 0) {
            return res.json({ success: true, message: 'If that email is registered, a verification link has been sent.' });
        }

        const user = result.rows[0];

        if (user.is_email_verified) {
            return res.json({ success: true, message: 'Your email is already verified. Please log in.' });
        }

        // Generate fresh token
        const verificationToken = generateVerificationToken();
        const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await query(
            `UPDATE users SET verification_token = $1, token_expires_at = $2 WHERE user_id = $3`,
            [verificationToken, tokenExpiresAt, user.user_id]
        );

        try {
            await sendVerificationEmail(user.email, user.name, verificationToken);
        } catch (emailErr) {
            console.error('[authController] Failed to resend verification email:', emailErr.message);
        }

        res.json({ success: true, message: 'Verification email resent. Please check your inbox.' });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
exports.logout = (req, res) => {
    clearAuthCookie(res);
    res.json({ success: true, message: 'Logged out successfully.' });
};
