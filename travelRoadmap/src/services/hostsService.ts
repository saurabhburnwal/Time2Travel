/**
 * hostsService.ts
 *
 * Fetches verified local hosts from Supabase host_profiles table.
 * Schema: host_id, user_id (FK), destination_id (FK), max_guests, provides_food, verified, voluntary_min_amount, is_active
 */

import { supabase, getDestinationId } from './supabaseClient';

export interface AppHost {
    id: number;
    name: string;
    destination: string;
    verified: boolean;
    bio: string;
    rating: number;
    maxGuests: number;
    distance: string;
    foodIncluded: boolean;
    lat?: number;
    lng?: number;
}

/** Maps a raw DB row to the frontend-friendly AppHost format */
function mapHost(row: any, destinationName: string): AppHost {
    return {
        id: row.host_id,
        name: row.users?.name || 'Host',
        destination: destinationName,
        verified: row.verified || false,
        bio: `Local host in ${destinationName}`,
        rating: 4.5,
        maxGuests: row.max_guests || 1,
        distance: 'Nearby',
        foodIncluded: row.provides_food || false,
    };
}

/** Fetch verified hosts for a destination (by destination name) */
export async function getHosts(destinationName: string): Promise<AppHost[]> {
    const destId = await getDestinationId(destinationName);
    if (!destId) return [];

    const { data, error } = await supabase
        .from('host_profiles')
        .select('*, users(name)')
        .eq('destination_id', destId)
        .eq('verified', true)
        .eq('is_active', true);

    if (error || !data) {
        console.error('[hostsService] getHosts error:', error);
        return [];
    }

    return data.map((row: any) => mapHost(row, destinationName));
}
