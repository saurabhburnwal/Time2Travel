import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Wraps a route that requires authentication.
 * - While the auth state is loading, shows a spinner.
 * - If not logged in, redirects to /login.
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, loading } = useAuth();

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

    return <>{children}</>;
}
