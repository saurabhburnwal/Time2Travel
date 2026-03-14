import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getHostProfile } from '../services/hostProfileService';
import { getHostReviews, HostReviewData } from '../services/hostReviewService';
import { DBHostProfile } from '../services/supabaseClient';
import HostNav from '../components/HostNav';
import { Loader2, Star, MessageCircle, CheckCircle, TrendingUp, BarChart2, Shield, MessageSquare, Heart, DollarSign } from 'lucide-react';

export default function HostReviews() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<DBHostProfile | null>(null);
    const [reviews, setReviews] = useState<HostReviewData[]>([]);

    useEffect(() => {
        if (!user) return;
        loadData();
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        const hostProfile = await getHostProfile(user!.id);
        setProfile(hostProfile);
        
        if (hostProfile) {
            const data = await getHostReviews(hostProfile.host_id);
            setReviews(data);
        }
        setLoading(false);
    };

    if (loading || !profile) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + r.overall_rating, 0) / totalReviews).toFixed(1) : 0;
    
    const distribution = [5, 4, 3, 2, 1].map(stars => ({
        stars,
        count: reviews.filter(r => Math.round(r.overall_rating) === stars).length,
        percentage: totalReviews > 0 ? (reviews.filter(r => Math.round(r.overall_rating) === stars).length / totalReviews) * 100 : 0
    }));

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <HostNav />
            
                {/* Hero Section */}
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg group bg-slate-900 mb-8 max-w-7xl mx-auto xl:px-0 px-4">
                    <img 
                        src="/images/bg.png" 
                        alt="Reviews Dashboard" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                    <div className="relative h-full flex flex-col justify-center px-10">
                         <div className="flex items-center gap-3 mb-2">
                             <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                             <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Public Sentiment</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Guest Feedback</h1>
                        <p className="text-slate-200 text-sm max-w-md">Detailed feedback and accolades from your global visitors.</p>
                    </div>
                </div>

            <div className="section-container max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <Star className="absolute -bottom-10 -right-10 text-white/5" size={200} />
                        <div className="relative z-10">
                            <p className="text-brand-400 mb-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                <Star size={16} /> Hospitaliy Excellence
                            </p>
                            <h2 className="text-5xl font-bold tracking-tight mb-8">{avgRating}</h2>
                            <div className="flex text-yellow-400 gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={24} fill={i < Math.round(Number(avgRating)) ? 'currentColor' : 'none'} className={i < Math.round(Number(avgRating)) ? 'text-yellow-400' : 'text-white/20'} strokeWidth={2.5} />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center border border-brand-100">
                            <Star size={20} />
                        </div>
                        <div className="mt-6">
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">{avgRating}</p>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Average Rating</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-ocean-50 text-ocean-600 rounded-xl flex items-center justify-center border border-ocean-100">
                            <CheckCircle size={20} />
                        </div>
                        <div className="mt-6">
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">{totalReviews}</p>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Total Reviews</p>
                        </div>
                    </div>
                </div>

                {totalReviews === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-100 max-w-3xl mx-auto">
                        <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
                            <Star size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">First impression pending</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">Once you conclude your first hosting event, reviews from your guests will appear here.</p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-brand-100">
                             <CheckCircle size={14} /> Trust scores start after 1 stay
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                        <div className="lg:col-span-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 w-full max-w-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                                            <BarChart2 className="text-brand-500" size={18} /> Score Distribution
                                        </h2>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                {distribution.map((item) => (
                                    <div key={item.stars} className="flex items-center gap-10">
                                        <div className="flex items-center justify-end gap-2 w-16 text-sm font-bold text-gray-400">
                                            {item.stars} <Star size={14} className="text-yellow-400" fill="currentColor" />
                                        </div>
                                        <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.percentage}%` }}
                                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: (5-item.stars)*0.1 }}
                                                className="h-full bg-gradient-to-r from-yellow-400 to-brand-500 rounded-full"
                                            />
                                        </div>
                                        <div className="w-16 text-right text-xs font-bold text-slate-900 tracking-tight">{item.percentage.toFixed(0)}%</div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            
                            <div className="w-px h-32 bg-slate-100 hidden md:block mx-4" />
                            
                            <div className="text-center md:text-left">
                                <p className="text-4xl font-bold tracking-tight text-gray-900">{avgRating}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">Aggregate across {totalReviews} reviews</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Live Feedback</h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chronological stream</span>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        <AnimatePresence>
                            {reviews.map(review => (
                                <motion.div 
                                    key={review.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                                >
                                    <div className="flex flex-col md:flex-row gap-10">
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-brand-600 to-ocean-600 text-white rounded-[28px] flex items-center justify-center flex-shrink-0 font-black text-3xl shadow-xl shadow-brand-500/20 border-4 border-white transform transition-transform group-hover:rotate-6">
                                                {review.reviewer_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="mt-4 flex flex-col items-center text-center">
                                                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm border border-emerald-100">
                                                    <CheckCircle size={10} /> Verified
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-xl tracking-tight">{review.reviewer_name}</h3>
                                                    <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wider">{new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                                <div className="flex text-yellow-400 gap-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={18} fill={i < review.overall_rating ? 'currentColor' : 'none'} className={i >= review.overall_rating ? 'text-slate-200' : ''} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed text-lg tracking-tight mb-8">
                                                "{review.notes}"
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Shield size={10} className="text-blue-500" /> Cleanliness</p>
                                                    <div className="flex text-yellow-500">
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.cleanliness_rating ? 'currentColor' : 'none'} className={i >= review.cleanliness_rating ? 'text-slate-200' : ''} />)}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><MessageSquare size={10} className="text-green-500" /> Comm.</p>
                                                    <div className="flex text-yellow-500">
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.communication_rating ? 'currentColor' : 'none'} className={i >= review.communication_rating ? 'text-slate-200' : ''} />)}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Heart size={10} className="text-rose-500" /> Hospitality</p>
                                                    <div className="flex text-yellow-500">
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.hospitality_rating ? 'currentColor' : 'none'} className={i >= review.hospitality_rating ? 'text-slate-200' : ''} />)}
                                                    </div>
                                                </div>
                                                <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100">
                                                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5"><DollarSign size={10} /> Contribution</p>
                                                    <p className="text-xs font-bold text-indigo-700 tracking-tight">₹{review.payment_amount}</p>
                                                </div>
                                            </div>
                                            
                                            {review.destination_name && (
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-slate-50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                                                            <MessageCircle size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Stay Portfolio</p>
                                                            <p className="text-xs font-bold text-gray-600 uppercase tracking-tight">{review.destination_name}</p>
                                                        </div>
                                                    </div>
                                                    <button className="px-6 py-3 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/10 active:scale-95">
                                                        Respond to Citation
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
