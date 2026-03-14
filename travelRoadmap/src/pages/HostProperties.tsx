import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getHostProfile } from '../services/hostProfileService';
import { getHostProperties, addHostProperty, updateHostProperty, togglePropertyStatus, deleteHostProperty } from '../services/hostPropertyService';
import { supabase, AppHostProperty, DBHostProfile } from '../services/supabaseClient';
import HostNav from '../components/HostNav';
import { Loader2, Plus, Edit2, Trash2, MapPin, Users, Utensils, IndianRupee, X, Home, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HostProperties() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<DBHostProfile | null>(null);
    const [properties, setProperties] = useState<AppHostProperty[]>([]);
    const [destinations, setDestinations] = useState<{destination_id: number, name: string}[]>([]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<AppHostProperty | null>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        destinationId: '',
        address: '',
        maxGuests: 2,
        providesFood: false,
        voluntaryMinAmount: ''
    });

    useEffect(() => {
        if (!user) return;
        loadData();
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        let hostProfile = await getHostProfile(user!.id);
        setProfile(hostProfile);
        
        let props: AppHostProperty[] = [];
        if (hostProfile) {
            props = await getHostProperties(hostProfile.host_id);
        } else {
            // Check registrations
            const { getMyHostRegistrations } = await import('../services/hostsService');
            const regRes = await getMyHostRegistrations();
            if (regRes.success) {
                props = regRes.registrations.map(r => ({
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
                    isPending: r.status === 'pending',
                    isRejected: r.status === 'rejected',
                    rejectionReason: r.rejection_reason
                } as any));

                // Provision a mock profile for the modal/nav
                if (regRes.registrations.length > 0) {
                    setProfile({ host_id: -1, user_id: user!.id, destination_id: 0 } as any);
                }
            }
        }
        setProperties(props);

        const { data } = await supabase.from('destinations').select('destination_id, name').order('name');
        if (data) setDestinations(data);
        
        setLoading(false);
    };

    const handleToggleStatus = async (propertyId: number, currentStatus: boolean) => {
        const { success } = await togglePropertyStatus(propertyId, !currentStatus);
        if (success) {
            setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, isActive: !currentStatus } : p));
            toast.success(`Property ${!currentStatus ? 'activated' : 'deactivated'}`);
        } else {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (propertyId: number) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;
        
        const { success } = await deleteHostProperty(propertyId);
        if (success) {
            setProperties(prev => prev.filter(p => p.id !== propertyId));
            toast.success('Property deleted successfully');
        } else {
            toast.error('Failed to delete property. It might have active bookings.');
        }
    };

    const openModal = (property?: AppHostProperty) => {
        if (property) {
            setEditingProperty(property);
            setFormData({
                name: property.name,
                destinationId: property.destinationId.toString(),
                address: property.address,
                maxGuests: property.maxGuests,
                providesFood: property.providesFood,
                voluntaryMinAmount: property.voluntaryMinAmount?.toString() || ''
            });
        } else {
            setEditingProperty(null);
            setFormData({
                name: '',
                destinationId: profile?.destination_id.toString() || '',
                address: '',
                maxGuests: 2,
                providesFood: false,
                voluntaryMinAmount: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;

        const payload = {
            hostId: profile.host_id,
            destinationId: parseInt(formData.destinationId),
            name: formData.name,
            address: formData.address,
            maxGuests: formData.maxGuests,
            providesFood: formData.providesFood,
            voluntaryMinAmount: formData.voluntaryMinAmount ? parseFloat(formData.voluntaryMinAmount) : null,
            isActive: true
        };

        if (editingProperty) {
            const { success } = await updateHostProperty(editingProperty.id, payload);
            if (success) {
                toast.success('Property updated');
                loadData();
                setIsModalOpen(false);
            } else {
                toast.error('Failed to update property');
            }
        } else {
            const { success, property } = await addHostProperty(payload);
            if (success && property) {
                toast.success('Property added');
                setProperties([property, ...properties]);
                setIsModalOpen(false);
            } else {
                toast.error('Failed to add property');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <HostNav />
            <div className="section-container py-10 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-brand-200">Portfolio</span>
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter">My Properties</h1>
                        <p className="text-gray-400 font-medium text-lg">Manage your listings, track approvals, and update property details.</p>
                    </div>
                    <button 
                        onClick={() => openModal()}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-brand-500/20 active:scale-95"
                    >
                        <Plus size={20} /> Add New Listing
                    </button>
                </div>

                {properties.length === 0 ? (
                    <div className="bg-white rounded-[40px] p-20 text-center shadow-sm border border-slate-100 max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-slate-100">
                            <Home size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">No properties discovered yet</h3>
                        <p className="text-gray-400 mb-10 leading-relaxed font-medium text-lg">Your hosting journey begins with your first property. Showcase your local stay and start connecting with incredible travelers.</p>
                        <button 
                            onClick={() => openModal()}
                            className="px-10 py-5 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-lg"
                        >
                            Start Hosting Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {properties.map(property => (
                            <motion.div 
                                key={property.id} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[40px] border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                            >
                                <div className="h-64 bg-slate-100 relative overflow-hidden">
                                     {/* Mock image background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                        <Home size={64} className="text-white/50" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                    
                                    <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                                        {(property as any).isPending ? (
                                            <span className="px-4 py-2 rounded-xl bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 border border-amber-400 animate-pulse">
                                                <Clock size={12} /> Pending Approval
                                            </span>
                                        ) : (property as any).isRejected ? (
                                            <span className="px-4 py-2 rounded-xl bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg border border-rose-500">
                                                Application Rejected
                                            </span>
                                        ) : (
                                            <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border ${property.isActive ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-500 text-white border-slate-400'}`}>
                                                {property.isActive ? 'Live & Active' : 'Offline / Hidden'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute bottom-6 left-6 z-20">
                                        <div className="flex items-center gap-2 mb-2">
                                             <MapPin size={14} className="text-brand-400" />
                                             <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest leading-none">{property.destinationName}</p>
                                        </div>
                                        <h3 className="text-2xl font-black text-white tracking-tight">{property.name}</h3>
                                    </div>

                                    <div className="absolute top-6 right-6 z-20">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={property.isActive} disabled={(property as any).isPending || (property as any).isRejected} onChange={() => handleToggleStatus(property.id, property.isActive)} />
                                            <div className="w-14 h-8 bg-black/20 backdrop-blur-md peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500 border border-white/20"></div>
                                        </label>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Capacity</span>
                                            <span className="flex items-center gap-2 text-sm font-black text-gray-800 italic"><Users size={16} className="text-brand-500"/> {property.maxGuests} Guests</span>
                                        </div>
                                        {property.providesFood && (
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Catering</span>
                                                <span className="flex items-center gap-2 text-sm font-black text-emerald-600 italic"><Utensils size={16}/> Meals Included</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-[32px] mb-8 border border-slate-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Contribution Model</p>
                                            <p className="font-black text-gray-900 text-lg italic">
                                                {property.voluntaryMinAmount ? `₹${property.voluntaryMinAmount} / night` : 'Pay as you feel'}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 bg-white text-brand-600 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 italic font-black text-xl">
                                            ₹
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => openModal(property)} 
                                            disabled={(property as any).isPending || (property as any).isRejected}
                                            className="flex-1 py-4 rounded-2xl border-2 border-slate-100 text-gray-400 font-black text-xs uppercase tracking-widest hover:border-brand-500 hover:text-brand-600 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group/edit"
                                        >
                                            <Edit2 size={16} className="group-hover/edit:rotate-12 transition-transform" /> Edit Config
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(property.id)} 
                                            className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all border border-rose-100 shadow-sm active:scale-95"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    
                                    {(property as any).isRejected && (
                                        <div className="mt-6 p-4 bg-rose-50 rounded-2xl border border-rose-100">
                                            <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Rejection Status</p>
                                            <p className="text-xs text-rose-500 font-medium leading-relaxed italic">
                                                {(property as any).rejectionReason || "Common issues: invalid address for tourism or incomplete details. Please contact support."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>


            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-100">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
                                <p className="text-sm text-gray-500">Provide details about your local stay experience</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8">
                            <form id="property-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Property Name</label>
                                        <input 
                                            required 
                                            placeholder="e.g. Riverside Homestay"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" 
                                            value={formData.name} 
                                            onChange={e => setFormData({...formData, name: e.target.value})} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Destination</label>
                                        <select 
                                            required 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all appearance-none bg-white" 
                                            value={formData.destinationId} 
                                            onChange={e => setFormData({...formData, destinationId: e.target.value})}
                                        >
                                            <option value="">Select a city...</option>
                                            {destinations.map(d => <option key={d.destination_id} value={d.destination_id}>{d.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Complete Address</label>
                                    <textarea 
                                        required 
                                        rows={3}
                                        placeholder="Full address for guest navigation..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none" 
                                        value={formData.address} 
                                        onChange={e => setFormData({...formData, address: e.target.value})} 
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Max Guests</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="number" 
                                                required 
                                                min="1"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" 
                                                value={formData.maxGuests} 
                                                onChange={e => setFormData({...formData, maxGuests: parseInt(e.target.value) || 1})} 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Min Contribution (Optional)</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input 
                                                type="number" 
                                                placeholder="e.g. 500"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" 
                                                value={formData.voluntaryMinAmount} 
                                                onChange={e => setFormData({...formData, voluntaryMinAmount: e.target.value})} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <input 
                                        type="checkbox" 
                                        id="providesFood"
                                        className="w-5 h-5 rounded-lg text-brand-500 border-gray-300 focus:ring-brand-500"
                                        checked={formData.providesFood} 
                                        onChange={e => setFormData({...formData, providesFood: e.target.checked})} 
                                    />
                                    <label htmlFor="providesFood" className="text-sm font-bold text-gray-700 cursor-pointer">
                                        I provide meals for my guests <span className="font-normal text-gray-500">(Breakfast/Lunch/Dinner)</span>
                                    </label>
                                </div>
                            </form>
                        </div>

                        <div className="p-8 border-t border-gray-100 flex gap-4 bg-white">
                            <button 
                                type="button" 
                                onClick={() => setIsModalOpen(false)} 
                                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                form="property-form" 
                                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-ocean-600 text-white font-bold shadow-lg shadow-brand-500/20 hover:shadow-xl transition-all"
                            >
                                {editingProperty ? 'Save Changes' : 'Create Property'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
