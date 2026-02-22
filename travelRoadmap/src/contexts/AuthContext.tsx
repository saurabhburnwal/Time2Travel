import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MockUser } from '../data/mockData';
import { loginUser, registerUser } from '../lib/supabaseService';

interface AuthContextType {
    user: MockUser | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: Partial<MockUser>) => Promise<boolean>;
    logout: () => void;
    isAdmin: boolean;
    isHost: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MockUser | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        const result = await loginUser(email, password);
        if (result) {
            setUser(result);
            return true;
        }
        return false;
    };

    const register = async (userData: Partial<MockUser>): Promise<boolean> => {
        const result = await registerUser(userData);
        if (result) {
            setUser(result);
            return true;
        }
        return false;
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
