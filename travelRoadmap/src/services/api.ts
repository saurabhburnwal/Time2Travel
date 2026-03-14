import { apiGet, apiPut } from '../lib/api';

export async function getProfile() {
    const { success, data } = await apiGet<{ success: boolean; user: any }>('/api/users/me');
    if (!success || !data?.success) {
        throw new Error('Failed to fetch profile');
    }
    return data.user;
}

export async function updateProfile(payload: any) {
    const { success, data } = await apiPut<{ success: boolean; user: any; message?: string }>('/api/users/me', payload);
    if (!success || !data?.success) {
        throw new Error(data?.message || 'Failed to update profile');
    }
    return data.user;
}
