import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass, Users, DollarSign, Calendar, Sparkles, Trees, Mountain, Waves, Landmark, Moon, Globe, ArrowRight, Sun, AlertTriangle, CheckCircle2, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { DBDestination } from '../services/types';

import { fetchStates, fetchDestinations, fetchTravelTypes, fetchGroupTypes } from '../services/destinationsService';
import { DBTravelType, DBGroupType } from '../services/types';
import toast from 'react-hot-toast';

const TRAVEL_TYPE_ICONS: Record<string, React.ReactNode> = {
    'Nature':    <Trees size={20} />,
    'Adventure': <Mountain size={20} />,
    'Beach':     <Waves size={20} />,
    'Heritage':  <Landmark size={20} />,
    'Nightlife': <Moon size={20} />,
};

const TRAVEL_TYPE_COLORS: Record<string, string> = {
    'Nature':    'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Adventure': 'bg-orange-100 text-orange-700 border-orange-200',
    'Beach':     'bg-cyan-100 text-cyan-700 border-cyan-200',
    'Heritage':  'bg-amber-100 text-amber-700 border-amber-200',
    'Nightlife': 'bg-purple-100 text-purple-700 border-purple-200',
};

const GROUP_TYPE_ICONS: Record<string, React.ReactNode> = {
    'Solo':    <Compass size={18} />,
    'Duo':     <Users size={18} />,
    'Family':  <Users size={18} />,
    'Friends': <Users size={18} />,
};

const DESTINATION_IMAGES = [
    '/images/how_img1.jpg',
    '/images/trip_bg1.jpg',
    '/images/how_img3.jpg',
    '/images/dest_pondicherry.jpg',
];

// ── Season helpers ─────────────────────────────────────────────────────────────
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_SHORT_TO_IDX: Record<string, number> = {
    jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11
};

/** Returns true if the current month falls inside the best_season range (e.g. "Nov-Feb") */
function isInSeason(bestSeason: string | undefined): boolean {
    if (!bestSeason) return false;
    const parts = bestSeason.toLowerCase().split('-');
    if (parts.length !== 2) return false;
    const start = MONTH_SHORT_TO_IDX[parts[0]?.trim()];
    const end   = MONTH_SHORT_TO_IDX[parts[1]?.trim()];
    if (start === undefined || end === undefined) return false;
    const now = new Date().getMonth(); // 0-based
    if (start <= end) return now >= start && now <= end;
    // wraps around year boundary e.g. Nov-Feb
    return now >= start || now <= end;
}

