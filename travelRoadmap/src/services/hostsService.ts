import { apiGet, apiPost } from '../lib/api';
import { LocalHost, HostRegistrationData } from './types';

export async function fetchHostsForDestination(destinationName: string): Promise<LocalHost[]> {
    try {
        const { success, data } = await apiGet<{ hosts: any[] }>(
            `/api/hosts?destination=${encodeURIComponent(destinationName)}`,
        );
        if (success && data.hosts && data.hosts.length > 0) {
            return data.hosts
                .filter((h: any) => h.is_active)
                .map((h: any, i: number) => ({
                    id: h.host_id,
                    name: h.host_name || h.name || 'Local Host',
                    bio: `Verified local host in ${h.destination || destinationName}. ${h.provides_food ? 'Meals included.' : ''}`,
                    rating: 4.5,
                    maxGuests: h.max_guests || 1,
                    distance: `${(0.5 + i * 0.4).toFixed(1)} km from center`,
                    lat: 0,
                    lng: 0,
                    foodIncluded: !!h.provides_food,
                    verified: !!h.verified,
                }));
        }
    } catch (err) {
        console.warn('fetchHosts error:', err);
    }
    return [];
}

export async function submitHostRegistration(data: HostRegistrationData): Promise<boolean> {
    try {
        const { success } = await apiPost('/api/host-registrations', data);
        return success;
    } catch (err) {
        console.warn('submitHostRegistration error:', err);
        return false;
    }
}

