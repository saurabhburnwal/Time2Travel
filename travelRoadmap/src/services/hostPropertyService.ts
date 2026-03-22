import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { AppHostProperty } from './supabaseClient';

export async function getHostProperties(host_id: number): Promise<AppHostProperty[]> {
    try {
        const { success, data } = await apiGet<{ properties: any[] }>('/api/hosts/me/properties');
        
        if (!success || !data?.properties) {
            return [];
        }

        return data.properties.map((row: any) => ({
            id: row.property_id,
            name: row.property_name,
            destinationId: row.destination_id,
            destinationName: row.destination_name || 'Unknown',
            address: row.address || '',
            maxGuests: row.max_guests,
            providesFood: row.provides_food,
            voluntaryMinAmount: row.voluntary_min_amount,
            isActive: row.is_active
        }));
    } catch (err) {
        console.warn('getHostProperties exception:', err);
        return [];
    }
}

export async function addHostProperty(propertyData: any): Promise<{ success: boolean; property?: AppHostProperty; error?: string }> {
    try {
        const { success, data, status } = await apiPost<{ property: any }>('/api/hosts/me/properties', propertyData);

        if (!success) return { success: false, error: (data as any)?.message || `Error ${status}` };

        const row = data.property;
        return {
            success: true,
            property: {
                id: row.property_id,
                name: row.property_name,
                destinationId: row.destination_id,
                destinationName: row.destination_name || 'Unknown', 
                address: row.address || '',
                maxGuests: row.max_guests,
                providesFood: row.provides_food,
                voluntaryMinAmount: row.voluntary_min_amount,
                isActive: row.is_active
            }
        };
    } catch (err: any) {
        console.warn('addHostProperty exception:', err);
        return { success: false, error: err.message };
    }
}

export async function updateHostProperty(property_id: number, updates: any): Promise<{ success: boolean; error?: string }> {
    try {
        const { success, data, status } = await apiPut<{ property: any }>(`/api/hosts/me/properties/${property_id}`, updates);

        if (!success) return { success: false, error: (data as any)?.message || `Error ${status}` };
        return { success: true };
    } catch (err: any) {
        console.warn('updateHostProperty exception:', err);
        return { success: false, error: err.message };
    }
}

export async function togglePropertyStatus(property_id: number, is_active: boolean): Promise<{ success: boolean; error?: string }> {
    try {
        // We can reuse updateHostProperty or hit the status PATCH if we implemented it
        const { success, data, status } = await apiPut<{ property: any }>(`/api/hosts/me/properties/${property_id}`, { isActive: is_active });

        if (!success) return { success: false, error: (data as any)?.message || `Error ${status}` };
        return { success: true };
    } catch (err: any) {
        console.warn('togglePropertyStatus exception:', err);
        return { success: false, error: err.message };
    }
}

export async function deleteHostProperty(property_id: number): Promise<{ success: boolean; error?: string }> {
    try {
        const { success, data, status } = await apiDelete<{ message?: string }>(`/api/hosts/me/properties/${property_id}`);

        if (!success) return { success: false, error: (data as any)?.message || `Error ${status}` };
        return { success: true };
    } catch (err: any) {
        console.warn('deleteHostProperty exception:', err);
        return { success: false, error: err.message };
    }
}
