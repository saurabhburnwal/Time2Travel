import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MockUser, MOCK_USERS } from '../data/mockData';

interface AuthContextType {
    user: MockUser | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => boolean;
    register: (userData: Partial<MockUser>) => boolean;
    logout: () => void;
    isAdmin: boolean;
    isHost: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<MockUser | null>(null);

    const login = (email: string, _password: string): boolean => {
        // Admin login: check for admin email
        if (email === 'admin@time2travel.com') {
            setUser(MOCK_USERS[1]);
            return true;
        }
        // Host login
        if (email === 'priya@example.com') {
            setUser(MOCK_USERS[2]);
            return true;
        }
        // Any other email = traveler
        const mockUser: MockUser = {
            id: Date.now(),
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email,
            phone: '9876543210',
            gender: 'Other',
            role: 'traveler',
            avatar: email.substring(0, 2).toUpperCase(),
            joinedDate: 'Feb 2026',
        };
        setUser(mockUser);
        return true;
    };

    const register = (userData: Partial<MockUser>): boolean => {
        const newUser: MockUser = {
            id: Date.now(),
            name: userData.name || 'Traveler',
            email: userData.email || '',
            phone: userData.phone || '',
            gender: userData.gender || 'Other',
            role: userData.role || 'traveler',
            avatar: (userData.name || 'TR').substring(0, 2).toUpperCase(),
            joinedDate: 'Feb 2026',
        };
        setUser(newUser);
        return true;
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
