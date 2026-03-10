import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock, MapPin, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { verifyEmailToken, resendVerificationEmail } from '../services/usersService';
import toast from 'react-hot-toast';

type Status = 'loading' | 'success' | 'already_verified' | 'expired' | 'invalid';

export default function EmailVerified() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';

    const [status, setStatus] = useState<Status>('loading');
    const [name, setName] = useState('');
    const [expiredEmail, setExpiredEmail] = useState('');
    const [isResending, setIsResending] = useState(false);
    const hasCalledRef = React.useRef(false);

    useEffect(() => {
        if (!token) {
            setStatus('invalid');
            return;
        }

        if (hasCalledRef.current) return;
        hasCalledRef.current = true;

        verifyEmailToken(token).then((result) => {
            if (result.success) {
                setStatus(result.alreadyVerified ? 'already_verified' : 'success');
                if (result.name) setName(result.name);
            } else if (result.expired) {
                setStatus('expired');
                if (result.email) setExpiredEmail(result.email);
            } else {
                setStatus('invalid');
            }
        });
    }, [token]);

    const handleResendFromExpired = async () => {
        if (!expiredEmail || isResending) return;
        setIsResending(true);
        try {
            const ok = await resendVerificationEmail(expiredEmail);
            if (ok) {
                toast.success('New verification email sent! Check your inbox.');
            } else {
                toast.error('Failed to resend. Please try again later.');
            }
        } finally {
            setIsResending(false);
        }
    };

    const config: Record<Status, {
        icon: React.ReactNode;
        title: string;
        desc: string;
        iconBg: string;
        action?: React.ReactNode;
    }> = {
        loading: {
            icon: <Loader size={36} className="text-blue-500 animate-spin" />,
            title: 'Verifying your email…',
            desc: 'Please wait a moment.',
            iconBg: 'from-blue-100 to-sky-200',
        },
        success: {
            icon: <CheckCircle size={36} className="text-green-500" />,
            title: `Welcome${name ? `, ${name}` : ''}! 🎉`,
            desc: 'Your email has been verified successfully. You can now log in and start planning your journeys.',
            iconBg: 'from-green-100 to-emerald-200',
            action: (
                <Link
                    to="/login"
                    className="inline-block mt-4 btn-primary text-center px-8 py-3"
                >
                    Go to Login →
                </Link>
            ),
        },
        already_verified: {
            icon: <CheckCircle size={36} className="text-green-400" />,
            title: 'Already verified!',
            desc: 'Your email is already verified. Head over to login to continue.',
            iconBg: 'from-green-100 to-emerald-200',
            action: (
                <Link to="/login" className="inline-block mt-4 btn-primary text-center px-8 py-3">
                    Go to Login →
                </Link>
            ),
        },
        expired: {
            icon: <Clock size={36} className="text-amber-500" />,
            title: 'Link expired',
            desc: 'This verification link has expired (links are valid for 24 hours). Request a new one below.',
            iconBg: 'from-amber-100 to-yellow-200',
            action: (
                <button
                    onClick={handleResendFromExpired}
                    disabled={isResending}
                    className="mt-4 btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isResending ? 'Sending…' : 'Resend Verification Email'}
                </button>
            ),
        },
        invalid: {
            icon: <XCircle size={36} className="text-red-500" />,
            title: 'Invalid link',
            desc: 'This verification link is invalid or has already been used. If you need help, please register again or contact support.',
            iconBg: 'from-red-100 to-rose-200',
            action: (
                <Link to="/register" className="inline-block mt-4 btn-primary text-center px-8 py-3">
                    Back to Register
                </Link>
            ),
        },
    };

    const { icon, title, desc, iconBg, action } = config[status];

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

                <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8 text-center">
                    <motion.div
                        key={status}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className={`mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br ${iconBg} flex items-center justify-center`}
                    >
                        {icon}
                    </motion.div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-3">{title}</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>

                    {action && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-center"
                        >
                            {action}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatedPage>
    );
}
