import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppUser } from '../services/supabaseClient';
import { loginUser, registerUser } from '../services/usersService';

const STORAGE_KEY = 't2t_auth';
const API_BASE = 'http://localhost:5000/api';

interface StoredAuth {
    user: AppUser;
    token: string;
}

interface AuthContextType {
    user: AppUser | null;
    token: string | null;
    loading: boolean;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AppUser }>;
    register: (userData: { name: string; email: string; password: string; phone?: string; gender?: string; role?: string }) => Promise<{ success: boolean; error?: string; role?: string }>;
    logout: () => void;
    setUser: (user: AppUser) => void;
    isAdmin: boolean;
    isHost: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Decode a JWT payload without verifying the signature.
 * Returns null if the token is malformed.
 */
function decodeJwtPayload(token: string): Record<string, any> | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

/**
 * Check if a JWT is expired based on its `exp` claim.
 * Returns true if expired or if the token cannot be decoded.
 */
function isTokenExpired(token: string): boolean {
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.exp) return true;
    // exp is in seconds, Date.now() is in milliseconds
    return Date.now() >= payload.exp * 1000;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AppUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // true until session is validated

    // Validate session on mount
    useEffect(() => {
        const validateSession = async () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (!stored) {
                    setLoading(false);
                    return;
                }

                const parsed: StoredAuth = JSON.parse(stored);
                if (!parsed.user || !parsed.token) {
                    localStorage.removeItem(STORAGE_KEY);
                    setLoading(false);
                    return;
                }

                // 1. Client-side expiry check (instant, no network needed)
                if (isTokenExpired(parsed.token)) {
                    console.log('[Auth] Token expired. Clearing session.');
                    localStorage.removeItem(STORAGE_KEY);
                    setLoading(false);
                    return;
                }

                // 2. Server-side validation (confirms token is still valid)
                try {
                    const res = await fetch(`${API_BASE}/auth/verify`, {
                        headers: { Authorization: `Bearer ${parsed.token}` },
                    });

                    if (res.ok) {
                        // Token is valid — restore session
                        setUser(parsed.user);
                        setToken(parsed.token);
                    } else {
                        // Server rejected the token (revoked, invalid, etc.)
                        console.log('[Auth] Server rejected token. Clearing session.');
                        localStorage.removeItem(STORAGE_KEY);
                    }
                } catch {
                    // Backend is unreachable — trust client-side expiry check
                    console.log('[Auth] Backend unreachable. Trusting client-side expiry check.');
                    setUser(parsed.user);
                    setToken(parsed.token);
                }
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            } finally {
                setLoading(false);
            }
        };

        validateSession();
    }, []);

    const persistAuth = (u: AppUser, t: string) => {
        setUser(u);
        setToken(t);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: u, token: t }));
    };

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: AppUser }> => {
        const result = await loginUser(email, password);
        if (result) {
            persistAuth(result.user, result.token);
            return { success: true, user: result.user };
        }
        return { success: false, error: 'invalid_credentials' };
    };

    const register = async (userData: { name: string; email: string; password: string; phone?: string; gender?: string; role?: string }): Promise<{ success: boolean; error?: string; role?: string }> => {
        const result = await registerUser(userData);
        if (result) {
            persistAuth(result.user, result.token);
            return { success: true, role: result.user.role };
        }
        return { success: false, error: 'registration_failed' };
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const updateUser = (u: AppUser) => {
        setUser(u);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, user: u }));
            } catch { /* ignore */ }
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isLoggedIn: !!user,
            login,
            register,
            logout,
            setUser: updateUser,
            isAdmin: user?.role === 'admin',
            isHost: user?.role === 'host',
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
