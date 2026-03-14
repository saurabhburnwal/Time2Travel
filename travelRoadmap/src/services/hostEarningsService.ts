import { supabase } from './supabaseClient';

export interface HostEarningsData {
    totalContributions: number;
    monthlyBreakdown: { month: string; amount: number }[];
    propertyBreakdown: { propertyId: number; propertyName: string; amount: number }[];
    avgContribution: number;
}

export async function getHostEarnings(host_id: number): Promise<HostEarningsData> {
    try {
        const { data, error } = await supabase
            .from('host_bookings')
            .select(`
                contribution_received,
                created_at,
                property_id,
                host_properties (property_name)
            `)
            .eq('host_id', host_id)
            .in('status', ['checked_in', 'completed']);

        if (error) {
            console.warn('getHostEarnings error:', error);
            return { totalContributions: 0, monthlyBreakdown: [], propertyBreakdown: [], avgContribution: 0 };
        }

        let totalContributions = 0;
        const monthlyMap: Record<string, number> = {};
        const propertyMap: Record<number, { name: string; amount: number }> = {};
        let validContributionsCount = 0;

        (data || []).forEach((row: any) => {
            const amount = Number(row.contribution_received) || 0;
            if (amount > 0) {
                totalContributions += amount;
                validContributionsCount++;

                const date = new Date(row.created_at);
                const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + amount;

                if (!propertyMap[row.property_id]) {
                    propertyMap[row.property_id] = {
                        name: row.host_properties?.property_name || 'Unknown Property',
                        amount: 0
                    };
                }
                propertyMap[row.property_id].amount += amount;
            }
        });

        const monthlyBreakdown = Object.entries(monthlyMap)
            .map(([month, amount]) => ({ month, amount }))
            .sort((a, b) => a.month.localeCompare(b.month)); // Sort chronologically

        const propertyBreakdown = Object.entries(propertyMap)
            .map(([propertyId, info]) => ({ propertyId: Number(propertyId), propertyName: info.name, amount: info.amount }))
            .sort((a, b) => b.amount - a.amount); // Sort by highest earning

        const avgContribution = validContributionsCount > 0 ? (totalContributions / validContributionsCount) : 0;

        return {
            totalContributions,
            monthlyBreakdown,
            propertyBreakdown,
            avgContribution
        };
    } catch (err) {
        console.warn('getHostEarnings exception:', err);
        return { totalContributions: 0, monthlyBreakdown: [], propertyBreakdown: [], avgContribution: 0 };
    }
}
