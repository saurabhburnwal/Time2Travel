const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const authController = require('../controllers/authController');
const { query } = require('../config/db');

jest.mock('../config/db');
jest.mock('../utils/emailService');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Controller - Forgot Password Flow', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/auth/forgot-password', () => {
        it('should return error if email is missing', async () => {
            const res = await request(app)
                .post('/api/auth/forgot-password')
                .send({});
            
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Email is required.');
        });

        it('should return success even if email is not found (anti-enumeration)', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app)
                .post('/api/auth/forgot-password')
                .send({ email: 'nonexistent@example.com' });
            
            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('If that email is registered, a reset code has been sent.');
        });

        it('should generate OTP and save to DB if email exists', async () => {
            query.mockResolvedValueOnce({ rows: [{ user_id: 1, name: 'Test', email: 'test@example.com' }] })
                 .mockResolvedValueOnce({ rowCount: 1 }); // UPDATE mock

            const res = await request(app)
                .post('/api/auth/forgot-password')
                .send({ email: 'test@example.com' });
            
            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(query).toHaveBeenCalledTimes(2);
            // First arg of second call is the query string, second arg is the params array
            expect(query.mock.calls[1][0]).toContain('UPDATE users SET reset_otp');
        });
    });

    describe('POST /api/auth/verify-otp', () => {
        it('should fail with missing email or otp', async () => {
            const res = await request(app)
                .post('/api/auth/verify-otp')
                .send({ email: 'test@example.com' });
            
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
        });

        it('should fail with invalid email', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app)
                .post('/api/auth/verify-otp')
                .send({ email: 'wrong@example.com', otp: '123456' });
            
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid OTP or email.');
        });

        it('should fail with incorrect OTP', async () => {
            query.mockResolvedValueOnce({
                rows: [{ user_id: 1, reset_otp: '654321', reset_otp_expiry: new Date(Date.now() + 10000) }]
            });

            const res = await request(app)
                .post('/api/auth/verify-otp')
                .send({ email: 'test@example.com', otp: '123456' });
            
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid or expired OTP.');
        });
    });
});
