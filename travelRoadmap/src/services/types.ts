export interface Hotel {
    id: number;
    name: string;
    price: number;
    rating: number;
    distance: string;
    lat: number;
    lng: number;
    image?: string;
    amenities?: string[];
}

export interface Place {
    id: number;
    place_id?: number; // Backend uses place_id
    name: string;
    entryFee?: number;
    entry_fee?: number;
    visitTime?: string;
    visitMinutes?: number;
    avg_visit_time?: number;
    category?: string;
    travel_type?: string;
    lat: number;
    lng: number;
    latitude?: number;
    longitude?: number;
}

export interface DBTravelType {
    id: number;
    name: string;
}

export interface DBGroupType {
    id: number;
    name: string;
}

export interface DBUser {
    id?: number;
    user_id?: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    role_id?: number;
    role?: string;
    role_name?: string;
    is_active?: boolean;
    created_at?: string;
}

export interface DBHost {
    id?: number;
    host_id?: number;
    user_id?: number;
    name: string;
    destination_id?: number;
    destination_name?: string;
    maxGuests?: number;
    max_guests?: number;
    provides_food?: boolean;
    verified: boolean;
    is_active?: boolean;
}

export interface DBDestinationStats {
    destinations: number;
    hotels: number;
    places: number;
}

export interface MockUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    role: 'traveler' | 'host' | 'admin';
    avatar: string;
    joinedDate: string;
}

export interface LocalHost {
    id: number;
    name: string;
    bio: string;
    rating: number;
    maxGuests: number;
    distance: string;
    lat: number;
    lng: number;
    foodIncluded: boolean;
    verified: boolean;
    email?: string;
    phone?: string;
    suggestedContribution?: number;
}

export interface MyRoadmap {
    roadmap_id: number;
    destination: string;
    state: string;
    days: number;
    budget: number;
    route_style: string;
    roadmap_type: string;
    estimated_cost: number;
    created_at: string;
    total_distance_km: number;
    stay_type?: string;
    selected_stay?: string;
}

export interface HostRegistrationData {
    user_id?: number | null;
    name: string;
    phone?: string;
    state?: string;
    destination: string;
    address?: string;
    description?: string;
    amenities?: string[];
    property_type?: string;
    max_guests?: number;
    provides_food?: boolean;
    pricing_info?: string;
    image_urls?: string[];
}

export interface HostRegistrationRecord {
    id: number;
    user_id: number | null;
    name: string;
    phone: string;
    state: string;
    destination: string;
    address: string;
    description: string;
    amenities: string[];
    property_type: string;
    max_guests: number;
    provides_food: boolean;
    pricing_info: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}
