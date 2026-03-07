import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, DollarSign, Calendar, ArrowLeft, ChevronRight, Zap, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';

export default function RoadmapOptions() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();

    const stayCost = trip.stayType === 'hotel' ? 2000 * trip.days : 0;

    const roadmaps = [
        {
            id: 1, type: 'Fastest Route', icon: <Zap size={24} />,
            desc: 'Optimized for minimum travel time between locations',
            totalDistance: `${Math.round(30 + Math.random() * 30)} km`,
            estimatedCost: Math.round(stayCost + 800 + 1200 + 350),
            placesCount: Math.min(10, trip.days * 3 + 1),
            intensity: 'Moderate',
            gradient: 'from-orange-400 to-pink-500',
        },
        {
            id: 2, type: 'Budget Efficient', icon: <Wallet size={24} />,
            desc: 'Maximizes experiences while minimizing costs',
            totalDistance: `${Math.round(20 + Math.random() * 25)} km`,
            estimatedCost: Math.round(stayCost + 500 + 900 + 200),
            placesCount: Math.min(8, trip.days * 2 + 2),
            intensity: 'Relaxed',
            gradient: 'from-green-400 to-emerald-500',
        },
    ];

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

                <div className="grid md:grid-cols-2 gap-6">
                    {roadmaps.map((rm, i) => (
                        <motion.div
                            key={rm.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            onClick={() => { updateTrip({ selectedRoadmap: rm }); navigate('/itinerary'); }}
                            className="glass-card p-8 cursor-pointer group hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                        >
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
            </div>
        </AnimatedPage>
    );
}
