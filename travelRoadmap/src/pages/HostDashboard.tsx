import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getHostProfile } from '../services/hostProfileService';
import { getHostProperties } from '../services/hostPropertyService';
import { getHostBookings } from '../services/hostBookingService';
import { getHostReviews, HostReviewData } from '../services/hostReviewService';
import { getHostEarnings, HostEarningsData } from '../services/hostEarningsService';
import HostNav from '../components/HostNav';
import { 
    Loader2, Home, Users, Clock, Star, BadgeCheck, 
    DollarSign, Calendar, ChevronRight, Activity, TrendingUp 
} from 'lucide-react';
import type { DBHostProfile, AppHostProperty, AppHostBooking } from '../services/supabaseClient';

export default function HostDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<DBHostProfile | null>(null);
    const [properties, setProperties] = useState<AppHostProperty[]>([]);
    const [bookings, setBookings] = useState<AppHostBooking[]>([]);
    const [reviews, setReviews] = useState<HostReviewData[]>([]);
    const [avgRating, setAvgRating] = useState(0);
    const [registrationCount, setRegistrationCount] = useState(0);
    const [earningsData, setEarningsData] = useState<HostEarningsData | null>(null);

    useEffect(() => {
        if (!user) return;
        
        const loadDashboard = async () => {
            setLoading(true);
            try {
                const { getMyHostRegistrations } = await import('../services/hostsService');
                
                const hostProfile = await getHostProfile(user.id);
                const regRes = await getMyHostRegistrations();
                
                setProfile(hostProfile);
                
                if (hostProfile) {
                    const [props, bks, revs, earnings] = await Promise.all([
                        getHostProperties(hostProfile.host_id),
                        getHostBookings(hostProfile.host_id),
                        getHostReviews(hostProfile.host_id),
                        getHostEarnings(hostProfile.host_id)
                    ]);
                    
                    setProperties(props);
                    setBookings(bks);
                    setReviews(revs);
                    setEarningsData(earnings);
                    
                    if (revs.length > 0) {
                        const total = revs.reduce((sum, r) => sum + r.overall_rating, 0);
                        setAvgRating(total / revs.length);
                    }
                } else if (regRes.success && regRes.registrations.length > 0) {
                    const mainReg = regRes.registrations[0];
                    setProfile({
                        host_id: -1,
                        user_id: user.id,
                        destination_id: 0,
                        max_guests: mainReg.max_guests,
                        provides_food: mainReg.provides_food,
                        voluntary_min_amount: 0,
                        verified: false,
                        is_active: true,
                        created_at: mainReg.created_at,
                        updated_at: mainReg.updated_at
                    } as DBHostProfile);

                    setProperties(regRes.registrations.map(r => ({
                        id: r.id,
                        hostId: -1,
                        destinationId: 0,
                        destinationName: r.destination,
                        name: r.name,
                        address: r.address,
                        maxGuests: r.max_guests,
                        providesFood: r.provides_food,
                        voluntaryMinAmount: null,
                        isActive: false,
                        isPending: true
                    })));
                }

                if (regRes.success) {
                    setRegistrationCount(regRes.registrations.length);
                }
            } catch (err) {
                console.error('Error loading dashboard:', err);
            } finally {
                setLoading(false);
            }
        };
        
        loadDashboard();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-brand-500 mb-4" size={48} />
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Loading Dashboard...</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6">
                    <Users size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Host Profile Not Found</h2>
                <p className="text-gray-500 mt-2 mb-8 text-center max-w-xs">It seems you haven't applied for a host account yet or your application is being processed.</p>
                <a href="/host-registration" className="btn-primary px-8">Complete Registration</a>
            </div>
        );
    }

    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const checkedInGuests = bookings.filter(b => b.status === 'checked_in');
    const totalEarnings = earningsData?.totalContributions || 0;
    
    // Calculate stays this month
    const staysThisMonth = bookings.filter(b => {
        if (!b.createdAt) return false;
        const d = new Date(b.createdAt);
        return d.getMonth() === new Date().getMonth() && d.getFullYear() === new Date().getFullYear();
    }).length;
    
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <HostNav />
            
            <div className="section-container py-8 max-w-7xl mx-auto">
                {/* Host Status Banner */}
                {!profile.verified ? (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white text-amber-600 rounded-xl flex items-center justify-center border border-amber-100 font-bold text-lg">
                                !
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-amber-900">Verification Pending</h3>
                                <p className="text-amber-700 text-xs mt-0.5">Your account is under admin review. You can still set up properties.</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-4 shadow-sm"
                    >
                        <div className="w-10 h-10 bg-white text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
                            <BadgeCheck size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-emerald-900">Verified Host</h3>
                            <p className="text-emerald-700 text-xs mt-0.5">Your profile is active and visible to travelers.</p>
                        </div>
                    </motion.div>
                )}

                {/* Hero Section - Matching Admin Dashboard */}
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg group bg-slate-900 mb-8">
                    <img 
                        src="/images/bg.png" 
                        alt="Dashboard Banner" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                    <div className="relative h-full flex flex-col justify-center px-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {user?.name.split(' ')[0]}</h1>
                        <p className="text-slate-200 text-sm max-w-md">Your hosting dashboard. You have {pendingBookings.length} pending stay requests.</p>
                    </div>
                </div>

                {/* Stat Cards - Matching Admin Dashboard Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Active Properties', value: registrationCount || properties.length, color: 'text-brand-500', bg: 'bg-brand-50', icon: <Home size={18} /> },
                        { label: 'New Inquiries', value: pendingBookings.length, color: 'text-amber-500', bg: 'bg-amber-50', icon: <Clock size={18} /> },
                        { label: 'Total Guests', value: bookings.length, color: 'text-cyan-500', bg: 'bg-cyan-50', icon: <Users size={18} /> },
                        { label: 'Avg Rating', value: avgRating > 0 ? avgRating.toFixed(1) : "N/A", color: 'text-yellow-500', bg: 'bg-yellow-50', icon: <Star size={18} /> },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                {stat.icon}
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Guest Inquiries List */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex-1">
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
                                    <Activity className="text-brand-500" size={18} /> Recent Stay Requests
                                </h3>
                                <button onClick={() => navigate('/host-guests')} className="text-xs font-bold text-brand-600 hover:text-brand-700">
                                    View Register →
                                </button>
                            </div>
                            <div className="p-4">
                                {bookings.length > 0 ? (
                                    <div className="space-y-2">
                                        {bookings.slice(0, 5).map(b => (
                                            <div key={b.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold">
                                                    {b.travelerName.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-bold text-slate-800">{b.travelerName}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium">For: {b.propertyName} (Day {b.checkInDay}-{b.checkOutDay})</p>
                                                </div>
                                                <div className="text-right flex items-center gap-3">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border
                                                        ${b.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                         b.status === 'confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                         b.status === 'checked_in' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                         b.status === 'completed' ? 'bg-slate-50 text-slate-500 border-slate-100' :
                                                         'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                        {b.status.replace('_', ' ')}
                                                    </span>
                                                    <ChevronRight size={14} className="text-slate-300" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center text-slate-400">
                                        <Users size={32} className="mx-auto mb-3 opacity-20" />
                                        <p className="text-sm font-medium">No active guest requests.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Reviews Map (Replacing system activity flow from Admin) */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
                                    <Star className="text-yellow-400" size={18} /> Guest Feedback
                                </h3>
                                <button onClick={() => navigate('/host-reviews')} className="text-xs font-bold text-brand-600 hover:text-brand-700">
                                    Read All →
                                </button>
                            </div>
                            
                            {reviews.length === 0 ? (
                                <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-slate-400 text-sm font-medium">Awaiting your first guest review.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.slice(0, 3).map(review => (
                                        <div key={review.id} className="p-4 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-[10px] font-bold">
                                                        {review.reviewer_name.charAt(0)}
                                                    </div>
                                                    <p className="text-xs font-bold text-slate-800">{review.reviewer_name}</p>
                                                </div>
                                                <div className="flex gap-0.5 text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={10} fill={i < review.overall_rating ? "currentColor" : "none"} className={i >= review.overall_rating ? "text-slate-200" : ""} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-2 pl-8">"{review.notes}"</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Status/Earnings */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* Financial Snapshot - Matches dark mode "Server Status" card of AdminDashboard */}
                        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col relative overflow-hidden">
                            <TrendingUp className="absolute -bottom-4 -right-4 text-white/5" size={120} />
                            <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-brand-400 relative z-10">
                                <DollarSign size={16} /> Earnings Summary
                            </h3>
                            
                            <div className="mb-8 relative z-10">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Accumulated</p>
                                <p className="text-3xl font-bold tracking-tight">₹{totalEarnings.toLocaleString()}</p>
                            </div>

                            <div className="space-y-3 flex-1 relative z-10">
                                {[
                                    { label: 'Stays This Month', status: `${staysThisMonth} Events`, color: 'text-white' },
                                    { label: 'Settled', status: `₹${(earningsData?.settledAmount || 0).toLocaleString()}`, color: 'text-emerald-400' },
                                    { label: 'Pending', status: `₹${(earningsData?.pendingAmount || 0).toLocaleString()}`, color: 'text-brand-400' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">{item.label}</span>
                                        <span className={`text-[10px] font-bold ${item.color}`}>{item.status}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <button onClick={() => navigate('/host-earnings')} className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors relative z-10">
                                Financial Reports
                            </button>
                        </div>

                        {/* Calendar Widget */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex-1">
                            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Calendar className="text-brand-500" size={16} /> Schedule
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Accepting Stays</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded tracking-wider border border-emerald-100 uppercase">Live</span>
                                </div>
                                <button onClick={() => navigate('/host-availability')} className="w-full py-3 border border-slate-200 hover:border-brand-500 hover:text-brand-600 text-slate-500 rounded-xl text-xs font-bold transition-all">
                                    Update Calendar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
