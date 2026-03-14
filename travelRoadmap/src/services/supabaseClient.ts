/**
 * supabaseClient.ts
 *
 * Shared Supabase client instance, all TypeScript interfaces matching
 * the ACTUAL database schema, and helper utilities.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env file.\n' +
        'Create a .env file in the project root with your Supabase credentials.'
    );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// ======================== DB TYPES (match actual schema) ========================

export interface DBDestination {
    destination_id: number;
    name: string;
    state: string | null;
    description: string | null;
    best_season: string | null;
}

export interface DBPlace {
    place_id: number;
    destination_id: number;
    travel_type_id: number | null;
    name: string;
    latitude: number;
    longitude: number;
    entry_fee: number;
    avg_visit_time: number; // minutes
}

export interface DBHotel {
    hotel_id: number;
    destination_id: number;
    name: string;
    price_per_night: number;
    rating: number;
    latitude: number;
    longitude: number;
}

export interface DBUser {
    user_id: number;
    name: string;
    email: string;
    password_hash: string;
    phone: string | null;
    gender: string | null;
    role_id: number | null;
    is_active: boolean;
    created_at: string;
    // Joined field
    role_name?: string;
}

export interface DBRole {
    role_id: number;
    role_name: string;
}

export interface DBReview {
    review_id: number;
    user_id: number;
    roadmap_id: number | null;
    rating: number;
    comment: string;
    created_at: string;
    // Joined fields (from users table)
    user_name?: string;
}

export interface DBHostProfile {
    host_id: number;
    user_id: number;
    destination_id: number;
    max_guests: number;
    provides_food: boolean;
    verified: boolean;
    voluntary_min_amount: number | null;
    is_active: boolean;
    // Joined fields
    user_name?: string;
    destination_name?: string;
}

export interface DBHostRegistration {
    id: number;
    user_id: number | null;
    name: string;
    phone: string | null;
    state: string | null;
    destination: string | null;
    address: string | null;
    description: string | null;
    amenities: string[];
    property_type: string | null;
    max_guests: number;
    provides_food: boolean;
    pricing_info: string | null;
    image_urls: string[];
    status: string;
    rejection_reason: string | null;
    created_at: string;
    updated_at: string;
}

export interface DBRoadmap {
    roadmap_id: number;
    user_id: number;
    destination_id: number;
    roadmap_type_id: number | null;
    total_distance: number | null;
    estimated_cost: number | null;
    created_at: string;
    // Joined fields
    destination_name?: string;
    destination_state?: string;
    roadmap_type_name?: string;
}

export interface DBExpense {
    expense_id: number;
    roadmap_id: number;
    accommodation: number;
    food: number;
    transport: number;
    entry_fees: number;
    currency: string;
    last_updated: string;
}

export interface DBTravelType {
    travel_type_id: number;
    name: string;
}

export interface DBGroupType {
    group_type_id: number;
    type_name: string;
}

export interface DBSafetyContact {
    contact_id: number;
    user_id: number;
    name: string;
    phone: string;
}

export interface DBRoadmapPlace {
    id: number;
    roadmap_id: number;
    place_id: number;
    day_number: number;
    visit_order: number;
    estimated_start_time: string | null;
    estimated_end_time: string | null;
}

export interface DBRoadmapAccommodation {
    accommodation_id: number;
    roadmap_id: number;
    hotel_id: number;
    day_number: number;
    check_in_time: string | null;
}

export interface DBTravelPreference {
    preference_id: number;
    user_id: number;
    travel_type_id: number;
    days: number;
    budget: number;
    group_type_id: number;
}

export interface DBHostProperty {
    property_id: number;
    host_id: number;
    destination_id: number;
    property_name: string;
    address: string | null;
    max_guests: number;
    provides_food: boolean;
    voluntary_min_amount: number | null;
    is_active: boolean;
    created_at: string;
    // Joined fields
    destination_name?: string;
}

export interface DBHostBooking {
    booking_id: number;
    property_id: number;
    host_id: number;
    traveler_id: number;
    roadmap_id: number | null;
    check_in_day: number;
    check_out_day: number;
    status: string;
    contribution_received: number | null;
    host_notes: string | null;
    created_at: string;
    // Joined fields
    property_name?: string;
    traveler_name?: string;
    traveler_email?: string;
    traveler_phone?: string;
    group_type_name?: string;
}

export interface DBHostUnavailability {
    unavailability_id: number;
    host_id: number;
    property_id: number;
    blocked_date: string;
    reason: string | null;
}

// ======================== HELPERS ========================

/** Cache for destination name → id lookups (avoids repeated queries) */
const destinationIdCache: Record<string, number> = {};

/** Resolve a destination name (e.g. "Munnar") to its destination_id */
export async function getDestinationId(name: string): Promise<number | null> {
    if (destinationIdCache[name]) return destinationIdCache[name];

    const { data, error } = await supabase
        .from('destinations')
        .select('destination_id')
        .eq('name', name)
        .limit(1)
        .single();

    if (error || !data) return null;
    destinationIdCache[name] = data.destination_id;
    return data.destination_id;
}

// ======================== FRONTEND-FRIENDLY MAPPED TYPES ========================
// These are what components consume (camelCase, flattened)

export interface AppPlace {
    id: number;
    name: string;
    destination: string;
    entryFee: number;
    visitTime: string;
    visitMinutes: number;
    category: string;
    lat: number;
    lng: number;
}

export interface AppHotel {
    id: number;
    name: string;
    destination: string;
    price: number;
    rating: number;
    lat: number;
    lng: number;
    image?: string;
    amenities?: string[];
}

export interface AppReview {
    id: number;
    userName: string;
    avatar: string;
    destination: string;
    rating: number;
    comment: string;
    date: string;
    user_id?: number;
}

export interface AppUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    joinedDate: string;
    gender?: string;
}

export interface AppHostProperty {
    id: number;
    name: string;
    destinationId: number;
    destinationName: string;
    address: string;
    maxGuests: number;
    providesFood: boolean;
    voluntaryMinAmount: number | null;
    isActive: boolean;
}

export interface AppHostBooking {
    id: number;
    propertyId: number;
    propertyName: string;
    travelerId: number;
    travelerName: string;
    travelerEmail: string;
    travelerPhone: string;
    groupTypeName?: string;
    roadmapId: number | null;
    checkInDay: number;
    checkOutDay: number;
    status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
    contributionReceived: number | null;
    hostNotes: string;
    createdAt: string;
}

export interface AppHostUnavailability {
    id: number;
    propertyId: number;
    propertyName?: string;
    blockedDate: string;
    reason: string;
}
