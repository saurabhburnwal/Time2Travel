import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) { toast.error('Please fill in all fields'); return; }
        setLoading(true);
        try {
            const res = await login(email, password);
            if (res.success) {
                toast.success('Welcome back!');
                // route based on actual role rather than email string
                if (res.user?.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/plan');
                }
            } else {
                if (res.error === 'not_found') {
                    toast.error('No account found. Redirecting to registration.');
                    navigate('/register', { state: { email } });
                } else if (res.error === 'invalid_credentials') {
                    toast.error('Invalid email or password.');
                } else {
                    toast.error('Login failed. Please check your credentials.');
                }
            }
        } catch {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedPage className="min-h-screen flex">
            {/* Left: Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img src="https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Travel" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                <div className="absolute bottom-12 left-12 text-white">
                    <h2 className="text-4xl font-bold font-display mb-2">Welcome Back</h2>
                    <p className="text-white/80 text-lg">Continue your travel journey</p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-24 bg-gradient-to-br from-offwhite to-blue-50/30">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-ocean-300 flex items-center justify-center">
                            <MapPin className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold font-display gradient-text">Time2Travel</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
                    <p className="text-gray-500 mb-8">Enter your credentials to continue</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="floating-label">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="you@email.com" className="input-field pl-11"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="floating-label">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                    placeholder="Your password" className="input-field pl-11 pr-11"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full text-center justify-center">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Quick Login Hint */}
                    <div className="mt-6 p-4 bg-brand-50 rounded-xl text-sm">
                        <p className="font-semibold text-brand-700 mb-1">Quick Login</p>
                        <p className="text-brand-600"><strong>Admin:</strong> admin@timetotravel.com / 123456</p>
                        <p className="text-brand-600"><strong>Traveler:</strong> any email / any password</p>
                    </div>

                    <p className="text-center text-gray-500 text-sm mt-6">
                        New here?{' '}
                        <Link to="/register" className="text-brand-600 font-semibold hover:underline">Create Account</Link>
                    </p>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
