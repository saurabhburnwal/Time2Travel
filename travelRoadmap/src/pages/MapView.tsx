import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Layers, Loader2, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useTrip } from '../contexts/TripContext';

import 'leaflet/dist/leaflet.css';

// Fix default marker icons for Leaflet
const stayIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

// Component to handle map view updates (auto-zoom)
function ChangeView({ bounds }: { bounds: L.LatLngBounds | null }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
    }, [bounds, map]);
    return null;
}

export default function MapView() {
    const { trip, updateTrip } = useTrip();
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState(0); // 0 = all
    const [roadPath, setRoadPath] = useState<[number, number][]>([]);
    const [isLoadingRoute, setIsLoadingRoute] = useState(false);

    const places = trip.places || [];
    const stayLat = trip.stayLat || 0;
    const stayLng = trip.stayLng || 0;

    const placesPerDay = Math.ceil(places.length / (trip.days || 1));

    const filteredPlaces = useMemo(() => {
        return selectedDay === 0
            ? places
            : places.slice((selectedDay - 1) * placesPerDay, selectedDay * placesPerDay);
    }, [selectedDay, places, placesPerDay]);

    // Filter out places with invalid coordinates
    const validPlaces = useMemo(() => {
        return filteredPlaces.filter((p: any) => {
            const lat = parseFloat(p.latitude || p.lat || 0);
            const lng = parseFloat(p.longitude || p.lng || 0);
            return lat !== 0 && lng !== 0;
        });
    }, [filteredPlaces]);

    const routePoints: [number, number][] = useMemo(() => {
        return [
            ...(stayLat && stayLng ? [[stayLat, stayLng] as [number, number]] : []),
            ...validPlaces.map((p: any) => [parseFloat(p.latitude || p.lat), parseFloat(p.longitude || p.lng)] as [number, number]),
        ];
    }, [stayLat, stayLng, validPlaces]);

    // Fetch road-following path from OSRM
    useEffect(() => {
        if (routePoints.length < 2) {
            setRoadPath(routePoints);
            return;
        }

        const fetchPath = async () => {
            setIsLoadingRoute(true);
            try {
                // OSRM expects lng,lat format
                const coordinates = routePoints.map(p => `${p[1]},${p[0]}`).join(';');
                const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`);
                const data = await response.json();
                
                if (data.routes && data.routes[0]) {
                    const coords = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);
                    setRoadPath(coords);

                    // Save the accurate distance (converting meters to km)
                    const accurateDist = data.routes[0].distance / 1000;
                    updateTrip({ totalRoadDistance: accurateDist });
                } else {
                    setRoadPath(routePoints);
                }
            } catch (err) {
                console.error("Routing error:", err);
                setRoadPath(routePoints); // Fallback to straight lines
            } finally {
                setIsLoadingRoute(false);
            }
        };

        fetchPath();
    }, [routePoints]);

    const bounds = useMemo(() => {
        if (routePoints.length === 0) return null;
        return L.latLngBounds(routePoints);
    }, [routePoints]);

    const createNumberedIcon = (num: number) => {
        return L.divIcon({
            className: 'custom-marker',
            html: `
                <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-brand-500 shadow-xl transform transition-transform hover:scale-110">
                    <span class="text-brand-600 font-bold text-xs">${num}</span>
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });
    };

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-6xl">
                <button onClick={() => navigate('/itinerary')} className="flex items-center gap-2 text-brand-600 mb-6 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Itinerary
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="glass-card p-6 flex-1 border-l-4 border-l-brand-500">
                        <h1 className="text-3xl font-bold font-display mb-2">
                            Route <span className="gradient-text">Visualization</span>
                        </h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            <Navigation size={14} /> {trip.destination} · Day {selectedDay === 0 ? 'Overview' : selectedDay}
                        </p>
                    </div>

                    <div className="flex gap-2 p-2 bg-white/50 backdrop-blur-md rounded-[24px] shadow-sm border border-white overflow-x-auto scrollbar-hide">
                        <button 
                            onClick={() => setSelectedDay(0)} 
                            className={`px-6 py-3 rounded-[18px] font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${selectedDay === 0 ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-500'}`}
                        >
                            <Layers size={16} /> All
                        </button>
                        {Array.from({ length: trip.days }, (_, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedDay(i + 1)} 
                                className={`px-6 py-3 rounded-[18px] font-bold text-sm whitespace-nowrap transition-all ${selectedDay === i + 1 ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-500'}`}
                            >
                                Day {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Map Container */}
                <div className="relative">
                    <div className="glass-card overflow-hidden shadow-2xl border-4 border-white" style={{ height: '550px' }}>
                        <MapContainer center={[stayLat || 10.85, stayLng || 76.27]} zoom={12} className="w-full h-full" scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            <ChangeView bounds={bounds} />

                            {/* Stay marker */}
                            {stayLat !== 0 && stayLng !== 0 && (
                                <Marker position={[stayLat, stayLng]} icon={stayIcon}>
                                    <Popup className="custom-popup">
                                        <div className="p-1">
                                            <p className="font-bold text-red-600">Your Base</p>
                                            <p className="font-medium">{trip.selectedStay}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}

                            {/* Place markers with Order Numbers */}
                            {validPlaces.map((place: any, idx: number) => {
                                // Calculate overall index within trip for numbers
                                const displayIdx = selectedDay === 0 ? idx + 1 : ((selectedDay - 1) * placesPerDay) + idx + 1;
                                return (
                                    <Marker 
                                        key={place.id || place.place_id || idx} 
                                        position={[parseFloat(place.latitude || place.lat), parseFloat(place.longitude || place.lng)]} 
                                        icon={createNumberedIcon(displayIdx)}
                                    >
                                        <Popup className="custom-popup">
                                            <div className="p-2 min-w-[150px]">
                                                <p className="font-bold text-brand-600 text-lg">{place.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded font-bold uppercase">{place.category || place.travel_type}</span>
                                                </div>
                                                <div className="mt-2 space-y-1 text-xs font-medium border-t pt-2">
                                                    <p className="flex justify-between"><span>Entry:</span> <span className="text-emerald-600">₹{place.entry_fee || place.entryFee || 0}</span></p>
                                                    <p className="flex justify-between"><span>Spend:</span> <span>{place.avg_visit_time || place.visitTime || 60}m</span></p>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}

                            {/* Google Maps Style Route Line */}
                            {roadPath.length >= 2 && (
                                <>
                                    {/* Border line for shadow effect */}
                                    <Polyline positions={roadPath} color="#1e40af" weight={8} opacity={0.2} />
                                    {/* Main bright line */}
                                    <Polyline 
                                        positions={roadPath} 
                                        color="#3b82f6" 
                                        weight={5} 
                                        lineJoin="round" 
                                        opacity={0.8}
                                        dashArray={isLoadingRoute ? "10, 15" : undefined}
                                    />
                                </>
                            )}
                        </MapContainer>

                        {/* Loading Indicator */}
                        <AnimatePresence>
                            {isLoadingRoute && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-[1000] bg-white/20 backdrop-blur-[2px] flex items-center justify-center"
                                >
                                    <div className="bg-white/90 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3">
                                        <Loader2 className="animate-spin text-brand-500" size={24} />
                                        <span className="font-bold text-gray-700">Calculating Road Route...</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Map Legend */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="glass-card p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shadow-inner">
                            <MapPin size={24} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Camp</p>
                            <p className="font-bold text-gray-800">{trip.selectedStay}</p>
                        </div>
                    </div>
                    
                    <div className="glass-card p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 shadow-inner font-black text-xl">
                            #
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Planned Stops</p>
                            <p className="font-bold text-gray-800">{validPlaces.length} locations</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/final-review')} 
                        className="btn-primary py-4 text-lg flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1"
                    >
                        <Download size={20} />
                        Next: Trip Summary
                    </button>
                </div>
            </div>

            <style>{`
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 20px;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                }
                .custom-popup .leaflet-popup-content {
                    margin: 0;
                }
                .custom-popup .leaflet-popup-tip-container {
                    display: none;
                }
                .leaflet-container {
                    background: #f8fafc;
                }
            `}</style>
        </AnimatedPage>
    );
}

// Add local import for MapPin since it was used in legend but not imported
import { MapPin } from 'lucide-react';
