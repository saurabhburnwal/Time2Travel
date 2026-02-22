import React from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Star, Calendar, DollarSign, Mail, Phone, Shield, Settings, ChevronRight, Map, Plane, Edit, MailOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_PAST_TRIPS, MOCK_REVIEWS, EMERGENCY_CONTACTS } from '../data/mockData';

export default function Profile() {
    const { user } = useAuth();

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
                        <p className="text-3xl font-bold gradient-text">{MOCK_PAST_TRIPS.length}</p>
                        <p className="text-sm text-gray-500 mt-1">Trips Planned</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{MOCK_REVIEWS.filter(r => r.userName !== user.name).length + 2}</p>
                        <p className="text-sm text-gray-500 mt-1">Reviews Given</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{MOCK_PAST_TRIPS.length * 2 + 3}</p>
                        <p className="text-sm text-gray-500 mt-1">Places Visited</p>
                    </div>
                </div>

                {/* Past Trips */}
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin className="text-brand-500" size={20} /> Past Trips</h2>
                    <div className="space-y-3">
                        {MOCK_PAST_TRIPS.map((trip, i) => (
                            <motion.div
                                key={trip.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-ocean-100 flex items-center justify-center flex-shrink-0">
                                    <Map size={20} className="text-brand-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-800">{trip.destination}, {trip.state}</h3>
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {trip.days} days · {trip.date}</span>
                                        <span className="flex items-center gap-1"><DollarSign size={12} /> ₹{trip.totalCost.toLocaleString()}</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded-full">{trip.roadmapType}</span>
                                    </div>
                                </div>
                                <StarRating rating={trip.rating} size={14} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Safety Contacts */}
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield className="text-green-500" size={20} /> My Safety Contacts</h2>
                    <div className="space-y-3">
                        {[
                            { name: 'Mom', phone: '+91 98765 43210' },
                            { name: 'Dad', phone: '+91 98765 43211' },
                        ].map((c, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold">{c.name[0]}</div>
                                    <div><p className="font-semibold text-gray-800 text-sm">{c.name}</p><p className="text-xs text-gray-500">{c.phone}</p></div>
                                </div>
                                <Phone size={16} className="text-green-600" />
                            </div>
                        ))}
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
