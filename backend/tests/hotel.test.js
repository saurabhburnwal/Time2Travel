const request = require('supertest');
const app = require('../server');
const { query } = require('../config/db');

// Mock the database
jest.mock('../config/db', () => ({
    query: jest.fn()
}));

// Mock authentication middleware to bypass JWT checks
jest.mock('../middleware/auth', () => (req, res, next) => {
    req.user = { userId: 1, role: 'user' };
    next();
});

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

describe('Hotels API', () => {

    describe('GET /api/hotels', () => {
        it('should return hotels for a destination_id', async () => {
            const mockHotels = [{ hotel_id: 1, name: 'Ocean View', price_per_night: 2000, rating: 4.5 }];
            query.mockResolvedValue({ rowCount: 1, rows: mockHotels });

            const res = await request(app).get('/api/hotels?destination_id=22');

            expect(res.statusCode).toEqual(200);
            expect(res.body.hotels).toEqual(mockHotels);
            expect(query).toHaveBeenCalledWith(expect.stringContaining('WHERE h.destination_id = $1'), ['22']);
        });

        it('should resolve destination name to ID and then return hotels', async () => {
            const mockHotels = [{ hotel_id: 1, name: 'Ocean View' }];
            query.mockResolvedValueOnce({ rowCount: 1, rows: [{ destination_id: 22 }] }); // Resolve name
            query.mockResolvedValueOnce({ rowCount: 1, rows: mockHotels }); // Get hotels

            const res = await request(app).get('/api/hotels?destination=Calangute');

            expect(res.statusCode).toEqual(200);
            expect(res.body.hotels).toEqual(mockHotels);
            expect(query).toHaveBeenCalledWith(expect.stringContaining('WHERE LOWER(name) = LOWER($1)'), ['Calangute']);
        });

        it('should return 404 if destination name is not found', async () => {
            query.mockResolvedValue({ rowCount: 0, rows: [] });

            const res = await request(app).get('/api/hotels?destination=Unknown');

            expect(res.statusCode).toEqual(404);
            expect(res.body.success).toBe(false);
        });

        it('should return 400 if no destination info is provided', async () => {
            const res = await request(app).get('/api/hotels');
            expect(res.statusCode).toEqual(400);
        });
    });

    describe('GET /api/hotels/:id', () => {
        it('should return a single hotel', async () => {
            const mockHotel = { hotel_id: 1, name: 'Ocean View' };
            query.mockResolvedValue({ rowCount: 1, rows: [mockHotel] });

            const res = await request(app).get('/api/hotels/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body.hotel).toEqual(mockHotel);
        });

        it('should return 404 if hotel not found', async () => {
            query.mockResolvedValue({ rowCount: 0, rows: [] });

            const res = await request(app).get('/api/hotels/999');

            expect(res.statusCode).toEqual(404);
        });
    });

    describe('POST /api/hotels/', () => {
        it('should add a custom hotel', async () => {
            const newHotel = { name: 'My Guest House', destination: 'Calangute', price_per_night: 1500 };
            query.mockResolvedValueOnce({ rowCount: 1, rows: [{ destination_id: 22 }] }); // Resolve dest
            query.mockResolvedValueOnce({ rowCount: 1, rows: [{ hotel_id: 100, ...newHotel }] }); // Insert

            const res = await request(app).post('/api/hotels/').send(newHotel);

            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toBe(true);
            expect(res.body.hotel.name).toEqual('My Guest House');
        });

        it('should return 400 if required fields are missing', async () => {
            const res = await request(app).post('/api/hotels/').send({ name: 'Only Name' });
            expect(res.statusCode).toEqual(400);
        });
    });

});
