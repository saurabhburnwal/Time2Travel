import { apiPost } from './apiClient';

export async function saveExpenses(
    roadmapId: number,
    data: { accommodation: number; food: number; transport: number; entry_fees: number },
): Promise<void> {
    try {
        await apiPost(`/api/expenses/roadmap/${roadmapId}`, data);
    } catch (err) {
        console.warn('saveExpenses error (non-blocking):', err);
    }
}
