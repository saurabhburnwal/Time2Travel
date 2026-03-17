import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginUser, forgotPassword } from '../services/usersService';
import { apiPost } from '../services/apiClient';

vi.mock('../services/apiClient', () => ({
    apiPost: vi.fn()
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('usersService', () => {

    describe('loginUser', () => {
        it('should successfully log in and return user object', async () => {
            const mockApiReturn = {
                success: true,
                data: {
                    success: true,
                    user: { userId: 1, name: 'Test User', email: 'test@example.com', role: 'traveler' }
                }
            };
            (apiPost as any).mockResolvedValue(mockApiReturn);

            const result = await loginUser('test@example.com', 'password123');

            expect(result.user).toBeDefined();
            expect(result.user?.id).toBe(1);
            expect(apiPost).toHaveBeenCalledWith('/api/auth/login', {
                email: 'test@example.com',
                password: 'password123'
            });
        });

        it('should handle unverified email correctly', async () => {
            const mockApiReturn = {
                success: true,
                data: { message: 'email_not_verified', email: 'test@example.com' }
            };
            (apiPost as any).mockResolvedValue(mockApiReturn);

            const result = await loginUser('test@example.com', 'password123');

            expect(result.error).toBe('email_not_verified');
            expect(result.email).toBe('test@example.com');
        });

        it('should handle login failures gracefully', async () => {
             const mockError = new Error('Network error');
             (apiPost as any).mockRejectedValue(mockError);

             const result = await loginUser('test@example.com', 'wrongpassword');

             expect(result.error).toBe('invalid_credentials');
        });
    });

    describe('forgotPassword', () => {
        it('should trigger a password reset code', async () => {
             const mockApiReturn = { success: true, data: { message: 'OTP sent' } };
             (apiPost as any).mockResolvedValue(mockApiReturn);

             const result = await forgotPassword('test@example.com');

             expect(result.success).toBe(true);
             expect(result.message).toBe('OTP sent');
             expect(apiPost).toHaveBeenCalledWith('/api/auth/forgot-password', { email: 'test@example.com' });
        });

        it('should handle API exceptions gracefully', async () => {
             const mockError = new Error('API down');
             (apiPost as any).mockRejectedValue(mockError);

             const result = await forgotPassword('unknown@example.com');

             expect(result.success).toBe(false);
             expect(result.message).toBe('API down');
        });
    });

});
