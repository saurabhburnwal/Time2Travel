import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TripPlanner from '../pages/TripPlanner';
import { BrowserRouter } from 'react-router-dom';
import * as destinationsService from '../services/destinationsService';

// Re-using the same mocking logic but with vi.hoisted for context
const { mockTrip } = vi.hoisted(() => ({
    mockTrip: { state: '', destination: '', travelType: '', groupType: '', budget: 30000, days: 3 }
}));

vi.mock('../contexts/TripContext', () => ({
    __esModule: true,
    useTrip: () => ({
        trip: mockTrip,
        updateTrip: vi.fn(),
        resetTrip: vi.fn(),
    })
}));

// Mock AnimatedPage
vi.mock('../components/AnimatedPage', () => ({
    __esModule: true,
    default: ({ children, className }: any) => <div className={className} data-testid="animated-page">{children}</div>
}));

// Robust framer-motion mock that filters out animation props to avoid React warnings
vi.mock('framer-motion', () => {
    const motionProps = [
        'initial', 'animate', 'exit', 'transition', 'variants', 
        'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
        'viewport', 'layout', 'layoutId', 'onLayoutAnimationStart', 'onLayoutAnimationComplete',
        'onUpdate', 'onAnimationStart', 'onAnimationComplete'
    ];
    
    const filterProps = (props: any) => {
        const filtered: any = {};
        Object.keys(props).forEach(key => {
            if (!motionProps.includes(key)) {
                filtered[key] = props[key];
            }
        });
        return filtered;
    };

    return {
        __esModule: true,
        motion: new Proxy({}, {
            get: (_target, tag) => (props: any) => {
                const Tag = tag as any;
                return <Tag {...filterProps(props)} />;
            }
        }),
        AnimatePresence: ({ children }: any) => <>{children}</>
    };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => {
    const Icon = (name: string) => (props: any) => <span data-testid={`icon-${name.toLowerCase()}`} {...props} />;
    return {
        __esModule: true,
        MapPin: Icon('MapPin'),
        Compass: Icon('Compass'),
        Users: Icon('Users'),
        DollarSign: Icon('DollarSign'),
        Calendar: Icon('Calendar'),
        Sparkles: Icon('Sparkles'),
        Trees: Icon('Trees'),
        Mountain: Icon('Mountain'),
        Waves: Icon('Waves'),
        Landmark: Icon('Landmark'),
        Moon: Icon('Moon'),
        Globe: Icon('Globe'),
        ArrowRight: Icon('ArrowRight'),
        Sun: Icon('Sun'),
        AlertTriangle: Icon('AlertTriangle'),
        CheckCircle2: Icon('CheckCircle2'),
        Filter: Icon('Filter'),
    };
});

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
    __esModule: true,
    default: {
        success: vi.fn(),
        error: vi.fn(),
    }
}));

// Mock useNavigate
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe('TripPlanner Component', () => {
    const mockStates = ['Goa', 'Karnataka'];
    const mockDestinations = [
        { destination_id: 1, name: 'Baga', description: 'Beaches and nightlife', best_season: 'Jan-Dec', place_type_count: 5 },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        
        // Reset mockTrip values manually as it's hoisted
        mockTrip.state = '';
        mockTrip.destination = '';
        
        vi.spyOn(destinationsService, 'fetchStates').mockResolvedValue(mockStates);
        vi.spyOn(destinationsService, 'fetchTravelTypes').mockResolvedValue([]);
        vi.spyOn(destinationsService, 'fetchGroupTypes').mockResolvedValue([]);
        vi.spyOn(destinationsService, 'fetchDestinations').mockResolvedValue(mockDestinations);
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <TripPlanner />
            </BrowserRouter>
        );
    };

    it('renders initial setup correctly', async () => {
        renderComponent();
        expect(screen.getByText(/Plan Your/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Goa')).toBeInTheDocument();
        });
    });

    it('displays destinations when trip has a state', async () => {
        mockTrip.state = 'Goa';
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('Baga')).toBeInTheDocument();
        });
        expect(screen.getAllByText('Beaches and nightlife').length).toBeGreaterThan(0);
    });

    it('shows sidebar content for selected destination', async () => {
        mockTrip.state = 'Goa';
        mockTrip.destination = 'Baga';
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('Baga')).toBeInTheDocument();
        });

        expect(screen.getAllByText('Beaches and nightlife').length).toBeGreaterThan(0);
    });
});
