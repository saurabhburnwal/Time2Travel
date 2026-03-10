/**
 * safetyService.ts
 *
 * Fetches emergency/safety contacts from Supabase.
 * Schema: contact_id, user_id (FK), name, phone
 */

import { supabase } from './supabaseClient';

export interface AppSafetyContact {
    id: number;
    name: string;
    number: string;
}

// Emergency contacts that are always available (not user-specific)
const DEFAULT_EMERGENCY_CONTACTS: AppSafetyContact[] = [
    { id: 0, name: 'Police', number: '100' },
    { id: 0, name: 'Ambulance', number: '108' },
    { id: 0, name: 'Fire', number: '101' },
    { id: 0, name: 'Women Helpline', number: '1091' },
    { id: 0, name: 'Tourist Helpline', number: '1363' },
    { id: 0, name: 'Disaster Management', number: '1078' },
];

/** Fetch safety contacts — merges default emergency numbers with user-specific contacts */
export async function getSafetyContacts(userId?: number): Promise<AppSafetyContact[]> {
    const contacts = [...DEFAULT_EMERGENCY_CONTACTS];

    if (userId) {
        const { data, error } = await supabase
            .from('safety_contacts')
            .select('*')
            .eq('user_id', userId);

        if (!error && data) {
            data.forEach((row: any) => {
                contacts.push({
                    id: row.contact_id,
                    name: row.name || 'Contact',
                    number: row.phone || '',
                });
            });
        }
    }

    return contacts;
}
