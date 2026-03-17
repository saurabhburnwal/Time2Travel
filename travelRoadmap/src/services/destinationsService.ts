import { apiGet } from './apiClient';
import { DBTravelType, DBGroupType, DBDestinationStats } from './types';

export async function fetchStates(): Promise<string[]> {
    try {
        const { success, data } = await apiGet<{ states: string[] }>('/api/lookup/states');
        if (success && data.states && data.states.length > 0) return data.states;
    } catch (err) {
        console.warn('fetchStates error:', err);
    }
    return [];
}

export async function fetchDestinations(state: string): Promise<string[]> {
    try {
        const { success, data } = await apiGet<{ destinations: Array<{ name: string } | string> }>(
            `/api/lookup/destinations?state=${encodeURIComponent(state)}`,
        );
        if (success && data.destinations && data.destinations.length > 0) {
            return data.destinations.map(d => (typeof d === 'string' ? d : d.name)).sort();
        }
    } catch (err) {
        console.warn('fetchDestinations error:', err);
    }
    return [];
}

export async function fetchTravelTypes(): Promise<DBTravelType[]> {
    try {
        const { success, data } = await apiGet<{ travelTypes: Array<{ id: number; name: string }> }>(
            '/api/lookup/travel-types',
        );
        if (success && data.travelTypes && data.travelTypes.length > 0) return data.travelTypes;
    } catch (err) {
        console.warn('fetchTravelTypes error:', err);
    }
    return [];
}

export async function fetchGroupTypes(): Promise<DBGroupType[]> {
    try {
        const { success, data } = await apiGet<{ groupTypes: Array<{ id: number; name: string }> }>(
            '/api/lookup/group-types',
        );
        if (success && data.groupTypes && data.groupTypes.length > 0) return data.groupTypes;
    } catch (err) {
        console.warn('fetchGroupTypes error:', err);
    }
    return [];
}

export async function fetchDestinationStats(): Promise<DBDestinationStats> {
    try {
        const { success, data } = await apiGet<{ stats?: DBDestinationStats; count?: number; destinations?: any[] }>(
            '/api/destinations',
        );
        if (success) {
            if (data.stats) return data.stats;
            const destCount = data.destinations?.length || 0;
            if (destCount > 0) return { destinations: destCount, hotels: 0, places: 0 };
        }
    } catch (err) {
        console.warn('fetchDestinationStats error:', err);
    }
    return { destinations: 0, hotels: 0, places: 0 };
}
