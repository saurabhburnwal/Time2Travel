/**
 * hotelsService.ts
 *
 * Fetches hotels from the Supabase hotels table.
 * Schema: hotel_id, destination_id (FK), name, price_per_night, rating, latitude, longitude
 */

import { supabase, getDestinationId, AppHotel } from './supabaseClient';
import { HOTEL_IMAGES } from '../data/mockData';

/** Maps a raw DB row to the frontend-friendly AppHotel format */
function mapHotel(row: any, destinationName: string, index: number): AppHotel {
    return {
        id: row.hotel_id,
        name: row.name,
        destination: destinationName,
        price: Number(row.price_per_night) || 0,
        rating: Number(row.rating) || 0,
        lat: Number(row.latitude),
        lng: Number(row.longitude),
        image: HOTEL_IMAGES[index % HOTEL_IMAGES.length],
        amenities: [],
    };
}

/** Fetch hotels for a destination (by destination name) */
export async function getHotels(destinationName: string): Promise<AppHotel[]> {
    const destId = await getDestinationId(destinationName);
    if (!destId) {
        console.warn('[hotelsService] Destination not found:', destinationName);
        return [];
    }

    const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('destination_id', destId);

    if (error || !data) {
        console.error('[hotelsService] getHotels error:', error);
        return [];
    }

    return data.map((row: any, i: number) => mapHotel(row, destinationName, i));
}
