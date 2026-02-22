import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass, Users, DollarSign, Calendar, ChevronRight, Sparkles, Trees, Mountain, Waves, Landmark, Moon, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { STATES as MOCK_STATES, DESTINATIONS as MOCK_DESTINATIONS, TRAVEL_TYPES as MOCK_TRAVEL_TYPES, GROUP_TYPES as MOCK_GROUP_TYPES } from '../data/mockData';
import { fetchStates, fetchDestinations, fetchTravelTypes, fetchGroupTypes, DBTravelType, DBGroupType } from '../lib/supabaseService';
import toast from 'react-hot-toast';

const TRAVEL_TYPE_ICONS: Record<string, React.ReactNode> = {
    'Nature': <Trees size={20} />,
    'Adventure': <Mountain size={20} />,
    'Beach': <Waves size={20} />,
    'Heritage': <Landmark size={20} />,
    'Nightlife': <Moon size={20} />,
};

const GROUP_TYPE_ICONS: Record<string, React.ReactNode> = {
    'Solo': <Compass size={18} />,
    'Duo': <Users size={18} />,
    'Family': <Users size={18} />,
    'Friends': <Users size={18} />,
};

const DESTINATION_IMAGES = [
    'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export default function TripPlanner() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();

    const [states, setStates] = useState<string[]>(MOCK_STATES);
    const [destinations, setDestinations] = useState<string[]>([]);
    const [travelTypes, setTravelTypes] = useState<DBTravelType[]>(MOCK_TRAVEL_TYPES.map(t => ({ id: t.id, name: t.name })));
    const [groupTypes, setGroupTypes] = useState<DBGroupType[]>(MOCK_GROUP_TYPES.map(g => ({ id: g.id, name: g.name })));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const [s, tt, gt] = await Promise.all([fetchStates(), fetchTravelTypes(), fetchGroupTypes()]);
            setStates(s);
            setTravelTypes(tt);
            setGroupTypes(gt);
            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (!trip.state) { setDestinations([]); return; }
        (async () => {
            const d = await fetchDestinations(trip.state);
            setDestinations(d);
        })();
    }, [trip.state]);

    const canContinue = trip.state && trip.destination;

    const handleContinue = () => {
        if (!canContinue) { toast.error('Please select state and destination'); return; }
        navigate('/stay-selection');
    };

    const travelColors = ['from-green-400 to-emerald-500', 'from-orange-400 to-red-500', 'from-cyan-400 to-blue-500', 'from-amber-400 to-yellow-600', 'from-brand-400 to-ocean-300'];

    return (
        <AnimatedPage className="page-bg pt-20 pb-16 min-h-screen">
            {/* Decorative background blobs */}
            <div className="page-decorations">
                <div className="deco-blob deco-blob-1 animate-pulse-soft" />
                <div className="deco-blob deco-blob-2 animate-pulse-soft" style={{ animationDelay: '2s' }} />
            </div>

            <div className="section-container max-w-5xl relative z-10">
                {/* Hero Banner */}
                <div className="hero-banner mb-10">
                    <img src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="South India travel" loading="eager" />
                    <div className="hero-overlay" />
                    <div className="hero-content justify-center text-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
                                <Globe size={16} /> 130+ Destinations Across South India
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-3">
                                Plan Your <span className="text-ocean-200">Journey</span>
                            </h1>
                            <p className="text-white/70 text-lg max-w-xl mx-auto">
                                Tell us your preferences and we'll craft the perfect travel roadmap for you
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Destination Preview Strip */}
                <div className="grid grid-cols-4 gap-3 mb-10">
                    {DESTINATION_IMAGES.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="image-card h-24 md:h-32"
                        >
                            <img src={img} alt={`Destination ${i + 1}`} loading="lazy" />
                            <div className="image-card-overlay" />
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Travel Type */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="feature-card">
                            <label className="floating-label flex items-center gap-2"><Compass size={16} /> Travel Type</label>
                            <div className="flex flex-wrap gap-3 mt-3">
                                {travelTypes.map((type, i) => (
                                    <button
                                        key={type.id}
                                        onClick={() => updateTrip({ travelType: type.name })}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${trip.travelType === type.name
                                            ? `bg-gradient-to-r ${travelColors[i % travelColors.length]} text-white shadow-lg scale-105`
                                            : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50/50'}`}
                                    >
                                        {TRAVEL_TYPE_ICONS[type.name] || <Compass size={18} />}
                                        {type.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* State & Destination */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="feature-card">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="floating-label flex items-center gap-2"><MapPin size={16} /> State</label>
                                    <select
                                        value={trip.state}
                                        onChange={e => { updateTrip({ state: e.target.value, destination: '' }); }}
                                        className="select-field mt-2"
                                    >
                                        <option value="">Select State</option>
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="floating-label flex items-center gap-2"><MapPin size={16} /> Destination</label>
                                    <select
                                        value={trip.destination}
                                        onChange={e => updateTrip({ destination: e.target.value })}
                                        className="select-field mt-2"
                                        disabled={!trip.state}
                                    >
                                        <option value="">Select Destination</option>
                                        {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Budget & Days */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="feature-card">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="floating-label flex items-center gap-2"><DollarSign size={16} /> Budget (per person)</label>
                                    <div className="mt-4">
                                        <input
                                            type="range" min={2000} max={10000} step={500}
                                            value={trip.budget}
                                            onChange={e => updateTrip({ budget: Number(e.target.value) })}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between mt-2">
                                            <span className="text-xs text-gray-400">Rs. 2,000</span>
                                            <span className="text-lg font-bold gradient-text">Rs. {trip.budget.toLocaleString()}</span>
                                            <span className="text-xs text-gray-400">Rs. 10,000</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="floating-label flex items-center gap-2"><Calendar size={16} /> Days</label>
                                    <div className="mt-4">
                                        <input
                                            type="range" min={2} max={7} step={1}
                                            value={trip.days}
                                            onChange={e => updateTrip({ days: Number(e.target.value) })}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between mt-2">
                                            <span className="text-xs text-gray-400">2 days</span>
                                            <span className="text-lg font-bold gradient-text">{trip.days} days</span>
                                            <span className="text-xs text-gray-400">7 days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Group Type */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="feature-card">
                            <label className="floating-label flex items-center gap-2"><Users size={16} /> Group Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                {groupTypes.map(g => (
                                    <button
                                        key={g.id}
                                        onClick={() => updateTrip({ groupType: g.name })}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl font-medium transition-all duration-300 text-sm ${trip.groupType === g.name
                                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-300/30 scale-[1.03]'
                                            : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50/50'}`}
                                    >
                                        {GROUP_TYPE_ICONS[g.name] || <Users size={18} />}
                                        {g.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Summary + Tips */}
                    <div className="space-y-6">
                        {/* Live Trip Summary */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="travel-strip text-white sticky top-24">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Sparkles size={18} className="text-ocean-200" /> Trip Preview
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">State</span>
                                        <span className="font-semibold text-ocean-200">{trip.state || '—'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Destination</span>
                                        <span className="font-semibold text-ocean-200">{trip.destination || '—'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Travel Type</span>
                                        <span className="font-semibold text-ocean-200">{trip.travelType || '—'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Budget</span>
                                        <span className="font-semibold text-ocean-200">Rs. {trip.budget.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Duration</span>
                                        <span className="font-semibold text-ocean-200">{trip.days} days</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-300">Group</span>
                                        <span className="font-semibold text-ocean-200">{trip.groupType || '—'}</span>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={handleContinue}
                                    disabled={!canContinue}
                                    whileHover={canContinue ? { scale: 1.03 } : {}}
                                    whileTap={canContinue ? { scale: 0.97 } : {}}
                                    className={`w-full mt-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${canContinue
                                        ? 'bg-white text-brand-600 shadow-lg hover:shadow-xl'
                                        : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'}`}
                                >
                                    Continue <ArrowRight size={16} />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Travel Tips */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="tip-card">
                            <h4 className="font-bold text-brand-700 mb-3 text-sm uppercase tracking-wide">Travel Tips</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">-</span>Budget stays offer great value in South India</li>
                                <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">-</span>3-4 days is ideal for most destinations</li>
                                <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">-</span>Local hosts provide free stays with food</li>
                            </ul>
                        </motion.div>

                        {/* Decorative Image */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="image-card h-48">
                            <img src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Scenic India" loading="lazy" />
                            <div className="image-card-overlay" />
                            <div className="absolute bottom-4 left-4 text-white z-10">
                                <p className="text-xs font-medium text-white/70">Discover</p>
                                <p className="font-bold text-lg">South India</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
