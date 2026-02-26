import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Star, Calendar, DollarSign, Mail, Phone, Shield, Settings, ChevronRight, Map, Plane, Edit, MailOpen, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { fetchMyRoadmaps, MyRoadmap } from '../lib/supabaseService';

export default function Profile() {
    const { user } = useAuth();
    const [roadmaps, setRoadmaps] = useState<MyRoadmap[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMyRoadmaps().then(data => {
                setRoadmaps(data);
                setLoading(false);
            });
        }
    }, [user]);

    if (!user) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
                    <Link to="/login" className="btn-primary">Go to Login</Link>
                </div>
            </AnimatedPage>
        );
    }

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-4xl">
                {/* Profile Header */}
                <div className="glass-card p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-400 to-ocean-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-brand-300/30">
                            {user.avatar}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold font-display text-gray-800">{user.name}</h1>
                            <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                                <span className="text-sm text-gray-500 flex items-center gap-1"><Mail size={14} /> {user.email}</span>
                                <span className="text-sm text-gray-500 flex items-center gap-1"><Phone size={14} /> {user.phone}</span>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <span className="text-xs bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-medium capitalize">{user.role}</span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Joined {user.joinedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{loading ? '-' : roadmaps.length}</p>
                        <p className="text-sm text-gray-500 mt-1">Trips Planned</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">0</p>
                        <p className="text-sm text-gray-500 mt-1">Reviews Given</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{loading ? '-' : roadmaps.length * 2}</p>
                        <p className="text-sm text-gray-500 mt-1">Places Visited</p>
                    </div>
                </div>

                {/* Past Trips */}
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin className="text-brand-500" size={20} /> Past Trips</h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="animate-spin text-brand-500" size={32} />
                        </div>
                    ) : roadmaps.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <MapPin size={32} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-gray-500 font-medium">No trips planned yet</p>
                            <Link to="/plan" className="text-brand-600 text-sm font-semibold hover:underline mt-2 inline-block">Plan your first trip →</Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {roadmaps.map((trip, i) => (
                                <motion.div
                                    key={trip.roadmap_id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-ocean-100 flex items-center justify-center flex-shrink-0">
                                        <Map size={20} className="text-brand-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-800">{trip.destination}, {trip.state}</h3>
                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {trip.days} days · {new Date(trip.created_at).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><DollarSign size={12} /> ₹{trip.estimated_cost?.toLocaleString()}</span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded-full capitalize">{trip.route_style || trip.roadmap_type}</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-300" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Safety Contacts */}
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield className="text-green-500" size={20} /> My Safety Contacts</h2>
                    <div className="space-y-3">
                        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-400 hover:text-green-600 transition-all text-sm font-medium">
                            + Add Emergency Contact
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Settings className="text-gray-500" size={20} /> Quick Actions</h2>
                    <div className="space-y-2">
                        {[
                            { label: 'Plan a New Trip', to: '/plan', icon: <Plane size={18} className="text-brand-500" /> },
                            { label: 'Edit Profile', to: '#', icon: <Edit size={18} className="text-brand-500" /> },
                            { label: 'Contact Admin', to: '#', icon: <MailOpen size={18} className="text-brand-500" /> },
                        ].map(action => (
                            <Link key={action.label} to={action.to} className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                                <span className="flex items-center gap-3 font-medium text-gray-700">
                                    {action.icon} {action.label}
                                </span>
                                <ChevronRight size={16} className="text-gray-400" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
