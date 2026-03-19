import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Clock, MapPin, DollarSign, Map, ArrowLeft, Loader2, Calendar, Shield, Sparkles, Navigation, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AnimatedPage from '../components/AnimatedPage';
import { fetchRoadmapById } from '../services/roadmapsService';
import toast from 'react-hot-toast';

// Red icon for the stay/base
const stayIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

// Numbered circular icon for each place
const createNumberedIcon = (num: number) =>
    L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-brand-500 shadow-xl transform transition-transform hover:scale-110">
                <span class="text-brand-600 font-bold text-xs">${num}</span>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });

// Auto-fit bounds component
function ChangeView({ bounds }: { bounds: L.LatLngBounds | null }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }, [bounds, map]);
    return null;
}

export default function SavedRoadmap() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [expandedDay, setExpandedDay] = useState<number | null>(0);
    

    useEffect(() => {
        if (!id) return;
        (async () => {
            setLoading(true);
            const data = await fetchRoadmapById(parseInt(id));
            if (data) {
                setRoadmap(data);
            } else {
                toast.error('Failed to load roadmap details');
                navigate('/profile');
            }
            setLoading(false);
        })();
    }, [id, navigate]);

    if (loading) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin text-brand-500 mb-4 mx-auto" size={48} />
                    <h2 className="text-2xl font-bold text-gray-700">Loading your roadmap...</h2>
                </div>
            </AnimatedPage>
        );
    }

    if (!roadmap) return null;

    const dayColors = [
        'from-brand-500 to-brand-400', 
        'from-ocean-500 to-cyan-500', 
        'from-green-500 to-emerald-500', 
        'from-orange-500 to-warm', 
        'from-red-500 to-rose-500', 
        'from-brand-600 to-ocean-600', 
        'from-teal-500 to-green-500'
    ];

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-4xl">
                <button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-brand-600 mb-6 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Profile
                </button>

                <div className="glass-card p-8 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Sparkles size={120} className="text-brand-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                            <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {roadmap.roadmap_type || 'Custom Plan'}
                            </span>
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                                <Calendar size={14} /> {new Date(roadmap.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold font-display mb-2">
                            Trip to <span className="gradient-text">{roadmap.destination}</span>
                        </h1>
                        <p className="text-gray-500 text-lg flex items-center gap-2">
                            <Home className="text-brand-400" size={18} /> Staying at <strong className="text-gray-700">{roadmap.selected_stay || 'Local Stay'}</strong>
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="glass-card p-4 text-center">
                        <p className="text-xs text-gray-500 font-medium uppercase mb-1">Duration</p>
                        <p className="text-xl font-bold text-gray-800">{roadmap.itinerary?.length || 0} Days</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <p className="text-xs text-gray-500 font-medium uppercase mb-1">Distance</p>
                        <p className="text-xl font-bold text-gray-800">{roadmap.total_distance || 0} km</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <p className="text-xs text-gray-500 font-medium uppercase mb-1">Est. Cost</p>
                        <p className="text-xl font-bold text-gray-800">₹{roadmap.estimated_cost?.toLocaleString()}</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <p className="text-xs text-gray-500 font-medium uppercase mb-1">Avg. Dist/Day</p>
                        <p className="text-xl font-bold text-gray-800">
                            {roadmap.itinerary?.length ? (roadmap.total_distance / roadmap.itinerary.length).toFixed(1) : 0} km
                        </p>
                    </div>
                </div>

                {/* Interactive Map Visualizer */}
                <SavedRoadmapMap roadmap={roadmap} />

                <div className="space-y-4">
                    {roadmap.itinerary?.map((dayObj: any, dayIdx: number) => (
                        <motion.div
                            key={dayIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: dayIdx * 0.1 }}
                            className="glass-card overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedDay(expandedDay === dayIdx ? null : dayIdx)}
                                className="w-full p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${dayColors[dayIdx % dayColors.length]} flex items-center justify-center text-white font-bold shadow-lg`}>
                                        {dayIdx + 1}
                                    </div>
                                    <div className="text-left">
                                        <span className="font-bold text-gray-800 text-lg">Day {dayIdx + 1}</span>
                                        <p className="text-sm text-gray-400">{dayObj.places?.length || 0} destinations visited</p>
                                    </div>
                                </div>
                                <ChevronDown className={`text-gray-400 transition-transform duration-300 ${expandedDay === dayIdx ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {expandedDay === dayIdx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 space-y-3">
                                            {dayObj.places?.map((item: any, itemIdx: number) => (
                                                <motion.div
                                                    key={`${dayIdx}-${itemIdx}`}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: itemIdx * 0.08 }}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex flex-col items-center pt-1">
                                                        <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${dayColors[dayIdx % dayColors.length]} shadow-md`} />
                                                        {itemIdx < dayObj.places.length - 1 && (
                                                            <div className="w-0.5 flex-1 bg-gradient-to-b from-brand-200 to-transparent mt-1" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 pb-4">
                                                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div>
                                                                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.travel_type}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                                                                <div className="flex items-center gap-1"><Clock size={14} /> {item.avg_visit_time} min</div>
                                                                <div className="flex items-center gap-1"><MapPin size={14} /> Destination</div>
                                                                <div className="flex items-center gap-1"><DollarSign size={14} /> ₹{item.entry_fee || 0}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Expense Summary */}
                {roadmap.expenses && (
                    <div className="mt-10 glass-card p-8 bg-gradient-to-br from-white to-gray-50">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                           <DollarSign size={24} className="text-emerald-500" /> Expense Breakdown
                        </h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Accommodation</p>
                                <p className="text-xl font-bold text-gray-800 font-display">₹{roadmap.expenses.accommodation?.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Food</p>
                                <p className="text-xl font-bold text-gray-800 font-display">₹{roadmap.expenses.food?.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Transport</p>
                                <p className="text-xl font-bold text-gray-800 font-display">₹{roadmap.expenses.transport?.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1">Entry Fees</p>
                                <p className="text-xl font-bold text-gray-800 font-display">₹{roadmap.expenses.entry_fees?.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Total Travel Budget Used</p>
                                <p className="text-3xl font-bold gradient-text">₹{roadmap.estimated_cost?.toLocaleString()}</p>
                            </div>
                            <button className="btn-primary flex items-center gap-2 px-8">
                                <Shield size={18} /> Download Summary
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AnimatedPage>
    );
}

// ─── Extracted map sub-component so hooks run unconditionally ───────────────
function SavedRoadmapMap({ roadmap }: { roadmap: any }) {
    const [selectedMapDay, setSelectedMapDay] = useState(0);
    const [roadPath, setRoadPath] = useState<[number, number][]>([]);
    const [isLoadingRoute, setIsLoadingRoute] = useState(false);

    // Collect places for the selected day
    const mapPlaces = useMemo(() => {
        const all = roadmap.itinerary?.flatMap((d: any) => d.places || []) || [];
        return selectedMapDay === 0
            ? all
            : (roadmap.itinerary?.find((d: any) => d.day === selectedMapDay)?.places || []);
    }, [roadmap, selectedMapDay]);

    const validPlaces = useMemo(
        () => mapPlaces.filter((p: any) => parseFloat(p.latitude) && parseFloat(p.longitude)),
        [mapPlaces]
    );

    // Stay coords from first itinerary entry's stay_lat/stay_lng if stored, else skip
    const stayLat: number = roadmap.stay_lat || 0;
    const stayLng: number = roadmap.stay_lng || 0;

    const routePoints: [number, number][] = useMemo(() => [
        ...(stayLat && stayLng ? [[stayLat, stayLng] as [number, number]] : []),
        ...validPlaces.map((p: any) => [parseFloat(p.latitude), parseFloat(p.longitude)] as [number, number]),
    ], [stayLat, stayLng, validPlaces]);

    const bounds = useMemo(
        () => routePoints.length > 0 ? L.latLngBounds(routePoints) : null,
        [routePoints]
    );

    const center: [number, number] = useMemo(
        () => validPlaces.length > 0
            ? [parseFloat(validPlaces[0].latitude), parseFloat(validPlaces[0].longitude)]
            : [20.5937, 78.9629],
        [validPlaces]
    );

    // Fetch OSRM road-following route
    useEffect(() => {
        if (routePoints.length < 2) {
            setRoadPath(routePoints);
            return;
        }
        const fetchPath = async () => {
            setIsLoadingRoute(true);
            try {
                const coords = routePoints.map(p => `${p[1]},${p[0]}`).join(';');
                const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`);
                const data = await res.json();
                if (data.routes?.[0]) {
                    setRoadPath(data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]));
                } else {
                    setRoadPath(routePoints);
                }
            } catch {
                setRoadPath(routePoints);
            } finally {
                setIsLoadingRoute(false);
            }
        };
        fetchPath();
    }, [routePoints]);

    return (
        <div className="glass-card p-6 mb-8">
            {/* Header + Day Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Map className="text-brand-500" size={20} /> Route Visualization
                </h2>
                <div className="flex gap-2 p-1.5 bg-white/50 backdrop-blur-md rounded-[24px] shadow-sm border border-white overflow-x-auto scrollbar-hide">
                    <button
                        onClick={() => setSelectedMapDay(0)}
                        className={`px-4 py-2 rounded-[18px] font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                            selectedMapDay === 0 ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-500'
                        }`}
                    >
                        <Layers size={13} /> All Days
                    </button>
                    {roadmap.itinerary?.map((d: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => setSelectedMapDay(i + 1)}
                            className={`px-4 py-2 rounded-[18px] font-bold text-xs whitespace-nowrap transition-all ${
                                selectedMapDay === i + 1 ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'hover:bg-gray-100 text-gray-500'
                            }`}
                        >
                            Day {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Map */}
            <div className="relative">
                <div className="glass-card overflow-hidden shadow-2xl border-4 border-white" style={{ height: '500px' }}>
                    <MapContainer center={center} zoom={12} className="w-full h-full" scrollWheelZoom={true}>
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
                                        <p className="font-medium">{roadmap.selected_stay || 'Stay'}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        )}

                        {/* Numbered place markers */}
                        {validPlaces.map((p: any, idx: number) => (
                            <Marker
                                key={p.id || idx}
                                position={[parseFloat(p.latitude), parseFloat(p.longitude)]}
                                icon={createNumberedIcon(idx + 1)}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-2 min-w-[150px]">
                                        <p className="font-bold text-brand-600 text-lg">{p.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <span className="bg-gray-100 px-1.5 py-0.5 rounded font-bold uppercase">{p.travel_type}</span>
                                        </div>
                                        <div className="mt-2 space-y-1 text-xs font-medium border-t pt-2">
                                            <p className="flex justify-between"><span>Entry:</span> <span className="text-emerald-600">₹{p.entry_fee || 0}</span></p>
                                            <p className="flex justify-between"><span>Spend:</span> <span>{p.avg_visit_time || 60}m</span></p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        {/* Road-following route */}
                        {roadPath.length >= 2 && (
                            <>
                                {/* Shadow line */}
                                <Polyline positions={roadPath} color="#1e40af" weight={8} opacity={0.2} />
                                {/* Main line */}
                                <Polyline
                                    positions={roadPath}
                                    color="#3b82f6"
                                    weight={5}
                                    lineJoin="round"
                                    opacity={0.8}
                                    dashArray={isLoadingRoute ? '10, 15' : undefined}
                                />
                            </>
                        )}
                    </MapContainer>

                    {/* Loading overlay */}
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

            <style>{`
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 20px; padding: 0; overflow: hidden;
                    box-shadow: 0 10px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1);
                }
                .custom-popup .leaflet-popup-content { margin: 0; }
                .custom-popup .leaflet-popup-tip-container { display: none; }
            `}</style>
        </div>
    );
}

const Home = (props: any) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
    >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);
