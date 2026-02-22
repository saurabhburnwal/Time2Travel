import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Clock, MapPin, DollarSign, Map, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { getPlacesForDestination } from '../data/mockData';

export default function Itinerary() {
    const { trip } = useTrip();
    const navigate = useNavigate();
    const [expandedDay, setExpandedDay] = useState<number | null>(0);

    const places = getPlacesForDestination(trip.destination);
    const placesPerDay = Math.ceil(places.length / trip.days);

    // Build day-wise itinerary
    const itinerary = Array.from({ length: trip.days }, (_, dayIdx) => {
        const dayPlaces = places.slice(dayIdx * placesPerDay, (dayIdx + 1) * placesPerDay);
        return dayPlaces.map((place, i) => {
            const startHour = 8 + i * 2;
            const h = startHour > 12 ? startHour - 12 : startHour;
            const ampm = startHour >= 12 ? 'PM' : 'AM';
            return {
                time: `${h}:00 ${ampm}`,
                place,
                distance: `${(1 + Math.random() * 5).toFixed(1)} km`,
            };
        });
    });

    const dayColors = ['from-brand-500 to-brand-400', 'from-ocean-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-warm', 'from-red-500 to-rose-500', 'from-brand-600 to-ocean-600', 'from-teal-500 to-green-500'];

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-4xl">
                <button onClick={() => navigate('/roadmap-options')} className="flex items-center gap-2 text-brand-600 mb-6"><ArrowLeft size={18} /> Back to Roadmaps</button>

                <div className="glass-card p-8 mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
                        Day-by-Day <span className="gradient-text">Itinerary</span>
                    </h1>
                    <p className="text-gray-500">{trip.selectedRoadmap?.type} — Starting from {trip.selectedStay}</p>
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
                                        <p className="text-sm text-gray-500">{dayItems.length} places to visit</p>
                                    </div>
                                </div>
                                <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedDay === dayIdx ? 'rotate-180' : ''}`} />
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
                                            {dayItems.map((item, itemIdx) => (
                                                <motion.div
                                                    key={itemIdx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: itemIdx * 0.08 }}
                                                    className="flex gap-4"
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
                                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <h4 className="font-bold text-gray-800">{item.place.name}</h4>
                                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.place.category}</span>
                                                                </div>
                                                                <span className="text-sm font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{item.time}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                                                                <div className="flex items-center gap-1"><Clock size={14} /> {item.place.visitTime}</div>
                                                                <div className="flex items-center gap-1"><MapPin size={14} /> {item.distance}</div>
                                                                <div className="flex items-center gap-1"><DollarSign size={14} /> ₹{item.place.entryFee}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button onClick={() => navigate('/map-view')} className="btn-primary flex-1 flex items-center justify-center gap-2">
                        <Map size={18} /> View on Map
                    </button>
                    <button onClick={() => navigate('/expense-breakdown')} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                        <DollarSign size={18} /> Expense Breakdown
                    </button>
                </div>
            </div>
        </AnimatedPage>
    );
}
