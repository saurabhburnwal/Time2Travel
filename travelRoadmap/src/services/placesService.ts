/**
 * placesService.ts
 *
 * Fetches tourist places from the Supabase places table.
 * Schema: place_id, destination_id (FK), travel_type_id (FK), name, latitude, longitude, entry_fee, avg_visit_time
 */

import { supabase, getDestinationId, AppPlace } from './supabaseClient';

/** Maps a raw DB row to the frontend-friendly AppPlace format */
function mapPlace(row: any, destinationName: string): AppPlace {
    return {
        id: row.place_id,
        name: row.name,
        destination: destinationName,
        entryFee: Number(row.entry_fee) || 0,
        visitTime: `${row.avg_visit_time || 60} min`,
        visitMinutes: Number(row.avg_visit_time) || 60,
        category: row.travel_type_name || 'General',
        lat: Number(row.latitude),
        lng: Number(row.longitude),
    };
}

/** Fetch places for a destination (by destination name) */
export async function getPlaces(destinationName: string): Promise<AppPlace[]> {
    const destId = await getDestinationId(destinationName);
    if (!destId) {
        console.warn('[placesService] Destination not found:', destinationName);
        return [];
    }

    // Join with travel_types to get category name
    const { data, error } = await supabase
        .from('places')
        .select('*, travel_types(name)')
        .eq('destination_id', destId);

    if (error || !data) {
        console.error('[placesService] getPlaces error:', error);
        return [];
    }

    return data.map((row: any) => mapPlace({
        ...row,
        travel_type_name: row.travel_types?.name || 'General',
    }, destinationName));
}

/** Subscribe to real-time place changes */
export function subscribeToPlaces(callback: () => void) {
    const channel = supabase
        .channel('places-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'places' }, callback)
        .subscribe();

    return () => { supabase.removeChannel(channel); };
}
