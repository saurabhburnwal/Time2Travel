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

describe('Places API', () => {

    describe('GET /api/places', () => {
        it('should return a list of all places', async () => {
            const mockPlaces = [
                { place_id: 1, name: 'Baga Beach', destination: 'Baga', state: 'Goa', travel_type: 'Beach' }
            ];
            query.mockResolvedValue({ rowCount: 1, rows: mockPlaces });

            const res = await request(app).get('/api/places');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.count).toEqual(1);
            expect(res.body.places).toEqual(mockPlaces);
        });

        it('should filter by destination_id and travel_type', async () => {
            const mockPlaces = [
                { place_id: 1, name: 'Baga Beach', destination: 'Baga', state: 'Goa', travel_type: 'Beach' }
            ];
            query.mockResolvedValue({ rowCount: 1, rows: mockPlaces });

            const res = await request(app).get('/api/places?destination_id=22&travel_type=Beach');

            expect(res.statusCode).toEqual(200);
            expect(query).toHaveBeenCalledWith(
                expect.stringContaining('AND p.destination_id = $1 AND LOWER(tt.name) = LOWER($2)'),
                ['22', 'Beach']
            );
        });
    });

    describe('GET /api/places/by-destination/:destinationName', () => {
        it('should return places by destination name', async () => {
            const mockPlaces = [{ place_id: 1, name: 'Baga Beach' }];
            query.mockResolvedValue({ rowCount: 1, rows: mockPlaces });

            const res = await request(app).get('/api/places/by-destination/Baga');

            expect(res.statusCode).toEqual(200);
            expect(res.body.places).toEqual(mockPlaces);
            expect(query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE LOWER(d.name) = LOWER($1)'),
                ['Baga']
            );
        });
    });

    describe('GET /api/places/:id', () => {
        it('should return a single place', async () => {
            const mockPlace = { place_id: 1, name: 'Baga Beach' };
            query.mockResolvedValue({ rowCount: 1, rows: [mockPlace] });

            const res = await request(app).get('/api/places/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body.place).toEqual(mockPlace);
        });

        it('should return 404 if place not found', async () => {
            query.mockResolvedValue({ rowCount: 0, rows: [] });

            const res = await request(app).get('/api/places/999');

            expect(res.statusCode).toEqual(404);
            expect(res.body.success).toBe(false);
        });
    });

});
