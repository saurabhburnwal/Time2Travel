import { apiGet, apiPost, apiDelete } from '../lib/api';
import { DBUser, DBHost, DBDestinationStats, HostRegistrationRecord } from './types';

export async function fetchAllUsers(): Promise<DBUser[]> {
    try {
        const { success, data } = await apiGet<{ users: any[] }>('/api/users');
        if (success && data.users && data.users.length > 0) {
            return data.users.map(u => ({
                ...u,
                id: u.user_id,
                role: (u.role_name || 'Traveler').toLowerCase(),
            }));
        }
    } catch (err) {
        console.warn('fetchAllUsers error:', err);
    }
    return [];
}

export async function fetchAllHosts(): Promise<DBHost[]> {
    try {
        const { success, data } = await apiGet<{ hosts: any[] }>('/api/hosts');
        if (success && data.hosts && data.hosts.length > 0) {
            return data.hosts.map(h => ({
                ...h,
                id: h.host_id,
                name: h.host_name || h.name || 'Host',
                verified: h.verified,
                maxGuests: h.max_guests,
            }));
        }
    } catch (err) {
        console.warn('fetchAllHosts error:', err);
    }
    return [];
}

export async function fetchPendingHostRegistrations(): Promise<HostRegistrationRecord[]> {
    try {
        const { success, data } = await apiGet<{ registrations: any[] }>('/api/host-registrations/pending');
        if (success && data.registrations) {
            return data.registrations.map(r => ({
                ...r,
                amenities: Array.isArray(r.amenities) ? r.amenities : (r.amenities ? r.amenities.split(',') : []),
            }));
        }
    } catch (err) {
        console.warn('fetchPendingHostRegistrations error:', err);
    }
    return [];
}

export async function approveHostRegistration(id: number): Promise<boolean> {
    try {
        const { success } = await apiPost(`/api/host-registrations/${id}/approve`, {});
        return success;
    } catch (err) {
        console.warn('approveHostRegistration error:', err);
        return false;
    }
}

export async function rejectHostRegistration(id: number, reason: string): Promise<boolean> {
    try {
        const { success } = await apiPost(`/api/host-registrations/${id}/reject`, { reason });
        return success;
    } catch (err) {
        console.warn('rejectHostRegistration error:', err);
        return false;
    }
}

export async function deleteUser(id: number): Promise<boolean> {
    try {
        const { success } = await apiDelete(`/api/users/${id}`);
        return success;
    } catch (err) {
        console.warn('deleteUser error:', err);
        return false;
    }
}
