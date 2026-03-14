import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Users, Star, MapPin, Check, Loader2, ChevronRight, Sparkles, Coffee, Wifi, Utensils, Dumbbell, PlusCircle, AlertTriangle, Shield, Mail, Phone, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import AuthModal from '../components/AuthModal';
import StarRating from '../components/StarRating';
import { useTrip } from '../contexts/TripContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchHotelsForDestination } from '../services/hotelsService';
import { fetchHostsForDestination } from '../services/hostsService';
import { LocalHost, Hotel } from '../services/types';
import { apiPost } from '../lib/api';
import toast from 'react-hot-toast';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
    'WiFi': <Wifi size={12} />,
    'Restaurant': <Utensils size={12} />,
    'Gym': <Dumbbell size={12} />,
    'Breakfast': <Coffee size={12} />,
};

// Curated high-quality hotel/resort images
const HOTEL_IMAGES = [
    '/images/how_img2.jpg',
    '/images/stay_h1.jpg',
    '/images/stay_h2.jpg',
    '/images/stay_h3.jpg',
    '/images/stay_h4.jpg',
    '/images/stay_h5.jpg',
    '/images/stay_h6.jpg',
    '/images/stay_h7.jpg',
    '/images/stay_h8.jpg',
    '/images/stay_h9.jpg',
];

