import { apiGet } from '../lib/api';

export interface HostReviewData {
    id: number;
    reviewer_name: string;
    cleanliness_rating: number;
    communication_rating: number;
    hospitality_rating: number;
    overall_rating: number;
    payment_amount: number;
    notes: string;
    created_at: string;
    destination_name?: string;
}

export async function getHostReviews(hostName: string): Promise<HostReviewData[]> {
    try {
        const { success, data } = await apiGet<{ reviews: any[] }>(`/api/reviews/host?host_name=${encodeURIComponent(hostName)}`);
        if (success && data?.reviews) {
            return data.reviews.map((r: any) => ({
                id: r.id,
                reviewer_name: r.reviewer_name || 'Anonymous',
                cleanliness_rating: r.cleanliness_rating,
                communication_rating: r.communication_rating,
                hospitality_rating: r.hospitality_rating,
                overall_rating: r.overall_rating,
                payment_amount: parseFloat(r.payment_amount) || 0,
                notes: r.notes,
                created_at: r.created_at,
                destination_name: r.destination_name
            }));
        }
    } catch (err) {
        console.warn('getHostReviews error:', err);
    }
    return [];
}
