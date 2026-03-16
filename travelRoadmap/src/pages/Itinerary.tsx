import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Clock, MapPin, DollarSign, Map, ArrowLeft, Trash2, Plus, Loader2, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { fetchAllPlacesForDestination } from '../services/placesService';
import { updateRoadmapPlaces } from '../services/roadmapsService';
import { Place } from '../services/types';
import toast from 'react-hot-toast';

// Haversine distance calculation (km)
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1.25; // Matching backend road multiplier
}

export default function Itinerary() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();
    const [expandedDay, setExpandedDay] = useState<number | null>(0);
    const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingAvailable, setLoadingAvailable] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const places = trip.places || [];

    // Helper to get consistent ID
    const getPlaceId = (p: any) => p?.place_id || p?.id;
    
    // Fetch all places for this destination back to allow "Adding"
    useEffect(() => {
        if (!trip.destination) return;
        (async () => {
            setLoadingAvailable(true);
            const all = await fetchAllPlacesForDestination(trip.destination);
            // Filter out those already in itinerary
            const filtered = all.filter(p => !places.some(sp => getPlaceId(sp) === getPlaceId(p)));
            setAvailablePlaces(filtered);
            setLoadingAvailable(false);
        })();
    }, [trip.destination, places.length]);

    const handleRemovePlace = (placeId: number) => {
        const updated = places.filter(p => getPlaceId(p) !== placeId);
        updateTrip({ places: updated });
        setHasChanges(true);
        toast.success('Place removed from itinerary');
    };

    const handleAddPlace = (place: Place) => {
        const updated = [...places, place];
        updateTrip({ places: updated });
        setHasChanges(true);
        setShowAddModal(false);
        setSearchQuery('');
        toast.success(`${place.name} added to itinerary`);
    };

    const handleSaveChanges = async () => {
        if (!trip.selectedRoadmap?.roadmap_id) {
            toast.error('No saved roadmap found to update.');
            return;
        }
        setIsSaving(true);
        const success = await updateRoadmapPlaces(trip.selectedRoadmap.roadmap_id, places);
        if (success) {
            toast.success('Itinerary changes saved successfully!');
            setHasChanges(false);
        } else {
            toast.error('Failed to save changes.');
        }
        setIsSaving(false);
    };

    const placesPerDay = Math.ceil(places.length / (trip.days || 1));

    // Calculate total trip distance and cost
    let totalDist = 0;
    let totalEntryFees = 0;

    // Build day-wise itinerary with real distances
    const itinerary = Array.from({ length: trip.days || 1 }, (_, dayIdx) => {
        const dayPlaces = places.slice(dayIdx * placesPerDay, (dayIdx + 1) * placesPerDay);
        return dayPlaces.map((place: any, i: number) => {
            let distance = 0;
            const curLat = parseFloat(place.latitude || place.lat || 0);
            const curLng = parseFloat(place.longitude || place.lng || 0);
            totalEntryFees += (place.entry_fee || place.entryFee || 0);

            if (i === 0) {
                if (trip.stayLat && trip.stayLng && curLat && curLng) {
                    distance = haversineDistance(trip.stayLat, trip.stayLng, curLat, curLng);
                }
            } else {
                const prevPlace: any = dayPlaces[i - 1];
                const prevLat = parseFloat(prevPlace.latitude || prevPlace.lat || 0);
                const prevLng = parseFloat(prevPlace.longitude || prevPlace.lng || 0);
                if (prevLat && prevLng && curLat && curLng) {
                    distance = haversineDistance(prevLat, prevLng, curLat, curLng);
                }
            }

            totalDist += distance;
            return {
                place,
                distance: distance > 0 ? `${distance.toFixed(1)} km` : '—',
            };
        });
    });

    const dayColors = ['from-brand-500 to-brand-400', 'from-ocean-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-warm', 'from-red-500 to-rose-500', 'from-brand-600 to-ocean-600', 'from-teal-500 to-green-500'];

    const categories = Array.from(new Set(availablePlaces.map(p => p.category || p.travel_type || 'Other'))).filter(Boolean);

    const filteredAvailable = availablePlaces.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.travel_type || '').toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !selectedCategory || 
            (p.category || p.travel_type || 'Other') === selectedCategory;
            
        return matchesSearch && matchesCategory;
    });

    // Sort: prioritize the trip's selected travel type
    const finalDisplayAvailable = [...filteredAvailable].sort((a, b) => {
        const aType = (a.category || a.travel_type || '').toLowerCase();
        const bType = (b.category || b.travel_type || '').toLowerCase();
        const pref = (trip.travelType || '').toLowerCase();
        
        if (aType === pref && bType !== pref) return -1;
        if (aType !== pref && bType === pref) return 1;
        return 0;
    });

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => navigate('/roadmap-options')} className="flex items-center gap-2 text-brand-600 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Roadmaps
                    </button>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-brand-500 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5"
                    >
                        <Plus size={18} /> Add More Places
                    </button>
                </div>

                <div className="glass-card p-8 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                        <Sparkles size={120} className="text-brand-500" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold font-display mb-2">
                                Your <span className="gradient-text">Itinerary</span>
                            </h1>
                            <p className="text-gray-500 text-lg">Starting from {trip.selectedStay}</p>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/50 shadow-sm">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Distance</p>
                                <p className="text-lg font-bold text-brand-600">{totalDist.toFixed(0)} km</p>
                            </div>
                            <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/50 shadow-sm">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Places</p>
                                <p className="text-lg font-bold text-ocean-600">{places.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {itinerary.map((dayItems, dayIdx) => (
                        <motion.div
                            key={dayIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: dayIdx * 0.1 }}
                            className="glass-card overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedDay(expandedDay === dayIdx ? null : dayIdx)}
                                className="w-full p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dayColors[dayIdx % dayColors.length]} flex items-center justify-center text-white font-bold shadow-lg`}>
                                        {dayIdx + 1}
                                    </div>
                                    <div className="text-left">
                                        <span className="font-bold text-gray-800 text-lg">Day {dayIdx + 1}</span>
                                        <p className="text-sm text-gray-400">{dayItems.length} destinations planned</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    {expandedDay === dayIdx ? <span className="text-xs font-medium uppercase tracking-wider">Collapse</span> : <span className="text-xs font-medium uppercase tracking-wider">Details</span>}
                                    <ChevronDown className={`transition-transform duration-300 ${expandedDay === dayIdx ? 'rotate-180' : ''}`} size={18} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {expandedDay === dayIdx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 space-y-3">
                                            {dayItems.length === 0 ? (
                                                <div className="py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                    <MapPin size={24} className="text-gray-300 mx-auto mb-2" />
                                                    <p className="text-sm text-gray-400">No places assigned to this day.</p>
                                                </div>
                                            ) : (
                                                dayItems.map((item, itemIdx) => (
                                                    <motion.div
                                                        key={`${dayIdx}-${itemIdx}`}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: itemIdx * 0.08 }}
                                                        className="flex gap-4 group"
                                                    >
                                                        {/* Timeline */}
                                                        <div className="flex flex-col items-center pt-1">
                                                            <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${dayColors[dayIdx % dayColors.length]} shadow-md`} />
                                                            {itemIdx < dayItems.length - 1 && (
                                                                <div className="w-0.5 flex-1 bg-gradient-to-b from-brand-200 to-transparent mt-1" />
                                                            )}
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 pb-4">
                                                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-brand-100 transition-all relative">
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); handleRemovePlace(getPlaceId(item.place)); }}
                                                                    className="absolute top-4 right-4 p-2 rounded-lg bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                                                    title="Remove from trip"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                                <div className="flex justify-between items-start mb-2 pr-10">
                                                                    <div>
                                                                        <h4 className="font-bold text-gray-800 text-lg leading-tight">{item.place.name}</h4>
                                                                        <span className="text-[10px] uppercase tracking-wider font-bold text-brand-500 bg-brand-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                                                                            {item.place.category || item.place.travel_type || 'Attraction'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500"><Clock size={14} /></div>
                                                                        {item.place.visitTime || `${item.place.avg_visit_time || 60} min`}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 font-medium text-brand-600">
                                                                        <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-brand-500"><MapPin size={14} /></div>
                                                                        {item.distance}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-green-500"><DollarSign size={14} /></div>
                                                                        ₹{item.place.entryFee ?? item.place.entry_fee ?? 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Add Place Modal */}
                <AnimatePresence>
                    {showAddModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }}
                                onClick={() => setShowAddModal(false)}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-white rounded-[32px] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl relative z-10 flex flex-col"
                            >
                                <div className="p-8 border-b border-gray-100 bg-gradient-to-br from-brand-50 to-white">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                                <Sparkles size={24} className="text-brand-500" />
                                                Discover {trip.destination}
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">Found {availablePlaces.length} premium attractions for you</p>
                                        </div>
                                        <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 shadow-sm border border-gray-100">
                                            <X size={24} />
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                                            <input 
                                                type="text"
                                                placeholder="Search by name or category..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm transition-all"
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-2">
                                            <button
                                                onClick={() => setSelectedCategory(null)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${!selectedCategory ? 'bg-brand-500 text-white border-brand-500 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-300'}`}
                                            >
                                                All Categories
                                            </button>
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCategory === cat ? 'bg-brand-500 text-white border-brand-500 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-300'} ${trip.travelType === cat ? 'ring-2 ring-brand-200' : ''}`}
                                                >
                                                    {cat} {trip.travelType === cat && '✨'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-gray-50/30">
                                    {loadingAvailable ? (
                                        <div className="text-center py-16">
                                            <Loader2 className="animate-spin mx-auto text-brand-500 mb-4" size={48} />
                                            <p className="text-gray-500 font-medium">Curating potential stops...</p>
                                        </div>
                                    ) : finalDisplayAvailable.length === 0 ? (
                                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                                            <MapPin size={48} className="text-gray-200 mx-auto mb-4" />
                                            <p className="text-gray-500 font-medium">No destinations match your filters.</p>
                                            <button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }} className="text-brand-600 font-bold mt-2">Clear filters</button>
                                        </div>
                                    ) : (
                                        finalDisplayAvailable.map((place, i) => (
                                            <motion.div 
                                                key={getPlaceId(place)}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.03 }}
                                                className="flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all group"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 text-lg group-hover:text-brand-600 transition-colors">{place.name}</h4>
                                                    <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-2">
                                                        <span className="bg-gray-50 px-2 py-1 rounded-lg font-bold uppercase tracking-tighter text-[9px] text-gray-500 border border-gray-100">
                                                            {place.category || place.travel_type}
                                                        </span>
                                                        <span className="flex items-center gap-1"><DollarSign size={10} className="text-green-500" /> ₹{place.entry_fee ?? place.entryFee ?? 0}</span>
                                                        <span className="flex items-center gap-1"><Clock size={10} className="text-orange-500" /> {place.avg_visit_time || place.visitMinutes || 60} min</span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => handleAddPlace(place)}
                                                    className="shrink-0 bg-brand-50 text-brand-600 px-6 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:bg-brand-500 hover:text-white transition-all active:scale-95"
                                                >
                                                    Add
                                                </button>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12 mb-8">
                    {hasChanges && (
                        <button 
                            onClick={handleSaveChanges} 
                            disabled={isSaving}
                            className="btn-primary bg-emerald-600 hover:bg-emerald-700 flex-[1.5] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 py-4"
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                            <span className="font-bold uppercase tracking-wider text-sm">Save Final Changes</span>
                        </button>
                    )}
                    <button onClick={() => navigate('/map-view')} className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 bg-slate-800 hover:bg-slate-900 border-none">
                        <Map size={20} /> <span className="font-bold uppercase tracking-wider text-sm text-white">Full Map</span>
                    </button>
                    <button onClick={() => navigate('/expense-breakdown')} className="btn-secondary flex-1 flex items-center justify-center gap-2 py-4 border-2">
                        <DollarSign size={20} /> <span className="font-bold uppercase tracking-wider text-sm">Breakdown</span>
                    </button>
                </div>
            </div>
        </AnimatedPage>
    );
}
