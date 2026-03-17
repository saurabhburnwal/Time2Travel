const request = require('supertest');
const express = require('express');
const adminController = require('../controllers/adminController');
const { query } = require('../config/db');

jest.mock('../config/db');

const app = express();
app.use(express.json());

app.get('/api/admin/:tableName', adminController.getTableData);
app.post('/api/admin/:tableName', adminController.addRow);
app.put('/api/admin/:tableName/:id', adminController.updateRow);

describe('Admin Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/admin/:tableName', () => {
        it('should return table data for allowed tables', async () => {
            query.mockResolvedValueOnce({
                rowCount: 1,
                rows: [{ id: 1, name: 'Place 1' }]
            });

            const res = await request(app).get('/api/admin/places');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data[0].name).toBe('Place 1');
        });

        it('should block disallowed tables', async () => {
            const res = await request(app).get('/api/admin/secrets');

            expect(res.statusCode).toEqual(403);
            expect(res.body.message).toBe('Table not allowed.');
        });
    });

    describe('POST /api/admin/:tableName', () => {
        it('should add a new row', async () => {
            query.mockResolvedValueOnce({
                rows: [{ id: 1, name: 'New Place' }]
            });

            const res = await request(app)
                .post('/api/admin/places')
                .send({ name: 'New Place' });

            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('New Place');
        });
    });
});
