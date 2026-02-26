import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MockUser } from '../data/mockData';
import { loginUser, registerUser } from '../lib/supabaseService';

interface AuthContextType {
    user: MockUser | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: MockUser }>;
    register: (userData: Partial<MockUser> & { password: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAdmin: boolean;
    isHost: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MockUser | null>(null);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: MockUser }> => {
        const res = await loginUser(email, password);
        if (res.user) {
            setUser(res.user);
            return { success: true, user: res.user };
        }
        return { success: false, error: res.error };
    };

    const register = async (userData: Partial<MockUser> & { password: string }): Promise<{ success: boolean; error?: string }> => {
        const result = await registerUser(userData);
        if (result) {
            setUser(result);
            return { success: true };
        }
        return { success: false, error: 'registration_failed' };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            register,
            logout,
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
