/**
 * travelTypesService.ts
 *
 * Fetches travel types and group types from Supabase.
 * travel_types schema: travel_type_id, name
 * group_types schema: group_type_id, type_name
 */

import { supabase } from './supabaseClient';

export interface AppTravelType {
    id: number;
    name: string;
}

export interface AppGroupType {
    id: number;
    name: string;
    desc?: string;
}

export async function getTravelTypes(): Promise<AppTravelType[]> {
    const { data, error } = await supabase
        .from('travel_types')
        .select('*')
        .order('travel_type_id');

    if (error || !data) {
        console.error('[travelTypesService] getTravelTypes error:', error);
        return [];
    }

    return data.map((row: any) => ({
        id: row.travel_type_id,
        name: row.name,
    }));
}

export async function getGroupTypes(): Promise<AppGroupType[]> {
    const { data, error } = await supabase
        .from('group_types')
        .select('*')
        .order('group_type_id');

    if (error || !data) {
        console.error('[travelTypesService] getGroupTypes error:', error);
        return [];
    }

    // NOTE: DB column is `type_name`, mapped to `name` for frontend
    return data.map((row: any) => ({
        id: row.group_type_id,
        name: row.type_name,
    }));
}
