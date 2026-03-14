import { supabase, AppHostBooking, DBSafetyContact } from './supabaseClient';

export async function getHostBookings(host_id: number, status_filter?: string): Promise<AppHostBooking[]> {
    try {
        let query = supabase
            .from('host_bookings')
            .select(`
                *,
                host_properties:property_id (property_name),
                users:traveler_id (name, email, phone)
            `)
            .eq('host_id', host_id)
            .order('created_at', { ascending: false });

        if (status_filter && status_filter !== 'all') {
            query = query.eq('status', status_filter);
        }

        const { data, error } = await query;

        if (error) {
            console.warn('getHostBookings error:', error);
            return [];
        }

        return (data || []).map((row: any) => ({
            id: row.booking_id,
            propertyId: row.property_id,
            propertyName: row.host_properties?.property_name || 'Unknown Property',
            travelerId: row.traveler_id,
            travelerName: row.users?.name || 'Unknown',
            travelerEmail: row.users?.email || '',
            travelerPhone: row.users?.phone || '',
            roadmapId: row.roadmap_id,
            checkInDay: row.check_in_day,
            checkOutDay: row.check_out_day,
            status: row.status,
            contributionReceived: row.contribution_received,
            hostNotes: row.host_notes || '',
            createdAt: row.created_at
        }));
    } catch (err) {
        console.warn('getHostBookings exception:', err);
        return [];
    }
}

export async function updateBookingStatus(booking_id: number, status: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('host_bookings')
            .update({ status })
            .eq('booking_id', booking_id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('updateBookingStatus exception:', err);
        return { success: false, error: err.message };
    }
}

export async function updateHostNotes(booking_id: number, notes: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('host_bookings')
            .update({ host_notes: notes })
            .eq('booking_id', booking_id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('updateHostNotes exception:', err);
        return { success: false, error: err.message };
    }
}

export async function updateContributionReceived(booking_id: number, amount: number): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('host_bookings')
            .update({ contribution_received: amount })
            .eq('booking_id', booking_id);

        if (error) return { success: false, error: error.message };
        return { success: true };
    } catch (err: any) {
        console.warn('updateContributionReceived exception:', err);
        return { success: false, error: err.message };
    }
}

export async function getGuestSafetyContact(traveler_id: number): Promise<DBSafetyContact | null> {
    try {
        const { data, error } = await supabase
            .from('safety_contacts')
            .select('*')
            .eq('user_id', traveler_id)
            .limit(1)
            .single();

        if (error) {
            console.warn('getGuestSafetyContact error:', error);
            return null;
        }

        return data as DBSafetyContact;
    } catch (err) {
        console.warn('getGuestSafetyContact exception:', err);
        return null;
    }
}
