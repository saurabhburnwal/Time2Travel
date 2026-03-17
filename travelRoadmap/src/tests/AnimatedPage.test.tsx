import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AnimatedPage from '../components/AnimatedPage';

// Mock framer-motion to simplify testing
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }: any) => (
            <div data-testid="framer-motion-div" className={className} {...props}>
                {children}
            </div>
        )
    },
    AnimatePresence: ({ children }: any) => <>{children}</>
}));

describe('AnimatedPage Component', () => {
    it('renders children correctly', () => {
        render(
            <AnimatedPage>
                <p>Inner content</p>
            </AnimatedPage>
        );

        expect(screen.getByText('Inner content')).toBeInTheDocument();
    });

    it('passes className to the wrapper div', () => {
        render(
            <AnimatedPage className="test-class">
                <p>Inner content</p>
            </AnimatedPage>
        );

        const motionDiv = screen.getByTestId('framer-motion-div');
        expect(motionDiv).toHaveClass('test-class');
    });

    it('renders with children without crashing', () => {
        render(
            <AnimatedPage>
                <div data-testid="child" />
            </AnimatedPage>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
