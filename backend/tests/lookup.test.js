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

describe('Lookup API', () => {

    describe('GET /api/lookup/states', () => {
        it('should return a list of all states', async () => {
            const mockStates = [{ state: 'Goa' }, { state: 'Karnataka' }, { state: 'Kerala' }];
            query.mockResolvedValue({ rowCount: 3, rows: mockStates });

            const res = await request(app).get('/api/lookup/states');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.states).toEqual(['Goa', 'Karnataka', 'Kerala']);
            expect(query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT DISTINCT state FROM destinations')
            );
        });

        it('should handle database errors', async () => {
            query.mockRejectedValue(new Error('DB Error'));
            const res = await request(app).get('/api/lookup/states');
            expect(res.statusCode).toEqual(500);
        });
    });

    describe('GET /api/lookup/destinations', () => {
        it('should return 400 if state is missing', async () => {
            const res = await request(app).get('/api/lookup/destinations');
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toMatch(/state query param is required/i);
        });

        it('should return destinations for a state', async () => {
            const mockDestinations = [
                { destination_id: 1, name: 'Baga', description: 'Beach', best_season: 'Nov-Feb' },
                { destination_id: 2, name: 'Panaji', description: 'Capital', best_season: 'Nov-Mar' }
            ];
            query.mockResolvedValue({ rowCount: 2, rows: mockDestinations });

            const res = await request(app).get('/api/lookup/destinations?state=Goa');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.destinations).toEqual(mockDestinations);
            expect(query).toHaveBeenCalledWith(
                expect.stringContaining('WHERE state = $1'),
                ['Goa']
            );
        });

        it('should return destinations with place_type_count when travelType is provided', async () => {
            const mockDestinations = [
                { destination_id: 1, name: 'Baga', description: 'Beach', best_season: 'Nov-Feb' }
            ];
            const mockPlaceCounts = [
                { destination_id: 1, place_type_count: '5' }
            ];
            
            query.mockResolvedValueOnce({ rowCount: 1, rows: mockDestinations });
            query.mockResolvedValueOnce({ rowCount: 1, rows: mockPlaceCounts });

            const res = await request(app).get('/api/lookup/destinations?state=Goa&travelType=Beach');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.destinations[0]).toEqual({
                ...mockDestinations[0],
                place_type_count: 5
            });
            expect(query).toHaveBeenCalledTimes(2);
            expect(query).toHaveBeenLastCalledWith(
                expect.stringContaining('SELECT p.destination_id, COUNT(*) AS place_type_count'),
                [[1], 'Beach']
            );
        });
    });

    describe('GET /api/lookup/travel-types', () => {
        it('should return all travel types', async () => {
            const mockTravelTypes = [
                { id: 1, name: 'Nature' },
                { id: 2, name: 'Adventure' }
            ];
            query.mockResolvedValue({ rowCount: 2, rows: mockTravelTypes });

            const res = await request(app).get('/api/lookup/travel-types');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.travelTypes).toEqual(mockTravelTypes);
        });
    });

    describe('GET /api/lookup/group-types', () => {
        it('should return all group types', async () => {
            const mockGroupTypes = [
                { id: 1, name: 'Solo' },
                { id: 2, name: 'Duo' }
            ];
            query.mockResolvedValue({ rowCount: 2, rows: mockGroupTypes });

            const res = await request(app).get('/api/lookup/group-types');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.groupTypes).toEqual(mockGroupTypes);
        });
    });
});
