import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Star, Home, MessageSquare, Shield, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { apiPost, apiGet } from '../lib/api';
import toast from 'react-hot-toast';

interface HostReviewForm {
    hostName: string;
    propertyType: string;
    cleanliness: number;
    communication: number;
    hospitality: number;
    overall: number;
    paymentAmount: string;
    notes: string;
}

export default function HostFeedback() {
    const { roadmapId } = useParams<{ roadmapId: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [tripInfo, setTripInfo] = useState<any>(null);

    const [form, setForm] = useState<HostReviewForm>({
        hostName: '',
        propertyType: 'homestay',
        cleanliness: 5,
        communication: 5,
        hospitality: 5,
        overall: 5,
        paymentAmount: '',
        notes: '',
    });

    useEffect(() => {
        if (!roadmapId) return;
        (async () => {
            setLoading(true);
            try {
                const { success, data } = await apiGet<any>(`/api/roadmap/${roadmapId}`);
                if (success && data?.roadmap) {
                    setTripInfo(data.roadmap);
                    if (data.roadmap.selected_stay) {
                        setForm(prev => ({ ...prev, hostName: data.roadmap.selected_stay }));
                    }
                }
            } catch (err) {
                console.warn('Failed to fetch trip info:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, [roadmapId]);

    const handleSubmit = async () => {
        if (!form.hostName.trim()) {
            toast.error('Please enter the host name');
            return;
        }
        if (form.overall === 0) {
            toast.error('Please provide an overall rating');
            return;
        }

        setSubmitting(true);
        try {
            const { success } = await apiPost('/api/reviews/host', {
                roadmap_id: parseInt(roadmapId || '0'),
                host_id: tripInfo?.host_id || null,
                host_name: form.hostName,
                property_type: form.propertyType,
                cleanliness_rating: form.cleanliness,
                communication_rating: form.communication,
                hospitality_rating: form.hospitality,
                overall_rating: form.overall,
                payment_amount: parseFloat(form.paymentAmount) || 0,
                notes: form.notes,
            });

            if (success) {
                setSubmitted(true);
                toast.success('Thank you for your host feedback!');
            } else {
                toast.error('Failed to submit feedback. Please try again.');
            }
        } catch (err) {
            console.error('Host feedback error:', err);
            toast.error('An error occurred while submitting feedback.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please log in</h2>
                    <Link to="/login" className="btn-primary">Go to Login</Link>
                </div>
            </AnimatedPage>
        );
    }

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-2xl">
                <button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-brand-600 mb-6">
                    <ArrowLeft size={18} /> Back to Profile
                </button>

                <div className="glass-card p-8">
                    <div className="text-center mb-8">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-300/40">
                                <Home size={28} className="text-white" />
                            </div>
                        </motion.div>
                        <h1 className="text-2xl md:text-3xl font-bold font-display mb-2">
                            Local Host <span className="gradient-text">Feedback</span>
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {tripInfo ? `${tripInfo.destination}, ${tripInfo.state}` : 'Share your experience with your local host'}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="animate-spin text-brand-500" size={36} />
                        </div>
                    ) : submitted ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <Check size={32} className="text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Feedback Submitted!</h2>
                            <p className="text-gray-500 text-sm">Your review helps other travelers and supports local hosts.</p>
                            <button onClick={() => navigate('/profile')} className="btn-primary mt-6">
                                Back to Profile
                            </button>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            {/* Host Name */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Host Name</label>
                                <input
                                    type="text"
                                    value={form.hostName}
                                    onChange={e => setForm(prev => ({ ...prev, hostName: e.target.value }))}
                                    placeholder="e.g. Ravi's Homestay"
                                    className="input-field w-full"
                                />
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Property Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {['homestay', 'farmstay', 'guesthouse', 'cottage', 'apartment'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setForm(prev => ({ ...prev, propertyType: type }))}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                                                form.propertyType === type
                                                    ? 'bg-brand-500 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Categories */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
                                    <span className="font-medium text-gray-700 flex items-center gap-2">
                                        <Shield size={16} className="text-blue-500" /> Cleanliness
                                    </span>
                                    <StarRating rating={form.cleanliness} onRate={(r) => setForm(prev => ({ ...prev, cleanliness: r }))} size={24} interactive />
                                </div>
                                <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
                                    <span className="font-medium text-gray-700 flex items-center gap-2">
                                        <MessageSquare size={16} className="text-green-500" /> Communication
                                    </span>
                                    <StarRating rating={form.communication} onRate={(r) => setForm(prev => ({ ...prev, communication: r }))} size={24} interactive />
                                </div>
                                <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
                                    <span className="font-medium text-gray-700 flex items-center gap-2">
                                        <Star size={16} className="text-amber-500" /> Hospitality
                                    </span>
                                    <StarRating rating={form.hospitality} onRate={(r) => setForm(prev => ({ ...prev, hospitality: r }))} size={24} interactive />
                                </div>
                                <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
                                    <span className="font-medium text-gray-700 flex items-center gap-2">
                                        <Star size={16} className="text-yellow-500" /> Overall Experience
                                    </span>
                                    <StarRating rating={form.overall} onRate={(r) => setForm(prev => ({ ...prev, overall: r }))} size={24} interactive />
                                </div>
                            </div>

                            {/* Payment Amount */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Contribution / Payment to Host (₹)</label>
                                <input
                                    type="number"
                                    value={form.paymentAmount}
                                    onChange={e => setForm(prev => ({ ...prev, paymentAmount: e.target.value }))}
                                    placeholder="e.g. 500"
                                    className="input-field w-full"
                                />
                                <p className="text-xs text-gray-400 mt-1">If you paid anything for food or as a voluntary contribution.</p>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Additional Notes</label>
                                <textarea
                                    value={form.notes}
                                    onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                                    placeholder="Share details about your stay, the host's hospitality, food quality, etc."
                                    className="input-field w-full min-h-[120px] resize-none"
                                    rows={4}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="btn-primary w-full py-3 text-center flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                                ) : (
                                    <><Star size={18} /> Submit Feedback</>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
}
