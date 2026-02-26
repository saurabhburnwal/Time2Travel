import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Place } from '../data/mockData';

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
}

interface TripContextType {
    trip: TripState;
    updateTrip: (updates: Partial<TripState>) => void;
    resetTrip: () => void;
}

const initialTrip: TripState = {
    state: '',
    destination: '',
    budget: 5000,
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
    const [trip, setTrip] = useState<TripState>(initialTrip);

    const updateTrip = (updates: Partial<TripState>) => {
        setTrip(prev => ({ ...prev, ...updates }));
    };

    const resetTrip = () => setTrip(initialTrip);

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
