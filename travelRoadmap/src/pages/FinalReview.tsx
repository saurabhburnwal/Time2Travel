import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Download, Map, Shield, Phone, Star, MessageSquare, RotateCcw, MapPin, Calendar, DollarSign, Home, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useTrip } from '../contexts/TripContext';
import { useAuth } from '../contexts/AuthContext';
import { SOLO_SAFETY_TIPS } from '../data/mockData';
import { getDestinationCenter } from '../services/destinationsService';
import { getSafetyContacts, AppSafetyContact } from '../services/safetyService';
import { getPlaces } from '../services/placesService';
import { createReview } from '../services/reviewsService';
import { AppPlace } from '../services/supabaseClient';
import toast from 'react-hot-toast';
import { generateTripPDF, generateTripPDFBase64 } from '../components/TripPDFDocument';
import { createRoadmap } from '../services/roadmapsService';

// Leaflet imports for the embedded map used in PDF capture
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngBounds, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

/** Auto-fit the map view to contain all markers */
function FitBounds({ positions }: { positions: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
        if (positions.length === 0) return;
        const bounds = new LatLngBounds(positions.map(p => new LatLng(p[0], p[1])));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }, [positions, map]);
    return null;
}

// Leaflet marker icons
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

export default function FinalReview() {
    const { trip, resetTrip } = useTrip();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [showSafety, setShowSafety] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [generatingPDF, setGeneratingPDF] = useState(false);
    const [places, setPlaces] = useState<AppPlace[]>([]);
    const [contacts, setContacts] = useState<AppSafetyContact[]>([]);
    const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 10.0889, lng: 77.0595 });
    const [savedRoadmapId, setSavedRoadmapId] = useState<number | null>(null);

    // Ref flag ensures map tiles have loaded before capture
    const mapReadyRef = useRef(false);

    useEffect(() => {
        if (trip.destination) {
            getPlaces(trip.destination).then(setPlaces);
            getDestinationCenter(trip.destination).then(coords => {
                if (coords) setCenter(coords);
            });
        }
        getSafetyContacts().then(setContacts);

        // Save this trip as a roadmap in the DB so it appears as a "past trip"
        if (user && trip.destination) {
            createRoadmap({
                user_id: user.id,
                destination_name: trip.destination,
                estimated_cost: trip.selectedRoadmap?.estimatedCost || trip.budget,
                total_distance: trip.selectedRoadmap?.totalDistance || null,
            }).then(roadmapId => {
                if (roadmapId) {
                    setSavedRoadmapId(roadmapId);
                    console.log('✅ Trip saved as past trip, roadmap_id:', roadmapId);
                } else {
                    console.error('❌ createRoadmap returned null — destination may not exist in DB');
                }
            }).catch(err => console.error('Failed to save trip:', err));
        }
    }, [trip.destination, user]);

    const handleSubmitReview = async () => {
        if (reviewRating === 0) { toast.error('Please select a rating'); return; }
        if (!user) { toast.error('Please log in to submit a review'); return; }
        try {
            const success = await createReview({
                user_id: user.id,
                roadmap_id: savedRoadmapId,
                rating: reviewRating,
                comment: reviewComment,
            });
            if (success) {
                setReviewSubmitted(true);
                toast.success('Thank you for your review!');
            } else {
                toast.error('Failed to save review. Please try again.');
            }
        } catch (err) {
            console.error('Review submission error:', err);
            toast.error('Failed to save review. Please try again.');
        }
    };

    const handleNewTrip = () => {
        resetTrip();
        navigate('/');
    };

    // ---------- PDF Download Handler ----------
    const handleDownloadPDF = async () => {
        setGeneratingPDF(true);
        toast.loading('Generating your trip PDF...', { id: 'pdf' });

        // Longer delay to let the hidden map render its tiles fully
        await new Promise(resolve => setTimeout(resolve, 3500));

        const tripPDFData = {
            userName: user?.name || 'Guest',
            state: trip.state,
            destination: trip.destination,
            days: trip.days,
            budget: trip.budget,
            travelType: trip.travelType,
            groupType: trip.groupType,
            selectedStay: trip.selectedStay,
            stayType: trip.stayType,
            hotelPrice: trip.hotelPrice,
            transportMode: trip.transportMode,
            selectedRoadmap: trip.selectedRoadmap,
            mapElementId: 'pdf-map-container',
        };

        try {
            // 1. Download the PDF locally
            await generateTripPDF(tripPDFData);
            toast.success('PDF downloaded successfully!', { id: 'pdf' });

            // 2. Send trip confirmation email with PDF attachment (non-blocking)
            if (user?.email) {
                toast.loading('Sending trip confirmation email...', { id: 'email' });
                try {
                    const pdfBase64 = await generateTripPDFBase64({ ...tripPDFData, mapElementId: undefined });
                    const token = localStorage.getItem('t2t_auth');
                    const parsedToken = token ? JSON.parse(token).token : null;

                    if (parsedToken) {
                        const res = await fetch('http://localhost:5000/api/email/send-trip-pdf', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${parsedToken}`,
                            },
                            body: JSON.stringify({
                                tripData: {
                                    destination: trip.destination,
                                    state: trip.state,
                                    days: trip.days,
                                    budget: trip.budget,
                                    selectedStay: trip.selectedStay,
                                    roadmapType: trip.selectedRoadmap?.type || 'Standard',
                                },
                                pdfBase64,
                            }),
                        });

                        const data = await res.json();
                        if (data.success) {
                            toast.success('Trip itinerary emailed to you! 📧', { id: 'email' });
                        } else {
                            toast.error('Could not send email. Check your inbox later.', { id: 'email' });
                        }
                    }
                } catch (emailErr) {
                    console.error('Email send failed:', emailErr);
                    toast.error('Email sending failed. PDF is saved locally.', { id: 'email' });
                }
            }
        } catch (err) {
            console.error('PDF generation failed:', err);
            toast.error('Failed to generate PDF. Please try again.', { id: 'pdf' });
        } finally {
            setGeneratingPDF(false);
        }
    };

    const stayLat = trip.stayLat || center.lat;
    const stayLng = trip.stayLng || center.lng;
    const routePoints: [number, number][] = [
        [stayLat, stayLng],
        ...places.map((p: AppPlace) => [p.lat, p.lng] as [number, number]),
    ];

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-3xl">
                <div className="glass-card p-8 mb-6">
                    <div className="text-center mb-8">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-300/40">
                                <Star size={32} className="text-white" />
                            </div>
                        </motion.div>
                        <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Your Trip is Ready!</h1>
                        <p className="text-gray-500">Download your complete travel pack and hit the road</p>
                    </div>

                    {/* Trip Summary Card */}
                    <div className="bg-gradient-to-br from-brand-50/80 to-ocean-50/80 rounded-2xl p-6 mb-8 border border-brand-100">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Trip Summary</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-500" /><div><p className="text-gray-400">Destination</p><p className="font-semibold text-gray-800">{trip.destination}, {trip.state}</p></div></div>
                            <div className="flex items-center gap-2"><Calendar size={16} className="text-ocean-500" /><div><p className="text-gray-400">Duration</p><p className="font-semibold text-gray-800">{trip.days} days</p></div></div>
                            <div className="flex items-center gap-2"><Home size={16} className="text-green-500" /><div><p className="text-gray-400">Stay</p><p className="font-semibold text-gray-800">{trip.selectedStay}</p></div></div>
                            <div className="flex items-center gap-2"><DollarSign size={16} className="text-yellow-500" /><div><p className="text-gray-400">Budget</p><p className="font-semibold text-gray-800">₹{trip.budget.toLocaleString()}</p></div></div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-8">
                        {/* PDF Download button – wired to handler */}
                        <button
                            onClick={handleDownloadPDF}
                            disabled={generatingPDF}
                            className="w-full p-4 bg-gradient-to-r from-brand-500 to-ocean-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-wait"
                        >
                            {generatingPDF ? (
                                <><Loader2 size={20} className="animate-spin" /> Generating PDF...</>
                            ) : (
                                <><Download size={20} /> Download Complete Itinerary (PDF)</>
                            )}
                        </button>
                        <button onClick={() => navigate('/map-view')} className="w-full p-4 bg-white border-2 border-brand-200 text-brand-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-brand-50 transition-all">
                            <Map size={20} /> View Interactive Map
                        </button>
                        <button onClick={() => setShowSafety(!showSafety)} className="w-full p-4 bg-white border-2 border-green-200 text-green-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-50 transition-all">
                            <Shield size={20} /> Safety Contacts & Emergency Info
                        </button>
                    </div>

                    {/* Safety Section */}
                    {showSafety && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8">
                            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                                <h3 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2"><Shield size={20} /> Emergency Contacts</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                    {contacts.map((c: AppSafetyContact) => (
                                        <div key={c.name} className="bg-white rounded-xl p-3 text-center shadow-sm">
                                            <span className="text-2xl block mb-1"><Phone size={20} className="text-green-600 mx-auto" /></span>
                                            <p className="text-xs text-gray-500">{c.name}</p>
                                            <a href={`tel:${c.number}`} className="text-lg font-bold text-green-700">{c.number}</a>
                                        </div>
                                    ))}
                                </div>

                                {trip.groupType === 'Solo' && (
                                    <>
                                        <h4 className="font-bold text-green-800 mb-3">Solo Traveler Safety Tips</h4>
                                        <ul className="space-y-2">
                                            {SOLO_SAFETY_TIPS.map((tip, i) => (
                                                <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                                                    <span className="text-green-500 mt-0.5">✓</span> {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {trip.stayType === 'host' && (
                                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Phone size={16} /> Host Contact</h4>
                                        <p className="text-sm text-blue-700"><strong>{trip.selectedStay}</strong></p>
                                        <p className="text-sm text-blue-600">Contact will be shared after booking confirmation</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Review Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MessageSquare size={20} className="text-brand-500" /> Rate Your Experience</h3>
                        {reviewSubmitted ? (
                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-6">
                                <div className="text-4xl mb-2"><Star size={32} className="text-brand-500 mx-auto" /></div>
                                <p className="font-semibold text-gray-800">Thanks for your feedback!</p>
                                <p className="text-sm text-gray-500">Your review helps other travelers</p>
                            </motion.div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-sm text-gray-600">Your Rating:</span>
                                    <StarRating rating={reviewRating} onRate={setReviewRating} size={28} interactive />
                                </div>
                                <textarea
                                    value={reviewComment}
                                    onChange={e => setReviewComment(e.target.value)}
                                    placeholder="Share your experience with Time2Travel..."
                                    className="input-field min-h-[100px] resize-none mb-4"
                                />
                                <button onClick={handleSubmitReview} className="btn-primary w-full text-center justify-center">
                                    Submit Review
                                </button>
                            </>
                        )}
                    </div>

                    {/* Safety Warning */}
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-yellow-800">
                            <strong>Safety First:</strong> Share your itinerary with family. Keep emergency contacts handy. Travel smart!
                        </p>
                    </div>

                    <button onClick={handleNewTrip} className="w-full p-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                        <RotateCcw size={18} /> Plan Another Trip
                    </button>
                </div>
            </div>

            {/* ===== HIDDEN MAP for PDF capture ===== */}
            {/* Positioned off-screen but rendered so html2canvas can capture it */}
            <div
                id="pdf-map-container"
                style={{
                    position: 'absolute',
                    left: '-9999px',
                    top: 0,
                    width: '800px',
                    height: '500px',
                    overflow: 'hidden',
                    zIndex: -1,
                }}
            >
                <MapContainer
                    center={[center.lat, center.lng]}
                    zoom={12}
                    style={{ width: '100%', height: '100%' }}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    attributionControl={false}
                    whenReady={() => { mapReadyRef.current = true; }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <FitBounds positions={routePoints} />
                    <Marker position={[stayLat, stayLng]} icon={stayIcon}>
                        <Popup>{trip.selectedStay}</Popup>
                    </Marker>
                    {places.map(place => (
                        <Marker key={place.id} position={[place.lat, place.lng]} icon={placeIcon}>
                            <Popup>{place.name}</Popup>
                        </Marker>
                    ))}
                    <Polyline positions={routePoints} color="#18465a" weight={3} opacity={0.8} />
                </MapContainer>
            </div>
        </AnimatedPage>
    );
}
