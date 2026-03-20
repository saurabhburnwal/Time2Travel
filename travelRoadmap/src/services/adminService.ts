import { apiGet, apiPost, apiDelete, apiPut, apiPatch } from './apiClient';
import { DBUser, DBHost, HostRegistrationRecord } from './types';

// --- Specific Helper Functions (Legacy/Specific logic) ---

export async function fetchAllUsers(): Promise<DBUser[]> {
    try {
        const data = await fetchTableData('users');
        return data.map(u => ({
            ...u,
            id: u.user_id,
            role: (u.role_name || u.role || 'Traveler').toLowerCase(),
        }));
    } catch (err) {
        console.warn('fetchAllUsers error:', err);
    }
    return [];
}

export async function fetchAllHosts(): Promise<DBHost[]> {
    try {
        const data = await fetchTableData('host_profiles');
        return data.map(h => ({
            ...h,
            id: h.host_id,
            name: h.name || 'Host',
            verified: h.verified,
            maxGuests: h.max_guests,
        }));
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

// --- Generic Table Management ---
export async function fetchTableData(tableName: string): Promise<any[]> {
    try {
        const { success, data, status } = await apiGet<{ data: any[] }>(`/api/admin/tables/${tableName}`);
        if (!success) {
            console.warn(`fetchTableData (${tableName}) failed: status=${status}`, data);
            return [];
        }
        return data.data || [];
    } catch (err) {
        console.warn(`fetchTableData (${tableName}) error:`, err);
        return [];
    }
}

export async function addTableRow(tableName: string, rowData: any): Promise<boolean> {
    try {
        const { success } = await apiPost(`/api/admin/tables/${tableName}`, rowData);
        return success;
    } catch (err) {
        console.warn(`addTableRow (${tableName}) error:`, err);
        return false;
    }
}

export async function updateTableRow(tableName: string, id: any, rowData: any): Promise<boolean> {
    try {
        const { success } = await apiPut(`/api/admin/tables/${tableName}/${id}`, rowData);
        return success;
    } catch (err) {
        console.warn(`updateTableRow (${tableName}) error:`, err);
        return false;
    }
}

export async function deleteTableRow(tableName: string, id: any): Promise<boolean> {
    try {
        const { success } = await apiDelete(`/api/admin/tables/${tableName}/${id}`);
        return success;
    } catch (err) {
        console.warn(`deleteTableRow (${tableName}) error:`, err);
        return false;
    }
}

export async function updateAdminUserStatus(userId: number, isActive: boolean): Promise<boolean> {
    try {
        const { success } = await apiPatch(`/api/users/${userId}/status`, { is_active: isActive });
        return success;
    } catch (err) {
        console.warn('updateAdminUserStatus error:', err);
        return false;
    }
}

export async function updateAdminHostStatus(hostId: number, isActive: boolean): Promise<boolean> {
    try {
        const { success } = await apiPatch(`/api/hosts/${hostId}/status`, { is_active: isActive });
        return success;
    } catch (err) {
        console.warn('updateAdminHostStatus error:', err);
        return false;
    }
}
