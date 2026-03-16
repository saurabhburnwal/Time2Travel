import { apiGet, apiPost, apiDelete } from '../lib/api';
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
                    phone: h.phone || '',
                    email: h.email || '',
                    suggestedContribution: h.voluntary_min_amount || 0,
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

export async function getMyHostRegistration(): Promise<{ success: boolean; registration?: any }> {
    try {
        const { success, data } = await apiGet<{ registration: any }>('/api/host-registrations/my');
        return { success, registration: data?.registration };
    } catch (err) {
        console.warn('getMyHostRegistration error:', err);
        return { success: false };
    }
}

export async function getMyHostRegistrations(): Promise<{ success: boolean; registrations: any[] }> {
    try {
        const { success, data } = await apiGet<{ registrations: any[] }>('/api/host-registrations/my-all');
        if (success) return { success: true, registrations: data.registrations || [] };
        return { success: false, registrations: [] };
    } catch (err) {
        console.warn('getMyHostRegistrations error:', err);
        return { success: false, registrations: [] };
    }
}

export async function deleteHostAccount(): Promise<boolean> {
    try {
        const { success } = await apiDelete('/api/hosts/me');
        return success;
    } catch (err) {
        console.warn('deleteHostAccount error:', err);
        return false;
    }
}
