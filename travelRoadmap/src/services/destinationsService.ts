/**
 * destinationsService.ts
 *
 * Fetches states and destinations from Supabase destinations table.
 * All queries match the actual schema: destination_id, name, state, description, best_season.
 */

import { supabase, getDestinationId, DBDestination } from './supabaseClient';

/** Fetches the list of unique states from the destinations table */
export async function getStates(): Promise<string[]> {
    const { data, error } = await supabase
        .from('destinations')
        .select('state');

    if (error || !data || data.length === 0) {
        console.error('[destinationsService] getStates error:', error);
        return [];
    }

    // Deduplicate states and filter out nulls
    const unique = [...new Set(data.map((d: any) => d.state).filter(Boolean))];
    return unique as string[];
}

/** Fetches destination names for a given state */
export async function getDestinations(state: string): Promise<string[]> {
    const { data, error } = await supabase
        .from('destinations')
        .select('name')
        .eq('state', state)
        .order('name');

    if (error || !data) {
        console.error('[destinationsService] getDestinations error:', error);
        return [];
    }
    return data.map((d: any) => d.name);
}

/** Fetches full destination record by name */
export async function getDestinationByName(name: string): Promise<DBDestination | null> {
    const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('name', name)
        .limit(1)
        .single();

    if (error || !data) return null;
    return data;
}

/** Compute the geographic center for a destination by averaging all its place coordinates */
export async function getDestinationCenter(name: string): Promise<{ lat: number; lng: number } | null> {
    const destId = await getDestinationId(name);
    if (!destId) return null;

    const { data, error } = await supabase
        .from('places')
        .select('latitude, longitude')
        .eq('destination_id', destId);

    if (error || !data || data.length === 0) return null;

    const total = data.length;
    const sum = data.reduce(
        (acc, p) => ({
            lat: acc.lat + Number(p.latitude),
            lng: acc.lng + Number(p.longitude),
        }),
        { lat: 0, lng: 0 }
    );

    return {
        lat: parseFloat((sum.lat / total).toFixed(6)),
        lng: parseFloat((sum.lng / total).toFixed(6)),
    };
}

/** Subscribe to real-time destination changes */
export function subscribeToDestinations(callback: () => void) {
    const channel = supabase
        .channel('destinations-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'destinations' }, callback)
        .subscribe();

    return () => { supabase.removeChannel(channel); };
}
