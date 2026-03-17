import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import * as usersService from '../services/usersService';
import { vi } from 'vitest';

// Mock the API calls
vi.mock('../services/usersService', () => ({
  forgotPassword: vi.fn(),
  verifyResetOTP: vi.fn(),
  resetPassword: vi.fn(),
}));

// Mock Toaster so it doesn't complain about context
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the initial email request step', () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('hello@example.com')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset code/i })).toBeInTheDocument();
  });

  it('handles successful OTP request and moves to verification step', async () => {
    // @ts-ignore
    usersService.forgotPassword.mockResolvedValueOnce({ success: true, message: 'OTP sent' });

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getAllByPlaceholderText('hello@example.com')[0];
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /send reset code/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(usersService.forgotPassword).toHaveBeenCalledWith('test@example.com');
      expect(screen.getAllByText('Verify Code')[0]).toBeInTheDocument();
      // Code input field should be present
      expect(screen.getByPlaceholderText('------')).toBeInTheDocument();
    });
  });

  it('shows error if OTP request fails', async () => {
    // @ts-ignore
    usersService.forgotPassword.mockResolvedValueOnce({ success: false, message: 'Email not found' });

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getAllByPlaceholderText('hello@example.com')[0];
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const submitButton = screen.getByRole('button', { name: /send reset code/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(usersService.forgotPassword).toHaveBeenCalledWith('test@example.com');
      // Should still be on step 1
      expect(screen.getAllByText('Reset Password')[0]).toBeInTheDocument();
    });
  });
});