export default function StaySelection() {
    const { trip, updateTrip } = useTrip();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState<'hotels' | 'hosts'>('hotels');
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [hosts, setHosts] = useState<LocalHost[]>([]);
    const [loading, setLoading] = useState(true);
    const [hostsLoading, setHostsLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Manual hotel form state
    const [showManualForm, setShowManualForm] = useState(false);
    const [manualHotel, setManualHotel] = useState({ name: '', address: '', pricePerNight: '' });
    const [savingManual, setSavingManual] = useState(false);

    useEffect(() => {
        if (!trip.destination) return;
        (async () => {
            setLoading(true);
            setHostsLoading(true);
            const [h, hostList] = await Promise.all([
                fetchHotelsForDestination(trip.destination),
                fetchHostsForDestination(trip.destination),
            ]);
            setHotels(h);
            setHosts(hostList);
            setLoading(false);
            setHostsLoading(false);
        })();
    }, [trip.destination]);

    // Filter hotels by budget: total cost (price × nights) must be within budget
    const budgetHotels = useMemo(() => {
        return hotels.filter(h => h.price * trip.days <= trip.budget);
    }, [hotels, trip.days, trip.budget]);

    const noBudgetHotels = !loading && budgetHotels.length === 0 && hotels.length > 0;
    const noHotelsAtAll = !loading && hotels.length === 0;

    const selectHotel = (h: Hotel) => {
        updateTrip({ selectedStay: h.name, stayType: 'hotel', stayLat: h.lat, stayLng: h.lng, hotelPrice: h.price });
    };
    const selectHost = (h: any) => {
        updateTrip({ selectedStay: h.name, stayType: 'host', stayLat: h.lat, stayLng: h.lng });
    };

    const handleGenerate = () => {
        if (!trip.selectedStay) { toast.error('Please select a stay'); return; }
        // Auth gate: must be logged in to generate roadmap
        if (!isLoggedIn) {
            setShowAuthModal(true);
            return;
        }
        proceedToGenerate();
    };

    const proceedToGenerate = () => {
        navigate('/roadmap-options');
    };

    const handleAuthSuccess = () => {
        setShowAuthModal(false);
        toast.success('You\'re signed in! Generating roadmap...');
        proceedToGenerate();
    };

    // Geocode address using Nominatim (free, no API key needed)
    const geocodeAddress = async (address: string, destination: string): Promise<{ lat: number; lng: number } | null> => {
        try {
            const query = encodeURIComponent(`${address}, ${destination}, India`);
            const resp = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`);
            const results = await resp.json();
            if (results && results.length > 0) {
                return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
            }
        } catch (err) {
            console.warn('Geocoding error:', err);
        }
        return null;
    };

    const handleManualHotelSubmit = async () => {
        if (!manualHotel.name.trim()) { toast.error('Please enter a hotel name'); return; }
        if (!manualHotel.address.trim()) { toast.error('Please enter the hotel address'); return; }

        setSavingManual(true);
        const loadingToast = toast.loading('Geocoding and saving hotel...');

        try {
            // Geocode the address
            const coords = await geocodeAddress(manualHotel.address, trip.destination);
            const lat = coords?.lat || 0;
            const lng = coords?.lng || 0;

            // Save to backend
            const { success, data } = await apiPost<{ hotel: any }>('/api/hotels', {
                name: manualHotel.name.trim(),
                address: manualHotel.address.trim(),
                destination: trip.destination,
                latitude: lat,
                longitude: lng,
                price_per_night: manualHotel.pricePerNight ? parseFloat(manualHotel.pricePerNight) : 0,
            });

            if (success && data?.hotel) {
                const price = parseFloat(manualHotel.pricePerNight) || 0;
                // Select the manually entered hotel
                updateTrip({
                    selectedStay: manualHotel.name.trim(),
                    stayType: 'hotel',
                    stayLat: lat,
                    stayLng: lng,
                    hotelPrice: price,
                });
                toast.success('Hotel saved and selected!', { id: loadingToast });
                setShowManualForm(false);
                setManualHotel({ name: '', address: '', pricePerNight: '' });
            } else {
                toast.error('Failed to save hotel. Please try again.', { id: loadingToast });
            }
        } catch (err) {
            console.error('Manual hotel error:', err);
            toast.error('An error occurred while saving.', { id: loadingToast });
        } finally {
            setSavingManual(false);
        }
    };

    if (!trip.destination) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
                        <Building2 size={40} className="text-brand-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Select a Destination First</h2>
                    <p className="text-gray-500 mb-6">Choose your destination to browse stays</p>
                    <button onClick={() => navigate('/plan')} className="btn-primary">Go to Planner</button>
                </div>
            </AnimatedPage>
        );
    }

    return (
        <AnimatedPage className="page-bg pt-20 pb-16 min-h-screen">
            {/* Auth Modal */}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthSuccess} />

            {/* Decorative blobs */}
            <div className="page-decorations">
                <div className="deco-blob deco-blob-2 animate-pulse-soft" />
            </div>

            <div className="section-container max-w-5xl relative z-10">
                {/* Hero Banner */}
                <div className="hero-banner mb-8">
                    <img src="/images/hotel_bg.jpg" alt="Hotel" loading="eager" />
                    <div className="hero-overlay" />
                    <div className="hero-content justify-end">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium mb-3 border border-white/20">
                                <Sparkles size={14} /> {trip.destination}, {trip.state}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">
                                Choose Your <span className="text-ocean-200">Stay</span>
                            </h1>
                            <p className="text-white/60">Your stay location determines your optimized travel routes</p>
                        </motion.div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 shadow-md max-w-md mx-auto">
                    <button onClick={() => setTab('hotels')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all text-sm ${tab === 'hotels' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                        <Building2 size={18} /> Hotels & Hostels
                    </button>
                    <button onClick={() => setTab('hosts')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all text-sm ${tab === 'hosts' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                        <Users size={18} /> Local Hosts
                    </button>
                </div>

                {/* Hotels Tab */}
                {tab === 'hotels' && (
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-16">
                                <Loader2 className="animate-spin mx-auto text-brand-500" size={36} />
                                <p className="text-gray-500 mt-4">Finding the best stays...</p>
                            </div>
                        ) : noHotelsAtAll ? (
                            /* No hotels in DB at all for this destination */
                            <div className="text-center py-12 glass-card">
                                <Building2 size={40} className="text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">No hotels found in {trip.destination}.</p>
                                <p className="text-sm text-gray-400 mt-1">You can add your own hotel below, or explore local hosts.</p>
                            </div>
                        ) : noBudgetHotels ? (
                            /* Hotels exist but none within budget */
                            <div className="glass-card p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle size={20} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-amber-800 text-sm">No hotels within your budget</p>
                                        <p className="text-sm text-amber-700/80 mt-0.5">
                                            No stays found under ₹{trip.budget.toLocaleString()} for {trip.days} nights in {trip.destination}.
                                            The cheapest hotel costs ₹{Math.min(...hotels.map(h => h.price * trip.days)).toLocaleString()} total.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setShowManualForm(true)}
                                        className="w-full flex items-center gap-3 p-4 bg-white border-2 border-dashed border-brand-300 rounded-xl text-brand-600 font-semibold hover:bg-brand-50 transition-all text-sm"
                                    >
                                        <PlusCircle size={18} /> Already booked? Enter your hotel manually
                                    </button>
                                    <button
                                        onClick={() => setTab('hosts')}
                                        className="w-full flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 font-semibold hover:bg-green-100 transition-all text-sm"
                                    >
                                        <Users size={18} /> Explore free stays with local hosts
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Budget info */}
                                <div className="tip-card mb-2 flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                                        <Building2 size={20} className="text-brand-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-brand-800 text-sm">
                                            Showing {budgetHotels.length} hotel{budgetHotels.length !== 1 ? 's' : ''} within your budget
                                        </p>
                                        <p className="text-sm text-brand-700/80 mt-0.5">
                                            Budget: ₹{trip.budget.toLocaleString()} for {trip.days} nights
                                            {hotels.length > budgetHotels.length && (
                                                <span className="text-gray-500"> · {hotels.length - budgetHotels.length} over budget hidden</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5">
                                    {budgetHotels.map((hotel, i) => (
                                        <motion.div
                                            key={hotel.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            onClick={() => selectHotel(hotel)}
                                            className={`feature-card cursor-pointer group ${trip.selectedStay === hotel.name ? 'ring-2 ring-brand-500 border-brand-200 bg-brand-50/30' : ''}`}
                                        >
                                            {/* Hotel Image Header — curated images */}
                                            <div className="image-card h-36 mb-4 -mx-6 -mt-6 rounded-b-none">
                                                <img src={HOTEL_IMAGES[i % HOTEL_IMAGES.length]}
                                                    alt={hotel.name} loading="lazy"
                                                />
                                                <div className="image-card-overlay" />
                                                <div className="absolute top-3 right-3 z-10">
                                                    <span className="bg-white/90 backdrop-blur text-brand-600 text-sm font-bold px-3 py-1 rounded-full shadow">
                                                        Rs. {hotel.price.toLocaleString()}<span className="text-xs font-normal text-gray-500">/night</span>
                                                    </span>
                                                </div>
                                                {trip.selectedStay === hotel.name && (
                                                    <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg">
                                                        <Check size={16} />
                                                    </div>
                                                )}
                                            </div>

                                            <h3 className="font-bold text-gray-800 text-lg group-hover:text-brand-600 transition-colors">{hotel.name}</h3>
                                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} /> {hotel.distance}</p>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center gap-3">
                                                    <StarRating rating={hotel.rating} size={14} />
                                                    <span className="text-sm text-gray-400 font-medium">{hotel.rating}</span>
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    Total: ₹{(hotel.price * trip.days).toLocaleString()}
                                                </span>
                                            </div>
                                            {hotel.amenities && (
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {hotel.amenities.map(a => (
                                                        <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                                                            {AMENITY_ICONS[a] || null} {a}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Manual Hotel Entry - always available as option */}
                        {!loading && !showManualForm && !noBudgetHotels && (
                            <button
                                onClick={() => setShowManualForm(true)}
                                className="w-full flex items-center justify-center gap-3 p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-brand-300 hover:text-brand-600 transition-all text-sm mt-4"
                            >
                                <PlusCircle size={18} /> Already booked a hotel? Enter it manually
                            </button>
                        )}

                        {/* Manual Hotel Form */}
                        {showManualForm && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-6 mt-4"
                            >
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <PlusCircle size={18} className="text-brand-500" /> Enter Your Booked Hotel
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">Hotel Name *</label>
                                        <input
                                            type="text"
                                            value={manualHotel.name}
                                            onChange={e => setManualHotel(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="e.g. Taj Resort Munnar"
                                            className="input-field w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">Address / Location *</label>
                                        <input
                                            type="text"
                                            value={manualHotel.address}
                                            onChange={e => setManualHotel(prev => ({ ...prev, address: e.target.value }))}
                                            placeholder="e.g. Near Mattupetty Dam, Munnar"
                                            className="input-field w-full"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">We'll geocode this to get coordinates for route optimization.</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-1 block">Price per Night (₹)</label>
                                        <input
                                            type="number"
                                            value={manualHotel.pricePerNight}
                                            onChange={e => setManualHotel(prev => ({ ...prev, pricePerNight: e.target.value }))}
                                            placeholder="e.g. 1500"
                                            className="input-field w-full"
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={handleManualHotelSubmit}
                                            disabled={savingManual}
                                            className="btn-primary flex items-center gap-2 text-sm"
                                        >
                                            {savingManual ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                            Save & Select
                                        </button>
                                        <button
                                            onClick={() => { setShowManualForm(false); setManualHotel({ name: '', address: '', pricePerNight: '' }); }}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* Hosts Tab */}
                {tab === 'hosts' && (
                    <div className="space-y-4">
                        <div className="tip-card mb-6 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Users size={20} className="text-green-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-green-800 text-sm">Local Host Experience</p>
                                <p className="text-sm text-green-700/80 mt-0.5">Free stays with authentic cultural experiences. All hosts are verified for safety.</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            {hostsLoading ? (
                                <div className="md:col-span-2 text-center py-16">
                                    <Loader2 className="animate-spin mx-auto text-brand-500" size={36} />
                                    <p className="text-gray-500 mt-4">Finding local hosts...</p>
                                </div>
                            ) : hosts.length === 0 ? (
                                <div className="md:col-span-2 text-center py-12 glass-card">
                                    <Users size={40} className="text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium">No local hosts available in {trip.destination} yet.</p>
                                    <p className="text-sm text-gray-400 mt-1">Be the first — register as a host!</p>
                                </div>
                            ) : (
                                hosts.map((host, i) => (
                                    <motion.div
                                        key={host.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => selectHost(host)}
                                        className={`feature-card cursor-pointer transition-all duration-300 ${trip.selectedStay === host.name ? 'ring-2 ring-brand-500 border-brand-200 bg-brand-50/30 shadow-md' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">{host.name.charAt(0)}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-gray-800">{host.name}</h3>
                                                    {host.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><Shield size={10}/> Verified</span>}
                                                </div>
                                                <p className="text-sm text-gray-500">{host.bio}</p>
                                            </div>
                                            {trip.selectedStay === host.name && (
                                                <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center"><Check size={16} /></div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-400 border-t border-gray-100 pt-3">
                                            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-current" /> {host.rating}</span>
                                            <span className="flex items-center gap-1"><Users size={14} /> Max {host.maxGuests}</span>
                                            <span className="flex items-center gap-1"><MapPin size={14} /> {host.distance}</span>
                                            {host.foodIncluded && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium ml-auto">Food Included</span>}
                                        </div>

                                        {/* Expanded Details When Selected */}
                                        {trip.selectedStay === host.name && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }} 
                                                animate={{ height: 'auto', opacity: 1 }} 
                                                className="mt-4 p-4 bg-white rounded-xl border border-brand-100 text-sm space-y-2"
                                            >
                                                <p className="font-semibold text-brand-700 mb-2 border-b border-brand-50 pb-2">Host Contact & Booking Details</p>
                                                {host.email && <p className="text-gray-600 flex items-center gap-2"><Mail size={14} className="text-brand-500" /> {host.email}</p>}
                                                {host.phone && <p className="text-gray-600 flex items-center gap-2"><Phone size={14} className="text-brand-500" /> {host.phone}</p>}
                                                <p className="text-gray-600 flex items-center gap-2">
                                                    <DollarSign size={14} className="text-brand-500" /> 
                                                    Suggested Cultural Contribution: <strong className="text-brand-700">₹{host.suggestedContribution || 0} / night</strong>
                                                </p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))
                            )}

                        </div>
                    </div>
                )}

                {/* Generate Button */}
                <div className="mt-10">
                    <motion.button
                        onClick={handleGenerate}
                        disabled={!trip.selectedStay || generating}
                        whileHover={trip.selectedStay ? { scale: 1.02 } : {}}
                        whileTap={trip.selectedStay ? { scale: 0.98 } : {}}
                        className={`w-full py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 transition-all duration-300 ${trip.selectedStay
                            ? 'bg-gradient-to-r from-brand-500 to-ocean-300 text-white shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                        {generating ? (
                            <><Loader2 className="animate-spin" size={22} /> Generating Your Roadmap...</>
                        ) : (
                            <>Generate Roadmap <ChevronRight size={20} /></>
                        )}
                    </motion.button>
                    {!isLoggedIn && trip.selectedStay && (
                        <p className="text-center text-sm text-gray-400 mt-2">Sign in required to generate roadmap</p>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
}
