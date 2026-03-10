import { apiGet, apiPost, apiPut, apiDelete } from '../lib/api';

export interface Review {
    review_id: number;
    rating: number;
    comment: string;
    created_at: string;
    user_name?: string;
    roadmap_id?: number;
    destination?: string;
    state?: string;
}

export async function fetchReviewsByRoadmap(roadmapId: number): Promise<Review[]> {
    try {
        const { success, data } = await apiGet<{ count: number; reviews: Review[] }>(`/api/reviews?roadmap_id=${roadmapId}`);
        if (success && data?.reviews) return data.reviews;
    } catch (err) {
        console.warn('fetchReviewsByRoadmap error:', err);
    }
    return [];
}

export async function fetchUserReviews(): Promise<Review[]> {
    try {
        const { success, data } = await apiGet<{ count: number; reviews: Review[] }>('/api/reviews/me');
        if (success && data?.reviews) return data.reviews;
    } catch (err) {
        console.warn('fetchUserReviews error:', err);
    }
    return [];
}

export async function fetchRecentReviews(limit = 6): Promise<Review[]> {
    try {
        const { success, data } = await apiGet<{ reviews: Review[] }>(`/api/reviews/recent?limit=${limit}`);
        if (success && data?.reviews) return data.reviews;
    } catch (err) {
        console.warn('fetchRecentReviews error:', err);
    }
    return [];
}

export async function submitReview(roadmapId: number, rating: number, comment?: string): Promise<{ success: boolean; message?: string; review?: Review }> {
    try {
        const res = await apiPost<{ message: string; review: Review }>('/api/reviews', { roadmap_id: roadmapId, rating, comment });
        return { success: res.success, message: res.data?.message, review: res.data?.review };
    } catch (err: any) {
        console.warn('submitReview error:', err);
        return { success: false, message: err.message || 'Failed to submit review' };
    }
}

export async function updateReview(reviewId: number, rating?: number, comment?: string): Promise<{ success: boolean; message?: string; review?: Review }> {
    try {
        const res = await apiPut<{ message: string; review: Review }>(`/api/reviews/${reviewId}`, { rating, comment });
        return { success: res.success, message: res.data?.message, review: res.data?.review };
    } catch (err: any) {
        console.warn('updateReview error:', err);
        return { success: false, message: err.message || 'Failed to update review' };
    }
}

export async function deleteReview(reviewId: number): Promise<{ success: boolean; message?: string }> {
    try {
        const res = await apiDelete<{ message: string }>(`/api/reviews/${reviewId}`);
        return { success: res.success, message: res.data?.message };
    } catch (err: any) {
        console.warn('deleteReview error:', err);
        return { success: false, message: err.message || 'Failed to delete review' };
    }
}
