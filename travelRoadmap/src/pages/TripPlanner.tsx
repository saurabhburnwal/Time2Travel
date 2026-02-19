import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { STATES, DESTINATIONS, TRAVEL_TYPES, GROUP_TYPES } from '../data/mockData';

export default function TripPlanner() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();

    const canContinue = trip.state && trip.destination;

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles size={16} /> Trip Planner
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
                        Plan Your <span className="gradient-text">Perfect Trip</span>
                    </h1>
                    <p className="text-gray-500 text-lg">Tell us what you want and we'll create the perfect roadmap</p>
                </div>

                <div className="glass-card p-8 md:p-10">
                    <div className="space-y-8">
                        {/* Travel Type */}
                        <div>
                            <label className="floating-label">Travel Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {TRAVEL_TYPES.map(t => (
                                    <motion.button
                                        key={t.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => updateTrip('travelType', t.name)}
                                        className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${trip.travelType === t.name
                                                ? 'border-brand-400 bg-brand-50 shadow-lg shadow-brand-200/50'
                                                : 'border-gray-200 hover:border-brand-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="text-3xl block mb-2">{t.icon}</span>
                                        <span className="text-sm font-semibold text-gray-700">{t.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* State Selection */}
                        <div>
                            <label className="floating-label">Select State</label>
                            <select
                                value={trip.state}
                                onChange={e => { updateTrip('state', e.target.value); updateTrip('destination', ''); }}
                                className="select-field text-lg"
                            >
                                <option value="">Choose a state...</option>
                                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Destination */}
                        {trip.state && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }}>
                                <label className="floating-label">Select Destination</label>
                                <select
                                    value={trip.destination}
                                    onChange={e => updateTrip('destination', e.target.value)}
                                    className="select-field text-lg"
                                >
                                    <option value="">Choose destination...</option>
                                    {(DESTINATIONS[trip.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </motion.div>
                        )}

                        {/* Budget Slider */}
                        <div>
                            <label className="floating-label flex items-center justify-between">
                                <span>Budget Per Person</span>
                                <span className="text-lg font-bold gradient-text normal-case">₹{trip.budget.toLocaleString()}</span>
                            </label>
                            <input
                                type="range" min="2000" max="10000" step="500"
                                value={trip.budget}
                                onChange={e => updateTrip('budget', parseInt(e.target.value))}
                                className="w-full cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-2">
                                <span>₹2,000</span>
                                <span>₹10,000</span>
                            </div>
                        </div>

                        {/* Days */}
                        <div>
                            <label className="floating-label">Travel Days</label>
                            <div className="grid grid-cols-6 gap-2">
                                {[2, 3, 4, 5, 6, 7].map(d => (
                                    <motion.button
                                        key={d}
                                        whileHover={{ scale: 1.08 }}
                                        whileTap={{ scale: 0.92 }}
                                        onClick={() => updateTrip('days', d)}
                                        className={`py-3.5 rounded-xl font-bold text-lg transition-all duration-300 ${trip.days === d
                                                ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg shadow-brand-300/40'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {d}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Group Type */}
                        <div>
                            <label className="floating-label">Group Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {GROUP_TYPES.map(g => (
                                    <motion.button
                                        key={g.id}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => updateTrip('groupType', g.name)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${trip.groupType === g.name
                                                ? 'border-brand-400 bg-brand-50 shadow-lg'
                                                : 'border-gray-200 hover:border-brand-200'
                                            }`}
                                    >
                                        <span className="text-2xl block mb-1">{g.icon}</span>
                                        <span className="font-semibold text-gray-800 block">{g.name}</span>
                                        <span className="text-xs text-gray-500">{g.desc}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Preview Card */}
                        {canContinue && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-r from-brand-50 to-ocean-50 rounded-2xl p-6 border border-brand-100"
                            >
                                <h3 className="font-bold text-lg text-gray-800 mb-3">Trip Summary</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-500" /><span>{trip.destination}, {trip.state}</span></div>
                                    <div className="flex items-center gap-2"><DollarSign size={16} className="text-green-500" /><span>₹{trip.budget.toLocaleString()}/person</span></div>
                                    <div className="flex items-center gap-2"><Calendar size={16} className="text-ocean-500" /><span>{trip.days} days</span></div>
                                    {trip.groupType && <div className="flex items-center gap-2"><span>{GROUP_TYPES.find(g => g.name === trip.groupType)?.icon}</span><span>{trip.groupType}</span></div>}
                                </div>
                            </motion.div>
                        )}

                        {/* Continue Button */}
                        <motion.button
                            whileHover={canContinue ? { scale: 1.02 } : {}}
                            whileTap={canContinue ? { scale: 0.98 } : {}}
                            onClick={() => canContinue && navigate('/stay-selection')}
                            disabled={!canContinue}
                            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${canContinue
                                    ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-xl shadow-brand-300/30 hover:shadow-brand-300/50'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Continue to Stay Selection <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
