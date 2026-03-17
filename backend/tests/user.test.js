const request = require('supertest');
const express = require('express');
const userController = require('../controllers/userController');
const { query } = require('../config/db');

jest.mock('../config/db');
jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

const app = express();
app.use(express.json());

// Mock middleware for authenticated routes
app.use((req, res, next) => {
    req.user = { userId: 1, role: 'traveler' };
    next();
});

app.get('/api/users/me', userController.getMe);
app.put('/api/users/me', userController.updateMe);
app.get('/api/users', userController.getAllUsers);

describe('User Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/users/me', () => {
        it('should return user profile if found', async () => {
            query.mockResolvedValueOnce({
                rows: [{
                    user_id: 1,
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '1234567890',
                    gender: 'M',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    role_name: 'Traveler'
                }]
            });

            const res = await request(app).get('/api/users/me');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.user.name).toBe('Test User');
        });

        it('should return 404 if user not found', async () => {
            query.mockResolvedValueOnce({ rows: [] });

            const res = await request(app).get('/api/users/me');

            expect(res.statusCode).toEqual(404);
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /api/users/me', () => {
        it('should update user profile successfully', async () => {
            query.mockResolvedValueOnce({ rows: [] }); // Email uniqueness check
            query.mockResolvedValueOnce({
                rows: [{
                    user_id: 1,
                    name: 'Updated Name',
                    email: 'updated@example.com'
                }]
            });

            const res = await request(app)
                .put('/api/users/me')
                .send({ name: 'Updated Name', email: 'updated@example.com' });

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.user.name).toBe('Updated Name');
        });

        it('should fail if email is already in use', async () => {
            query.mockResolvedValueOnce({ rows: [{ user_id: 99 }] }); // Existing email check

            const res = await request(app)
                .put('/api/users/me')
                .send({ email: 'taken@example.com' });

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('Email is already in use by another account.');
        });
    });

    describe('GET /api/users (Admin)', () => {
        it('should return all users', async () => {
            query.mockResolvedValueOnce({
                rowCount: 2,
                rows: [
                    { user_id: 1, name: 'User 1' },
                    { user_id: 2, name: 'User 2' }
                ]
            });

            const res = await request(app).get('/api/users');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.count).toBe(2);
        });
    });
});
