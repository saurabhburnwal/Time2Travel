import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Key, Lock, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import toast from 'react-hot-toast';
import { forgotPassword, verifyResetOTP, resetPassword } from '../services/usersService';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [loading, setLoading] = useState(false);
    
    // Step 1: Request OTP
    const [email, setEmail] = useState('');
    
    // Step 2: Verify OTP
    const [otp, setOtp] = useState('');
    const [resetToken, setResetToken] = useState('');

    // Step 3: Set New Password
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return toast.error('Please enter your email address');

        setLoading(true);
        try {
            const res = await forgotPassword(email);
            if (res.success) {
                toast.success(res.message);
                setStep(2);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Failed to request password reset. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) return toast.error('Please enter the 6-digit code');

        setLoading(true);
        try {
            const res = await verifyResetOTP(email, otp);
            if (res.success && res.resetToken) {
                toast.success('Verification successful');
                setResetToken(res.resetToken);
                setStep(3);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Verification failed. Please check the code and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSetNewPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 8) return toast.error('Password must be at least 8 characters long');
        if (newPassword !== confirmPassword) return toast.error('Passwords do not match');

        setLoading(true);
        try {
            // In a real implementation, you would hash the password on the client side before sending it
            // For now, we will send it securely over HTTPS as the backend hashes it.
            // Ideally use crypto-js here if matching the rest of the app's hash flow
            const { SHA256 } = await import('crypto-js');
            const hashedPassword = SHA256(newPassword).toString();

            const res = await resetPassword(resetToken, hashedPassword);
            if (res.success) {
                toast.success('Password successfully reset!');
                navigate('/login');
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Failed to reset password. The session may have expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedPage className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-200/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-ocean-200/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block group mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-ocean-400 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-xl shadow-brand-500/20 group-hover:scale-105 transition-transform">
                            T
                        </div>
                    </Link>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                        {step === 1 && 'Reset Password'}
                        {step === 2 && 'Verify Code'}
                        {step === 3 && 'New Password'}
                    </h1>
                    <p className="text-slate-500">
                        {step === 1 && "Enter your email to receive a reset code"}
                        {step === 2 && `We sent a 6-digit code to ${email}`}
                        {step === 3 && "Create a strong new password"}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        
                        {/* STEP 1: Email Request */}
                        {step === 1 && (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                                onSubmit={handleRequestOTP}
                            >
                                <div>
                                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-70"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                        <>Send Reset Code <ArrowRight size={18} /></>
                                    )}
                                </button>

                                <div className="text-center pt-4 border-t border-slate-100">
                                    <Link to="/login" className="text-sm font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-2 transition-colors">
                                        <ArrowLeft size={16} /> Back to Login
                                    </Link>
                                </div>
                            </motion.form>
                        )}

                        {/* STEP 2: OTP Verification */}
                        {step === 2 && (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                                onSubmit={handleVerifyOTP}
                            >
                                <div>
                                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">6-Digit Code</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            required
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // only numbers
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors text-center text-lg font-bold tracking-[0.5em]"
                                            placeholder="------"
                                        />
                                    </div>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={loading || otp.length !== 6}
                                    className="w-full bg-brand-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                        <>Verify Code <ShieldCheck size={18} /></>
                                    )}
                                </button>

                                <div className="text-center pt-4 border-t border-slate-100">
                                    <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                                        Didn't receive it? Enter a different email
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {/* STEP 3: Set New Password */}
                        {step === 3 && (
                            <motion.form
                                key="step3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                                onSubmit={handleSetNewPassword}
                            >
                                <div>
                                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex justify-between">
                                        New Password
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-brand-500 lowercase font-semibold flex items-center gap-1">
                                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />} 
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                                            placeholder="Must be at least 8 characters"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                                            placeholder="Re-enter your password"
                                        />
                                    </div>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={loading || !newPassword || newPassword !== confirmPassword}
                                    className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                        <>Set New Password <Key size={18} /></>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AnimatedPage>
    );
}
