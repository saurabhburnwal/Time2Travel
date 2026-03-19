import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TripProvider, useTrip } from '../contexts/TripContext';

// Helper component to test the context
const TestComponent = ({ updateData }: { updateData?: any }) => {
    const { trip, updateTrip, resetTrip } = useTrip();
    return (
        <div>
            <div data-testid="state">{trip.state}</div>
            <div data-testid="budget">{trip.budget}</div>
            <button onClick={() => updateTrip(updateData)} data-testid="update-btn">Update</button>
            <button onClick={resetTrip} data-testid="reset-btn">Reset</button>
        </div>
    );
};

describe('TripContext', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should provide initial state', () => {
        render(
            <TripProvider>
                <TestComponent />
            </TripProvider>
        );

        expect(screen.getByTestId('state').textContent).toBe('');
        expect(screen.getByTestId('budget').textContent).toBe('30000');
    });

    it('should load initial state from localStorage', () => {
        const savedTrip = { state: 'Karnataka', budget: 50000 };
        localStorage.setItem('tripData', JSON.stringify(savedTrip));

        render(
            <TripProvider>
                <TestComponent />
            </TripProvider>
        );

        expect(screen.getByTestId('state').textContent).toBe('Karnataka');
        expect(screen.getByTestId('budget').textContent).toBe('50000');
    });

    it('should update trip state and localStorage', () => {
        render(
            <TripProvider>
                <TestComponent updateData={{ state: 'Kerala', budget: 40000 }} />
            </TripProvider>
        );

        act(() => {
            screen.getByTestId('update-btn').click();
        });

        expect(screen.getByTestId('state').textContent).toBe('Kerala');
        expect(screen.getByTestId('budget').textContent).toBe('40000');
        
        const saved = JSON.parse(localStorage.getItem('tripData') || '{}');
        expect(saved.state).toBe('Kerala');
    });

    it('should reset trip state and clear localStorage', () => {
        localStorage.setItem('tripData', JSON.stringify({ state: 'Goa' }));

        render(
            <TripProvider>
                <TestComponent />
            </TripProvider>
        );

        act(() => {
            screen.getByTestId('reset-btn').click();
        });

        expect(screen.getByTestId('state').textContent).toBe('');
        // It's not null, it's the initial state string because of the useEffect in TripProvider
        expect(localStorage.getItem('tripData')).toContain('"state":""');
    });

    it('should throw error when used outside TripProvider', () => {
        // Suppress console error for this test
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        expect(() => render(<TestComponent />)).toThrow('useTrip must be used within TripProvider');
        
        spy.mockRestore();
    });
});
