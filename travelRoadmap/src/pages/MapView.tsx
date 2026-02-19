import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';
import { getPlacesForDestination, DESTINATION_COORDS } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons for Leaflet
const stayIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});
const placeIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

export default function MapView() {
    const { trip } = useTrip();
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(0); // 0 = all

    const places = getPlacesForDestination(trip.destination);
    const center = DESTINATION_COORDS[trip.destination] || { lat: 10.0889, lng: 77.0595 };
    const stayLat = (trip.selectedStay as any)?.lat || center.lat;
    const stayLng = (trip.selectedStay as any)?.lng || center.lng;
    const placesPerDay = Math.ceil(places.length / trip.days);

    const filteredPlaces = selectedDay === 0
        ? places
        : places.slice((selectedDay - 1) * placesPerDay, selectedDay * placesPerDay);

    const routePoints: [number, number][] = [
        [stayLat, stayLng],
        ...filteredPlaces.map(p => [p.lat, p.lng] as [number, number]),
    ];

    const dayColors = ['#7c3aed', '#3b82f6', '#10b981', '#f97316', '#ef4444', '#6366f1', '#14b8a6'];

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-6xl">
                <button onClick={() => navigate('/itinerary')} className="flex items-center gap-2 text-brand-600 mb-6"><ArrowLeft size={18} /> Back to Itinerary</button>

                <div className="glass-card p-8 mb-6">
                    <h1 className="text-3xl font-bold font-display mb-2">
                        Route <span className="gradient-text">Visualization</span>
                    </h1>
                    <p className="text-gray-500">{trip.destination}, {trip.state} — {trip.selectedRoadmap?.type}</p>
                </div>

                {/* Day Filter Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
                    <button onClick={() => setSelectedDay(0)} className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${selectedDay === 0 ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
                        <Layers size={14} className="inline mr-1.5" /> All Days
                    </button>
                    {Array.from({ length: trip.days }, (_, i) => (
                        <button key={i} onClick={() => setSelectedDay(i + 1)} className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${selectedDay === i + 1 ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
                            Day {i + 1}
                        </button>
                    ))}
                </div>

                {/* Map */}
                <div className="glass-card overflow-hidden" style={{ height: '500px' }}>
                    <MapContainer center={[center.lat, center.lng]} zoom={12} className="w-full h-full" scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {/* Stay marker */}
                        <Marker position={[stayLat, stayLng]} icon={stayIcon}>
                            <Popup><strong>🏠 Your Stay</strong><br />{(trip.selectedStay as any)?.name}</Popup>
                        </Marker>
                        {/* Place markers */}
                        {filteredPlaces.map(place => (
                            <Marker key={place.id} position={[place.lat, place.lng]} icon={placeIcon}>
                                <Popup>
                                    <strong>{place.name}</strong><br />
                                    {place.category} · {place.visitTime}<br />
                                    Entry: ₹{place.entryFee}
                                </Popup>
                            </Marker>
                        ))}
                        {/* Route line */}
                        <Polyline positions={routePoints} color={dayColors[(selectedDay || 1) - 1] || '#7c3aed'} weight={3} opacity={0.7} dashArray="8 6" />
                    </MapContainer>
                </div>

                {/* Legend */}
                <div className="glass-card p-5 mt-6">
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded-full" /><span className="text-sm text-gray-600">Your Stay</span></div>
                        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-full" /><span className="text-sm text-gray-600">Tourist Spots ({filteredPlaces.length})</span></div>
                        <div className="flex items-center gap-2"><div className="w-8 h-0.5 bg-brand-500 border-dashed border-t-2 border-brand-500" /><span className="text-sm text-gray-600">Route Path</span></div>
                    </div>
                </div>

                <button onClick={() => navigate('/final-review')} className="btn-primary w-full mt-8 py-4 text-lg flex items-center justify-center gap-2">
                    <Download size={20} /> Continue to Trip Summary
                </button>
            </div>
        </AnimatedPage>
    );
}
