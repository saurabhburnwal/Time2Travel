/**
 * roadmapsService.ts
 *
 * Fetches and creates roadmaps for the logged-in user with real-time updates.
 * Schema: roadmap_id, user_id (FK), destination_id (FK), roadmap_type_id (FK), total_distance, estimated_cost, created_at
 */

import { supabase, getDestinationId } from './supabaseClient';

export interface AppRoadmap {
    roadmap_id: number;
    destination: string;
    state: string;
    days: number;
    created_at: string;
    estimated_cost: number;
    total_distance: number | null;
    roadmap_type: string;
}

/** Maps a raw DB row to AppRoadmap */
function mapRoadmap(row: any): AppRoadmap {
    return {
        roadmap_id: row.roadmap_id,
        destination: row.destinations?.name || 'Unknown',
        state: row.destinations?.state || '',
        days: 0, // days would come from roadmap_places count or preferences
        created_at: row.created_at,
        estimated_cost: Number(row.estimated_cost) || 0,
        total_distance: row.total_distance ? Number(row.total_distance) : null,
        roadmap_type: row.roadmap_types?.type_name || 'Standard',
    };
}

/** Fetch all roadmaps for a specific user */
export async function getMyRoadmaps(userId: number): Promise<AppRoadmap[]> {
    const { data, error } = await supabase
        .from('roadmaps')
        .select('*, destinations(name, state), roadmap_types(type_name)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error || !data) {
        console.error('[roadmapsService] getMyRoadmaps error:', error);
        return [];
    }

    return data.map(mapRoadmap);
}

/** Create a new roadmap */
export async function createRoadmap(roadmap: {
    user_id: number;
    destination_name: string;
    roadmap_type_id?: number | null;
    total_distance?: number | null;
    estimated_cost?: number | null;
}): Promise<number | null> {
    const destId = await getDestinationId(roadmap.destination_name);
    if (!destId) {
        console.error('[roadmapsService] Destination not found:', roadmap.destination_name);
        return null;
    }

    const { data, error } = await supabase
        .from('roadmaps')
        .insert([{
            user_id: roadmap.user_id,
            destination_id: destId,
            roadmap_type_id: roadmap.roadmap_type_id || null,
            total_distance: roadmap.total_distance || null,
            estimated_cost: roadmap.estimated_cost || null,
        }])
        .select('roadmap_id')
        .single();

    if (error || !data) {
        console.error('[roadmapsService] createRoadmap error:', error);
        return null;
    }

    return data.roadmap_id;
}

/** Subscribe to real-time roadmap changes */
export function subscribeToRoadmaps(callback: (roadmaps: AppRoadmap[]) => void, userId: number) {
    const channel = supabase
        .channel('roadmaps-realtime')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'roadmaps' },
            () => { getMyRoadmaps(userId).then(callback); }
        )
        .subscribe();

    return () => { supabase.removeChannel(channel); };
}
