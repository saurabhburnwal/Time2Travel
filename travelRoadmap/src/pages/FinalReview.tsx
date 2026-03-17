import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Download, Map, Shield, Phone, Star, MessageSquare, RotateCcw, MapPin, Calendar, DollarSign, Home, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { useTrip } from '../contexts/TripContext';
import { useAuth } from '../contexts/AuthContext';
import { emailTripPDF, markRoadmapComplete, savePreference } from '../services/roadmapsService';
import { apiPost } from '../services/apiClient';
import { generateTripPDF, generateTripPDFBase64 } from '../components/TripPDFDocument';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

const EMERGENCY_CONTACTS = [
    { name: 'Police', number: '100' },
    { name: 'Ambulance', number: '108' },
    { name: 'Fire', number: '101' },
    { name: 'Women Helpline', number: '1091' },
];

const SOLO_SAFETY_TIPS = [
    'Share your itinerary with family or friends before departure',
    'Keep digital copies of all important documents',
    'Trust your instincts - if something feels wrong, leave immediately',
];
import toast from 'react-hot-toast';

export default function FinalReview() {
    const { trip, resetTrip } = useTrip();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [showSafety, setShowSafety] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [isEmailingPDF, setIsEmailingPDF] = useState(false);

    const places = trip.places || [];
    const stayLat = trip.stayLat || 0;
    const stayLng = trip.stayLng || 0;
    // Compute dynamic center from stay + places
    const center = (() => {
        const pts: [number, number][] = [];
        if (stayLat && stayLng) pts.push([stayLat, stayLng]);
        places.forEach((p: any) => {
            const lat = parseFloat(p.latitude || p.lat || 0);
            const lng = parseFloat(p.longitude || p.lng || 0);
            if (lat && lng) pts.push([lat, lng]);
        });
        if (pts.length === 0) return { lat: 10.8505, lng: 76.2711 };
        return { lat: pts.reduce((s, p) => s + p[0], 0) / pts.length, lng: pts.reduce((s, p) => s + p[1], 0) / pts.length };
    })();

    const routePoints: [number, number][] = [
        [stayLat, stayLng],
        ...places.map((p: any) => [p.latitude || p.lat, p.longitude || p.lng] as [number, number]),
    ];

    const handleSubmitReview = async () => {
        if (reviewRating === 0) { toast.error('Please select a rating'); return; }
        
        setIsSubmittingReview(true);
        try {
            const { success } = await apiPost('/api/reviews', {
                roadmap_id: trip.selectedRoadmap?.roadmap_id,
                rating: reviewRating,
                comment: reviewComment
            });

            if (success) {
                setReviewSubmitted(true);
                toast.success('Thank you for your review!');
            } else {
                toast.error('Failed to submit review');
            }
        } catch (error) {
            toast.error('An error occurred submitting the review');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    const handleNewTrip = () => {
        resetTrip();
        navigate('/');
    };

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        try {
            await generateTripPDF({
                userName: user?.name || 'Traveler',
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
                places: trip.places,
                mapElementId: 'trip-map-container'
            });
            toast.success('Itinerary downloaded successfully!');

            // Mark the trip as completed in the database
            if (trip.selectedRoadmap?.roadmap_id) {
                await markRoadmapComplete(trip.selectedRoadmap.roadmap_id);
                await savePreference({
                    destination: trip.destination,
                    travel_type: trip.travelType,
                    group_type: trip.groupType,
                    days: trip.days,
                    budget: trip.budget
                });
            }
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            toast.error('Failed to generate PDF. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const handleEmailPDF = async () => {
        if (!user || (!user.email && !user.name)) {
            toast.error('You need to be logged in to email the itinerary.');
            return;
        }

        setIsEmailingPDF(true);
        const loadingToast = toast.loading('Generating & Emailing itinerary...');
        try {
            const tripDataPayload = {
                userName: user.name || 'Traveler',
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
                places: trip.places,
                mapElementId: 'trip-map-container' // Same map capture logic
            };

            const pdfBase64 = await generateTripPDFBase64(tripDataPayload);

            const success = await emailTripPDF({
                userName: user.name || 'Traveler',
                email: user.email,
                tripData: tripDataPayload,
                pdfBase64: pdfBase64,
            });

            if (success) {
                toast.success('Itinerary emailed successfully!', { id: loadingToast });
            } else {
                toast.error('Failed to send email. Please try again.', { id: loadingToast });
            }
        } catch (error) {
            console.error('Failed to email PDF:', error);
            toast.error('An error occurred while emailing the itinerary.', { id: loadingToast });
        } finally {
            setIsEmailingPDF(false);
        }
    };

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
                            <div className="flex items-center gap-2"><Map size={16} className="text-brand-600" /><div><p className="text-gray-400">Total Distance</p><p className="font-semibold text-gray-800">{trip.totalRoadDistance ? `${trip.totalRoadDistance.toFixed(1)} km (Road)` : 'Calculating...'}</p></div></div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-8">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPDF || isEmailingPDF}
                                className="flex-1 btn-primary text-center justify-center flex items-center gap-2 group whitespace-nowrap"
                            >
                                {isGeneratingPDF ? (
                                    <><Loader2 size={20} className="animate-spin" /> Generating PDF...</>
                                ) : (
                                    <><Download size={20} className="group-hover:-translate-y-1 transition-transform" /> Download Itinerary</>
                                )}
                            </button>
                            <button
                                onClick={handleEmailPDF}
                                disabled={isGeneratingPDF || isEmailingPDF}
                                className="flex-1 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 group whitespace-nowrap border border-indigo-200"
                            >
                                {isEmailingPDF ? (
                                    <><Loader2 size={20} className="animate-spin" /> Emailing...</>
                                ) : (
                                    <><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> Email Itinerary</>
                                )}
                            </button>
                        </div>
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
                                    {EMERGENCY_CONTACTS.map(c => (
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
                                <button onClick={handleSubmitReview} disabled={isSubmittingReview} className="btn-primary w-full text-center justify-center flex items-center gap-2">
                                    {isSubmittingReview ? <><Loader2 size={18} className="animate-spin"/> Submitting...</> : "Submit Review"}
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

            {/* Hidden Map for PDF Generation */}
            <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '800px', height: '600px' }}>
                <div id="trip-map-container" style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}>
                    {trip.destination && (
                        <MapContainer center={[center.lat, center.lng]} zoom={12} style={{ width: '100%', height: '100%' }} zoomControl={false} attributionControl={false}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[stayLat, stayLng]} icon={stayIcon} />
                            {places.map((place: any, idx: number) => (
                                <Marker key={place.place_id || place.id || idx} position={[place.latitude || place.lat, place.longitude || place.lng]} icon={placeIcon} />
                            ))}
                            <Polyline positions={routePoints} color="#7c3aed" weight={3} opacity={0.7} dashArray="8 6" />
                        </MapContainer>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
}
