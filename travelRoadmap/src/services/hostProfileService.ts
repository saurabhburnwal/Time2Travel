import { apiGet, apiPut } from './apiClient';
import { DBHostProfile } from './supabaseClient';

/**
 * Fetches the authenticated user's host profile via the Express backend.
 * The `_user_id` parameter is kept for backward-compatibility with all call
 * sites, but the backend identifies the user from the HttpOnly JWT cookie.
 *
 * Previously this called Supabase REST directly with the anon key, which was
 * rejected by RLS (HTTP 406). Routing through the backend avoids RLS entirely.
 */
export async function getHostProfile(_user_id: number): Promise<DBHostProfile | null> {
    try {
        const { success, data } = await apiGet<{ success: boolean; host: any }>('/api/hosts/me');
        if (!success || !data?.host) return null;
        return data.host as DBHostProfile;
    } catch (err) {
        console.warn('getHostProfile exception:', err);
        return null;
    }
}

export async function updateHostProfile(updates: any): Promise<{ success: boolean; error?: string }> {
    try {
        const { success, data, status } = await apiPut<{ success: boolean; message: string; host: any }>('/api/hosts/me', updates);
        if (!success) return { success: false, error: (data as any)?.message || `Error ${status}` };
        return { success: true };
    } catch (err: any) {
        console.warn('updateHostProfile exception:', err);
        return { success: false, error: err.message };
    }
}
