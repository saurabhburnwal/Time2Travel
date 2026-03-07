/**
 * reviewsService.ts
 *
 * Handles review CRUD and real-time subscriptions.
 * Schema: review_id, user_id (FK), roadmap_id (FK), rating, comment, created_at
 */

import { supabase, AppReview } from './supabaseClient';

/** Maps a raw DB row (with joined user data) to AppReview */
function mapReview(row: any): AppReview {
    const userName = row.users?.name || 'Anonymous';
    return {
        id: row.review_id,
        userName,
        avatar: userName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2),
        destination: row.roadmaps?.destinations?.name || 'General',
        rating: row.rating,
        comment: row.comment || '',
        date: row.created_at
            ? new Date(row.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            : 'Recent',
        user_id: row.user_id,
    };
}

/** Fetch all reviews, with user names and destination info via JOINs */
export async function getReviews(): Promise<AppReview[]> {
    const { data, error } = await supabase
        .from('reviews')
        .select('*, users(name), roadmaps(destinations(name))')
        .order('created_at', { ascending: false });

    if (error || !data) {
        console.error('[reviewsService] getReviews error:', error);
        return [];
    }

    return data.map(mapReview);
}

/** Fetch reviews submitted by a specific user */
export async function getMyReviews(userId: number): Promise<AppReview[]> {
    const { data, error } = await supabase
        .from('reviews')
        .select('*, users(name), roadmaps(destinations(name))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error || !data) {
        console.error('[reviewsService] getMyReviews error:', error);
        return [];
    }

    return data.map(mapReview);
}

/** Submit a new review */
export async function createReview(review: {
    user_id: number;
    roadmap_id?: number | null;
    rating: number;
    comment: string;
}): Promise<boolean> {
    const { error } = await supabase.from('reviews').insert([{
        user_id: review.user_id,
        roadmap_id: review.roadmap_id || null,
        rating: review.rating,
        comment: review.comment,
    }]);

    if (error) console.error('[reviewsService] createReview error:', error);
    return !error;
}

/** Subscribe to real-time review changes */
export function subscribeToReviews(callback: (reviews: AppReview[]) => void) {
    const channel = supabase
        .channel('reviews-realtime')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'reviews' },
            () => { getReviews().then(callback); }
        )
        .subscribe();

    return () => { supabase.removeChannel(channel); };
}
