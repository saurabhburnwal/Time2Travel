const { haversineDistance, totalRouteDistance, generateAllRoadmaps } = require('../../utils/routeOptimizer');

describe('Route Optimizer Utility', () => {

    describe('haversineDistance', () => {
        it('should calculate distance correctly between two points', () => {
            // Mumbai to Pune is approx 120km linear, ~150km road
            const lat1 = 19.0760, lng1 = 72.8777; // Mumbai
            const lat2 = 18.5204, lng2 = 73.8567; // Pune
            
            const dist = haversineDistance(lat1, lng1, lat2, lng2);
            // Expected direct is ~117km. With 1.25 multiplier ~146km.
            expect(dist).toBeGreaterThan(140);
            expect(dist).toBeLessThan(160);
        });

        it('should return 0 for same point', () => {
            expect(haversineDistance(15, 73, 15, 73)).toBe(0);
        });
    });

    describe('totalRouteDistance', () => {
        it('should sum distances in a route', () => {
            const places = [
                { latitude: 15.5485, longitude: 73.7625 }, // Calangute
                { latitude: 15.5008, longitude: 73.9115 }, // Old Goa (~20km)
                { latitude: 15.2704, longitude: 73.9591 }  // Margao (~30km)
            ];
            const total = totalRouteDistance(places);
            expect(total).toBeGreaterThan(45);
            expect(total).toBeLessThan(65);
        });

        it('should return 0 for single place', () => {
            expect(totalRouteDistance([{ latitude: 15, longitude: 73 }])).toBe(0);
        });
    });

    describe('generateAllRoadmaps', () => {
        const mockPlaces = [
            { place_id: 1, name: 'Place A', latitude: 15.5, longitude: 73.7, entry_fee: 0, travel_type: 'Nature' },
            { place_id: 2, name: 'Place B', latitude: 15.6, longitude: 73.8, entry_fee: 100, travel_type: 'Beach' },
            { place_id: 3, name: 'Place C', latitude: 15.55, longitude: 73.75, entry_fee: 0, travel_type: 'Nature' }
        ];

        it('should return nulls for empty places', () => {
            expect(generateAllRoadmaps([])).toEqual({ fastest: null, budget: null });
        });

        it('should generate fastest and budget roadmaps', () => {
            const roadmaps = generateAllRoadmaps(mockPlaces, 2);
            expect(roadmaps.fastest.style).toBe('fastest');
            expect(roadmaps.budget.style).toBe('budget');
            expect(roadmaps.fastest.orderedPlaces.length).toBeGreaterThan(0);
        });

        it('should prioritize preferredType in NNA', () => {
            // Small distance difference but Place B is farther. 
            // If Nature is preferred, it should visit A and C first.
            const roadmaps = generateAllRoadmaps(mockPlaces, 3, 'Nature');
            const firstPlace = roadmaps.fastest.orderedPlaces[0];
            expect(firstPlace.travel_type).toBe('Nature');
        });

        it('should include more free places in budget route', () => {
            const roadmaps = generateAllRoadmaps(mockPlaces, 1);
            // Budget route should have Place A or C (free) before Place B (100)
            const budgetPlaces = roadmaps.budget.orderedPlaces;
            expect(parseFloat(budgetPlaces[0].entry_fee)).toBeLessThanOrEqual(50);
        });
    });
});
