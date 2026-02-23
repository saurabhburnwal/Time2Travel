import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', gender: '', role: 'traveler' as 'traveler' | 'host' });
    const [showPass, setShowPass] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const update = (key: string, value: string) => setForm(p => ({ ...p, [key]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) { toast.error('Please fill required fields'); return; }
        if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
        const success = await register({ name: form.name, email: form.email, phone: form.phone, gender: form.gender, role: form.role as any });
        if (success) {
            toast.success('Account created successfully!');
            // Redirect hosts to host registration page, travelers to home
            if (form.role === 'host') {
                navigate('/host-register');
            } else {
                navigate('/');
            }
        } else {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <AnimatedPage className="min-h-screen flex">
            {/* Left: Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Travel" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                <div className="absolute bottom-12 left-12 text-white">
                    <h2 className="text-4xl font-bold font-display mb-2">Join Time2Travel</h2>
                    <p className="text-white/80 text-lg">Start your journey with us today</p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-24 bg-gradient-to-br from-offwhite to-blue-50/30">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-ocean-500 flex items-center justify-center">
                            <MapPin className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold font-display gradient-text">Time2Travel</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-500 mb-8">Fill in your details to get started</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="floating-label">Full Name *</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" className="input-field pl-11" />
                            </div>
                        </div>

                        <div>
                            <label className="floating-label">Email *</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" className="input-field pl-11" />
                            </div>
                        </div>

                        <div>
                            <label className="floating-label">Phone</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" className="input-field pl-11" />
                            </div>
                        </div>

                        <div>
                            <label className="floating-label">Password *</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min 6 characters" className="input-field pl-11 pr-11" />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><EyeOff size={18} /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="floating-label">Gender</label>
                                <select value={form.gender} onChange={e => update('gender', e.target.value)} className="select-field">
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="floating-label">I am a</label>
                                <select value={form.role} onChange={e => update('role', e.target.value)} className="select-field">
                                    <option value="traveler">Traveler</option>
                                    <option value="host">Host</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full text-center justify-center mt-2">
                            Create Account
                        </button>
                    </form>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign In</Link>
                    </p>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
