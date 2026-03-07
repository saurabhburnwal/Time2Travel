/**
 * expensesService.ts
 *
 * CRUD operations and real-time subscriptions for expense tracking.
 * Schema: expense_id, roadmap_id (FK), accommodation, food, transport, entry_fees, currency, last_updated
 */

import { supabase, DBExpense } from './supabaseClient';

/** Fetch expenses for a roadmap */
export async function getExpenses(roadmapId: number): Promise<DBExpense | null> {
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('roadmap_id', roadmapId)
        .limit(1)
        .single();

    if (error || !data) {
        console.error('[expensesService] getExpenses error:', error);
        return null;
    }
    return data;
}

/** Create or update expenses for a roadmap */
export async function upsertExpense(expense: {
    roadmap_id: number;
    accommodation?: number;
    food?: number;
    transport?: number;
    entry_fees?: number;
    currency?: string;
}): Promise<boolean> {
    const { error } = await supabase
        .from('expenses')
        .upsert([{
            roadmap_id: expense.roadmap_id,
            accommodation: expense.accommodation || 0,
            food: expense.food || 0,
            transport: expense.transport || 0,
            entry_fees: expense.entry_fees || 0,
            currency: expense.currency || 'INR',
            last_updated: new Date().toISOString(),
        }], { onConflict: 'roadmap_id' });

    if (error) console.error('[expensesService] upsertExpense error:', error);
    return !error;
}

/** Subscribe to real-time expense changes */
export function subscribeToExpenses(callback: () => void) {
    const channel = supabase
        .channel('expenses-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses' }, callback)
        .subscribe();

    return () => { supabase.removeChannel(channel); };
}
