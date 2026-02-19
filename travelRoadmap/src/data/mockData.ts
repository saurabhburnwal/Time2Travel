// ===== STATES & DESTINATIONS =====
export const STATES = ['Kerala', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Goa', 'Puducherry'];

export const DESTINATIONS: Record<string, string[]> = {
    Kerala: ['Munnar', 'Alleppey', 'Kochi', 'Wayanad', 'Kovalam', 'Thekkady', 'Varkala', 'Kumarakom', 'Athirappilly', 'Bekal', 'Vagamon', 'Ponmudi', 'Kollam', 'Thrissur', 'Kannur', 'Palakkad', 'Idukki', 'Poovar', 'Marari', 'Nelliampathy'],
    Karnataka: ['Coorg', 'Hampi', 'Bangalore', 'Mysore', 'Chikmagalur', 'Gokarna', 'Udupi', 'Badami', 'Kabini', 'Dandeli', 'Sakleshpur', 'Bandipur', 'Belur', 'Shivamogga', 'Hassan', 'Bijapur', 'Mangalore', 'Karwar', 'Aihole', 'Pattadakal'],
    'Tamil Nadu': ['Ooty', 'Kodaikanal', 'Mahabalipuram', 'Rameswaram', 'Kanyakumari', 'Yercaud', 'Coimbatore', 'Thanjavur', 'Madurai', 'Pondicherry', 'Coonoor', 'Valparai', 'Kotagiri', 'Hogenakkal', 'Courtallam', 'Trichy', 'Kumbakonam', 'Kanchipuram', 'Vellore', 'Chidambaram'],
    'Andhra Pradesh': ['Visakhapatnam', 'Araku Valley', 'Tirupati', 'Vijayawada', 'Amaravati', 'Srisailam', 'Horsley Hills', 'Ananthagiri Hills', 'Gandikota', 'Lambasingi', 'Nagarjuna Sagar', 'Borra Caves', 'Kondapalli', 'Belum Caves', 'Maredumilli', 'Ahobilam', 'Rajahmundry', 'Papi Hills', 'Kolleru Lake', 'Rushikonda'],
    Telangana: ['Hyderabad', 'Warangal', 'Ramoji Film City', 'Nagarjuna Sagar', 'Bhadrachalam', 'Medak', 'Khammam', 'Pochampally', 'Ananthagiri Hills', 'Karimnagar', 'Nizamabad', 'Kuntala Waterfall', 'Laknavaram Lake', 'Mallela Theertham', 'Yadagirigutta', 'Ethurnagaram', 'Pakhal Lake', 'Kinnerasani', 'Kolanupaka', 'Alampur'],
    Goa: ['Panaji', 'Calangute', 'Baga', 'Anjuna', 'Arambol', 'Palolem', 'Vagator', 'Candolim', 'Old Goa', 'Dudhsagar Falls', 'Fort Aguada', 'Chapora Fort', 'Reis Magos', 'Morjim', 'Cola Beach', 'Butterfly Beach', 'Basilica of Bom Jesus', 'Se Cathedral', 'Fontainhas', 'Divar Island'],
    Puducherry: ['Promenade Beach', 'Auroville', 'Paradise Beach', 'Rock Beach', 'Serenity Beach', 'Chunnambar Backwaters', 'Botanical Garden', 'Sri Aurobindo Ashram', 'French Quarter', 'Manakula Vinayagar Temple', 'Ousteri Lake', 'Arikkamedu', 'Basilica of Sacred Heart', 'Government Park', 'Light House'],
};

// ===== TRAVEL & GROUP TYPES =====
export const TRAVEL_TYPES = [
    { id: 1, name: 'Nature', icon: '🌿', color: 'from-green-400 to-emerald-500' },
    { id: 2, name: 'Adventure', icon: '🏔️', color: 'from-orange-400 to-red-500' },
    { id: 3, name: 'Beach', icon: '🏖️', color: 'from-cyan-400 to-blue-500' },
    { id: 4, name: 'Heritage', icon: '🏛️', color: 'from-amber-400 to-yellow-600' },
    { id: 5, name: 'Nightlife', icon: '🌙', color: 'from-purple-400 to-pink-500' },
];

export const GROUP_TYPES = [
    { id: 1, name: 'Solo', icon: '🧍', desc: 'Travel solo and discover yourself' },
    { id: 2, name: 'Duo', icon: '👫', desc: 'Perfect romantic getaway' },
    { id: 3, name: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'Family-friendly adventures' },
    { id: 4, name: 'Friends', icon: '👥', desc: 'Group trips with your squad' },
];

// ===== DESTINATION COORDS (for map) =====
export const DESTINATION_COORDS: Record<string, { lat: number; lng: number }> = {
    Munnar: { lat: 10.0889, lng: 77.0595 },
    Alleppey: { lat: 9.4981, lng: 76.3388 },
    Kochi: { lat: 9.9312, lng: 76.2673 },
    Wayanad: { lat: 11.6854, lng: 76.1320 },
    Coorg: { lat: 12.3375, lng: 75.8069 },
    Hampi: { lat: 15.3350, lng: 76.4600 },
    Mysore: { lat: 12.2958, lng: 76.6394 },
    Ooty: { lat: 11.4102, lng: 76.6950 },
    Kodaikanal: { lat: 10.2381, lng: 77.4892 },
    Hyderabad: { lat: 17.3850, lng: 78.4867 },
    Warangal: { lat: 17.9784, lng: 79.5941 },
    Visakhapatnam: { lat: 17.6868, lng: 83.2185 },
    Tirupati: { lat: 13.6288, lng: 79.4192 },
    Panaji: { lat: 15.4909, lng: 73.8278 },
    Calangute: { lat: 15.5434, lng: 73.7554 },
    Puducherry: { lat: 11.9416, lng: 79.8083 },
    Gokarna: { lat: 14.5479, lng: 74.3188 },
    Rameswaram: { lat: 9.2876, lng: 79.3129 },
    Kanyakumari: { lat: 8.0883, lng: 77.5385 },
    Bangalore: { lat: 12.9716, lng: 77.5946 },
};

// ===== MOCK HOTELS (per destination) =====
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

export const getHotelsForDestination = (destination: string): Hotel[] => {
    const base = DESTINATION_COORDS[destination] || { lat: 10.0889, lng: 77.0595 };
    return [
        { id: 1, name: `${destination} Grand Resort & Spa`, price: 3500, rating: 4.7, distance: '1.2 km from center', lat: base.lat + 0.005, lng: base.lng + 0.003, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'] },
        { id: 2, name: `The Heritage ${destination}`, price: 2800, rating: 4.5, distance: '0.8 km from center', lat: base.lat - 0.003, lng: base.lng + 0.005, amenities: ['WiFi', 'Gym', 'Restaurant'] },
        { id: 3, name: `Budget Inn ${destination}`, price: 1200, rating: 4.0, distance: '0.5 km from center', lat: base.lat + 0.002, lng: base.lng - 0.002, amenities: ['WiFi', 'Breakfast'] },
        { id: 4, name: `Backpacker Hostel Central`, price: 600, rating: 3.8, distance: '0.3 km from center', lat: base.lat - 0.001, lng: base.lng + 0.001, amenities: ['WiFi', 'Common Area'] },
        { id: 5, name: `${destination} Palace Hotel`, price: 4200, rating: 4.9, distance: '2.5 km from center', lat: base.lat + 0.008, lng: base.lng - 0.006, amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'] },
        { id: 6, name: `Lakeside Retreat`, price: 2200, rating: 4.3, distance: '3.0 km from center', lat: base.lat - 0.007, lng: base.lng + 0.004, amenities: ['WiFi', 'Lake View', 'Restaurant'] },
        { id: 7, name: `Cozy Stay ${destination}`, price: 1600, rating: 4.1, distance: '1.5 km from center', lat: base.lat + 0.004, lng: base.lng + 0.006, amenities: ['WiFi', 'Kitchen'] },
        { id: 8, name: `Royal ${destination} Inn`, price: 2500, rating: 4.4, distance: '1.8 km from center', lat: base.lat - 0.005, lng: base.lng - 0.003, amenities: ['WiFi', 'Restaurant', 'Parking'] },
        { id: 9, name: `Traveler's Hub`, price: 900, rating: 3.9, distance: '0.7 km from center', lat: base.lat + 0.001, lng: base.lng - 0.004, amenities: ['WiFi', 'Laundry'] },
        { id: 10, name: `${destination} Hilltop Resort`, price: 3800, rating: 4.6, distance: '4.0 km from center', lat: base.lat + 0.012, lng: base.lng + 0.008, amenities: ['WiFi', 'Pool', 'Spa', 'Mountain View'] },
    ];
};

// ===== MOCK LOCAL HOSTS =====
export interface LocalHost {
    id: number;
    name: string;
    verified: boolean;
    foodIncluded: boolean;
    maxGuests: number;
    rating: number;
    distance: string;
    lat: number;
    lng: number;
    bio: string;
    avatar?: string;
}

export const getHostsForDestination = (destination: string): LocalHost[] => {
    const base = DESTINATION_COORDS[destination] || { lat: 10.0889, lng: 77.0595 };
    return [
        { id: 1, name: 'Priya Kumar', verified: true, foodIncluded: true, maxGuests: 2, rating: 4.9, distance: '1.5 km from center', lat: base.lat + 0.003, lng: base.lng - 0.002, bio: 'Local teacher who loves sharing culture and home-cooked meals' },
        { id: 2, name: 'Arjun Menon', verified: true, foodIncluded: false, maxGuests: 1, rating: 4.7, distance: '2.5 km from center', lat: base.lat - 0.004, lng: base.lng + 0.003, bio: 'Software developer and avid traveler, great local guide' },
        { id: 3, name: 'Lakshmi Iyer', verified: true, foodIncluded: true, maxGuests: 3, rating: 5.0, distance: '0.8 km from center', lat: base.lat + 0.001, lng: base.lng + 0.001, bio: 'Chef & food blogger, authentic local cuisine guaranteed' },
        { id: 4, name: 'Ravi Shankar', verified: true, foodIncluded: true, maxGuests: 2, rating: 4.8, distance: '1.2 km from center', lat: base.lat - 0.002, lng: base.lng - 0.001, bio: 'Retired professor, expert on local history and heritage' },
        { id: 5, name: 'Meera Nair', verified: false, foodIncluded: false, maxGuests: 1, rating: 4.5, distance: '3.0 km from center', lat: base.lat + 0.006, lng: base.lng + 0.005, bio: 'Artist and nature lover, beautiful home near the mountains' },
    ];
};

// ===== MOCK PLACES =====
export interface Place {
    id: number;
    name: string;
    entryFee: number;
    visitTime: string;
    visitMinutes: number;
    category: string;
    lat: number;
    lng: number;
}

export const getPlacesForDestination = (destination: string): Place[] => {
    const base = DESTINATION_COORDS[destination] || { lat: 10.0889, lng: 77.0595 };
    const places: Record<string, Place[]> = {
        Munnar: [
            { id: 1, name: 'Tea Gardens', entryFee: 0, visitTime: '2 hours', visitMinutes: 120, category: 'Nature', lat: base.lat + 0.01, lng: base.lng + 0.01 },
            { id: 2, name: 'Eravikulam National Park', entryFee: 120, visitTime: '3 hours', visitMinutes: 180, category: 'Wildlife', lat: base.lat + 0.02, lng: base.lng - 0.01 },
            { id: 3, name: 'Mattupetty Dam', entryFee: 20, visitTime: '1.5 hours', visitMinutes: 90, category: 'Water Body', lat: base.lat + 0.015, lng: base.lng + 0.005 },
            { id: 4, name: 'Echo Point', entryFee: 30, visitTime: '1 hour', visitMinutes: 60, category: 'Viewpoint', lat: base.lat + 0.018, lng: base.lng + 0.008 },
            { id: 5, name: 'Top Station', entryFee: 0, visitTime: '2 hours', visitMinutes: 120, category: 'Viewpoint', lat: base.lat + 0.03, lng: base.lng + 0.015 },
            { id: 6, name: 'Kundala Lake', entryFee: 0, visitTime: '1 hour', visitMinutes: 60, category: 'Water Body', lat: base.lat + 0.025, lng: base.lng + 0.012 },
            { id: 7, name: 'Rose Garden', entryFee: 50, visitTime: '1 hour', visitMinutes: 60, category: 'Nature', lat: base.lat + 0.005, lng: base.lng + 0.003 },
            { id: 8, name: 'Botanical Gardens', entryFee: 50, visitTime: '1.5 hours', visitMinutes: 90, category: 'Nature', lat: base.lat + 0.003, lng: base.lng + 0.007 },
            { id: 9, name: 'Anamudi Peak View', entryFee: 0, visitTime: '2 hours', visitMinutes: 120, category: 'Viewpoint', lat: base.lat + 0.035, lng: base.lng - 0.005 },
            { id: 10, name: 'Chinnar Wildlife Sanctuary', entryFee: 100, visitTime: '3 hours', visitMinutes: 180, category: 'Wildlife', lat: base.lat + 0.04, lng: base.lng + 0.02 },
        ],
    };
    // Fallback: generate generic places for any destination
    return places[destination] || [
        { id: 1, name: `${destination} Heritage Fort`, entryFee: 50, visitTime: '2 hours', visitMinutes: 120, category: 'Heritage', lat: base.lat + 0.01, lng: base.lng + 0.01 },
        { id: 2, name: `${destination} Botanical Garden`, entryFee: 30, visitTime: '1.5 hours', visitMinutes: 90, category: 'Nature', lat: base.lat - 0.005, lng: base.lng + 0.008 },
        { id: 3, name: `${destination} Lake View`, entryFee: 0, visitTime: '1 hour', visitMinutes: 60, category: 'Water Body', lat: base.lat + 0.008, lng: base.lng - 0.005 },
        { id: 4, name: `${destination} Temple Complex`, entryFee: 0, visitTime: '1.5 hours', visitMinutes: 90, category: 'Heritage', lat: base.lat + 0.015, lng: base.lng + 0.003 },
        { id: 5, name: `${destination} Sunset Point`, entryFee: 0, visitTime: '1 hour', visitMinutes: 60, category: 'Viewpoint', lat: base.lat + 0.02, lng: base.lng - 0.01 },
        { id: 6, name: `Central Market Square`, entryFee: 0, visitTime: '1.5 hours', visitMinutes: 90, category: 'Culture', lat: base.lat + 0.003, lng: base.lng + 0.005 },
        { id: 7, name: `${destination} Museum`, entryFee: 80, visitTime: '2 hours', visitMinutes: 120, category: 'Heritage', lat: base.lat - 0.008, lng: base.lng + 0.006 },
        { id: 8, name: `${destination} Nature Reserve`, entryFee: 100, visitTime: '3 hours', visitMinutes: 180, category: 'Wildlife', lat: base.lat + 0.025, lng: base.lng + 0.015 },
        { id: 9, name: `Hilltop Viewpoint`, entryFee: 20, visitTime: '1 hour', visitMinutes: 60, category: 'Viewpoint', lat: base.lat + 0.018, lng: base.lng - 0.008 },
        { id: 10, name: `${destination} Night Food Street`, entryFee: 0, visitTime: '2 hours', visitMinutes: 120, category: 'Nightlife', lat: base.lat - 0.003, lng: base.lng + 0.002 },
    ];
};

// ===== MOCK REVIEWS =====
export interface Review {
    id: number;
    userName: string;
    avatar: string;
    destination: string;
    rating: number;
    comment: string;
    date: string;
}

export const MOCK_REVIEWS: Review[] = [
    { id: 1, userName: 'Aisha Patel', avatar: 'AP', destination: 'Munnar', rating: 5, comment: 'The roadmap saved us so much time! We covered 8 spots in 3 days effortlessly. The route optimization was incredible.', date: '2 weeks ago' },
    { id: 2, userName: 'Rajesh Kumar', avatar: 'RK', destination: 'Hampi', rating: 4, comment: 'Amazing budget planning! Stayed within our ₹5000 budget and saw all the major ruins. Highly recommend for heritage lovers.', date: '1 month ago' },
    { id: 3, userName: 'Sneha Reddy', avatar: 'SR', destination: 'Goa', rating: 5, comment: 'Best travel app for beach destinations! The local host feature was a game changer. Got authentic Goan food included.', date: '3 weeks ago' },
    { id: 4, userName: 'Vikram Singh', avatar: 'VS', destination: 'Ooty', rating: 4, comment: 'Solo trip made easy. The safety contacts feature made me feel secure throughout. Great itinerary suggestions!', date: '2 months ago' },
    { id: 5, userName: 'Meera Nair', avatar: 'MN', destination: 'Wayanad', rating: 5, comment: 'Planned a family trip for 5 people. The expense tracker was spot on. Kids loved every activity on the itinerary.', date: '1 week ago' },
    { id: 6, userName: 'Karthik Iyer', avatar: 'KI', destination: 'Coorg', rating: 5, comment: 'The fastest route option saved us 2 hours of driving! Coffee plantation visits were perfectly timed.', date: '5 days ago' },
];

// ===== TRAVEL QUOTES =====
export const TRAVEL_QUOTES = [
    { quote: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustine" },
    { quote: "Travel makes one modest. You see what a tiny place you occupy in the world.", author: "Gustave Flaubert" },
    { quote: "Life is short and the world is wide. Better get started.", author: "Simon Raven" },
    { quote: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
];

// ===== SAFETY INFO =====
export const EMERGENCY_CONTACTS = [
    { name: 'Police', number: '100', icon: '🚔' },
    { name: 'Ambulance', number: '108', icon: '🚑' },
    { name: 'Fire', number: '101', icon: '🚒' },
    { name: 'Women Helpline', number: '1091', icon: '👩‍⚕️' },
    { name: 'Tourist Helpline', number: '1363', icon: '🧳' },
    { name: 'Disaster Management', number: '1078', icon: '⚠️' },
];

export const SOLO_SAFETY_TIPS = [
    'Share your itinerary with family or friends before departure',
    'Keep digital copies of all important documents',
    'Register with the local tourist office at your destination',
    'Avoid isolated areas after dark, especially in unfamiliar places',
    'Keep emergency contacts saved offline on your phone',
    'Trust your instincts – if something feels wrong, leave immediately',
    'Use verified and well-reviewed accommodations',
    'Carry a portable charger and keep your phone charged',
];

// ===== MOCK USER for auth context =====
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

export const MOCK_USERS: MockUser[] = [
    { id: 1, name: 'Sudeepa', email: 'sudeepa@example.com', phone: '9876543210', gender: 'Male', role: 'traveler', avatar: 'SU', joinedDate: 'Jan 2026' },
    { id: 2, name: 'Admin User', email: 'admin@time2travel.com', phone: '9000000000', gender: 'Other', role: 'admin', avatar: 'AD', joinedDate: 'Dec 2025' },
    { id: 3, name: 'Priya Host', email: 'priya@example.com', phone: '9111222333', gender: 'Female', role: 'host', avatar: 'PH', joinedDate: 'Feb 2026' },
];

// ===== MOCK PAST TRIPS =====
export interface PastTrip {
    id: number;
    destination: string;
    state: string;
    days: number;
    date: string;
    rating: number;
    totalCost: number;
    roadmapType: string;
}

export const MOCK_PAST_TRIPS: PastTrip[] = [
    { id: 1, destination: 'Munnar', state: 'Kerala', days: 3, date: 'Jan 2026', rating: 5, totalCost: 4200, roadmapType: 'Budget Efficient' },
    { id: 2, destination: 'Hampi', state: 'Karnataka', days: 2, date: 'Dec 2025', rating: 4, totalCost: 3100, roadmapType: 'Fastest Route' },
    { id: 3, destination: 'Goa', state: 'Goa', days: 4, date: 'Nov 2025', rating: 5, totalCost: 6800, roadmapType: 'Budget Efficient' },
];

// ===== PEXELS CONFIG =====
// The user will provide their Pexels API key. Set it here.
export const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY';

export const HERO_IMAGES = [
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

export const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4';
