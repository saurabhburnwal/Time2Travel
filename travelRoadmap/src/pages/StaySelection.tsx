import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hotel, Home, Star, Shield, MapPin, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { getHotelsForDestination, getHostsForDestination } from '../data/mockData';

export default function StaySelection() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();
    const [tab, setTab] = useState<'hotels' | 'hosts'>('hotels');

    const hotels = getHotelsForDestination(trip.destination);
    const hosts = getHostsForDestination(trip.destination);

    const [generating, setGenerating] = useState(false);
    const [genStep, setGenStep] = useState(0);
    const genSteps = ['Calculating distances from your stay...', 'Grouping nearby tourist spots...', 'Optimizing routes to save time & money...', 'Creating your perfect roadmap...'];

    const handleGenerate = () => {
        setGenerating(true);
        setGenStep(0);
        let step = 0;
        const interval = setInterval(() => {
            step++;
            if (step < genSteps.length) setGenStep(step);
            else { clearInterval(interval); navigate('/roadmap-options'); }
        }, 1200);
    };

    if (generating) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-brand-600 via-purple-600 to-ocean-600 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-white max-w-md"
                >
                    <div className="mb-8 relative">
                        <div className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                        <MapPin size={28} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold font-display mb-4">Creating Your Roadmap</h2>
                    <motion.p
                        key={genStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl text-white/90 mb-8"
                    >
                        {genSteps[genStep]}
                    </motion.p>
                    <div className="flex gap-2 justify-center">
                        {genSteps.map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i <= genStep ? 'bg-white scale-110' : 'bg-white/30'}`} />
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-6xl">
                <button onClick={() => navigate('/plan')} className="flex items-center gap-2 text-brand-600 hover:text-brand-800 font-medium mb-6 transition-colors">
                    <ArrowLeft size={18} /> Back to Planning
                </button>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold font-display mb-2">
                        Choose Your <span className="gradient-text">Stay</span>
                    </h1>
                    <p className="text-gray-500">in {trip.destination}, {trip.state} — Your roadmap starts from here</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl max-w-md mx-auto">
                    <button onClick={() => setTab('hotels')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${tab === 'hotels' ? 'bg-white shadow-md text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        <Hotel size={18} /> Hotels ({hotels.length})
                    </button>
                    <button onClick={() => setTab('hosts')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${tab === 'hosts' ? 'bg-white shadow-md text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}>
                        <Home size={18} /> Local Hosts ({hosts.length})
                    </button>
                </div>

                {/* Hotels */}
                {tab === 'hotels' && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {hotels.map((hotel, i) => (
                            <motion.div
                                key={hotel.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => { updateTrip('selectedStay', hotel); updateTrip('stayType', 'hotel'); }}
                                className={`glass-card p-5 cursor-pointer transition-all duration-300 ${trip.selectedStay?.id === hotel.id && trip.stayType === 'hotel'
                                        ? 'ring-2 ring-brand-400 bg-brand-50/50 shadow-xl shadow-brand-200/30'
                                        : 'hover:shadow-xl hover:-translate-y-0.5'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">{hotel.name}</h3>
                                        <p className="text-sm text-gray-500 mt-0.5">{hotel.distance}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-bold text-yellow-700">{hotel.rating}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {hotel.amenities?.map(a => (
                                        <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold gradient-text">₹{hotel.price.toLocaleString()}<span className="text-sm font-normal text-gray-400">/night</span></span>
                                    <span className="text-xs text-gray-400">₹{(hotel.price * trip.days).toLocaleString()} total</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Hosts */}
                {tab === 'hosts' && (
                    <div className="space-y-4">
                        {hosts.map((host, i) => (
                            <motion.div
                                key={host.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => { updateTrip('selectedStay', host); updateTrip('stayType', 'host'); }}
                                className={`glass-card p-5 cursor-pointer transition-all duration-300 ${trip.selectedStay?.id === host.id && trip.stayType === 'host'
                                        ? 'ring-2 ring-ocean-400 bg-ocean-50/50 shadow-xl'
                                        : 'hover:shadow-xl hover:-translate-y-0.5'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean-400 to-brand-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                        {host.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-gray-800 text-lg">{host.name}</h3>
                                            {host.verified && <Shield size={16} className="text-green-500" />}
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full ml-auto">
                                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-bold">{host.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{host.bio}</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">FREE Stay</span>
                                            {host.foodIncluded && <span className="text-xs bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full font-medium">🍽️ Food Included</span>}
                                            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">Max {host.maxGuests} guest{host.maxGuests > 1 ? 's' : ''}</span>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{host.distance}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <Link to="/host-register" className="block w-full p-5 border-2 border-dashed border-gray-300 rounded-2xl text-center text-gray-500 hover:border-brand-400 hover:text-brand-600 transition-all duration-300">
                            <Sparkles size={20} className="mx-auto mb-2" />
                            <span className="font-semibold">Register as a Local Host</span>
                            <p className="text-xs mt-1">Open your home to travelers</p>
                        </Link>
                    </div>
                )}

                {/* Generate Button */}
                {trip.selectedStay && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
                        <button onClick={handleGenerate} className="btn-primary w-full text-lg py-4 justify-center flex items-center gap-2">
                            Generate Roadmap <ChevronRight size={20} />
                        </button>
                    </motion.div>
                )}
            </div>
        </AnimatedPage>
    );
}
