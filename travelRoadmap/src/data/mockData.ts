/**
 * mockData.ts
 * 
 * REFACTORED: Contains ONLY UI/design constants and type interfaces.
 * All dynamic data now comes from src/services/*.ts via Supabase.
 * 
 * Kept here:
 *   - MOCK_REVIEWS (fallback when DB has no reviews)
 *   - TRAVEL_QUOTES, HERO_IMAGES, HERO_VIDEO_URL (landing page design)
 *   - SOLO_SAFETY_TIPS (static safety advice)
 *   - Type interfaces (Place, Hotel, Review, MockUser, etc.)
 */

// ===== TYPE INTERFACES (shared across app) =====

export interface Place {
    id: number;
    name: string;
    entryFee: number;
    visitTime: string;
    visitMinutes: number;
    category: string;
    lat: number;
    lng: number;
    destination?: string;
}

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
    destination?: string;
}

export interface Review {
    id: number;
    userName: string;
    avatar: string;
    destination: string;
    rating: number;
    comment: string;
    date: string;
}

export interface MockUser {
    id: number | string;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    joinedDate: string;
    gender?: string;
}

// ===== MOCK REVIEWS (fallback for empty DB) =====
export const MOCK_REVIEWS: Review[] = [
    { id: 1, userName: 'Aisha Patel', avatar: 'AP', destination: 'Munnar', rating: 5, comment: 'The roadmap saved us so much time! We covered 8 spots in 3 days effortlessly. The route optimization was incredible.', date: '2 weeks ago' },
    { id: 2, userName: 'Rajesh Kumar', avatar: 'RK', destination: 'Hampi', rating: 4, comment: 'Amazing budget planning! Stayed within our Rs.5000 budget and saw all the major ruins. Highly recommend for heritage lovers.', date: '1 month ago' },
    { id: 3, userName: 'Sneha Reddy', avatar: 'SR', destination: 'Goa', rating: 5, comment: 'Best travel app for beach destinations! The local host feature was a game changer. Got authentic Goan food included.', date: '3 weeks ago' },
    { id: 4, userName: 'Vikram Singh', avatar: 'VS', destination: 'Ooty', rating: 4, comment: 'Solo trip made easy. The safety contacts feature made me feel secure throughout. Great itinerary suggestions!', date: '2 months ago' },
    { id: 5, userName: 'Meera Nair', avatar: 'MN', destination: 'Wayanad', rating: 5, comment: 'Planned a family trip for 5 people. The expense tracker was spot on. Kids loved every activity on the itinerary.', date: '1 week ago' },
    { id: 6, userName: 'Karthik Iyer', avatar: 'KI', destination: 'Coorg', rating: 5, comment: 'The fastest route option saved us 2 hours of driving! Coffee plantation visits were perfectly timed.', date: '5 days ago' },
];

// ===== TRAVEL QUOTES (landing page) =====
export const TRAVEL_QUOTES = [
    { quote: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
    { quote: "Travel makes one modest. You see what a tiny place you occupy in the world.", author: "Gustave Flaubert" },
    { quote: "Life is short and the world is wide. Better get started.", author: "Simon Raven" },
    { quote: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
];

// ===== HERO IMAGES & VIDEO (landing page design) =====
export const HERO_IMAGES = [
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

export const HERO_VIDEO_URL = '/hero.mp4';

// ===== SOLO SAFETY TIPS (static advice) =====
export const SOLO_SAFETY_TIPS = [
    'Share your itinerary with family or friends before departure',
    'Keep digital copies of all important documents',
    'Register with the local tourist office at your destination',
    'Avoid isolated areas after dark, especially in unfamiliar places',
    'Keep emergency contacts saved offline on your phone',
    'Trust your instincts - if something feels wrong, leave immediately',
    'Use verified and well-reviewed accommodations',
    'Carry a portable charger and keep your phone charged',
];

// ===== HOTEL IMAGES (curated Pexels images for hotel cards) =====
export const HOTEL_IMAGES = [
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2029698/pexels-photo-2029698.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=600',
];
