import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-ocean-500 flex items-center justify-center">
                                <MapPin className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold font-display">Time2Travel</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Smart travel planning within your budget. Optimized routes, verified stays, and unforgettable experiences across South India.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Explore</h4>
                        <ul className="space-y-2.5">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/how-it-works', label: 'How It Works' },
                                { to: '/plan', label: 'Plan a Trip' },
                                { to: '/register', label: 'Sign Up' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Popular Destinations</h4>
                        <ul className="space-y-2.5">
                            {['Munnar', 'Goa', 'Ooty', 'Hampi', 'Wayanad', 'Coorg'].map(d => (
                                <li key={d}>
                                    <span className="text-gray-400 text-sm">{d}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail size={15} /> support@time2travel.com
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Phone size={15} /> +91 98765 43210
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <MapPin size={15} /> Bangalore, India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2026 Time2Travel. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                        Made with <Heart size={12} className="text-red-400 fill-current" /> for travelers
                    </p>
                </div>
            </div>
        </footer>
    );
}
