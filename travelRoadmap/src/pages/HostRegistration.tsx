import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Home, Users, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { STATES, DESTINATIONS } from '../data/mockData';
import toast from 'react-hot-toast';

export default function HostRegistration() {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: '', phone: '', state: '', destination: '', address: '', maxGuests: 1, providesFood: false, minAmount: 0,
    });

    const update = (key: string, value: any) => setForm(p => ({ ...p, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.destination) { toast.error('Please fill required fields'); return; }
        setSubmitted(true);
        toast.success('Host registration submitted!');
    };

    if (submitted) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold font-display mb-3">Registration Submitted!</h2>
                    <p className="text-gray-500 mb-8">Your host profile will be reviewed and verified by our admin team within 24-48 hours.</p>
                    <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
                </motion.div>
            </AnimatedPage>
        );
    }

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-2xl">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-600 mb-6"><ArrowLeft size={18} /> Back</button>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold font-display mb-2">
                        Become a <span className="gradient-text">Local Host</span>
                    </h1>
                    <p className="text-gray-500">Open your home to travelers and share your culture</p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="floating-label">Full Name *</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" className="input-field pl-11" />
                            </div>
                        </div>

                        <div>
                            <label className="floating-label">Phone *</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" className="input-field pl-11" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="floating-label">State *</label>
                                <select value={form.state} onChange={e => { update('state', e.target.value); update('destination', ''); }} className="select-field">
                                    <option value="">Select state</option>
                                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="floating-label">Destination *</label>
                                <select value={form.destination} onChange={e => update('destination', e.target.value)} className="select-field" disabled={!form.state}>
                                    <option value="">Select destination</option>
                                    {(DESTINATIONS[form.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="floating-label">Address</label>
                            <div className="relative">
                                <Home size={18} className="absolute left-4 top-4 text-gray-400" />
                                <textarea value={form.address} onChange={e => update('address', e.target.value)} placeholder="Your home address" className="input-field pl-11 min-h-[80px] resize-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="floating-label">Max Guests</label>
                                <div className="flex items-center gap-3">
                                    {[1, 2, 3, 4].map(n => (
                                        <button key={n} type="button" onClick={() => update('maxGuests', n)} className={`w-12 h-12 rounded-xl font-bold transition-all ${form.maxGuests === n ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="floating-label">Voluntary Min Amount (₹)</label>
                                <input type="number" value={form.minAmount} onChange={e => update('minAmount', parseInt(e.target.value) || 0)} className="input-field" placeholder="0" />
                            </div>
                        </div>

                        <label className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={form.providesFood} onChange={e => update('providesFood', e.target.checked)} className="w-5 h-5 rounded accent-brand-500" />
                            <div>
                                <span className="font-semibold text-gray-800">🍽️ I can provide home-cooked meals</span>
                                <p className="text-xs text-gray-500 mt-0.5">Travelers love authentic local food!</p>
                            </div>
                        </label>

                        <button type="submit" className="btn-primary w-full text-center justify-center text-lg py-4">
                            Submit Registration
                        </button>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    );
}
