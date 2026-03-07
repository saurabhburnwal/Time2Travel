import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, DollarSign, Calendar, ArrowLeft, ChevronRight, Zap, Wallet, Mountain, Scale, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { generateRoadmap, saveRoadmapToDB, saveExpenses } from '../lib/supabaseService';
import toast from 'react-hot-toast';

export default function RoadmapOptions() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [roadmaps, setRoadmaps] = useState<any[]>([]);
    const [savingMap, setSavingMap] = useState<number | null>(null);

    useEffect(() => {
        async function fetchRoadmaps() {
            setLoading(true);
            const req = {
                destination: trip.destination,
                days: trip.days,
                budget: trip.budget,
                travelType: trip.travelType,
                groupType: trip.groupType,
                accommodationPerNight: trip.stayType === 'hotel' ? trip.hotelPrice : 0
            };
            const res = await generateRoadmap(req);
            if (res.success && res.roadmaps) {
                const mapped = [];
                let id = 1;
                for (const [key, rm] of Object.entries(res.roadmaps as Record<string, any>)) {
                    if (!rm) continue;
                    let icon, gradient, intensity;
                    if (key === 'fastest') { icon = <Zap size={24} />; gradient = 'from-orange-400 to-pink-500'; intensity = 'High'; }
                    else if (key === 'budget') { icon = <Wallet size={24} />; gradient = 'from-green-400 to-emerald-500'; intensity = 'Relaxed'; }
                    else continue;

                    mapped.push({
                        id: id++,
                        type: rm.label || key,
                        icon,
                        desc: rm.description || '',
                        totalDistance: `${rm.totalDistanceKm} km`,
                        estimatedCost: rm.expenses?.total || (trip.budget * 0.8), // fallback
                        placesCount: rm.orderedPlaces?.length || 0,
                        intensity,
                        gradient,
                        rawData: rm // keep original
                    });
                }
                setRoadmaps(mapped);
            } else {
                toast.error(res.error || 'Failed to generate roadmaps.');
            }
            setLoading(false);
        }

        if (trip.destination) {
            fetchRoadmaps();
        } else {
            navigate('/');
        }
    }, [trip, navigate]);

    const handleSelect = async (rm: any) => {
        setSavingMap(rm.id);
        const saveRes = await saveRoadmapToDB({
            destination: trip.destination,
            days: trip.days,
            budget: trip.budget,
            routeStyle: rm.type,
            stayType: trip.stayType || 'hotel',
            selectedStay: trip.selectedStay || '',
            orderedPlaces: rm.rawData.orderedPlaces,
            totalDistanceKm: rm.rawData.totalDistanceKm,
            estimatedCost: rm.estimatedCost
        });

        if (saveRes?.roadmapId) {
            if (rm.rawData.expenses) {
                await saveExpenses(saveRes.roadmapId, {
                    accommodation: rm.rawData.expenses.accommodation,
                    food: rm.rawData.expenses.food,
                    transport: rm.rawData.expenses.transport,
                    entry_fees: rm.rawData.expenses.entryFees
                });
            }
            updateTrip({
                selectedRoadmap: { type: rm.type, ...rm.rawData },
                places: rm.rawData.orderedPlaces || []
            });
            navigate('/itinerary');
        } else {
            setSavingMap(null);
            toast.error('Failed to save roadmap. Please try again.');
        }
    };

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-5xl">
                <button onClick={() => navigate('/stay-selection')} className="flex items-center gap-2 text-brand-600 mb-6"><ArrowLeft size={18} /> Change Stay</button>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
                        Your <span className="gradient-text">Smart Roadmaps</span>
                    </h1>
                    <p className="text-gray-500 text-lg">Based on your stay at <strong>{trip.selectedStay}</strong></p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-brand-500 mb-4" size={48} />
                        <h2 className="text-2xl font-bold text-gray-700">Generating optimal routes...</h2>
                        <p className="text-gray-500 mt-2">Analyzing locations, travel times, and your preferences.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {roadmaps.map((rm, i) => (
                            <motion.div
                                key={rm.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                whileHover={{ y: -5 }}
                                onClick={() => handleSelect(rm)}
                                className={`glass-card p-8 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${savingMap === rm.id ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {savingMap === rm.id && (
                                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center">
                                        <Loader2 className="animate-spin text-brand-500 mb-2" size={32} />
                                        <span className="font-semibold text-gray-700">Saving...</span>
                                    </div>
                                )}
                                {/* Decorative gradient */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${rm.gradient}`} />

                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rm.gradient} flex items-center justify-center text-white shadow-lg`}>
                                            {rm.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">{rm.type}</h2>
                                            <p className="text-sm text-gray-500">{rm.desc}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Home size={18} className="text-gray-400" />
                                        <span>{trip.selectedStay}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin size={18} className="text-gray-400" />
                                        <span>{rm.totalDistance} total travel</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <DollarSign size={18} className="text-gray-400" />
                                        <span>₹{rm.estimatedCost.toLocaleString()} estimated</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar size={18} className="text-gray-400" />
                                        <span>{rm.placesCount} spots in {trip.days} days</span>
                                    </div>
                                </div>

                                {/* Budget bar */}
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-500">Budget Usage</span>
                                        <span className="font-semibold">₹{rm.estimatedCost.toLocaleString()} / ₹{trip.budget.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, (rm.estimatedCost / trip.budget) * 100)}%` }}
                                            transition={{ duration: 1, delay: i * 0.3 }}
                                            className={`h-full rounded-full bg-gradient-to-r ${rm.gradient}`}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {rm.estimatedCost <= trip.budget
                                            ? `₹${(trip.budget - rm.estimatedCost).toLocaleString()} remaining`
                                            : `₹${(rm.estimatedCost - trip.budget).toLocaleString()} over budget`}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-2 mt-6 text-brand-600 font-semibold group-hover:gap-3 transition-all">
                                    Select This Roadmap <ChevronRight size={18} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </AnimatedPage>
    );
}
