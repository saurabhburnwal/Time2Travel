import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Users, Star, MapPin, Check, Loader2, ChevronRight, Sparkles, Coffee, Wifi, Utensils, Dumbbell, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import AuthModal from '../components/AuthModal';
import StarRating from '../components/StarRating';
import { useTrip } from '../contexts/TripContext';
import { useAuth } from '../contexts/AuthContext';
import { Hotel, getHostsForDestination as getMockHosts } from '../data/mockData';
import { fetchHotelsForDestination } from '../lib/supabaseService';
import toast from 'react-hot-toast';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
    'WiFi': <Wifi size={12} />,
    'Restaurant': <Utensils size={12} />,
    'Gym': <Dumbbell size={12} />,
    'Breakfast': <Coffee size={12} />,
};

// Curated high-quality hotel/resort images
const HOTEL_IMAGES = [
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

export default function StaySelection() {
    const { trip, updateTrip } = useTrip();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState<'hotels' | 'hosts'>('hotels');
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const hosts = getMockHosts(trip.destination);

    useEffect(() => {
        if (!trip.destination) return;
        (async () => {
            setLoading(true);
            const h = await fetchHotelsForDestination(trip.destination);
            setHotels(h);
            setLoading(false);
        })();
    }, [trip.destination]);

    const selectHotel = (h: Hotel) => {
        updateTrip({ selectedStay: h.name, stayType: 'hotel', stayLat: h.lat, stayLng: h.lng });
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
        setGenerating(true);
        setTimeout(() => {
            setGenerating(false);
            navigate('/roadmap-options');
        }, 2000);
    };

    const handleAuthSuccess = () => {
        setShowAuthModal(false);
        toast.success('You\'re signed in! Generating roadmap...');
        proceedToGenerate();
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
                    <img src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Hotel" loading="eager" />
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
                        ) : (
                            <div className="grid md:grid-cols-2 gap-5">
                                {hotels.map((hotel, i) => (
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
                                        <div className="flex items-center gap-3 mt-3">
                                            <StarRating rating={hotel.rating} size={14} />
                                            <span className="text-sm text-gray-400 font-medium">{hotel.rating}</span>
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
                            {hosts.map((host, i) => (
                                <motion.div
                                    key={host.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => selectHost(host)}
                                    className={`feature-card cursor-pointer ${trip.selectedStay === host.name ? 'ring-2 ring-brand-500 border-brand-200 bg-brand-50/30' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">{host.name.charAt(0)}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-800">{host.name}</h3>
                                                {host.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>}
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
                                </motion.div>
                            ))}

                            {/* Register as Local Host CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: hosts.length * 0.05 }}
                            >
                                <Link
                                    to="/host-register"
                                    className="feature-card flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-brand-200 bg-brand-50/30 hover:bg-brand-50 hover:border-brand-400 cursor-pointer group h-full"
                                >
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-400 to-ocean-500 flex items-center justify-center text-white mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                                        <UserPlus size={28} />
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-brand-600 transition-colors">Register as Local Host</h3>
                                    <p className="text-sm text-gray-500">Open your home to travelers and share your culture</p>
                                </Link>
                            </motion.div>
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
