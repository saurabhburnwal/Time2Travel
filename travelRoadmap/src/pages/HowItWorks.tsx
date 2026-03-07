import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Map, TrendingUp, ChevronRight, Sparkles, ArrowRight, Users, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

const STEP_IMAGES = [
    'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export default function HowItWorks() {
    const steps = [
        { icon: <MapPin size={28} />, title: 'Choose Destination', desc: 'Select from 130+ destinations across 7 South Indian states. Set your budget and pick travel days.', color: 'from-brand-400 to-brand-600', bg: 'bg-brand-50', image: STEP_IMAGES[0] },
        { icon: <Home size={28} />, title: 'Select Your Stay', desc: 'Pick from hotels, hostels, or stay with verified local hosts for free. Your stay location becomes the starting point.', color: 'from-ocean-400 to-ocean-600', bg: 'bg-blue-50', image: STEP_IMAGES[1] },
        { icon: <Map size={28} />, title: 'Get Smart Roadmaps', desc: 'Our algorithm calculates distances from your stay and groups nearby spots into daily clusters for optimal routes.', color: 'from-green-400 to-emerald-600', bg: 'bg-green-50', image: STEP_IMAGES[2] },
        { icon: <TrendingUp size={28} />, title: 'Travel Efficiently', desc: 'Follow your day-by-day itinerary with timings, routes, expenses — all within your budget.', color: 'from-sunset-400 to-pink-500', bg: 'bg-orange-50', image: STEP_IMAGES[3] },
    ];

    const stats = [
        { value: '130+', label: 'Destinations', icon: <MapPin size={20} className="text-brand-500" /> },
        { value: '7', label: 'States', icon: <Map size={20} className="text-ocean-400" /> },
        { value: '500+', label: 'Hotels', icon: <Home size={20} className="text-green-500" /> },
        { value: '100%', label: 'Free', icon: <Star size={20} className="text-amber-400" /> },
    ];

    return (
        <AnimatedPage className="page-bg pt-20 pb-16">
            {/* Decorative blobs */}
            <div className="page-decorations">
                <div className="deco-blob deco-blob-1 animate-pulse-soft" />
                <div className="deco-blob deco-blob-3 animate-pulse-soft" style={{ animationDelay: '3s' }} />
            </div>

            <div className="section-container relative z-10">
                {/* Hero Banner */}
                <div className="hero-banner mb-16">
                    <img src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Travel planning" loading="eager" />
                    <div className="hero-overlay" />
                    <div className="hero-content justify-center text-center" style={{ minHeight: '320px' }}>
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
                                <Sparkles size={16} /> Step-by-Step Guide
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-4">
                                How <span className="text-ocean-200">Time2Travel</span> Works
                            </h1>
                            <p className="text-white/70 text-lg max-w-2xl mx-auto">From destination selection to your optimized roadmap — in 4 simple steps</p>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="stat-card"
                        >
                            <div className="flex items-center justify-center mb-2">{stat.icon}</div>
                            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Steps — Alternating Layout with Images */}
                <div className="max-w-5xl mx-auto space-y-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                        >
                            {/* Image Side */}
                            <div className="w-full md:w-2/5 flex-shrink-0">
                                <div className="image-card h-56 md:h-64">
                                    <img src={step.image} alt={step.title} loading="lazy" />
                                    <div className="image-card-overlay" />
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                                            {step.icon}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 z-10">
                                        <span className="bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full">
                                            Step {i + 1}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-center`}>
                                <div className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Step {i + 1} of 4</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Why Us Section */}
                <div className="mt-20">
                    <div className="visual-divider">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Why Choose Us</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                        {[
                            { icon: <Shield size={24} className="text-green-500" />, title: 'Safe & Verified', desc: 'All local hosts are verified. Emergency contacts available on every trip.' },
                            { icon: <Users size={24} className="text-brand-500" />, title: 'Solo or Group', desc: 'Plans optimized for solo travelers, couples, families, or friend groups.' },
                            { icon: <TrendingUp size={24} className="text-ocean-400" />, title: 'Budget Smart', desc: 'Stay within Rs. 2K-10K per person with real-time expense tracking.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="feature-card text-center"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-4">{item.icon}</div>
                                <h4 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h4>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="travel-strip mt-16 text-center"
                >
                    <div className="relative z-10 py-6">
                        <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-3">Ready to Explore?</h2>
                        <p className="text-white/60 mb-6 max-w-xl mx-auto">Start planning your perfect trip in under 2 minutes</p>
                        <Link to="/plan" className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-[1.02]">
                            Start Planning Now <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
