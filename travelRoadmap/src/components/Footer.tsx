import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="section-container">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold font-display mb-4">
                            Time<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">2</span>Travel
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Smart travel planning within your budget. Explore 130+ destinations across South India with AI-optimized routes and real-time expense tracking.
                        </p>
                        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                            <Mail size={18} className="text-brand-400 flex-shrink-0" />
                            <a href="mailto:ttimettottravel@gmail.com" className="text-brand-300 hover:text-brand-200 transition-colors text-sm font-medium">
                                ttimettottravel@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/plan" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight size={14} /> Plan a Trip</Link></li>
                            <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight size={14} /> How It Works</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight size={14} /> Login</Link></li>
                            <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight size={14} /> Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Get In Touch</h4>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Have questions or feedback? Reach out to us anytime. We'd love to hear from you!
                        </p>
                        <a
                            href="mailto:ttimettottravel@gmail.com"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-ocean-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-brand-500/30 transform hover:scale-105 transition-all duration-300"
                        >
                            <Mail size={16} /> Contact Us
                        </a>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Time2Travel. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Budget Constrained Intelligent Travel Roadmap System
                    </p>
                </div>
            </div>
        </footer>
    );
}
