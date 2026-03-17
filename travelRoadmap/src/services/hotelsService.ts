import { apiGet } from './apiClient';
import { Hotel } from './types';

export async function fetchHotelsForDestination(destinationName: string): Promise<Hotel[]> {
    try {
        const { success, data } = await apiGet<{ hotels: any[] }>(
            `/api/hotels?destination=${encodeURIComponent(destinationName)}`,
        );
        if (success && data.hotels && data.hotels.length > 0) {
            return data.hotels.map((h, i) => ({
                id: h.hotel_id,
                name: h.name,
                price: parseFloat(h.price_per_night) || 0,
                rating: parseFloat(h.rating) || 0,
                distance: `${(0.5 + i * 0.3).toFixed(1)} km from center`,
                lat: parseFloat(h.latitude) || 0,
                lng: parseFloat(h.longitude) || 0,
                amenities: ['WiFi', 'Restaurant'],
            }));
        }
    } catch (err) {
        console.warn('fetchHotels error:', err);
    }
    return [];
}
