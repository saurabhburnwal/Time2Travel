import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Wraps a route that requires admin role.
 * - While the auth state is loading, shows a spinner.
 * - If not logged in, redirects to /login.
 * - If logged in but not admin, redirects to / with a toast.
 */
export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center page-bg">
                <Loader2 size={36} className="animate-spin text-brand-500" />
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        toast.error('Access denied. Admin privileges required.');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
