import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Download, Map, Shield, Phone, Star, MessageSquare, RotateCcw, MapPin, Calendar, DollarSign, Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useTrip } from '../contexts/TripContext';
import { EMERGENCY_CONTACTS, SOLO_SAFETY_TIPS } from '../data/mockData';
import toast from 'react-hot-toast';

export default function FinalReview() {
    const { trip, resetTrip } = useTrip();
    const navigate = useNavigate();
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [showSafety, setShowSafety] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const handleSubmitReview = () => {
        if (reviewRating === 0) { toast.error('Please select a rating'); return; }
        setReviewSubmitted(true);
        toast.success('Thank you for your review! 🎉');
    };

    const handleNewTrip = () => {
        resetTrip();
        navigate('/');
    };

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-3xl">
                <div className="glass-card p-8 mb-6">
                    <div className="text-center mb-8">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-300/40">
                                <span className="text-3xl">🎉</span>
                            </div>
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Your Trip is Ready!</h1>
                        <p className="text-gray-500">Download your complete travel pack and hit the road</p>
                    </div>

                    {/* Trip Summary Card */}
                    <div className="bg-gradient-to-br from-brand-50/80 to-ocean-50/80 rounded-2xl p-6 mb-8 border border-brand-100">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Trip Summary</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-500" /><div><p className="text-gray-400">Destination</p><p className="font-semibold text-gray-800">{trip.destination}, {trip.state}</p></div></div>
                            <div className="flex items-center gap-2"><Calendar size={16} className="text-ocean-500" /><div><p className="text-gray-400">Duration</p><p className="font-semibold text-gray-800">{trip.days} days</p></div></div>
                            <div className="flex items-center gap-2"><Home size={16} className="text-green-500" /><div><p className="text-gray-400">Stay</p><p className="font-semibold text-gray-800">{(trip.selectedStay as any)?.name}</p></div></div>
                            <div className="flex items-center gap-2"><DollarSign size={16} className="text-yellow-500" /><div><p className="text-gray-400">Budget</p><p className="font-semibold text-gray-800">₹{trip.budget.toLocaleString()}</p></div></div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-8">
                        <button className="w-full p-4 bg-gradient-to-r from-brand-500 to-ocean-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all">
                            <Download size={20} /> Download Complete Itinerary (PDF)
                        </button>
                        <button onClick={() => navigate('/map-view')} className="w-full p-4 bg-white border-2 border-brand-200 text-brand-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-all">
                            <Map size={20} /> View Interactive Map
                        </button>
                        <button onClick={() => setShowSafety(!showSafety)} className="w-full p-4 bg-white border-2 border-green-200 text-green-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-50 transition-all">
                            <Shield size={20} /> Safety Contacts & Emergency Info
                        </button>
                    </div>

                    {/* Safety Section */}
                    {showSafety && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8">
                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                <h3 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2"><Shield size={20} /> Emergency Contacts</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                    {EMERGENCY_CONTACTS.map(c => (
                                        <div key={c.name} className="bg-white rounded-xl p-3 text-center shadow-sm">
                                            <span className="text-2xl block mb-1">{c.icon}</span>
                                            <p className="text-xs text-gray-500">{c.name}</p>
                                            <a href={`tel:${c.number}`} className="text-lg font-bold text-green-700">{c.number}</a>
                                        </div>
                                    ))}
                                </div>

                                {trip.groupType === 'Solo' && (
                                    <>
                                        <h4 className="font-bold text-green-800 mb-3">🧍 Solo Traveler Safety Tips</h4>
                                        <ul className="space-y-2">
                                            {SOLO_SAFETY_TIPS.map((tip, i) => (
                                                <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                                                    <span className="text-green-500 mt-0.5">✓</span> {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {trip.stayType === 'host' && (
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Phone size={16} /> Host Contact</h4>
                                        <p className="text-sm text-blue-700"><strong>{(trip.selectedStay as any)?.name}</strong></p>
                                        <p className="text-sm text-blue-600">Contact will be shared after booking confirmation</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Review Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MessageSquare size={20} className="text-brand-500" /> Rate Your Experience</h3>
                        {reviewSubmitted ? (
                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6">
                                <div className="text-4xl mb-2">🙏</div>
                                <p className="font-semibold text-gray-800">Thanks for your feedback!</p>
                                <p className="text-sm text-gray-500">Your review helps other travelers</p>
                            </motion.div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-sm text-gray-600">Your Rating:</span>
                                    <StarRating rating={reviewRating} onRate={setReviewRating} size={28} interactive />
                                </div>
                                <textarea
                                    value={reviewComment}
                                    onChange={e => setReviewComment(e.target.value)}
                                    placeholder="Share your experience with Time2Travel..."
                                    className="input-field min-h-[100px] resize-none mb-4"
                                />
                                <button onClick={handleSubmitReview} className="btn-primary w-full text-center justify-center">
                                    Submit Review
                                </button>
                            </>
                        )}
                    </div>

                    {/* Safety Warning */}
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                            <strong>🛡️ Safety First:</strong> Share your itinerary with family. Keep emergency contacts handy. Travel smart!
                        </p>
                    </div>

                    <button onClick={handleNewTrip} className="w-full p-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <RotateCcw size={18} /> Plan Another Trip
                    </button>
                </div>
            </div>
        </AnimatedPage>
    );
}
