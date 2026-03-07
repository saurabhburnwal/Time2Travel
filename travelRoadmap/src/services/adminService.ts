/**
 * adminService.ts
 *
 * Admin-specific operations: host registration management, destination stats.
 */

import { supabase, DBHostRegistration, getDestinationId } from './supabaseClient';

/** Submit a new host registration */
export async function submitHostRegistration(data: any): Promise<boolean> {
    const { error } = await supabase.from('host_registrations').insert([data]);
    if (error) console.error('[adminService] submitHostRegistration error:', error);
    return !error;
}

/** Fetch all verified hosts (with user name) */
export async function getAllHosts(): Promise<any[]> {
    const { data, error } = await supabase
        .from('host_profiles')
        .select('*, users(name), destinations(name)')
        .eq('verified', true);

    if (error || !data) {
        console.error('[adminService] getAllHosts error:', error);
        return [];
    }

    return data.map((row: any) => ({
        id: row.host_id,
        name: row.users?.name || 'Host',
        destination: row.destinations?.name || 'Unknown',
        verified: row.verified,
        maxGuests: row.max_guests,
    }));
}

/** Fetch destination stats for admin dashboard — real COUNT queries */
export async function getDestinationStats(): Promise<{ destinations: number; hotels: number; places: number }> {
    const [destRes, hotelRes, placeRes] = await Promise.all([
        supabase.from('destinations').select('destination_id', { count: 'exact', head: true }),
        supabase.from('hotels').select('hotel_id', { count: 'exact', head: true }),
        supabase.from('places').select('place_id', { count: 'exact', head: true }),
    ]);

    return {
        destinations: destRes.count || 0,
        hotels: hotelRes.count || 0,
        places: placeRes.count || 0,
    };
}

/** Fetch pending host registrations */
export async function getPendingRegistrations(): Promise<DBHostRegistration[]> {
    const { data, error } = await supabase
        .from('host_registrations')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

    if (error || !data) {
        console.error('[adminService] getPendingRegistrations error:', error);
        return [];
    }
    return data;
}

/** Approve a host registration */
export async function approveHost(id: number): Promise<boolean> {
    // 1. Update registration status
    const { error: updateError } = await supabase
        .from('host_registrations')
        .update({ status: 'approved', updated_at: new Date().toISOString() })
        .eq('id', id);

    if (updateError) {
        console.error('[adminService] approveHost update error:', updateError);
        return false;
    }

    // 2. Fetch the registration details to create a host_profiles entry
    const { data: reg, error: fetchError } = await supabase
        .from('host_registrations')
        .select('*')
        .eq('id', id)
        .single();

    if (fetchError || !reg) {
        console.error('[adminService] approveHost fetch error:', fetchError);
        return true; // status was updated, just couldn't create profile
    }

    // 3. Resolve destination name → destination_id
    const destinationId = reg.destination ? await getDestinationId(reg.destination) : null;

    // 4. Insert into host_profiles (so they appear in Active Hosts + local stays)
    if (reg.user_id && destinationId) {
        const { error: insertError } = await supabase.from('host_profiles').insert([{
            user_id: reg.user_id,
            destination_id: destinationId,
            max_guests: reg.max_guests || 1,
            provides_food: reg.provides_food || false,
            verified: true,
            is_active: true,
        }]);

        if (insertError) {
            console.error('[adminService] approveHost insert host_profiles error:', insertError);
        }
    }

    return true;
}

/** Reject a host registration */
export async function rejectHost(id: number, reason: string): Promise<boolean> {
    const { error } = await supabase
        .from('host_registrations')
        .update({ status: 'rejected', rejection_reason: reason, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) console.error('[adminService] rejectHost error:', error);
    return !error;
}
