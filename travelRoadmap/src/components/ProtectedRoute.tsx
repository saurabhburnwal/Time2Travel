import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Spinner shown while the auth session is being verified on mount.
 * Prevents a flash of the login redirect before the JWT is validated.
 */
function AuthLoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-offwhite to-blue-50/30">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin" />
                <p className="text-gray-400 text-sm font-medium">Verifying session…</p>
            </div>
        </div>
    );
}

/**
 * ProtectedRoute — requires the user to be logged in.
 * While the JWT is being validated on mount, shows a spinner.
 * Once resolved: unauthenticated → redirects to /login (preserving intended destination).
 */
export function ProtectedRoute() {
    const { isLoggedIn, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) return <AuthLoadingSpinner />;
    if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;

    return <Outlet />;
}

/**
 * AdminRoute — requires the user to be logged in AND have the 'admin' role.
 * Non-admin authenticated users are redirected to the home page.
 */
export function AdminRoute() {
    const { isLoggedIn, isLoading, isAdmin } = useAuth();
    const location = useLocation();

    if (isLoading) return <AuthLoadingSpinner />;
    if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
    if (!isAdmin) return <Navigate to="/" replace />;

    return <Outlet />;
}
