import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Star, Calendar, DollarSign, Mail, Phone, Shield, Settings, ChevronRight, Map, Plane, Edit, MailOpen, Loader2, Save, X, Home, Navigation, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { fetchMyRoadmaps } from '../services/roadmapsService';
import { MyRoadmap, MockUser } from '../services/types';
import { fetchUserReviews, submitReview, Review } from '../services/reviewsService';
import { updateUserProfile } from '../services/usersService';
import toast from 'react-hot-toast';

export default function Profile() {
    const { user, setUser } = useAuth();
    const [roadmaps, setRoadmaps] = useState<MyRoadmap[]>([]);
    const [userReviews, setUserReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit profile state
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editGender, setEditGender] = useState('');
    const [saving, setSaving] = useState(false);

    // Review form state
    const [reviewingTripId, setReviewingTripId] = useState<number | null>(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        if (user) {
            Promise.all([fetchMyRoadmaps(), fetchUserReviews()]).then(([tripsData, reviewsData]) => {
                setRoadmaps(tripsData);
                setUserReviews(reviewsData);
                setLoading(false);
            });
        }
    }, [user]);

    const handleReviewSubmit = async (roadmapId: number) => {
        setSubmittingReview(true);
        const { success, review } = await submitReview(roadmapId, reviewRating, reviewComment);
        if (success && review) {
            setUserReviews(prev => [review, ...prev]);
            setReviewingTripId(null);
            setReviewRating(5);
            setReviewComment('');
            toast.success('Review submitted successfully!');
        } else {
            toast.error('Failed to submit review');
        }
        setSubmittingReview(false);
    };

    const startEditing = () => {
        if (!user) return;
        setEditName(user.name);
        setEditPhone(user.phone || '');
        setEditGender(user.gender || '');
        setEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditing = () => {
        setEditing(false);
    };

    const saveProfile = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const { success, user: updatedUserData } = await updateUserProfile(user.id, {
                name: editName,
                phone: editPhone,
                gender: editGender,
            });
            if (success && updatedUserData) {
                // When we set user, the AuthContext wrapper handles persistence
                const newUser: MockUser = {
                    ...user,
                    name: updatedUserData.name,
                    phone: updatedUserData.phone || '',
                    gender: updatedUserData.gender ? (updatedUserData.gender.charAt(0).toUpperCase() + updatedUserData.gender.slice(1).toLowerCase()) : 'Other',
                    avatar: updatedUserData.name 
                        ? updatedUserData.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
                        : user.avatar,
                };
                setUser(newUser);
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
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-500 font-medium ml-1">Name</label>
                                            <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="input-field w-full" placeholder="Full Name" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-medium ml-1">Phone</label>
                                            <input type="text" value={editPhone} onChange={e => setEditPhone(e.target.value)} className="input-field w-full" placeholder="Phone Number" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium ml-1">Gender</label>
                                        <select value={editGender} onChange={e => setEditGender(e.target.value)} className="input-field w-full">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <button onClick={saveProfile} disabled={saving} className="btn-primary flex items-center gap-2 text-sm px-5 py-2">
                                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
                                        </button>
                                        <button onClick={cancelEditing} className="flex items-center gap-2 text-sm px-5 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                                            <X size={14} /> Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                        <h1 className="text-3xl font-bold font-display text-gray-800">{user.name}</h1>
                                        <button 
                                            onClick={startEditing}
                                            className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-all shadow-sm"
                                            title="Edit Profile"
                                        >
                                            <Edit size={16} />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
                                        <span className="text-sm text-gray-500 flex items-center gap-1"><Mail size={14} /> {user.email}</span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1"><Phone size={14} /> {user.phone}</span>
                                        {user.gender && <span className="text-sm text-gray-500 flex items-center gap-1 capitalize"><User size={14} /> {user.gender}</span>}
                                    </div>
                                    <div className="flex gap-2 mt-3 justify-center md:justify-start">
                                        <span className="text-xs bg-brand-100 text-brand-700 px-3 py-1 rounded-full font-medium capitalize">{user.role}</span>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Joined {user.joinedDate}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{loading ? '-' : roadmaps.length}</p>
                        <p className="text-sm text-gray-500 mt-1">Trips Planned</p>
                    </div>
                    <div className="glass-card p-5 text-center">
                        <p className="text-3xl font-bold gradient-text">{loading ? '-' : userReviews.length}</p>
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
                        <div className="space-y-4">
                            {roadmaps.map((trip, i) => {
                                const existingReview = userReviews.find(r => r.roadmap_id === trip.roadmap_id);
                                const isReviewing = reviewingTripId === trip.roadmap_id;

                                return (
                                    <motion.div
                                        key={trip.roadmap_id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
                                    >
                                        <div className="flex items-center gap-4 p-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-ocean-100 flex items-center justify-center flex-shrink-0">
                                                <Map size={20} className="text-brand-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-800 text-lg">{trip.destination}, {trip.state}</h3>
                                                <span className="text-xs text-gray-400">{new Date(trip.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            {!existingReview && !isReviewing && (
                                                <button onClick={() => setReviewingTripId(trip.roadmap_id || 0)} className="text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors">
                                                    Leave Review
                                                </button>
                                            )}
                                        </div>

                                        <div className="px-4 pb-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar size={14} className="text-ocean-500" />
                                                <span>{trip.days} days</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <DollarSign size={14} className="text-yellow-500" />
                                                <span>₹{trip.estimated_cost?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Navigation size={14} className="text-brand-500" />
                                                <span>{trip.total_distance_km ? `${trip.total_distance_km} km` : 'Standard Route'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Home size={14} className="text-green-500" />
                                                <span className="truncate capitalize">{trip.roadmap_type || 'Custom'}</span>
                                            </div>
                                        </div>

                                        {existingReview && !isReviewing && (
                                            <div className="border-t border-gray-50 p-4 bg-gray-50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-semibold text-gray-500">Your Review</span>
                                                    <StarRating rating={existingReview.rating} size={14} />
                                                </div>
                                                <p className="text-sm text-gray-700 italic">"{existingReview.comment}"</p>
                                            </div>
                                        )}

                                        {isReviewing && (
                                            <div className="border-t border-brand-100 p-4 bg-brand-50/30">
                                                <h4 className="text-sm font-semibold mb-3">Rate your experience</h4>
                                                <div className="mb-3">
                                                    <StarRating rating={reviewRating} onRate={setReviewRating} interactive={true} size={24} />
                                                </div>
                                                <textarea
                                                    value={reviewComment}
                                                    onChange={e => setReviewComment(e.target.value)}
                                                    placeholder="Share details of your own experience..."
                                                    className="w-full text-sm p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 mb-3"
                                                    rows={3}
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => { setReviewingTripId(null); setReviewRating(5); setReviewComment(''); }} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors" disabled={submittingReview}>
                                                        Cancel
                                                    </button>
                                                    <button onClick={() => handleReviewSubmit(trip.roadmap_id || 0)} className="px-4 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium transition-colors flex items-center gap-2" disabled={submittingReview}>
                                                        {submittingReview && <Loader2 size={14} className="animate-spin" />}
                                                        Submit Review
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
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
