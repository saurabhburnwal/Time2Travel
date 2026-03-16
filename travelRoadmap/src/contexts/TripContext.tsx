import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Place } from '../services/types';

interface TripState {
    state: string;
    destination: string;
    budget: number;
    days: number;
    travelType: string;
    groupType: string;
    selectedStay: string;
    stayType: 'hotel' | 'host' | null;
    hotelPrice: number;
    transportMode: string;
    stayLat: number;
    stayLng: number;
    selectedRoadmap: any | null;
    places: Place[];
    totalRoadDistance?: number;
}

interface TripContextType {
    trip: TripState;
    updateTrip: (updates: Partial<TripState>) => void;
    resetTrip: () => void;
}

const initialTrip: TripState = {
    state: '',
    destination: '',
    budget: 30000,
    days: 3,
    travelType: '',
    groupType: '',
    selectedStay: '',
    stayType: null,
    hotelPrice: 0,
    transportMode: 'car',
    stayLat: 0,
    stayLng: 0,
    selectedRoadmap: null,
    places: [],
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
    const [trip, setTrip] = useState<TripState>(() => {
        const savedData = localStorage.getItem('tripData');
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (err) {
                console.error("Failed to parse trip data from local storage", err);
            }
        }
        return initialTrip;
    });

    useEffect(() => {
        localStorage.setItem('tripData', JSON.stringify(trip));
    }, [trip]);

    const updateTrip = (updates: Partial<TripState>) => {
        setTrip(prev => ({ ...prev, ...updates }));
    };

    const resetTrip = () => {
        setTrip(initialTrip);
        localStorage.removeItem('tripData');
    };

    return (
        <TripContext.Provider value={{ trip, updateTrip, resetTrip }}>
            {children}
        </TripContext.Provider>
    );
}

export function useTrip() {
    const context = useContext(TripContext);
    if (!context) throw new Error('useTrip must be used within TripProvider');
    return context;
}
