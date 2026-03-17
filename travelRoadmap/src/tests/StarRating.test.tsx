import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StarRating from '../components/StarRating';

describe('StarRating Component', () => {
    it('renders 5 empty stars for a 0 rating', () => {
        const { container } = render(<StarRating rating={0} />);
        
        // Count filled stars (text-yellow-400) vs empty stars (text-slate-200)
        // Since lucide-react renders SVGs, we can look at the classes applied
        const filledStars = container.querySelectorAll('.text-yellow-400');
        const emptyStars = container.querySelectorAll('.text-gray-300');

        expect(filledStars.length).toBe(0);
        expect(emptyStars.length).toBe(5);
    });

    it('renders 3 filled stars and 2 empty stars for a 3 rating', () => {
        const { container } = render(<StarRating rating={3} />);
        
        const filledStars = container.querySelectorAll('.text-yellow-400');
        const emptyStars = container.querySelectorAll('.text-gray-300');

        expect(filledStars.length).toBe(3);
        expect(emptyStars.length).toBe(2);
    });

    it('rounds floating point ratings correctly (e.g. 4.8 renders 5 stars)', () => {
        const { container } = render(<StarRating rating={4.8} />);
        
        const filledStars = container.querySelectorAll('.text-yellow-400');
        const emptyStars = container.querySelectorAll('.text-gray-300');

        expect(filledStars.length).toBe(5);
        expect(emptyStars.length).toBe(0);
    });

    it('handles negative ratings gracefully by showing 0 filled stars', () => {
        const { container } = render(<StarRating rating={-2} />);
        
        const filledStars = container.querySelectorAll('.text-yellow-400');
        expect(filledStars.length).toBe(0);
    });

    it('caps ratings to a maximum of 5', () => {
        const { container } = render(<StarRating rating={10} />);
        
        const filledStars = container.querySelectorAll('.text-yellow-400');
        expect(filledStars.length).toBe(5);
    });
});
