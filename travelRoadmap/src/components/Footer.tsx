import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1a] text-gray-400 py-16 px-6 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand & Mission */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white font-display tracking-tight">
                Time2Travel
              </h2>
              <p className="text-base text-gray-400 leading-relaxed max-w-md">
                Smart travel planning within your budget. Explore 130+ destinations across South India with AI-optimized routes and real-time expense tracking.
              </p>
            </div>
            
            {/* Email Display */}
            <div className="relative group max-w-sm">
              <div className="flex items-center bg-[#151f33]/30 rounded-xl px-5 py-4 border border-gray-800 transition-colors duration-300">
                <Mail className="text-cyan-500 mr-4" size={20} />
                <span className="text-sm text-gray-300 font-medium tracking-wide">ttimettottravel@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-3 space-y-8">
            <h3 className="text-xl font-bold text-white font-display">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'Plan a Trip', to: '/plan' },
                { label: 'How It Works', to: '/how-it-works' },
                { label: 'Login', to: '/login' },
                { label: 'Sign Up', to: '/register' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="flex items-center text-gray-400 hover:text-cyan-400 transition-all duration-200 group w-fit"
                  >
                    <ChevronRight size={16} className="mr-2 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    <span className="text-[15px] font-medium tracking-wide">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="md:col-span-6 lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-display">Get In Touch</h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">
                Have questions or feedback? Reach out to us anytime. We'd love to hear from you!
              </p>
            </div>
            
            <button className="flex items-center gap-3 bg-gradient-to-r from-[#1b2a44] to-[#12223a] hover:from-cyan-900 hover:to-[#0f1b2d] text-gray-200 px-8 py-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl group">
              <Mail className="text-cyan-500 group-hover:scale-110 transition-transform" size={20} />
              <span className="font-semibold tracking-wide">Contact Us</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="pt-12 mt-16 border-t border-gray-800/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 font-medium">
            © 2026 Time2Travel. All rights reserved.
          </p>
          
          <div className="flex items-center">
             <span className="text-xs text-gray-600 font-medium tracking-tight text-right uppercase">
                Budget Constrained Intelligent Travel Roadmap System
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
