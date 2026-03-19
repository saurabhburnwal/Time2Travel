import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchStates, fetchDestinations } from '../services/destinationsService';
import { apiGet } from '../services/apiClient';

vi.mock('../services/apiClient', () => ({
    apiGet: vi.fn(),
}));

describe('destinationsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('fetchStates', () => {
        it('should return states on success', async () => {
            (apiGet as any).mockResolvedValueOnce({
                success: true,
                data: { states: ['Goa', 'Kerala'] }
            });

            const states = await fetchStates();
            expect(states).toEqual(['Goa', 'Kerala']);
            expect(apiGet).toHaveBeenCalledWith('/api/lookup/states');
        });

        it('should return empty array on failure', async () => {
            (apiGet as any).mockResolvedValueOnce({ success: false });
            const states = await fetchStates();
            expect(states).toEqual([]);
        });
    });

    describe('fetchDestinations', () => {
        it('should return destinations on success', async () => {
            const mockDestinations = [
                { name: 'Baga', best_season: 'Nov-Feb' },
                { name: 'Anjuna', best_season: 'Nov-Mar' }
            ];
            (apiGet as any).mockResolvedValueOnce({
                success: true,
                data: { destinations: mockDestinations }
            });

            const destinations = await fetchDestinations('Goa');
            expect(destinations).toEqual(mockDestinations);
            expect(apiGet).toHaveBeenCalledWith('/api/lookup/destinations?state=Goa');
        });

        it('should pass travelType parameter', async () => {
            (apiGet as any).mockResolvedValueOnce({
                success: true,
                data: { destinations: [] }
            });

            await fetchDestinations('Goa', 'Beach');
            expect(apiGet).toHaveBeenCalledWith('/api/lookup/destinations?state=Goa&travelType=Beach');
        });
    });
});
