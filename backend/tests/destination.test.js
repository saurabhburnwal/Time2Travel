const request = require('supertest');
const app = require('../server');
const { query } = require('../config/db');

// Mock the database
jest.mock('../config/db', () => ({
    query: jest.fn()
}));

// Suppress console logs during tests to keep output clean
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    console.error.mockRestore();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Destinations API', () => {

    describe('GET /api/destinations', () => {
        it('should return a list of all destinations', async () => {
            const mockDestinations = [
                { destination_id: 1, name: 'Baga Beach', state: 'Goa' },
                { destination_id: 2, name: 'Mumbai', state: 'Maharashtra' }
            ];
            query.mockResolvedValue({ rowCount: 2, rows: mockDestinations });

            const res = await request(app).get('/api/destinations');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.count).toEqual(2);
            expect(res.body.destinations).toEqual(mockDestinations);
            expect(query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT destination_id, name, state'),
                []
            );
        });

        it('should return destinations filtered by state', async () => {
            const mockDestinations = [
                { destination_id: 1, name: 'Baga Beach', state: 'Goa' }
            ];
            query.mockResolvedValue({ rowCount: 1, rows: mockDestinations });

            const res = await request(app).get('/api/destinations?state=Goa');

            expect(res.statusCode).toEqual(200);
            expect(res.body.destinations).toEqual(mockDestinations);
            expect(query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE state = $1'),
                ['Goa']
            );
        });
        
        it('should handle database errors gracefully', async () => {
            query.mockRejectedValue(new Error('DB Error'));
            const res = await request(app).get('/api/destinations');
            expect(res.statusCode).toEqual(500); // Standard express error handler wrapper
        });
    });

    describe('GET /api/destinations/:id', () => {
        it('should return a single destination if found', async () => {
             const mockDest = { destination_id: 1, name: 'Baga Beach', state: 'Goa' };
             query.mockResolvedValue({ rowCount: 1, rows: [mockDest] });

             const res = await request(app).get('/api/destinations/1');

             expect(res.statusCode).toEqual(200);
             expect(res.body.success).toBe(true);
             expect(res.body.destination).toEqual(mockDest);
        });

        it('should return 404 if destination is not found', async () => {
             query.mockResolvedValue({ rowCount: 0, rows: [] });

             const res = await request(app).get('/api/destinations/999');

             expect(res.statusCode).toEqual(404);
             expect(res.body.success).toBe(false);
             expect(res.body.message).toMatch(/not found/i);
        });
    });

});
