/**
 * usersService.ts
 *
 * Authentication and user management.
 * Login and registration now go through the Express backend API
 * which uses bcrypt for password hashing.
 * Admin operations (getAllUsers, deleteUser) still use Supabase directly.
 */

import { supabase, AppUser } from './supabaseClient';

const API_BASE = 'http://localhost:5000/api';

// ======================== AUTH VIA BACKEND (bcrypt) ========================

/** Login via backend — POST /api/auth/login */
export async function loginUser(email: string, password: string): Promise<{ user: AppUser; token: string } | null> {
    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            console.error('[usersService] login failed:', data.message);
            return null;
        }

        return {
            user: {
                id: data.user.userId,
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone || '',
                role: data.user.role || 'user',
                avatar: data.user.name
                    ? data.user.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
                    : 'U',
                joinedDate: new Date().toISOString().split('T')[0],
                gender: data.user.gender || undefined,
            },
            token: data.token,
        };
    } catch (err) {
        console.error('[usersService] login error:', err);
        return null;
    }
}

/** Register via backend — POST /api/auth/register */
export async function registerUser(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    gender?: string;
    role?: string;
}): Promise<{ user: AppUser; token: string } | null> {
    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
            console.error('[usersService] register failed:', data.message || data.errors);
            return null;
        }

        return {
            user: {
                id: data.user.userId,
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone || '',
                role: data.user.role || 'user',
                avatar: data.user.name
                    ? data.user.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
                    : 'U',
                joinedDate: new Date().toISOString().split('T')[0],
                gender: data.user.gender || undefined,
            },
            token: data.token,
        };
    } catch (err) {
        console.error('[usersService] register error:', err);
        return null;
    }
}

// ======================== ADMIN OPS (via Supabase) ========================

/** Maps a raw DB user row (with joined role) to AppUser */
function mapUser(row: any): AppUser {
    return {
        id: row.user_id,
        name: row.name,
        email: row.email,
        phone: row.phone || '',
        role: row.roles?.role_name || 'user',
        avatar: row.name ? row.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) : 'U',
        joinedDate: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : '',
        gender: row.gender || undefined,
    };
}

/** Fetch all users (admin) */
export async function getAllUsers(): Promise<AppUser[]> {
    const { data, error } = await supabase
        .from('users')
        .select('*, roles(role_name)')
        .order('created_at', { ascending: false });

    if (error || !data) {
        console.error('[usersService] getAllUsers error:', error);
        return [];
    }

    return data.map(mapUser);
}

/** Delete a user (admin) — hard delete from the database */
export async function deleteUser(id: number): Promise<boolean> {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('user_id', id);

    if (error) console.error('[usersService] deleteUser error:', error);
    return !error;
}

/** Update user profile fields (name, phone, gender) */
export async function updateUserProfile(userId: number, updates: {
    name?: string;
    phone?: string;
    gender?: string;
}): Promise<boolean> {
    const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('user_id', userId);

    if (error) console.error('[usersService] updateUserProfile error:', error);
    return !error;
}
