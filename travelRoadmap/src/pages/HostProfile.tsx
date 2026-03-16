import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Star, DollarSign, MapPin, Clock, BadgeCheck, Shield, ExternalLink, MessageSquare, Plus, Loader2, AlertTriangle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getHostProfile } from '../services/hostProfileService';
import { getHostProperties } from '../services/hostPropertyService';
import { getMyHostRegistration, deleteHostAccount } from '../services/hostsService';
import { getHostReviews, HostReviewData } from '../services/hostReviewService';
import { getHostEarnings, HostEarningsData } from '../services/hostEarningsService';
import { DBHostProfile, AppHostProperty } from '../services/supabaseClient';
import { MockUser } from '../services/types';

interface HostProfileProps {
    user: MockUser;
}

export default function HostProfile({ user }: HostProfileProps) {
    const [profile, setProfile] = useState<DBHostProfile | null>(null);
    const [properties, setProperties] = useState<AppHostProperty[]>([]);
    const [registration, setRegistration] = useState<any>(null);
    const [earningsData, setEarningsData] = useState<HostEarningsData | null>(null);
    const [avgRating, setAvgRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHostData = async () => {
            setLoading(true);
            const [p, reg] = await Promise.all([
                getHostProfile(user.id),
                getMyHostRegistration()
            ]);
            
            setProfile(p);
            setRegistration(reg.registration);
            
            if (p) {
                const [props, earnings, revs] = await Promise.all([
                    getHostProperties(p.host_id),
                    getHostEarnings(p.host_id),
                    getHostReviews(p.host_id)
                ]);
                setProperties(props);
                setEarningsData(earnings);
                
                if (revs && revs.length > 0) {
                    const total = revs.reduce((sum, r) => sum + r.overall_rating, 0);
                    setAvgRating(total / revs.length);
                }
            }
            setLoading(false);
        };
        
        loadHostData();
    }, [user.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-brand-500" size={32} />
            </div>
        );
    }

    const isActive = profile && profile.is_active;
    const isVerified = profile && profile.verified;

    return (
        <div className="space-y-6">
            {/* Host Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-5 text-center">
                    <p className="text-3xl font-bold gradient-text">{properties.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Properties</p>
                </div>
                <div className="glass-card p-5 text-center">
                    <p className="text-3xl font-bold gradient-text">{properties.reduce((sum, p) => sum + (p.maxGuests || 0), 0)}</p>
                    <p className="text-sm text-gray-500 mt-1">Guest Capacity</p>
                </div>
                <div className="glass-card p-5 text-center">
                    <p className="text-3xl font-bold gradient-text">{avgRating > 0 ? avgRating.toFixed(1) : 'New'}</p>
                    <p className="text-sm text-gray-500 mt-1">Host Rating</p>
                </div>
                <div className="glass-card p-5 text-center">
                    <p className="text-3xl font-bold gradient-text">₹{earningsData?.totalContributions?.toLocaleString() || '0'}</p>
                    <p className="text-sm text-gray-500 mt-1">Total Earnings</p>
                </div>
            </div>

            {/* Registration Status Section */}
            {registration && registration.status !== 'approved' && (
                <div className={`p-6 rounded-2xl border ${registration.status === 'pending' ? 'bg-blue-50 border-blue-100' : 'bg-red-50 border-red-100'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${registration.status === 'pending' ? 'bg-blue-100' : 'bg-red-100'}`}>
                            {registration.status === 'pending' ? <Clock className="text-blue-600" size={24} /> : <BadgeCheck className="text-red-600" size={24} />}
                        </div>
                        <div className="flex-1">
                            <h3 className={`font-bold text-lg ${registration.status === 'pending' ? 'text-blue-900' : 'text-red-900'}`}>
                                Registration {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                            </h3>
                            <p className={`text-sm mt-1 ${registration.status === 'pending' ? 'text-blue-700' : 'text-red-700'}`}>
                                {registration.status === 'pending' 
                                    ? "Your host profile is currently under review by our admin team. You'll gain full host privileges once approved."
                                    : `Your application was rejected. Reason: ${registration.rejection_reason || 'Information didn\'t meet our guidelines.'}`
                                }
                            </p>
                            {registration.status === 'rejected' && (
                                <Link to="/host-register" className="inline-block mt-3 text-sm font-bold text-red-600 hover:underline">
                                    Update Application →
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* My Properties */}
            <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Home className="text-brand-500" size={20} /> My Properties
                    </h2>
                    {isActive && (
                        <Link to="/host-properties" className="text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1">
                            Add Property <Plus size={14} />
                        </Link>
                    )}
                </div>

                {properties.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Home className="text-gray-300" size={32} />
                        </div>
                        <p className="text-gray-500 font-medium">No properties listed yet</p>
                        {isActive ? (
                            <Link to="/host-properties" className="mt-4 btn-primary inline-flex items-center gap-2">
                                <Plus size={16} /> List your first property
                            </Link>
                        ) : (
                            <p className="text-xs text-gray-400 mt-2">Finish registration to list properties</p>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {properties.map((prop, i) => (
                            <motion.div
                                key={prop.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all group"
                            >
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                        {/* Fallback to first image if available */}
                                        <div className="w-full h-full bg-gradient-to-br from-brand-100 to-ocean-100 flex items-center justify-center">
                                            <Home className="text-brand-300" size={24} />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <h4 className="font-bold text-gray-800 truncate">{prop.name}</h4>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${prop.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {prop.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <MapPin size={10} /> {profile?.destination_name || 'Assigned Location'}
                                        </p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="text-[11px] font-medium text-gray-600 flex items-center gap-1">
                                                <Users size={12} /> {prop.maxGuests} Guests
                                            </span>
                                            <span className="text-[11px] font-medium text-gray-600 flex items-center gap-1">
                                                <Star size={12} className="text-yellow-400" /> 4.5
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Host Actions */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="text-gray-500" size={20} /> Host Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link to="/host-dashboard" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                        <span className="flex items-center gap-3 font-medium text-gray-700">
                            <MessageSquare size={18} className="text-brand-500" /> Host Dashboard
                        </span>
                        <ExternalLink size={14} className="text-gray-400" />
                    </Link>
                    <Link to="/host-reviews" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                        <span className="flex items-center gap-3 font-medium text-gray-700">
                            <Star size={18} className="text-brand-500" /> Manage Reviews
                        </span>
                        <ExternalLink size={14} className="text-gray-400" />
                    </Link>
                </div>
            </div>

            {/* Danger Zone: Delete Host Account */}
            <div className="glass-card p-6 border-red-50 bg-red-50/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h4 className="font-bold text-red-600 flex items-center gap-2">
                            <AlertTriangle size={18} /> Host Danger Zone
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">Permanently delete your host profile. Your user account remains active.</p>
                    </div>
                    <button 
                        onClick={async () => {
                            if (window.confirm('Are you sure you want to stop being a host? Your property listings will be removed.')) {
                                const success = await deleteHostAccount();
                                if (success) {
                                    window.location.reload(); // Refresh to update role/UI
                                }
                            }
                        }}
                        className="px-6 py-3 bg-white text-red-600 border border-red-200 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-2"
                    >
                        <Trash2 size={16} /> Delete Host Account
                    </button>
                </div>
            </div>
        </div>
    );
}
