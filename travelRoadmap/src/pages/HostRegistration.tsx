import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, Home, Users, ArrowLeft, Check, Upload, X, Image as ImageIcon, Utensils, Wifi, Car, Coffee, Waves, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import { fetchStates, fetchDestinations, submitHostRegistration } from '../lib/supabaseService';
import toast from 'react-hot-toast';

const AMENITY_OPTIONS = [
    { id: 'wifi', label: 'WiFi', icon: <Wifi size={16} /> },
    { id: 'parking', label: 'Parking', icon: <Car size={16} /> },
    { id: 'food', label: 'Home-cooked Meals', icon: <Utensils size={16} /> },
    { id: 'breakfast', label: 'Breakfast', icon: <Coffee size={16} /> },
    { id: 'laundry', label: 'Laundry', icon: <Waves size={16} /> },
    { id: 'gym', label: 'Exercise Area', icon: <Dumbbell size={16} /> },
];

const PROPERTY_TYPES = ['House', 'Apartment', 'Villa', 'Cottage', 'Farmhouse', 'Homestay'];

const MAX_IMAGES = 5;
const MAX_FILE_SIZE_MB = 5;

export default function HostRegistration() {
    const navigate = useNavigate();
    const { user, isLoggedIn } = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [states, setStates] = useState<string[]>([]);
    const [destinations, setDestinations] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [form, setForm] = useState({
        name: '', phone: '', state: '', destination: '', address: '',
        description: '', amenities: [] as string[], propertyType: '',
        maxGuests: 1, providesFood: false, pricingInfo: '',
    });

    useEffect(() => {
        (async () => {
            const s = await fetchStates();
            setStates(s);
        })();
    }, []);

    useEffect(() => {
        if (!form.state) { setDestinations([]); return; }
        (async () => {
            const d = await fetchDestinations(form.state);
            setDestinations(d);
        })();
    }, [form.state]);

    // Pre-fill name/phone from logged-in user
    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: prev.name || user.name,
                phone: prev.phone || user.phone,
            }));
        }
    }, [user]);

    const update = (key: string, value: any) => setForm(p => ({ ...p, [key]: value }));

    const toggleAmenity = (id: string) => {
        setForm(p => ({
            ...p,
            amenities: p.amenities.includes(id)
                ? p.amenities.filter(a => a !== id)
                : [...p.amenities, id],
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const remaining = MAX_IMAGES - imagePreviews.length;
        if (remaining <= 0) {
            toast.error(`Maximum ${MAX_IMAGES} images allowed`);
            return;
        }

        const newFiles = Array.from(files).slice(0, remaining);
        const invalidFiles: string[] = [];

        newFiles.forEach(file => {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                invalidFiles.push(`${file.name}: Not an image file`);
                return;
            }
            // Validate file size
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                invalidFiles.push(`${file.name}: Exceeds ${MAX_FILE_SIZE_MB}MB limit`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setImagePreviews(prev => [...prev, ev.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });

        if (invalidFiles.length > 0) {
            toast.error(invalidFiles.join('\n'));
        }

        // Reset input
        e.target.value = '';
    };

    const removeImage = (index: number) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!form.name.trim()) { toast.error('Please enter your name'); return; }
        if (!form.phone.trim()) { toast.error('Please enter your phone number'); return; }
        if (!form.state) { toast.error('Please select a state'); return; }
        if (!form.destination) { toast.error('Please select a destination'); return; }
        if (!form.description.trim()) { toast.error('Please describe your accommodation'); return; }
        if (!form.propertyType) { toast.error('Please select a property type'); return; }

        setSubmitting(true);
        try {
            await submitHostRegistration({
                user_id: user?.id || null,
                name: form.name,
                phone: form.phone,
                state: form.state,
                destination: form.destination,
                address: form.address,
                description: form.description,
                amenities: form.amenities,
                property_type: form.propertyType,
                max_guests: form.maxGuests,
                provides_food: form.providesFood || form.amenities.includes('food'),
                pricing_info: form.pricingInfo,
                image_urls: imagePreviews.slice(0, 3).map((_, i) => `host_image_${Date.now()}_${i}.jpg`), // References
            });
            setSubmitted(true);
            toast.success('Host registration submitted for approval!');
        } catch {
            toast.error('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold font-display mb-3">Registration Submitted!</h2>
                    <p className="text-gray-500 mb-3">Your host profile has been submitted for admin review.</p>
                    <p className="text-sm text-gray-400 mb-8">You'll be notified once your registration is approved (typically within 24-48 hours).</p>
                    <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
                </motion.div>
            </AnimatedPage>
        );
    }

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="page-decorations">
                <div className="deco-blob deco-blob-1 animate-pulse-soft" />
            </div>

            <div className="section-container max-w-3xl relative z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-600 mb-6"><ArrowLeft size={18} /> Back</button>

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold font-display mb-2">
                        Become a <span className="gradient-text">Local Host</span>
                    </h1>
                    <p className="text-gray-500">Open your home to travelers and share your culture</p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section 1: Personal Info */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <User size={18} className="text-brand-500" /> Personal Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="floating-label">Full Name *</label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" className="input-field pl-11" />
                                    </div>
                                </div>
                                <div>
                                    <label className="floating-label">Phone *</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" className="input-field pl-11" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* Section 2: Location */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MapPin size={18} className="text-brand-500" /> Location
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="floating-label">State *</label>
                                    <select value={form.state} onChange={e => { update('state', e.target.value); update('destination', ''); }} className="select-field">
                                        <option value="">Select state</option>
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="floating-label">Destination *</label>
                                    <select value={form.destination} onChange={e => update('destination', e.target.value)} className="select-field" disabled={!form.state}>
                                        <option value="">Select destination</option>
                                        {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="floating-label">Address</label>
                                <div className="relative">
                                    <Home size={18} className="absolute left-4 top-4 text-gray-400" />
                                    <textarea value={form.address} onChange={e => update('address', e.target.value)} placeholder="Your home address" className="input-field pl-11 min-h-[80px] resize-none" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* Section 3: Property Details */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Home size={18} className="text-brand-500" /> Property Details
                            </h3>

                            <div className="mb-4">
                                <label className="floating-label">Property Type *</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {PROPERTY_TYPES.map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => update('propertyType', type)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${form.propertyType === type
                                                ? 'bg-brand-500 text-white shadow-md'
                                                : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:border-brand-300'}`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="floating-label">Accommodation Description *</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => update('description', e.target.value)}
                                    placeholder="Describe your property, rooms, surroundings, and what makes it special for travelers..."
                                    className="input-field min-h-[120px] resize-none"
                                    maxLength={500}
                                />
                                <p className="text-xs text-gray-400 mt-1 text-right">{form.description.length}/500</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="floating-label">Max Guests</label>
                                    <div className="flex items-center gap-3 mt-2">
                                        {[1, 2, 3, 4, 5, 6].map(n => (
                                            <button key={n} type="button" onClick={() => update('maxGuests', n)} className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${form.maxGuests === n ? 'bg-gradient-to-r from-brand-500 to-ocean-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                {n}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="floating-label">Pricing Info</label>
                                    <input type="text" value={form.pricingInfo} onChange={e => update('pricingInfo', e.target.value)} className="input-field mt-2" placeholder="e.g., Free / ₹500 per night / Voluntary" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* Section 4: Amenities */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Wifi size={18} className="text-brand-500" /> Amenities Offered
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {AMENITY_OPTIONS.map(amenity => (
                                    <button
                                        key={amenity.id}
                                        type="button"
                                        onClick={() => toggleAmenity(amenity.id)}
                                        className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all duration-300 ${form.amenities.includes(amenity.id)
                                            ? 'bg-brand-500 text-white shadow-md'
                                            : 'bg-gray-50 border-2 border-gray-200 text-gray-600 hover:border-brand-300'}`}
                                    >
                                        {amenity.icon}
                                        {amenity.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* Section 5: Image Upload */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <ImageIcon size={18} className="text-brand-500" /> Property Images
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">Upload up to {MAX_IMAGES} photos of your property (JPG, PNG, WebP — max {MAX_FILE_SIZE_MB}MB each)</p>

                            {/* Image Preview Grid */}
                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                    {imagePreviews.map((preview, i) => (
                                        <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-100">
                                            <img src={preview} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Upload Button */}
                            {imagePreviews.length < MAX_IMAGES && (
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-all group">
                                    <Upload size={32} className="text-gray-400 group-hover:text-brand-500 mb-2 transition-colors" />
                                    <span className="text-sm font-medium text-gray-500 group-hover:text-brand-600">Click to upload images</span>
                                    <span className="text-xs text-gray-400 mt-1">{imagePreviews.length}/{MAX_IMAGES} uploaded</span>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary w-full text-center justify-center text-lg py-4"
                        >
                            {submitting ? 'Submitting...' : 'Submit Registration'}
                        </button>

                        <p className="text-xs text-gray-400 text-center">
                            Your registration will be reviewed by our admin team. You'll receive confirmation within 24-48 hours.
                        </p>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    );
}
