const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth');
const authController = require('../controllers/authController');
const { query } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../config/db');
jest.mock('../utils/emailService');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// Mock environment variables
process.env.JWT_SECRET = 'test-secret';

describe('Auth Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/auth/register', () => {
        const validUser = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'a'.repeat(64), // 64-char hex hash
        };

        it('should register a new user successfully', async () => {
            query.mockResolvedValueOnce({ rows: [] }) // Check existing
                 .mockResolvedValueOnce({ rows: [{ role_id: 2, role_name: 'Traveler' }] }) // Role
                 .mockResolvedValueOnce({ rows: [{ user_id: 1, ...validUser }] }); // Insert

            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashed_password');

            const res = await request(app).post('/api/auth/register').send(validUser);

            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toBe(true);
            expect(res.body.requiresVerification).toBe(true);
        });

        it('should fail if email is already registered', async () => {
            query.mockResolvedValueOnce({ rows: [{ user_id: 1 }] });

            const res = await request(app).post('/api/auth/register').send(validUser);

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Email already registered.');
        });
    });

    describe('POST /api/auth/login', () => {
        const credentials = { email: 'john@example.com', password: 'a'.repeat(64) };

        it('should login successfully and set cookie', async () => {
            const mockUser = { user_id: 1, email: 'john@example.com', password_hash: 'hashed', is_active: true, is_email_verified: true, role_name: 'Traveler' };
            query.mockResolvedValueOnce({ rows: [mockUser] });
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mock_token');

            const res = await request(app).post('/api/auth/login').send(credentials);

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.headers['set-cookie'][0]).toContain('tt_token=mock_token');
        });

        it('should fail if password does not match', async () => {
            query.mockResolvedValueOnce({ rows: [{ password_hash: 'hashed', is_active: true }] });
            bcrypt.compare.mockResolvedValue(false);

            const res = await request(app).post('/api/auth/login').send(credentials);

            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid password.');
        });
    });

    describe('GET /api/auth/me', () => {
        it('should return user info if token is valid', async () => {
            jwt.verify.mockReturnValue({ userId: 1 });
            query.mockResolvedValueOnce({ rows: [{ user_id: 1, name: 'John', email: 'john@example.com', is_active: true }] });

            const res = await request(app)
                .get('/api/auth/me')
                .set('Cookie', ['tt_token=valid_token']);

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.user.name).toBe('John');
        });

        it('should return failure if no token provided', async () => {
            const res = await request(app).get('/api/auth/me');
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('No session found.');
        });
    });

    describe('POST /api/auth/logout', () => {
        it('should clear the auth cookie', async () => {
            const res = await request(app).post('/api/auth/logout');
            expect(res.statusCode).toEqual(200);
            expect(res.headers['set-cookie'][0]).toContain('tt_token=;'); // Cleared
        });
    });

    describe('Forgot Password Flow', () => {
        describe('POST /api/auth/forgot-password', () => {
            it('should return error if email is missing', async () => {
                const res = await request(app).post('/api/auth/forgot-password').send({});
                expect(res.statusCode).toEqual(400);
            });

            it('should return success even if email is not found', async () => {
                query.mockResolvedValueOnce({ rows: [] });
                const res = await request(app).post('/api/auth/forgot-password').send({ email: 'none@ex.com' });
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('POST /api/auth/verify-otp', () => {
            it('should verify OTP and return resetToken', async () => {
                const expiry = new Date(Date.now() + 10000);
                query.mockResolvedValueOnce({ rows: [{ user_id: 1, reset_otp: '123456', reset_otp_expiry: expiry }] });
                jwt.sign.mockReturnValue('reset_jwt_token');

                const res = await request(app).post('/api/auth/verify-otp').send({ email: 'test@ex.com', otp: '123456' });

                expect(res.statusCode).toEqual(200);
                expect(res.body.resetToken).toBe('reset_jwt_token');
            });
        });
    });
});
