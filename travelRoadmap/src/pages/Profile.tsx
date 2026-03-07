import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Star, Calendar, DollarSign, Mail, Phone, Shield, Settings, ChevronRight, Map, Plane, Edit, MailOpen, Loader2, MessageSquare, Home, Navigation, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { getMyRoadmaps, subscribeToRoadmaps, AppRoadmap } from '../services/roadmapsService';
import { getMyReviews } from '../services/reviewsService';
import { updateUserProfile } from '../services/usersService';
import { AppReview } from '../services/supabaseClient';
import toast from 'react-hot-toast';

export default function Profile() {
    const { user, setUser } = useAuth();
    const [roadmaps, setRoadmaps] = useState<AppRoadmap[]>([]);
    const [reviews, setReviews] = useState<AppReview[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit profile state
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editGender, setEditGender] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            Promise.all([getMyRoadmaps(user.id), getMyReviews(user.id)]).then(([roadmapData, reviewData]) => {
                setRoadmaps(roadmapData);
                setReviews(reviewData);
                setLoading(false);
            });
        }
    }, [user]);

    const startEditing = () => {
        if (!user) return;
        setEditName(user.name);
        setEditPhone(user.phone);
        setEditGender(user.gender || '');
        setEditing(true);
    };

    const cancelEditing = () => {
        setEditing(false);
    };

    const saveProfile = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const success = await updateUserProfile(user.id, {
                name: editName,
                phone: editPhone,
                gender: editGender,
            });
            if (success) {
                setUser({
                    ...user,
                    name: editName,
                    phone: editPhone,
                    gender: editGender,
                    avatar: editName
                        ? editName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
                        : user.avatar,
                });
                setEditing(false);
                toast.success('Profile updated successfully!');
            } else {
                toast.error('Failed to update profile. Please try again.');
            }
        } catch (err) {
            console.error('Profile update error:', err);
            toast.error('Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

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
                        <div className="text-center md:text-left flex-1">
                            {editing ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium">Name</label>
                                        <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="input-field w-full" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium">Phone</label>
                                        <input type="text" value={editPhone} onChange={e => setEditPhone(e.target.value)} className="input-field w-full" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium">Gender</label>
                                        <select value={editGender} onChange={e => setEditGender(e.target.value)} className="input-field w-full">
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={saveProfile} disabled={saving} className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
                                        </button>
                                        <button onClick={cancelEditing} className="flex items-center gap-2 text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                                            <X size={14} /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold font-display text-gray-800">{user.name}</h1>
                                    <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                                        <span className="text-sm text-gray-500 flex items-center gap-1"><Mail size={14} /> {user.email}</span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1"><Phone size={14} /> {user.phone}</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <span className="text-xs bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-medium capitalize">{user.role}</span>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Joined {user.joinedDate}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{loading ? '-' : roadmaps.length}</p>
                        <p className="text-sm text-gray-500 mt-1">Trips Planned</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{loading ? '-' : reviews.length}</p>
                        <p className="text-sm text-gray-500 mt-1">Reviews Given</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{loading ? '-' : roadmaps.length * 2}</p>
                        <p className="text-sm text-gray-500 mt-1">Places Visited</p>
                    </div>
                </div>

                {/* ===== Past Trips (Enhanced) ===== */}
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
                        <div className="space-y-4">
                            {roadmaps.map((trip, i) => (
                                <motion.div
                                    key={trip.roadmap_id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5"
                                >
                                    {/* Trip header row */}
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-ocean-100 flex items-center justify-center flex-shrink-0">
                                            <Map size={20} className="text-brand-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 text-lg">{trip.destination}, {trip.state}</h3>
                                            <span className="text-xs text-gray-400">{new Date(trip.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                        <ChevronRight size={18} className="text-gray-300" />
                                    </div>

                                    {/* Trip detail chips */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar size={14} className="text-ocean-500" />
                                            <span>{trip.days} days</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <DollarSign size={14} className="text-yellow-500" />
                                            <span>₹{trip.estimated_cost?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Home size={14} className="text-green-500" />
                                            <span className="truncate">{trip.roadmap_type || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Navigation size={14} className="text-brand-500" />
                                            <span>{trip.total_distance ? `${trip.total_distance} km` : 'N/A'}</span>
                                        </div>
                                        <div>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded-full capitalize text-xs text-gray-500">{trip.roadmap_type}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ===== User Reviews Section ===== */}
                <div className="glass-card p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MessageSquare className="text-brand-500" size={20} /> My Reviews</h2>

                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader2 className="animate-spin text-brand-500" size={32} />
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <Star size={32} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-gray-500 font-medium">No reviews submitted yet</p>
                            <p className="text-gray-400 text-sm mt-1">Complete a trip to leave a review</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review, i) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-brand-500" />
                                            <span className="font-semibold text-gray-800">{review.destination}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                    </div>
                                    {/* Star rating display */}
                                    <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }, (_, idx) => (
                                            <Star
                                                key={idx}
                                                size={16}
                                                className={idx < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                                            />
                                        ))}
                                        <span className="text-sm text-gray-500 ml-1">{review.rating}/5</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
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
                        <Link to="/plan" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                            <span className="flex items-center gap-3 font-medium text-gray-700">
                                <Plane size={18} className="text-brand-500" /> Plan a New Trip
                            </span>
                            <ChevronRight size={16} className="text-gray-400" />
                        </Link>
                        <button
                            onClick={startEditing}
                            className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                            <span className="flex items-center gap-3 font-medium text-gray-700">
                                <Edit size={18} className="text-brand-500" /> Edit Profile
                            </span>
                            <ChevronRight size={16} className="text-gray-400" />
                        </button>
                        <a
                            href="mailto:admin@time2travel.com?subject=Support Request from Time2Travel"
                            className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                            <span className="flex items-center gap-3 font-medium text-gray-700">
                                <MailOpen size={18} className="text-brand-500" /> Contact Admin
                            </span>
                            <ChevronRight size={16} className="text-gray-400" />
                        </a>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
