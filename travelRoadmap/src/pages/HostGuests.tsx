import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getHostProfile } from '../services/hostProfileService';
import { getHostBookings, updateBookingStatus, updateHostNotes, getGuestSafetyContact } from '../services/hostBookingService';
import { AppHostBooking, DBHostProfile, DBSafetyContact } from '../services/supabaseClient';
import HostNav from '../components/HostNav';
import { Loader2, Phone, Mail, Calendar, MapPin, CheckCircle, XCircle, ShieldAlert, MessageSquare, Save, IndianRupee } from 'lucide-react';
import { updateContributionReceived } from '../services/hostBookingService';
import toast from 'react-hot-toast';

export default function HostGuests() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<DBHostProfile | null>(null);
    const [bookings, setBookings] = useState<AppHostBooking[]>([]);
    const [filter, setFilter] = useState('all');
    
    // Safety contact modal
    const [safetyContact, setSafetyContact] = useState<DBSafetyContact | null>(null);
    const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
    const [loadingContact, setLoadingContact] = useState(false);

    // Notes editing
    const [editingNotesId, setEditingNotesId] = useState<number | null>(null);
    const [tempNotes, setTempNotes] = useState('');

    // Settlement modal
    const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
    const [settlingBooking, setSettlingBooking] = useState<AppHostBooking | null>(null);
    const [settlementAmount, setSettlementAmount] = useState('');

    useEffect(() => {
        if (!user) return;
        loadData();
    }, [user, filter]);

    const loadData = async () => {
        setLoading(true);
        let currentProfile = profile;
        if (!currentProfile) {
            currentProfile = await getHostProfile(user!.id);
            setProfile(currentProfile);
        }
        if (currentProfile) {
            const bks = await getHostBookings(currentProfile.host_id, filter);
            setBookings(bks);
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (bookingId: number, newStatus: string) => {
        const { success } = await updateBookingStatus(bookingId, newStatus);
        if (success) {
            toast.success(`Booking marked as ${newStatus.replace('_', ' ')}`);
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b));
        } else {
            toast.error('Failed to update status');
        }
    };

    const handleViewSafetyContact = async (travelerId: number) => {
        setLoadingContact(true);
        setIsSafetyModalOpen(true);
        const contact = await getGuestSafetyContact(travelerId);
        setSafetyContact(contact);
        setLoadingContact(false);
    };

    const handleSaveNotes = async (bookingId: number) => {
        const { success } = await updateHostNotes(bookingId, tempNotes);
        if (success) {
            toast.success('Notes saved');
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, hostNotes: tempNotes } : b));
            setEditingNotesId(null);
        } else {
            toast.error('Failed to save notes');
        }
    };

    const handleSettlePayment = async () => {
        if (!settlingBooking || !settlementAmount) return;
        const amount = parseFloat(settlementAmount);
        if (isNaN(amount)) return toast.error('Invalid amount');

        const { success } = await updateContributionReceived(settlingBooking.id, amount);
        if (success) {
            toast.success('Settlement recorded');
            setBookings(prev => prev.map(b => b.id === settlingBooking.id ? { ...b, contributionReceived: amount } : b));
            setIsSettlementModalOpen(false);
            setSettlingBooking(null);
            setSettlementAmount('');
        } else {
            toast.error('Failed to update settlement');
        }
    };

    const startEditingNotes = (booking: AppHostBooking) => {
        setTempNotes(booking.hostNotes || '');
        setEditingNotesId(booking.id);
    };

    if (loading && !profile) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    const filters = [
        { id: 'all', label: 'All Guests' },
        { id: 'pending', label: 'Pending' },
        { id: 'confirmed', label: 'Confirmed' },
        { id: 'checked_in', label: 'Checked In' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <HostNav />
            
            <div className="section-container py-10 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-brand-200">Hospitality Log</span>
                             <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic">Guests</h1>
                        <p className="text-gray-400 font-medium text-lg">Managing the incredible people staying at your properties.</p>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
                        {filters.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filter === f.id 
                                        ? 'bg-slate-900 text-white shadow-lg' 
                                        : 'text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="w-12 h-12 animate-spin text-brand-500" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-pulse">Retrieving Guest Ledger...</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-[40px] p-24 text-center shadow-sm border border-slate-100 max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-slate-100">
                            <Calendar size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter italic">Desk is currently clear</h3>
                        <p className="text-gray-400 font-medium text-lg leading-relaxed">No reservations match your current filter. Your properties are ready and waiting for the next adventurer.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <AnimatePresence>
                            {bookings.map(booking => (
                                <motion.div 
                                    key={booking.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                                >
                                    <div className="p-8 border-b border-slate-50 flex justify-between items-start bg-slate-50/30">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 font-black text-brand-600 shadow-sm text-xl italic uppercase">
                                                {booking.travelerName.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-gray-900 tracking-tight italic">{booking.travelerName}</h3>
                                                <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><Mail size={12} className="text-brand-400" /> {booking.travelerEmail}</span>
                                                    <span className="flex items-center gap-1.5"><Phone size={12} className="text-brand-400" /> {booking.travelerPhone || 'No Phone'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge status={booking.status} />
                                    </div>
                                    
                                    <div className="p-8 space-y-8">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Location</p>
                                                    <p className="font-black text-gray-800 flex items-center gap-2 italic">
                                                        <MapPin size={18} className="text-brand-500"/> {booking.propertyName}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Itinerary</p>
                                                    <p className="font-bold text-gray-600 flex items-center gap-2">
                                                        <Calendar size={18} className="text-ocean-500" /> 
                                                        Day {booking.checkInDay} <span className="text-slate-300 mx-2">→</span> Day {booking.checkOutDay}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right bg-slate-50 p-6 rounded-[32px] border border-slate-100 min-w-[160px]">
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 italic">Settlement</p>
                                                <div className="flex flex-col items-end">
                                                    <p className={`text-2xl font-black tracking-tighter italic ${booking.contributionReceived ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                        {booking.contributionReceived ? `₹${booking.contributionReceived.toLocaleString()}` : 'Pending'}
                                                    </p>
                                                    {!booking.contributionReceived && booking.status === 'completed' && (
                                                        <button 
                                                            onClick={() => { setSettlingBooking(booking); setIsSettlementModalOpen(true); }}
                                                            className="text-[10px] font-black text-brand-600 hover:text-brand-700 uppercase tracking-widest mt-2 bg-white px-3 py-1.5 rounded-lg border border-brand-100 shadow-sm transition-all active:scale-95"
                                                        >
                                                            Finalize Gift
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100 group/notes relative overflow-hidden transition-all hover:bg-white hover:border-brand-100">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 italic">
                                                    <MessageSquare size={14} className="text-brand-300"/> Private Dossier Note
                                                </span>
                                                {editingNotesId !== booking.id && (
                                                    <button onClick={() => startEditingNotes(booking)} className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:text-brand-700 transition-colors">Edit Entry</button>
                                                )}
                                            </div>
                                            {editingNotesId === booking.id ? (
                                                <div className="flex gap-3 relative z-10">
                                                    <input 
                                                        type="text" 
                                                        value={tempNotes}
                                                        onChange={e => setTempNotes(e.target.value)}
                                                        className="flex-1 text-sm bg-white px-5 py-3 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-medium"
                                                        placeholder="Add professional note..."
                                                    />
                                                    <button onClick={() => handleSaveNotes(booking.id)} className="bg-brand-600 text-white px-5 rounded-2xl hover:bg-brand-700 transition-all shadow-lg active:scale-95">
                                                        <Save size={20} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-600 italic leading-relaxed relative z-10 font-medium tracking-tight">
                                                    {booking.hostNotes ? `"${booking.hostNotes}"` : "No special requirements documented for this guest."}
                                                </p>
                                            )}
                                        </div>
                                        
                                        <div className="flex gap-4 pt-4 border-t border-slate-50">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <ActionButton onClick={() => handleStatusUpdate(booking.id, 'confirmed')} icon={<CheckCircle size={18}/>} label="Admit Guest" color="bg-brand-600 text-white hover:bg-brand-700 border-transparent shadow-lg shadow-brand-500/20 active:scale-95" />
                                                    <ActionButton onClick={() => handleStatusUpdate(booking.id, 'cancelled')} icon={<XCircle size={18}/>} label="Decline" color="bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white border-rose-100 active:scale-95" />
                                                </>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <ActionButton onClick={() => handleStatusUpdate(booking.id, 'checked_in')} icon={<CheckCircle size={18}/>} label="Verify Check-in" color="bg-emerald-600 text-white hover:bg-emerald-700 border-transparent shadow-lg shadow-emerald-500/20 active:scale-95" />
                                            )}
                                            {booking.status === 'checked_in' && (
                                                <ActionButton onClick={() => handleStatusUpdate(booking.id, 'completed')} icon={<CheckCircle size={18}/>} label="Mark Departure" color="bg-slate-900 text-white hover:bg-black border-transparent shadow-lg active:scale-95" />
                                            )}
                                            <button 
                                                onClick={() => handleViewSafetyContact(booking.travelerId)}
                                                className="flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border-2 border-slate-100 text-slate-400 hover:text-brand-600 hover:border-brand-500 transition-all active:scale-95"
                                            >
                                                <ShieldAlert size={18} /> Support Contact
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>


            {/* Safety Contact Modal */}
            <AnimatePresence>
                {isSafetyModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="bg-red-50 p-6 flex flex-col items-center border-b border-red-100">
                                <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-3">
                                    <ShieldAlert size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Emergency Contact</h2>
                                <p className="text-sm text-red-600 text-center mt-1">Only use in case of an emergency involving this guest.</p>
                            </div>
                            
                            <div className="p-6">
                                {loadingContact ? (
                                    <div className="flex justify-center py-4">
                                        <Loader2 className="w-6 h-6 animate-spin text-red-500" />
                                    </div>
                                ) : safetyContact ? (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Contact Name</p>
                                            <p className="text-lg font-medium text-gray-900">{safetyContact.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                            <a href={`tel:${safetyContact.phone}`} className="text-lg font-medium text-brand-600 hover:underline">{safetyContact.phone}</a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4 text-gray-500">
                                        No safety contact provided by the guest.
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                                <button 
                                    onClick={() => setIsSafetyModalOpen(false)}
                                    className="px-6 py-2 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Settlement Modal */}
            <AnimatePresence>
                {isSettlementModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 text-center bg-slate-50 border-b border-slate-100">
                                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <IndianRupee size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900">Record Settlement</h2>
                                <p className="text-sm text-gray-500 mt-1">Enter the total contribution received from {settlingBooking?.travelerName}</p>
                            </div>
                            
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Contribution Amount</label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="number" 
                                            autoFocus
                                            placeholder="e.g. 1500"
                                            value={settlementAmount}
                                            onChange={e => setSettlementAmount(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-bold text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setIsSettlementModalOpen(false)}
                                        className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-slate-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSettlePayment}
                                        className="flex-2 px-6 py-4 bg-gradient-to-r from-brand-600 to-ocean-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 hover:shadow-xl transition-all"
                                    >
                                        Save Settlement
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Badge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-700',
        confirmed: 'bg-blue-100 text-blue-700',
        checked_in: 'bg-green-100 text-green-700',
        completed: 'bg-gray-100 text-gray-700',
        cancelled: 'bg-red-100 text-red-700',
    };
    
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${colors[status] || colors.pending}`}>
            {status.replace('_', ' ').toUpperCase()}
        </span>
    );
}

function ActionButton({ onClick, icon, label, color }: { onClick: () => void, icon: React.ReactNode, label: string, color: string }) {
    return (
        <button 
            onClick={onClick}
            className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 border transition-colors ${color}`}
        >
            {icon} {label}
        </button>
    );
}
