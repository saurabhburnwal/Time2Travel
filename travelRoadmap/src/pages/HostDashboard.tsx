import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getHostProfile } from '../services/hostProfileService';
import { getHostProperties } from '../services/hostPropertyService';
import { getHostBookings } from '../services/hostBookingService';
import { getHostReviews } from '../services/hostReviewService';
import HostNav from '../components/HostNav';
import { Loader2, Home, Users, Clock, Star, BadgeCheck, DollarSign, Calendar, ChevronRight } from 'lucide-react';
import type { DBHostProfile, AppHostProperty, AppHostBooking } from '../services/supabaseClient';

export default function HostDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<DBHostProfile | null>(null);
    const [properties, setProperties] = useState<AppHostProperty[]>([]);
    const [bookings, setBookings] = useState<AppHostBooking[]>([]);
    const [avgRating, setAvgRating] = useState(0);
    const [registrationCount, setRegistrationCount] = useState(0);

    useEffect(() => {
        if (!user) return;
        
        const loadDashboard = async () => {
            setLoading(true);
            try {
                const { getMyHostRegistrations } = await import('../services/hostsService');
                
                // Fetch everything in parallel for maximum speed
                const hostProfile = await getHostProfile(user.id);
                const regRes = await getMyHostRegistrations();
                
                setProfile(hostProfile);
                
                if (hostProfile) {
                    const [props, bks, revs] = await Promise.all([
                        getHostProperties(hostProfile.host_id),
                        getHostBookings(hostProfile.host_id),
                        getHostReviews(user.name)
                    ]);
                    
                    setProperties(props);
                    setBookings(bks);
                    
                    if (revs.length > 0) {
                        const total = revs.reduce((sum, r) => sum + r.overall_rating, 0);
                        setAvgRating(total / revs.length);
                    }
                } else if (regRes.success && regRes.registrations.length > 0) {
                    // Handle transition/pending state - no profile yet but has registrations
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

                // Always update the registration count state if we have the data
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
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6">
                    <Users size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Host Profile Not Found</h2>
                <p className="text-gray-500 mt-2 mb-8 text-center max-w-xs">It seems you haven't applied for a host account yet or your application is being processed.</p>
                <a href="/host-registration" className="btn-primary px-8">Complete Registration</a>
            </div>
        );
    }

    const activePropertiesCount = properties.filter(p => p.isActive).length;
    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const checkedInGuests = bookings.filter(b => b.status === 'checked_in');
    
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <HostNav />
            
            <div className="section-container py-8 max-w-7xl">
                {/* Host Status Banner */}
                {!profile.verified ? (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-white text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-100 italic font-black text-2xl">
                                !
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-amber-900 tracking-tight">Host Verification Pending</h3>
                                <p className="text-amber-700 font-medium">Your account is currently under review by our admin team. You can still set up your profile and properties!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-black text-[10px] uppercase tracking-widest border border-amber-200">Processing</span>
                            <button className="text-sm font-black text-amber-800 hover:underline uppercase tracking-widest">Help Center →</button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-[32px] flex items-center gap-5 shadow-sm"
                    >
                        <div className="w-16 h-16 bg-white text-emerald-600 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-sm border border-emerald-100">
                            <BadgeCheck size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-emerald-900 tracking-tight">Verified Host Status</h3>
                            <p className="text-emerald-700 font-medium">Your profile is verified and active. You are now visible to travelers searching for stays!</p>
                        </div>
                    </motion.div>
                )}

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-brand-200">Host Dashboard</span>
                             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                            Welcome back,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-ocean-600">{user?.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-lg">Manage your properties, guests, and track your performance.</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <a href="/host-properties" className="group flex items-center gap-3 bg-white border-2 border-slate-100 p-4 rounded-2xl hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/5 transition-all">
                             <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 rounded-xl flex items-center justify-center transition-colors">
                                <Home size={24} />
                             </div>
                             <div className="text-left">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Inventory</p>
                                <p className="text-sm font-black text-gray-900">Manage Properties</p>
                             </div>
                        </a>
                        <a href="/host-guests" className="group flex items-center gap-3 bg-white border-2 border-slate-100 p-4 rounded-2xl hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/5 transition-all">
                             <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-600 rounded-xl flex items-center justify-center transition-colors">
                                <Users size={24} />
                             </div>
                             <div className="text-left">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Audience</p>
                                <p className="text-sm font-black text-gray-900">Manage Guests</p>
                             </div>
                        </a>
                    </div>
                </div>

                {/* Stats Grid */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    <StatCard 
                        title="Registrations" 
                        value={registrationCount || properties.length} 
                        subtitle={`${registrationCount || properties.length} property registrations done`}
                        icon={<Home size={24} />} 
                        color="from-brand-500 to-brand-700"
                    />
                    <StatCard 
                        title="New Inquiries" 
                        value={pendingBookings.length} 
                        subtitle="Awaiting your response"
                        icon={<Clock size={24} />} 
                        color="from-amber-500 to-orange-600"
                    />
                    <StatCard 
                        title="Active Guests" 
                        value={checkedInGuests.length} 
                        subtitle="Currently staying"
                        icon={<Users size={24} />} 
                        color="from-cyan-500 to-blue-600"
                    />
                    <StatCard 
                        title="Avg Rating" 
                        value={avgRating > 0 ? avgRating.toFixed(1) : "N/A"} 
                        subtitle={avgRating > 0 ? "From verified reviews" : "No reviews yet"}
                        icon={<Star size={24} />} 
                        color="from-yellow-400 to-amber-500"
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Recent Bookings */}
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Guest Inquiries</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Last 5 activities</p>
                                </div>
                                <a href="/host-guests" className="px-5 py-2.5 bg-brand-50 text-brand-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-100 transition-all border border-brand-100">
                                    View Register →
                                </a>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Guest Info</th>
                                            <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Property</th>
                                            <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timeline</th>
                                            <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {bookings.slice(0, 5).map(b => (
                                            <tr key={b.id} className="group hover:bg-slate-50/30 transition-colors">
                                                <td className="py-6 px-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 flex items-center justify-center font-black text-lg border border-brand-200">
                                                            {b.travelerName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-gray-900 group-hover:text-brand-600 transition-colors">{b.travelerName}</p>
                                                            <p className="text-xs text-gray-400 font-bold">{b.travelerEmail}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-6 px-8">
                                                    <p className="text-sm font-black text-gray-700">{b.propertyName}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Stay ID: #{b.id.toString().slice(-4)}</p>
                                                </td>
                                                <td className="py-6 px-8">
                                                    <p className="text-sm font-black text-gray-600">Day {b.checkInDay} → {b.checkOutDay}</p>
                                                    <p className="text-[10px] text-brand-500 font-bold uppercase tracking-tighter">Verified Booking</p>
                                                </td>
                                                <td className="py-6 px-8 text-right">
                                                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                                                        ${b.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                         b.status === 'confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                         b.status === 'checked_in' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                         b.status === 'completed' ? 'bg-slate-50 text-slate-500 border-slate-100' :
                                                         'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                        {b.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {bookings.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-24 text-center">
                                                    <div className="flex flex-col items-center gap-4 opacity-30">
                                                        <Users size={64} className="text-slate-300" />
                                                        <div>
                                                            <p className="text-xl font-black text-slate-400">No Guest Activity Yet</p>
                                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Your stays are waiting for travelers!</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Reviews Summary */}
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                    <Star className="text-yellow-400" size={24} /> Recent Reviews
                                </h2>
                                <a href="/host-reviews" className="text-xs font-black text-brand-600 uppercase tracking-widest hover:underline italic">Read All Feedback →</a>
                            </div>
                            
                            {avgRating === 0 ? (
                                <div className="py-10 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                    <p className="text-gray-400 font-black uppercase tracking-widest text-xs italic">Awaiting your first guest review</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-black text-gray-900">Guest Satisfaction</p>
                                            <p className="text-xs font-bold text-gray-400 uppercase mt-1">Based on recent stays</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-4xl font-black text-brand-600 italic">{(avgRating / 5 * 100).toFixed(0)}%</p>
                                            <div className="flex gap-0.5 mt-1 justify-end">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={10} className={i < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} />
                                                ))}
                                            </div>
                                        </div>
                                     </div>
                                     <div className="p-6 bg-brand-600 text-white rounded-3xl flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-black">Performance Tier</p>
                                            <p className="text-xs font-bold text-white/60 uppercase mt-1 tracking-widest">Calculated Rank</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black uppercase italic italic tracking-tighter">Rising Star</p>
                                            <p className="text-[10px] font-black uppercase opacity-60">Tier 2 Host</p>
                                        </div>
                                     </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Quick View */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Financial Snapshot */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                             <DollarSign className="absolute -bottom-6 -right-6 text-white/5" size={160} />
                             <h3 className="text-lg font-black uppercase tracking-widest text-brand-400 mb-6 italic">Earnings Overview</h3>
                             <div className="space-y-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 italic">Expected Payout</p>
                                    <p className="text-5xl font-black tracking-tighter italic">₹0.00</p>
                                </div>
                                <div className="pt-6 border-t border-white/5 space-y-4">
                                     <div className="flex justify-between items-center text-sm font-black">
                                        <span className="text-slate-400">Stays This Month</span>
                                        <span>0 Stays</span>
                                     </div>
                                     <div className="flex justify-between items-center text-sm font-black">
                                        <span className="text-slate-400">Pending Settlements</span>
                                        <span>₹0.00</span>
                                     </div>
                                </div>
                                <button onClick={() => navigate('/host-earnings')} className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-brand-500/20">
                                    Full Statements →
                                </button>
                             </div>
                        </div>

                        {/* Availability Snapshot */}
                        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6 flex items-center gap-2">
                                <Calendar size={20} className="text-brand-500" /> Current Availability
                            </h3>
                            <div className="space-y-4">
                                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                     <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Accepting Guests</span>
                                     </div>
                                     <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 uppercase tracking-tighter">Active</span>
                                 </div>
                                 <div className="p-4 rounded-2xl border border-dashed border-slate-200">
                                     <p className="text-xs font-medium text-gray-500 leading-relaxed italic">
                                        "Hosting is more than just providing a bed; it's about sharing a part of your world."
                                     </p>
                                 </div>
                                 <button onClick={() => navigate('/host-availability')} className="w-full py-3 border-2 border-slate-100 hover:border-brand-500 hover:text-brand-600 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all italic">
                                     Adjust Calendar ✨
                                 </button>
                            </div>
                        </div>

                        {/* Hosting Performance Tips */}
                        <div className="bg-gradient-to-br from-brand-600 to-ocean-600 rounded-[40px] p-8 text-white">
                            <h3 className="text-lg font-black mb-4 italic">Host Academy</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <span className="text-xl">✨</span>
                                    <p className="text-xs font-bold leading-relaxed opacity-90">High-quality photos increase booking rates by <span className="underline italic">40%</span></p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-xl">💬</span>
                                    <p className="text-xs font-bold leading-relaxed opacity-90">Response time under <span className="underline italic">2 hours</span> boosts your profile rank</p>
                                </div>
                            </div>
                            <button className="mt-8 text-xs font-black uppercase tracking-widest border-b border-white hover:opacity-75 transition-opacity italic">View Success Guide →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, subtitle, icon, color }: { title: string, value: string | number, subtitle: string, icon: React.ReactNode, color: string }) {
    return (
        <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} 
            className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col gap-6 group hover:shadow-xl transition-all relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-[0.03] -mr-8 -mt-8 rounded-full transition-all group-hover:scale-150`} />
            <div className="flex justify-between items-start">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                    {icon}
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{title}</p>
                    <p className="text-3xl font-black text-gray-900 mt-1 italic tracking-tighter">{value}</p>
                </div>
            </div>
            <div className="pt-4 border-t border-slate-50">
                 <p className="text-[10px] font-bold text-gray-500 italic uppercase tracking-widest leading-none">{subtitle}</p>
            </div>
        </motion.div>
    );
}
