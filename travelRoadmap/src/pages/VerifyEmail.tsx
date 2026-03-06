import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, RefreshCw, CheckCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { resendVerificationEmail } from '../lib/supabaseService';
import toast from 'react-hot-toast';

const RESEND_COOLDOWN = 60; // seconds

export default function VerifyEmail() {
    const location = useLocation();
    const email: string = (location.state as any)?.email || '';

    const [cooldown, setCooldown] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [sentCount, setSentCount] = useState(0);

    // Countdown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => setCooldown(c => c - 1), 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleResend = async () => {
        if (!email || isSending || cooldown > 0) return;
        setIsSending(true);
        try {
            const ok = await resendVerificationEmail(email);
            if (ok) {
                toast.success('Verification email sent! Check your inbox.');
                setSentCount(c => c + 1);
                setCooldown(RESEND_COOLDOWN);
            } else {
                toast.error('Failed to resend. Please try again.');
            }
        } finally {
            setIsSending(false);
        }
    };

    return (
        <AnimatedPage className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-sky-50">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md mx-auto px-6"
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-ocean-500 flex items-center justify-center shadow-lg">
                        <MapPin className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold font-display gradient-text">Time2Travel</span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8 text-center">
                    {/* Animated icon */}
                    <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-sky-200 flex items-center justify-center"
                    >
                        <Mail className="text-blue-500" size={36} />
                    </motion.div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Check your inbox</h1>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        We've sent a verification link to
                        {email && (
                            <span className="block font-semibold text-blue-600 mt-1 break-all">{email}</span>
                        )}
                        <span className="block mt-2">Click the link in the email to activate your account.</span>
                    </p>

                    {/* Steps hint */}
                    <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left space-y-2">
                        {[
                            'Open the email from Time2Travel',
                            'Click "Verify Email Address"',
                            'Come back here and log in!',
                        ].map((step, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                                    {i + 1}
                                </div>
                                {step}
                            </div>
                        ))}
                    </div>

                    {/* Resend button */}
                    {email && (
                        <button
                            onClick={handleResend}
                            disabled={isSending || cooldown > 0}
                            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all
                                       bg-gradient-to-r from-blue-500 to-sky-500 text-white hover:from-blue-600 hover:to-sky-600
                                       disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            <RefreshCw size={16} className={isSending ? 'animate-spin' : ''} />
                            {isSending
                                ? 'Sending…'
                                : cooldown > 0
                                    ? `Resend in ${cooldown}s`
                                    : sentCount > 0
                                        ? 'Resend Verification Email'
                                        : 'Resend Verification Email'}
                        </button>
                    )}

                    {sentCount > 0 && (
                        <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                            <CheckCircle size={12} className="text-green-500" />
                            Email sent {sentCount} time{sentCount > 1 ? 's' : ''}
                        </p>
                    )}

                    <p className="text-xs text-gray-400 mt-6">
                        The link expires in 24 hours. Check your spam folder if you don't see it.
                    </p>
                </div>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Already verified?{' '}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </AnimatedPage>
    );
}
