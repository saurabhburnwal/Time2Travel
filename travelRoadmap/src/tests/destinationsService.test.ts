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
        it('should return sorted destinations on success', async () => {
            (apiGet as any).mockResolvedValueOnce({
                success: true,
                data: { destinations: [{ name: 'Baga' }, { name: 'Anjuna' }] }
            });

            const destinations = await fetchDestinations('Goa');
            expect(destinations).toEqual(['Anjuna', 'Baga']);
            expect(apiGet).toHaveBeenCalledWith('/api/lookup/destinations?state=Goa');
        });
    });
});
