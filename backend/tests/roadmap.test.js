const request = require('supertest');
const app = require('../server');
const { query } = require('../config/db');

// Mock dependencies
jest.mock('../config/db', () => ({
    query: jest.fn()
}));
jest.mock('../utils/emailService', () => ({
    sendTripConfirmationEmail: jest.fn()
}));

// Mock authentication middleware to bypass JWT checks
jest.mock('../middleware/auth', () => (req, res, next) => {
    req.user = { userId: 1, role: 'user' };
    next();
});

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
    console.error.mockRestore();
    console.warn.mockRestore();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Roadmap API', () => {

    describe('POST /api/roadmaps/generate', () => {
        it('should return 400 if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/roadmap/generate')
                .send({ destination: 'Goa', budget: 1000 }); // missing 'days'

            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toMatch(/required/i);
        });

        it('should return 404 if destination is not found', async () => {
             query.mockResolvedValueOnce({ rowCount: 0 }); // Mock destination search returning empty

             const res = await request(app)
                .post('/api/roadmap/generate')
                .send({ destination: 'UnknownPlace', days: 2, budget: 5000 });

             expect(res.statusCode).toEqual(404);
             expect(res.body.message).toMatch(/not found in database/i);
        });
    });

    describe('POST /api/roadmap/save', () => {
         it('should return 400 if required fields are missing', async () => {
             const res = await request(app)
                 .post('/api/roadmap/save')
                 .set('Authorization', 'Bearer fake-token')
                 .send({ destination: 'Goa' }); // missing route_style

             expect(res.statusCode).toEqual(400);
             expect(res.body.success).toBe(false);
         });

         it('should successfully save a basic roadmap', async () => {
             // Mock destination check
             query.mockResolvedValueOnce({ rowCount: 1, rows: [{ destination_id: 1 }] });
             // Mock roadmap_type check
             query.mockResolvedValueOnce({ rowCount: 1, rows: [{ roadmap_type_id: 1 }] });
             // Mock ALTER TABLE calls
             query.mockResolvedValueOnce({});
             query.mockResolvedValueOnce({});
             // Mock Insert Roadmap
             query.mockResolvedValueOnce({ rowCount: 1, rows: [{ roadmap_id: 100 }] });
            
             const res = await request(app)
                 .post('/api/roadmap/save')
                 .set('Authorization', 'Bearer fake-token')
                 .send({
                     destination: 'Goa',
                     route_style: 'Fastest Route',
                     total_distance_km: 50,
                     estimated_cost: 2000,
                     ordered_places: []
                 });

             expect(res.statusCode).toEqual(201);
             expect(res.body.success).toBe(true);
             expect(res.body.message).toMatch(/saved/i);
             expect(res.body.roadmapId).toBe(100);
         });
    });

    describe('GET /api/roadmaps', () => {
         it('should fetch user roadmaps', async () => {
             const mockRoadmaps = [{ roadmap_id: 1, destination: 'Goa' }];
             query.mockResolvedValue({ rowCount: 1, rows: mockRoadmaps });

             const res = await request(app)
                 .get('/api/roadmap')
                 .set('Authorization', 'Bearer fake-token');

             expect(res.statusCode).toEqual(200);
             expect(res.body.roadmaps).toEqual(mockRoadmaps);
         });
    });
    
    describe('DELETE /api/roadmap/:id', () => {
        it('should delete a roadmap', async () => {
            query.mockResolvedValue({ rowCount: 1 });

            const res = await request(app)
                .delete('/api/roadmap/1')
                .set('Authorization', 'Bearer fake-token');

            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toMatch(/deleted/i);
        });

        it('should return 404 if roadmap to delete is not found', async () => {
            query.mockResolvedValue({ rowCount: 0 });

            const res = await request(app)
                .delete('/api/roadmaps/999')
                .set('Authorization', 'Bearer fake-token');

            expect(res.statusCode).toEqual(404);
        });
    });
});
