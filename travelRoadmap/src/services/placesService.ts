import { apiGet } from './apiClient';
import { Place } from './types';

export async function fetchAllPlacesForDestination(destinationName: string): Promise<Place[]> {
    try {
        const { success, data } = await apiGet<{ places: Place[] }>(
            `/api/places/by-destination/${encodeURIComponent(destinationName)}`
        );
        if (success && data.places) return data.places;
    } catch (err) {
        console.warn('fetchAllPlacesForDestination error:', err);
    }
    return [];
}
