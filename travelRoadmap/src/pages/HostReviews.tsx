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
            const data = await getHostReviews(user!.name);
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
            
            <div className="section-container py-10 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-brand-200">Public Sentiment</span>
                             <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic">Reviews</h1>
                        <p className="text-gray-400 font-medium text-lg">Detailed feedback and accolades from your global visitors.</p>
                    </div>

                    <div className="bg-white px-6 py-4 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Global Score</p>
                            <p className="text-2xl font-black text-slate-900 underline decoration-yellow-400 decoration-4 underline-offset-4">{avgRating}</p>
                         </div>
                         <div className="w-[1px] h-8 bg-slate-100" />
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Total Count</p>
                            <p className="text-2xl font-black text-slate-900 italic">{totalReviews}</p>
                         </div>
                    </div>
                </div>

                {totalReviews === 0 ? (
                    <div className="bg-white rounded-[40px] p-24 text-center shadow-sm border border-slate-100 max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-slate-100">
                            <Star size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter italic">First impression pending</h3>
                        <p className="text-gray-400 font-medium text-lg leading-relaxed mb-8">Once you conclude your first hosting event, reviews from your guests will illuminate this space.</p>
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-50 text-brand-600 rounded-xl text-xs font-black uppercase tracking-widest border border-brand-100">
                             <CheckCircle size={16} /> Trust scores start after 1 stay
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
                        <div className="lg:col-span-4 bg-slate-900 rounded-[48px] p-12 text-white flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
                            <Star className="absolute -top-10 -right-10 text-white/5" size={200} />
                            <h2 className="text-[10px] font-black text-brand-400 uppercase tracking-[0.2em] mb-8 italic">Hospitality Excellence</h2>
                            <div className="text-9xl font-black tracking-tighter mb-6 italic">{avgRating}</div>
                            <div className="flex text-yellow-400 gap-2 mb-8 bg-white/5 p-4 rounded-[32px] backdrop-blur-md border border-white/10">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={28} fill={i < Math.round(Number(avgRating)) ? 'currentColor' : 'none'} className={i < Math.round(Number(avgRating)) ? 'text-yellow-400' : 'text-white/20'} strokeWidth={2.5} />
                                ))}
                            </div>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Aggregate across {totalReviews} events</p>
                        </div>
                        
                        <div className="lg:col-span-8 bg-white rounded-[48px] p-12 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Score Distribution</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Quality breakdown</p>
                                </div>
                                <BarChart2 className="text-slate-200" size={32} />
                            </div>
                            <div className="space-y-8">
                                {distribution.map((item) => (
                                    <div key={item.stars} className="flex items-center gap-10">
                                        <div className="flex items-center justify-end gap-2 w-16 text-sm font-black text-gray-400 italic">
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
                                        <div className="w-16 text-right text-xs font-black text-slate-900 italic tracking-tighter">{item.percentage.toFixed(0)}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-5xl mx-auto space-y-10">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Live Feedback</h2>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chronological stream</span>
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
                                                    <h3 className="font-black text-gray-900 text-2xl tracking-tight italic">{review.reviewer_name}</h3>
                                                    <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest italic">{new Date(review.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                                <div className="flex text-yellow-400 gap-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={18} fill={i < review.overall_rating ? 'currentColor' : 'none'} className={i >= review.overall_rating ? 'text-slate-200' : ''} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed italic text-xl tracking-tight mb-8">
                                                "{review.notes}"
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Shield size={10} className="text-blue-500" /> Cleanliness</p>
                                                    <div className="flex text-yellow-500">
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.cleanliness_rating ? 'currentColor' : 'none'} className={i >= review.cleanliness_rating ? 'text-slate-200' : ''} />)}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><MessageSquare size={10} className="text-green-500" /> Comm.</p>
                                                    <div className="flex text-yellow-500">
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.communication_rating ? 'currentColor' : 'none'} className={i >= review.communication_rating ? 'text-slate-200' : ''} />)}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><Heart size={10} className="text-rose-500" /> Hospitality</p>
                                                    <div className="flex text-yellow-500">
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.hospitality_rating ? 'currentColor' : 'none'} className={i >= review.hospitality_rating ? 'text-slate-200' : ''} />)}
                                                    </div>
                                                </div>
                                                <div className="bg-indigo-50 p-3 rounded-2xl border border-indigo-100">
                                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><DollarSign size={10} /> Contribution</p>
                                                    <p className="text-xs font-black text-indigo-700 tracking-tighter">₹{review.payment_amount}</p>
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
