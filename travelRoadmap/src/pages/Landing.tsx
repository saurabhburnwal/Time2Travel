import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, MapPin, Calendar, DollarSign, Star, Shield, Sparkles, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StarRating from '../components/StarRating';
import { MOCK_REVIEWS, TRAVEL_QUOTES, HERO_IMAGES, HERO_VIDEO_URL } from '../data/mockData';

export default function Landing() {
    const [quoteIdx, setQuoteIdx] = useState(0);
    const [imgIdx, setImgIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIdx(i => (i + 1) % TRAVEL_QUOTES.length);
            setImgIdx(i => (i + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const stagger = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <AnimatedPage>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0">
                    <video
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                        poster={HERO_IMAGES[0]}
                    >
                        <source src={HERO_VIDEO_URL} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>

                {/* Hero Content */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
                >
                    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm mb-6 border border-white/20">
                        <Sparkles size={16} className="text-yellow-300" />
                        <span>Smart Budget Travel Planning</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 leading-tight">
                        Time<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">2</span>Travel
                    </motion.h1>

                    <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light mb-4 text-white/90 max-w-3xl mx-auto">
                        Smart Travel Planning Within Your Budget
                    </motion.p>

                    <motion.p variants={fadeUp} className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Fixed budget. Limited days. Optimized routes. We create intelligent roadmaps based on your stay location to minimize travel time and maximize experiences.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/plan"
                            className="group bg-gradient-to-r from-brand-500 to-ocean-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-brand-500/30 hover:shadow-brand-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Plan My Trip
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/how-it-works"
                            className="btn-ghost flex items-center justify-center gap-2"
                        >
                            <Play size={18} />
                            See How It Works
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce-slow">
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* ===== TRAVEL QUOTE SECTION ===== */}
            <section className="py-20 bg-gradient-to-r from-brand-600 to-ocean-600 text-white text-center">
                <div className="section-container">
                    <motion.div
                        key={quoteIdx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-2xl md:text-3xl font-display italic mb-4 max-w-3xl mx-auto">
                            "{TRAVEL_QUOTES[quoteIdx].quote}"
                        </p>
                        <p className="text-white/70 font-medium">— {TRAVEL_QUOTES[quoteIdx].author}</p>
                    </motion.div>
                </div>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="py-24 page-bg">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            Why <span className="gradient-text">Time2Travel?</span>
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything you need for a perfect trip, intelligently planned</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <MapPin className="text-brand-500" />, title: 'Smart Routes', desc: 'AI-optimized routes from your stay location, minimizing travel time', color: 'from-purple-500/10 to-purple-500/5' },
                            { icon: <DollarSign className="text-green-500" />, title: 'Budget Control', desc: 'Stay within ₹2K–₹10K per person with real-time expense tracking', color: 'from-green-500/10 to-green-500/5' },
                            { icon: <Calendar className="text-ocean-500" />, title: 'Day-wise Plans', desc: 'Detailed itineraries with timings, distances, and entry fees', color: 'from-blue-500/10 to-blue-500/5' },
                            { icon: <Shield className="text-orange-500" />, title: 'Safety First', desc: 'Emergency contacts, solo traveler tips, and verified hosts', color: 'from-orange-500/10 to-orange-500/5' },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`glass-card p-7 card-hover bg-gradient-to-br ${f.color}`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mb-5">
                                    {f.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DESTINATIONS GALLERY ===== */}
            <section className="py-24 bg-white">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            Explore <span className="gradient-text-warm">South India</span>
                        </h2>
                        <p className="text-gray-500 text-lg">7 states, 130+ destinations waiting for you</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'Munnar', state: 'Kerala', img: 'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=600' },
                            { name: 'Hampi', state: 'Karnataka', img: 'https://images.pexels.com/photos/5087167/pexels-photo-5087167.jpeg?auto=compress&cs=tinysrgb&w=600' },
                            { name: 'Goa Beaches', state: 'Goa', img: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=600' },
                            { name: 'Ooty', state: 'Tamil Nadu', img: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=600' },
                            { name: 'Hyderabad', state: 'Telangana', img: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg?auto=compress&cs=tinysrgb&w=600' },
                            { name: 'Coorg', state: 'Karnataka', img: 'https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=600' },
                            { name: 'Alleppey', state: 'Kerala', img: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600' },
                            { name: 'Pondicherry', state: 'Tamil Nadu', img: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600' },
                        ].map((d, i) => (
                            <motion.div
                                key={d.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
                            >
                                <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-white font-bold text-lg">{d.name}</h3>
                                    <p className="text-white/70 text-sm">{d.state}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== REVIEWS ===== */}
            <section className="py-24 page-bg">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            Traveler <span className="gradient-text">Reviews</span>
                        </h2>
                        <p className="text-gray-500 text-lg">What our happy travelers say</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_REVIEWS.slice(0, 6).map((review, i) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 card-hover"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-ocean-500 flex items-center justify-center text-white font-bold text-sm">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{review.userName}</h4>
                                        <p className="text-xs text-gray-400">{review.destination} · {review.date}</p>
                                    </div>
                                </div>
                                <StarRating rating={review.rating} size={16} />
                                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{review.comment}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-24 bg-gradient-to-br from-brand-600 via-purple-600 to-ocean-600 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
                </div>
                <div className="section-container relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Ready for Your Next Adventure?</h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Start planning your dream trip in under 2 minutes. No credit card required.</p>
                    <Link
                        to="/plan"
                        className="inline-flex items-center gap-2 bg-white text-brand-600 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                    >
                        Start Planning <ChevronRight size={20} />
                    </Link>
                </div>
            </section>
        </AnimatedPage>
    );
}
