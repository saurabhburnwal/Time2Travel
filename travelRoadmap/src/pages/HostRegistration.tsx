import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Home, Users, ArrowLeft, Check, Upload, X, Image as ImageIcon, Utensils, Wifi, Car, Coffee, Waves, Dumbbell, Clock, AlertTriangle, XCircle, Loader2, Plus, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import { fetchStates, fetchDestinations } from '../services/destinationsService';
import { submitHostRegistration, getMyHostRegistrations } from '../services/hostsService';
import toast from 'react-hot-toast';

const AMENITY_OPTIONS = [
    { id: 'wifi', label: 'WiFi', icon: <Wifi size={16} /> },
    { id: 'parking', label: 'Parking', icon: <Car size={16} /> },
    { id: 'food', label: 'Home-cooked Meals', icon: <Utensils size={16} /> },
    { id: 'breakfast', label: 'Breakfast', icon: <Coffee size={16} /> },
    { id: 'laundry', label: 'Laundry', icon: <Waves size={16} /> },
    { id: 'gym', label: 'Exercise Area', icon: <Dumbbell size={16} /> },
];

const PROPERTY_TYPES = ['House', 'Apartment', 'Villa', 'Cottage', 'Farmhouse', 'Homestay'];

const MAX_IMAGES = 5;
const MAX_FILE_SIZE_MB = 5;

