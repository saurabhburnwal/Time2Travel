import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { USER_KEY, clearUserCache, apiGet, apiPost } from '../lib/api';
import { loginUser, registerUser } from '../lib/supabaseService';

// ── Types ──────────────────────────────────────────────────────────────────
export interface MockUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    role: 'traveler' | 'host' | 'admin';
    avatar: string;
    joinedDate: string;
}

interface AuthContextType {
    user: MockUser | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string; email?: string; user?: MockUser }>;
    register: (userData: Partial<MockUser> & { password: string }) => Promise<{ success: boolean; error?: string; requiresVerification?: boolean; email?: string }>;
    logout: () => Promise<void>;
    isAdmin: boolean;
    isHost: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function buildMockUser(raw: any): MockUser {
    return {
        id: raw.userId ?? raw.id,
        name: raw.name,
        email: raw.email,
        phone: raw.phone || '',
        gender: raw.gender || 'Other',
        role: raw.role as 'traveler' | 'host' | 'admin',
        avatar: (raw.name as string).substring(0, 2).toUpperCase(),
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
}

// Cache only the non-secret user object (name, email, role) for instant UI restore.
// The JWT itself is in an HttpOnly cookie — this cache is never used for authorization.
function persistUserCache(user: MockUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function loadUserCache(): MockUser | null {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? (JSON.parse(raw) as MockUser) : null;
    } catch {
        return null;
    }
}

// ── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MockUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ── Session rehydration on mount ───────────────────────────────────────
    useEffect(() => {
        // Optimistic restore from cache so the UI feels instant
        const cached = loadUserCache();
        if (cached) setUser(cached);

        // Verify the HttpOnly cookie with the backend
        // If the cookie is missing or expired, the server returns 401 automatically
        apiGet<{ success: boolean; user: any }>('/api/auth/me')
            .then(({ success, data }) => {
                if (success && data?.user) {
                    const refreshed = buildMockUser(data.user);
                    setUser(refreshed);
                    persistUserCache(refreshed);
                } else {
                    // No valid session — clear the stale UI cache
                    clearUserCache();
                    setUser(null);
                }
            })
            .catch(() => {
                // Network error — keep cached user so offline usage doesn't log people out
                if (!cached) setUser(null);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // ── Actions ────────────────────────────────────────────────────────────
    const login = async (
        email: string,
        password: string,
    ): Promise<{ success: boolean; error?: string; email?: string; user?: MockUser }> => {
        const result = await loginUser(email, password);
        if (result.user) {
            setUser(result.user);
            persistUserCache(result.user);
            return { success: true, user: result.user };
        }
        if (result.error === 'email_not_verified') {
            return { success: false, error: 'email_not_verified', email: result.email };
        }
        return { success: false, error: result.error || 'invalid_credentials' };
    };

    const register = async (
        userData: Partial<MockUser> & { password: string },
    ): Promise<{ success: boolean; error?: string; requiresVerification?: boolean; email?: string }> => {
        const result = await registerUser(userData);
        if (result && result.requiresVerification) {
            // Do NOT log the user in — they need to verify their email first
            return { success: true, requiresVerification: true, email: result.email };
        }
        if (result && result.error) {
            return { success: false, error: result.error };
        }
        return { success: false, error: 'registration_failed' };
    };

    const logout = async (): Promise<void> => {
        // Tell the server to clear the HttpOnly cookie
        await apiPost('/api/auth/logout', {}).catch(() => { });
        // Clear the UI cache and state
        clearUserCache();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                isLoading,
                login,
                register,
                logout,
                isAdmin: user?.role === 'admin',
                isHost: user?.role === 'host',
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
