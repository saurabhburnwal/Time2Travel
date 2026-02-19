import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Map, TrendingUp, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

export default function HowItWorks() {
    const steps = [
        { icon: <MapPin size={28} />, title: 'Choose Destination', desc: 'Select from 130+ destinations across 7 South Indian states. Set your budget (₹2K–₹10K) and pick travel days (2–7).', color: 'from-brand-400 to-brand-600', bg: 'bg-purple-50' },
        { icon: <Home size={28} />, title: 'Select Your Stay', desc: 'Pick from hotels, hostels, or stay with verified local hosts for free. Your stay location becomes the starting point.', color: 'from-ocean-400 to-ocean-600', bg: 'bg-blue-50' },
        { icon: <Map size={28} />, title: 'Get Smart Roadmaps', desc: 'Our algorithm calculates distances from your stay and groups nearby spots into daily clusters for optimal routes.', color: 'from-green-400 to-emerald-600', bg: 'bg-green-50' },
        { icon: <TrendingUp size={28} />, title: 'Travel Efficiently', desc: 'Follow your day-by-day itinerary with timings, routes, expenses — all within your budget. Download and go!', color: 'from-sunset-400 to-pink-500', bg: 'bg-orange-50' },
    ];

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles size={16} /> Step-by-Step Guide
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
                        How <span className="gradient-text">Time2Travel</span> Works
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">From destination selection to your optimized roadmap — in 4 simple steps</p>
                </div>

                {/* Steps */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-6 ${step.bg} rounded-3xl p-8 card-hover`}
                        >
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                                {step.icon}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step {i + 1}</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <Link to="/plan" className="btn-primary text-lg inline-flex items-center gap-2">
                        Start Planning Now <ChevronRight size={20} />
                    </Link>
                </div>
            </div>
        </AnimatedPage>
    );
}
