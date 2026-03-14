import { apiGet, apiPost, apiDelete } from '../lib/api';

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
export async function getSafetyContacts(): Promise<AppSafetyContact[]> {
    const contacts = [...DEFAULT_EMERGENCY_CONTACTS];

    try {
        const { success, data } = await apiGet<{ contacts: any[] }>('/api/safety/contacts');
        if (success && data?.contacts) {
            data.contacts.forEach((row: any) => {
                contacts.push({
                    id: row.contact_id,
                    name: row.name || 'Contact',
                    number: row.phone || '',
                });
            });
        }
    } catch (err) {
        console.warn('Failed to fetch user safety contacts:', err);
    }

    return contacts;
}

export async function addSafetyContact(name: string, phone: string): Promise<{ success: boolean, contact?: AppSafetyContact }> {
    try {
        const { success, data } = await apiPost<{ contact: any }>('/api/safety/contacts', { name, phone });
        if (success && data?.contact) {
            return {
                success,
                contact: { id: data.contact.contact_id, name: data.contact.name, number: data.contact.phone }
            };
        }
    } catch (err) {
        console.warn('Failed to add safety contact:', err);
    }
    return { success: false };
}

export async function deleteSafetyContact(id: number): Promise<boolean> {
    try {
        const { success } = await apiDelete(`/api/safety/contacts/${id}`);
        return success;
    } catch (err) {
        console.warn('Failed to delete safety contact:', err);
        return false;
    }
}