export default function HostRegistration() {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [states, setStates] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [form, setForm] = useState({
        name: '', phone: '', state: '', destination: '', address: '',
        description: '', amenities: [] as string[], propertyType: '',
        maxGuests: 1, providesFood: false, pricingInfo: '',
    });

    // Check for existing registrations
    useEffect(() => {
        if (!isLoggedIn) {
            setLoadingStatus(false);
            return;
        }

        const checkStatus = async () => {
            setLoadingStatus(true);
            const res = await getMyHostRegistrations();
            if (res.success) {
                setRegistrations(res.registrations);
                // If they have no registrations, show form by default
                if (res.registrations.length === 0) {
                    setShowForm(true);
                }
            } else {
                setShowForm(true);
            }
            setLoadingStatus(false);
        };

        checkStatus();
    }, [isLoggedIn]);

    useEffect(() => {
        (async () => {
            const s = await fetchStates();
            setStates(s);
        })();
    }, []);

    useEffect(() => {
        if (!form.state) { setDestinations([]); return; }
        (async () => {
            const d = await fetchDestinations(form.state);
            setDestinations(d || []);
        })();
    }, [form.state]);

    // Pre-fill name/phone from logged-in user
    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: prev.name || user.name,
                phone: prev.phone || user.phone,
            }));
        }
    }, [user]);

    const update = (key: string, value: any) => setForm(p => ({ ...p, [key]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!form.name.trim()) { toast.error('Please enter your name'); return; }
        if (!form.phone.trim()) { toast.error('Please enter your phone number'); return; }
        if (!form.state) { toast.error('Please select a state'); return; }
        if (!form.destination) { toast.error('Please select a destination'); return; }
        if (!form.address.trim()) { toast.error('Please enter your location/address'); return; }
        if (!form.description.trim()) { toast.error('Please share a bit about yourself'); return; }

        setSubmitting(true);
        try {
            await submitHostRegistration({
                user_id: user?.id || null,
                name: form.name,
                phone: form.phone,
                state: form.state,
                destination: form.destination,
                address: form.address,
                description: form.description,
                // These are now handled later in property registration
                amenities: [],
                property_type: 'Pending Setup',
                max_guests: 1,
                provides_food: false,
                pricing_info: '',
                image_urls: [], 
            });
            setShowForm(false);
            setSubmitted(true);
            toast.success('Application submitted! Our team will review your profile.');
            // Refresh list
            const res = await getMyHostRegistrations();
            if (res.success) setRegistrations(res.registrations);
        } catch {
            toast.error('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingStatus) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="page-decorations">
                <div className="deco-blob deco-blob-1 animate-pulse-soft" />
            </div>

            <div className="section-container max-w-4xl relative z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-600 mb-8 font-bold hover:gap-3 transition-all">
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">
                        Join our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-ocean-600">Local Host Community</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Share your local expertise and culture. Apply today and start hosting travelers from around the world.
                    </p>
                </div>

                {/* Existing Registrations List */}
                {registrations.length > 0 && (
                    <div className="space-y-6 mb-16">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                                <Shield className="text-brand-500" size={24} /> Application Status
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {registrations.map((reg) => (
                                <div key={reg.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between group hover:shadow-xl hover:shadow-brand-500/5 transition-all relative overflow-hidden">
                                     <div className={`absolute left-0 top-0 w-2 h-full ${
                                        reg.status === 'approved' ? 'bg-emerald-500' :
                                        reg.status === 'rejected' ? 'bg-rose-500' :
                                        'bg-brand-500'
                                    }`} />
                                    
                                    <div className="flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${
                                            reg.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                                            reg.status === 'rejected' ? 'bg-rose-50 text-rose-600' :
                                            'bg-brand-50 text-brand-600'
                                        }`}>
                                            {reg.status === 'approved' ? <Check size={32} /> : 
                                             reg.status === 'rejected' ? <XCircle size={32} /> : 
                                             <Clock size={32} className="animate-pulse" />}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Status: {reg.status}</p>
                                            <h3 className="font-black text-gray-900 text-2xl tracking-tight uppercase">Applied for {reg.destination}</h3>
                                            <p className="text-sm font-bold text-gray-500 flex items-center gap-1 mt-1 italic">
                                                Submitted on {new Date(reg.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 md:mt-0">
                                        {reg.status === 'approved' ? (
                                            <button onClick={() => navigate('/host-dashboard')} className="px-8 py-3 bg-brand-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20">
                                                Go to Dashboard →
                                            </button>
                                        ) : reg.status === 'rejected' ? (
                                            <div className="text-right">
                                                <p className="text-xs text-rose-500 font-bold uppercase mb-2">Reason: {reg.rejection_reason || 'Guidelines not met'}</p>
                                                <button onClick={() => setShowForm(true)} className="text-brand-600 font-black text-xs uppercase tracking-widest hover:underline">
                                                    Try Again →
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-right">
                                                <span className="text-xs font-black text-brand-600 uppercase tracking-widest italic animate-pulse">Under Review</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Registration Form */}
                {showForm && (
                    <div className="bg-white rounded-[48px] shadow-2xl shadow-brand-500/10 p-8 md:p-12 border border-slate-50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                             <User size={120} />
                        </div>

                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner italic">
                                !
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Host Application</h2>
                                <p className="text-gray-500 font-medium">Please provide your basic information to get started</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                            {/* Personal Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-bold text-gray-700"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number *</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" size={18} />
                                        <input
                                            type="tel"
                                            required
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-bold text-gray-700"
                                            placeholder="Contact Number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State *</label>
                                    <select
                                        required
                                        value={form.state}
                                        onChange={(e) => setForm({ ...form, state: e.target.value, destination: '' })}
                                        className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-ocean-500 outline-none transition-all font-bold text-gray-700 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236B7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27M6%208l4%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat"
                                    >
                                        <option value="">Select State</option>
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Destination *</label>
                                    <select
                                        required
                                        value={form.destination}
                                        onChange={(e) => setForm({ ...form, destination: e.target.value })}
                                        disabled={!form.state}
                                        className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-ocean-500 outline-none transition-all font-bold text-gray-700 disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236B7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27M6%208l4%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat"
                                    >
                                        <option value="">Select Destination</option>
                                        {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Address *</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-4 text-gray-400 group-focus-within:text-ocean-500 transition-colors" size={18} />
                                    <textarea
                                        required
                                        rows={2}
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-ocean-500 focus:ring-4 focus:ring-ocean-500/10 outline-none transition-all font-bold text-gray-700 resize-none"
                                        placeholder="Where are you located?"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">About You & Why you want to host *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-6 py-5 rounded-[28px] bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-bold text-gray-700 min-h-[120px] resize-none"
                                    placeholder="Tell us a little bit about yourself..."
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-5 bg-gradient-to-r from-brand-600 to-ocean-600 text-white rounded-3xl font-black text-lg shadow-2xl shadow-brand-500/40 hover:shadow-brand-500/60 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed group"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Submit Application
                                            <Check size={20} className="group-hover:scale-125 transition-transform" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-[10px] font-bold text-gray-400 mt-6 uppercase tracking-widest">
                                    Applications are typically reviewed within <span className="text-brand-600">24 hours</span>
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AnimatedPage>
    );
}
