import { supabase, AppHostUnavailability } from './supabaseClient';

export async function getHostUnavailability(host_id: number, property_id?: number): Promise<AppHostUnavailability[]> {
    try {
        let query = supabase
            .from('host_unavailability')
            .select(`
                *,
                host_properties:property_id (property_name)
            `)
            .eq('host_id', host_id);

        if (property_id) {
            query = query.eq('property_id', property_id);
        }

        const { data, error } = await query;

        if (error) {
            console.warn('getHostUnavailability error:', error);
            return [];
        }

        return (data || []).map((row: any) => ({
            id: row.unavailability_id,
            propertyId: row.property_id,
            propertyName: row.host_properties?.property_name || 'Unknown Property',
            blockedDate: row.blocked_date,
            reason: row.reason || ''
        }));
    } catch (err) {
        console.warn('getHostUnavailability exception:', err);
        return [];
    }
}

export async function addUnavailableDate(data: { hostId: number, propertyId: number, blockedDate: string, reason?: string }): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('host_unavailability')
            .insert({
                host_id: data.hostId,
                property_id: data.propertyId,
                blocked_date: data.blockedDate,
                reason: data.reason || null
            });

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('addUnavailableDate exception:', err);
        return { success: false, error: err.message };
    }
}

export async function removeUnavailableDate(unavailability_id: number): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('host_unavailability')
            .delete()
            .eq('unavailability_id', unavailability_id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('removeUnavailableDate exception:', err);
        return { success: false, error: err.message };
    }
}
