import { apiGet, apiPost, apiPut } from '../lib/api';
import { MockUser } from './types';

export async function loginUser(
    email: string,
    password: string,
): Promise<{ user?: MockUser; error?: string; email?: string }> {
    try {
        const { success, data } = await apiPost<{ user: any; message?: string; email?: string; success?: boolean }>('/api/auth/login', { email, password });
        if (success && data.success !== false && data.user) {
            return {
                user: {
                    id: data.user.userId,
                    name: data.user.name,
                    email: data.user.email,
                    phone: data.user.phone || '',
                    gender: data.user.gender || 'Other',
                    role: data.user.role as 'traveler' | 'host' | 'admin',
                    avatar: data.user.name.substring(0, 2).toUpperCase(),
                    joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                },
            };
        }
        if (data && data.message === 'email_not_verified') {
            return { error: 'email_not_verified', email: data.email || email };
        }
        if (success && data.success === false) {
            return { error: data.message };
        }
    } catch (err) {
        console.warn('Login failed:', err);
    }
    return { error: 'invalid_credentials' };
}

export async function registerUser(
    userData: Partial<MockUser> & { password?: string },
): Promise<{ requiresVerification?: boolean; email?: string; error?: string } | null> {
    try {
        const { success, data } = await apiPost<{ requiresVerification?: boolean; email?: string; success?: boolean; message?: string }>('/api/auth/register', {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            gender: (userData.gender || 'OTHER').toUpperCase(),
            role: userData.role || 'traveler',
            password: userData.password || 'changeme',
        });
        if (success) {
            if (data.success === false) {
                return { error: data.message || 'registration_failed' };
            }
            return { requiresVerification: data.requiresVerification, email: data.email };
        }
    } catch (err) {
        console.warn('Register failed:', err);
    }
    return null;
}

export async function resendVerificationEmail(email: string): Promise<boolean> {
    try {
        const { success } = await apiPost('/api/auth/resend-verification', { email });
        return success;
    } catch (err) {
        console.warn('resendVerificationEmail error:', err);
        return false;
    }
}

export async function verifyEmailToken(token: string): Promise<{
    success: boolean;
    message: string;
    alreadyVerified?: boolean;
    expired?: boolean;
    email?: string;
    name?: string;
    role?: string;
}> {
    try {
        const { success, data } = await apiGet<any>(
            `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
        );
        return { success, ...data };
    } catch (err) {
        console.warn('verifyEmailToken error:', err);
        return { success: false, message: 'Verification failed. Please try again.' };
    }
}

export async function updateUserProfile(userId: number, data: { name?: string; phone?: string; gender?: string }): Promise<{ success: boolean; user?: any }> {
    try {
        const { success, data: result } = await apiPut<{ success: boolean; user: any }>('/api/users/me', data);
        return { success, user: (result as any)?.user };
    } catch (err) {
        console.warn('updateUserProfile error:', err);
        return { success: false };
    }
}

export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
        const { success, data } = await apiPost<{ success: boolean; message: string }>('/api/auth/forgot-password', { email });
        return { success, message: data?.message || 'Failed to request reset.' };
    } catch (err: any) {
        return { success: false, message: err.message || 'An error occurred.' };
    }
}

export async function verifyResetOTP(email: string, otp: string): Promise<{ success: boolean; message: string; resetToken?: string }> {
    try {
        const { success, data } = await apiPost<{ success: boolean; message: string; resetToken?: string }>('/api/auth/verify-otp', { email, otp });
        return { success, message: data?.message || 'Verification failed.', resetToken: data?.resetToken };
    } catch (err: any) {
         return { success: false, message: err.message || 'An error occurred.' };
    }
}

export async function resetPassword(resetToken: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
        const { success, data } = await apiPost<{ success: boolean; message: string }>('/api/auth/reset-password', { resetToken, newPassword });
        return { success, message: data?.message || 'Reset failed.' };
    } catch (err: any) {
        return { success: false, message: err.message || 'An error occurred.' };
    }
}

