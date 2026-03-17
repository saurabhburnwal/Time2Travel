import { apiGet, apiPost, apiPatch } from './apiClient';
import { MyRoadmap } from './types';

export async function generateRoadmap(data: {
    destination: string;
    days: number;
    budget: number;
    travelType: string;
    groupType: string;
    accommodationPerNight: number;
}) {
    try {
        const { success, data: resp } = await apiPost<any>('/api/roadmap/generate', data);
        if (success && resp && resp.roadmaps) {
            return { success: true, roadmaps: resp.roadmaps };
        }
        return { success: false, error: resp?.message || 'Failed to generate roadmaps' };
    } catch (err) {
        return { success: false, error: 'An unexpected error occurred' };
    }
}

export async function savePreference(data: {
    destination_id?: number;
    travel_type_id?: number;
    group_type_id?: number;
    destination?: string;
    travel_type?: string;
    group_type?: string;
    days: number;
    budget: number;
}): Promise<void> {
    try {
        await apiPost('/api/preferences', data);
    } catch (err) {
        console.warn('savePreference error (non-blocking):', err);
    }
}

export async function saveRoadmapToDB(data: {
    destination: string;
    days: number;
    budget: number;
    routeStyle: string;
    stayType: string;
    selectedStay: string;
    orderedPlaces?: any[];
    totalDistanceKm?: number;
    estimatedCost?: number;
}): Promise<{ roadmapId: number; destinationId: number } | null> {
    try {
        const { success, data: resp } = await apiPost<{ roadmap?: any; roadmap_id?: number; destination_id?: number; roadmapId?: number }>(
            '/api/roadmap/save',
            {
                destination: data.destination,
                days: data.days,
                budget: data.budget,
                route_style: data.routeStyle,
                stay_type: data.stayType,
                selected_stay: data.selectedStay,
                ordered_places: data.orderedPlaces || [],
                total_distance_km: data.totalDistanceKm || 0,
                estimated_cost: data.estimatedCost || 0,
            },
        );
        if (success && resp) {
            const roadmapId = resp.roadmapId || resp.roadmap?.roadmap_id || resp.roadmap_id;
            const destinationId = resp.roadmap?.destination_id || resp.destination_id;
            if (roadmapId) return { roadmapId, destinationId: destinationId || 0 };
        }
    } catch (err) {
        console.warn('saveRoadmapToDB error (non-blocking):', err);
    }
    return null;
}

export async function emailTripPDF(data: {
    userName: string;
    email: string;
    tripData: any;
    pdfBase64: string;
}): Promise<boolean> {
    try {
        const { success } = await apiPost('/api/roadmap/email-pdf', data);
        return success;
    } catch (err) {
        console.warn('emailTripPDF error:', err);
        return false;
    }
}

export async function fetchMyRoadmaps(): Promise<MyRoadmap[]> {
    try {
        const { success, data } = await apiGet<{ roadmaps: any[] }>('/api/roadmap/my');
        if (success && data.roadmaps && data.roadmaps.length > 0) return data.roadmaps;
    } catch (err) {
        console.warn('fetchMyRoadmaps error:', err);
    }
    return [];
}

export async function fetchRoadmapById(id: number): Promise<any> {
    try {
        const { success, data } = await apiGet<{ roadmap: any }>(`/api/roadmap/${id}`);
        if (success && data.roadmap) return data.roadmap;
    } catch (err) {
        console.warn('fetchRoadmapById error:', err);
    }
    return null;
}

export async function markRoadmapComplete(roadmapId: number): Promise<boolean> {
    try {
        const { success } = await apiPatch(`/api/roadmap/${roadmapId}/complete`, {});
        return success;
    } catch (err) {
        console.warn('markRoadmapComplete error:', err);
        return false;
    }
}
export async function updateRoadmapPlaces(roadmapId: number, places: any[]): Promise<boolean> {
    try {
        const { success } = await apiPatch(`/api/roadmap/${roadmapId}/places`, { ordered_places: places });
        return success;
    } catch (err) {
        console.warn('updateRoadmapPlaces error:', err);
        return false;
    }
}
