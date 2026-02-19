import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Hotel, LocalHost, Place } from '../data/mockData';

interface TripState {
    state: string;
    destination: string;
    budget: number;
    days: number;
    travelType: string;
    groupType: string;
    selectedStay: (Hotel | LocalHost) | null;
    stayType: 'hotel' | 'host' | null;
    selectedRoadmap: any | null;
    places: Place[];
}

interface TripContextType {
    trip: TripState;
    updateTrip: (key: string, value: any) => void;
    resetTrip: () => void;
}

const initialTrip: TripState = {
    state: '',
    destination: '',
    budget: 5000,
    days: 3,
    travelType: '',
    groupType: '',
    selectedStay: null,
    stayType: null,
    selectedRoadmap: null,
    places: [],
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
    const [trip, setTrip] = useState<TripState>(initialTrip);

    const updateTrip = (key: string, value: any) => {
        setTrip(prev => ({ ...prev, [key]: value }));
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
