import { supabase, DBHostProperty, AppHostProperty } from './supabaseClient';

export async function getHostProperties(host_id: number): Promise<AppHostProperty[]> {
    try {
        const { data, error } = await supabase
            .from('host_properties')
            .select(`
                *,
                destinations:destination_id (
                    name
                )
            `)
            .eq('host_id', host_id)
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('getHostProperties error:', error);
            return [];
        }

        return (data || []).map((row: any) => ({
            id: row.property_id,
            name: row.property_name,
            destinationId: row.destination_id,
            destinationName: row.destinations?.name || 'Unknown',
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
        const { data, error } = await supabase
            .from('host_properties')
            .insert({
                host_id: propertyData.hostId,
                destination_id: propertyData.destinationId,
                property_name: propertyData.name,
                address: propertyData.address,
                max_guests: propertyData.maxGuests,
                provides_food: propertyData.providesFood,
                voluntary_min_amount: propertyData.voluntaryMinAmount || null,
                is_active: propertyData.isActive ?? true
            })
            .select(`
                *,
                destinations:destination_id (name)
            `)
            .single();

        if (error) return { success: false, error: error.message };

        return {
            success: true,
            property: {
                id: data.property_id,
                name: data.property_name,
                destinationId: data.destination_id,
                destinationName: data.destinations?.name || 'Unknown',
                address: data.address || '',
                maxGuests: data.max_guests,
                providesFood: data.provides_food,
                voluntaryMinAmount: data.voluntary_min_amount,
                isActive: data.is_active
            }
        };
    } catch (err: any) {
        console.warn('addHostProperty exception:', err);
        return { success: false, error: err.message };
    }
}

export async function updateHostProperty(property_id: number, updates: any): Promise<{ success: boolean; error?: string }> {
    try {
        const dbUpdates: any = {};
        if (updates.name !== undefined) dbUpdates.property_name = updates.name;
        if (updates.destinationId !== undefined) dbUpdates.destination_id = updates.destinationId;
        if (updates.address !== undefined) dbUpdates.address = updates.address;
        if (updates.maxGuests !== undefined) dbUpdates.max_guests = updates.maxGuests;
        if (updates.providesFood !== undefined) dbUpdates.provides_food = updates.providesFood;
        if (updates.voluntaryMinAmount !== undefined) dbUpdates.voluntary_min_amount = updates.voluntaryMinAmount;

        const { error } = await supabase
            .from('host_properties')
            .update(dbUpdates)
            .eq('property_id', property_id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('updateHostProperty exception:', err);
        return { success: false, error: err.message };
    }
}

export async function togglePropertyStatus(property_id: number, is_active: boolean): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('host_properties')
            .update({ is_active })
            .eq('property_id', property_id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('togglePropertyStatus exception:', err);
        return { success: false, error: err.message };
    }
}

export async function deleteHostProperty(property_id: number): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('host_properties')
            .delete()
            .eq('property_id', property_id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('deleteHostProperty exception:', err);
        return { success: false, error: err.message };
    }
}
