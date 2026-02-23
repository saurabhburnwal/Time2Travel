import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { login, register } = useAuth();

    // Login form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Register form
    const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', password: '', gender: '' });
    const updateReg = (key: string, value: string) => setRegForm(p => ({ ...p, [key]: value }));

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) { toast.error('Please fill in all fields'); return; }
        setLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                toast.success('Welcome back!');
                onSuccess();
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!regForm.name || !regForm.email || !regForm.password) { toast.error('Please fill required fields'); return; }
        if (regForm.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
        setLoading(true);
        try {
            const success = await register({
                name: regForm.name,
                email: regForm.email,
                phone: regForm.phone,
                gender: regForm.gender,
                role: 'traveler',
            });
            if (success) {
                toast.success('Account created successfully!');
                onSuccess();
            } else {
                toast.error('Registration failed. Please try again.');
            }
        } catch {
            toast.error('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md glass-card p-8 z-10"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                            <X size={20} />
                        </button>

                        {/* Logo */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-ocean-500 flex items-center justify-center">
                                <MapPin className="text-white" size={18} />
                            </div>
                            <span className="text-lg font-bold font-display gradient-text">Time2Travel</span>
                        </div>

                        {/* Header */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            {mode === 'login' ? 'Sign In to Continue' : 'Create Account'}
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            {mode === 'login' ? 'Login to generate your travel roadmap' : 'Sign up to start planning your trip'}
                        </p>

                        {mode === 'login' ? (
                            /* ===== LOGIN FORM ===== */
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="floating-label">Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className="input-field pl-11 py-3 text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="floating-label">Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" className="input-field pl-11 pr-11 py-3 text-sm" />
                                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="btn-primary w-full text-center justify-center py-3 text-sm">
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>

                                {/* Quick login hint */}
                                <div className="p-3 bg-brand-50 rounded-xl text-xs">
                                    <p className="font-semibold text-brand-700 mb-0.5">Quick Login</p>
                                    <p className="text-brand-600"><strong>Traveler:</strong> any email / any password</p>
                                </div>
                            </form>
                        ) : (
                            /* ===== REGISTER FORM ===== */
                            <form onSubmit={handleRegister} className="space-y-3">
                                <div>
                                    <label className="floating-label">Full Name *</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="text" value={regForm.name} onChange={e => updateReg('name', e.target.value)} placeholder="John Doe" className="input-field pl-11 py-3 text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="floating-label">Email *</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="email" value={regForm.email} onChange={e => updateReg('email', e.target.value)} placeholder="you@email.com" className="input-field pl-11 py-3 text-sm" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="floating-label">Phone</label>
                                        <div className="relative">
                                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input type="tel" value={regForm.phone} onChange={e => updateReg('phone', e.target.value)} placeholder="+91 98765" className="input-field pl-11 py-3 text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="floating-label">Gender</label>
                                        <select value={regForm.gender} onChange={e => updateReg('gender', e.target.value)} className="select-field py-3 text-sm">
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="floating-label">Password *</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type={showPass ? 'text' : 'password'} value={regForm.password} onChange={e => updateReg('password', e.target.value)} placeholder="Min 6 characters" className="input-field pl-11 pr-11 py-3 text-sm" />
                                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="btn-primary w-full text-center justify-center py-3 text-sm">
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </form>
                        )}

                        {/* Toggle Mode */}
                        <p className="text-center text-gray-500 text-sm mt-5">
                            {mode === 'login' ? (
                                <>New here? <button onClick={() => setMode('register')} className="text-brand-600 font-semibold hover:underline">Create Account</button></>
                            ) : (
                                <>Already have an account? <button onClick={() => setMode('login')} className="text-brand-600 font-semibold hover:underline">Sign In</button></>
                            )}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