/** Format "Nov-Feb" → "Nov – Feb" */
function formatSeason(s: string): string {
    return s.replace('-', ' – ');
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function TripPlanner() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();

    const [states, setStates] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<DBDestination[]>([]);
    const [travelTypes, setTravelTypes] = useState<DBTravelType[]>([]);
    const [groupTypes, setGroupTypes] = useState<DBGroupType[]>([]);
    const [loading, setLoading] = useState(true);
    const [destLoading, setDestLoading] = useState(false);

    // Store the full DBDestination of whatever is selected
    const [selectedDest, setSelectedDest] = useState<DBDestination | null>(null);

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

    // Refetch destinations whenever state or travelType changes
    useEffect(() => {
        if (!trip.state) { setDestinations([]); setSelectedDest(null); return; }
        (async () => {
            setDestLoading(true);
            const d = await fetchDestinations(trip.state, trip.travelType || undefined);
            setDestinations(d);
            // If current destination is still in the list keep it, else clear
            if (trip.destination) {
                const found = d.find(x => x.name === trip.destination);
                setSelectedDest(found || null);
                if (!found) updateTrip({ destination: '' });
            }
            setDestLoading(false);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip.state, trip.travelType]);

    // Sort: in-season first, then by place_type_count desc, then alphabetically
    const sortedDestinations = useMemo(() => {
        return [...destinations].sort((a, b) => {
            const aIn = isInSeason(a.best_season) ? 1 : 0;
            const bIn = isInSeason(b.best_season) ? 1 : 0;
            if (aIn !== bIn) return bIn - aIn;
            const aC = a.place_type_count ?? 0;
            const bC = b.place_type_count ?? 0;
            if (aC !== bC) return bC - aC;
            return a.name.localeCompare(b.name);
        });
    }, [destinations]);

    // Max place_type_count for affinity bar percentage
    const maxTypeCount = useMemo(
        () => Math.max(1, ...destinations.map(d => d.place_type_count ?? 0)),
        [destinations]
    );

    const inSeasonCount = useMemo(() => destinations.filter(d => isInSeason(d.best_season)).length, [destinations]);

    const canContinue = trip.state && trip.destination;

    const handleContinue = () => {
        if (!canContinue) { toast.error('Please select state and destination'); return; }
        navigate('/stay-selection');
    };

    const travelColors = ['from-green-400 to-emerald-500', 'from-orange-400 to-red-500', 'from-cyan-400 to-blue-500', 'from-amber-400 to-yellow-600', 'from-brand-400 to-ocean-300'];

    const StepHeader = ({ step, title, subtitle, icon }: { step: number; title: string; subtitle: string; icon: React.ReactNode }) => (
        <div className="flex items-center gap-4 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-ocean-400 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                {step}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">{icon} {title}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
            </div>
        </div>
    );

    return (
        <AnimatedPage className="page-bg pt-20 pb-16 min-h-screen">
            <div className="page-decorations">
                <div className="deco-blob deco-blob-1 animate-pulse-soft" />
                <div className="deco-blob deco-blob-2 animate-pulse-soft" style={{ animationDelay: '2s' }} />
            </div>

            <div className="section-container max-w-5xl relative z-10">
                {/* Hero Banner */}
                <div className="hero-banner mb-10">
                    <img src="/images/trip_south.jpg" alt="South India travel" loading="eager" />
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
                    {/* ── Left Column: Main Form ── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Step 1: Travel Type */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="feature-card">
                            <StepHeader step={1} title="Choose Your Interests" subtitle="What kind of experience are you looking for?" icon={<Compass size={18} className="text-brand-500" />} />
                            <div className="flex flex-wrap gap-3">
                                {travelTypes.map((type, i) => (
                                    <button
                                        key={type.id}
                                        onClick={() => updateTrip({ travelType: trip.travelType === type.name ? '' : type.name })}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${trip.travelType === type.name
                                            ? `bg-gradient-to-r ${travelColors[i % travelColors.length]} text-white shadow-lg scale-105`
                                            : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:border-brand-300 hover:bg-brand-50/50'}`}
                                    >
                                        {TRAVEL_TYPE_ICONS[type.name] || <Compass size={18} />}
                                        {type.name}
                                    </button>
                                ))}
                            </div>
                            {trip.travelType && (
                                <p className="mt-3 text-xs text-brand-600 flex items-center gap-1.5">
                                    <Filter size={12} /> Destinations are sorted by <strong>{trip.travelType}</strong> place count
                                </p>
                            )}
                        </motion.div>

                        {/* Step 2: State & Destination */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="feature-card">
                            <StepHeader step={2} title="Select Destination" subtitle="Pick your state, then choose a city to explore" icon={<MapPin size={18} className="text-brand-500" />} />

                            {/* State selector */}
                            <div className="mb-5">
                                <label className="floating-label flex items-center gap-2"><MapPin size={14} /> State</label>
                                <select
                                    value={trip.state}
                                    onChange={e => { updateTrip({ state: e.target.value, destination: '' }); setSelectedDest(null); }}
                                    className="select-field mt-2"
                                >
                                    <option value="">Select State</option>
                                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            {/* Destination card grid */}
                            {trip.state && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="floating-label flex items-center gap-2"><MapPin size={14} /> Destination</label>
                                        {inSeasonCount > 0 && (
                                            <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                                <CheckCircle2 size={11} /> {inSeasonCount} in season now
                                            </span>
                                        )}
                                    </div>

                                    {destLoading ? (
                                        <div className="flex items-center justify-center py-8 text-gray-400 gap-2">
                                            <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                                            Loading destinations...
                                        </div>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
                                            <AnimatePresence>
                                                {sortedDestinations.map((dest, i) => {
                                                    const inSeason = isInSeason(dest.best_season);
                                                    const isSelected = trip.destination === dest.name;
                                                    const affinity = dest.place_type_count ?? 0;
                                                    const affinityPct = Math.round((affinity / maxTypeCount) * 100);

                                                    return (
                                                        <motion.button
                                                            key={dest.name}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: i * 0.03 }}
                                                            onClick={() => {
                                                                updateTrip({ destination: dest.name });
                                                                setSelectedDest(dest);
                                                            }}
                                                            className={`text-left p-3.5 rounded-xl border-2 transition-all duration-200 w-full
                                                                ${isSelected
                                                                    ? 'border-brand-500 bg-brand-50 shadow-md shadow-brand-100'
                                                                    : 'border-gray-200 bg-white hover:border-brand-300 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            <div className="flex items-start justify-between gap-2 mb-1.5">
                                                                <span className={`font-semibold text-sm ${isSelected ? 'text-brand-700' : 'text-gray-800'}`}>
                                                                    {dest.name}
                                                                </span>
                                                                {inSeason ? (
                                                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1 flex-shrink-0">
                                                                        <CheckCircle2 size={9} /> In Season
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-[10px] font-medium bg-gray-100 text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                                                                        Off Season
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Best season */}
                                                            {dest.best_season && (
                                                                <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1.5">
                                                                    <Sun size={10} className="text-amber-400" />
                                                                    Best: {formatSeason(dest.best_season)}
                                                                </div>
                                                            )}

                                                            {/* Description snippet */}
                                                            {dest.description && (
                                                                <p className={`text-[11px] leading-relaxed mb-2 line-clamp-2 ${isSelected ? 'text-brand-600' : 'text-gray-400'}`}>
                                                                    {dest.description}
                                                                </p>
                                                            )}

                                                            {/* Travel type affinity bar (only when travelType selected) */}
                                                            {trip.travelType && affinity > 0 && (
                                                                <div className="mt-1">
                                                                    <div className="flex justify-between items-center mb-1">
                                                                        <span className={`text-[10px] font-medium ${TRAVEL_TYPE_COLORS[trip.travelType] || 'bg-gray-100 text-gray-600 border-gray-200'} px-1.5 py-0.5 rounded border`}>
                                                                            {affinity} {trip.travelType} places
                                                                        </span>
                                                                    </div>
                                                                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                                                        <motion.div
                                                                            initial={{ width: 0 }}
                                                                            animate={{ width: `${affinityPct}%` }}
                                                                            transition={{ duration: 0.6, delay: i * 0.02 }}
                                                                            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-ocean-400"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {trip.travelType && affinity === 0 && (
                                                                <span className="text-[10px] text-gray-400 mt-1 block">
                                                                    No {trip.travelType} places
                                                                </span>
                                                            )}
                                                        </motion.button>
                                                    );
                                                })}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>

                        {/* Step 3: Budget & Days */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="feature-card">
                            <StepHeader step={3} title="Set Your Budget & Duration" subtitle="Adjust your spending limit and trip length" icon={<DollarSign size={18} className="text-brand-500" />} />
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="floating-label flex items-center gap-2"><DollarSign size={14} /> Set Your Budget</label>
                                        <div className="relative group">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-500 font-bold text-sm">₹</span>
                                            <input
                                                type="number"
                                                value={trip.budget === 0 ? '' : trip.budget}
                                                onChange={e => {
                                                    const val = e.target.value === '' ? 0 : Number(e.target.value);
                                                    updateTrip({ budget: val });
                                                }}
                                                className="w-32 pl-7 pr-3 py-2 bg-white border-2 border-gray-100 rounded-xl text-base font-bold text-gray-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-sm group-hover:border-gray-200"
                                                placeholder="Amount"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <input
                                            type="range" min={2000} max={30000} step={500}
                                            value={trip.budget || 2000}
                                            onChange={e => updateTrip({ budget: Number(e.target.value) })}
                                            className="w-full accent-brand-500 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between mt-3 px-1">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Min ₹2k</span>
                                            <div className="text-center">
                                                <span className="text-sm font-extrabold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                                                    Current: ₹{Number(trip.budget || 0).toLocaleString()}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Max ₹30k</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="floating-label flex items-center gap-2"><Calendar size={14} /> Days</label>
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

                        {/* Step 4: Group Type */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="feature-card">
                            <StepHeader step={4} title="Who's Traveling?" subtitle="Select your travel group type" icon={<Users size={18} className="text-brand-500" />} />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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

                    {/* ── Right Column: Summary + Tips ── */}
                    <div className="space-y-6">
                        {/* Live Trip Summary */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="travel-strip text-white">
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

                                    {/* Best Season info — shown once destination is selected */}
                                    {selectedDest?.best_season && (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300 flex items-center gap-1.5">
                                                    <Sun size={12} className="text-amber-400" /> Best Season
                                                </span>
                                                <span className="font-semibold text-ocean-200">{formatSeason(selectedDest.best_season)}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300">Season Status</span>
                                                {isInSeason(selectedDest.best_season) ? (
                                                    <span className="flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                                                        <CheckCircle2 size={12} /> In Season ✓
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
                                                        <AlertTriangle size={12} /> Off Season
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    )}

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

                                {/* Off-season advisory */}
                                {selectedDest?.best_season && !isInSeason(selectedDest.best_season) && (
                                    <div className="mt-4 p-3 bg-amber-500/20 border border-amber-400/30 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                                        <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                                        <span>
                                            You're outside the ideal season for {trip.destination}. Best time is <strong>{formatSeason(selectedDest.best_season)}</strong>. Expect different weather & conditions.
                                        </span>
                                    </div>
                                )}

                                {/* Destination description */}
                                {selectedDest?.description && (
                                    <div className="mt-4 p-3 bg-white/10 border border-white/20 rounded-xl">
                                        <p className="text-[10px] text-white/50 font-semibold mb-1.5 uppercase tracking-wide flex items-center gap-1">
                                            <MapPin size={9} /> About {trip.destination}
                                        </p>
                                        <p className="text-xs text-white/80 leading-relaxed line-clamp-4">{selectedDest.description}</p>
                                    </div>
                                )}

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
                                <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">-</span>🟢 In Season destinations have better weather & lower crowds</li>
                                <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">-</span>Select a travel type to see how many matching spots each city has</li>
                                <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">-</span>Budget stays offer great value in South India</li>
                                <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">-</span>3-4 days is ideal for most destinations</li>
                            </ul>
                        </motion.div>

                        {/* Decorative Image */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="image-card h-48">
                            <img src="/images/trip_scenic.jpg" alt="Scenic India" loading="lazy" />
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
