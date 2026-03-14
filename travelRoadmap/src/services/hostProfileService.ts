import { supabase, DBHostProfile } from './supabaseClient';

export async function getHostProfile(user_id: number): Promise<DBHostProfile | null> {
    try {
        const { data, error } = await supabase
            .from('host_profiles')
            .select('*, destinations:destination_id(name)')
            .eq('user_id', user_id)
            .single();

        if (error) {
            console.warn('getHostProfile error:', error);
            return null;
        }

        return {
            ...data,
            destination_name: data.destinations?.name
        } as DBHostProfile;
    } catch (err) {
        console.warn('getHostProfile exception:', err);
        return null;
    }
}
