import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Menu, X, User, LogOut, Shield, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, isLoggedIn, logout, isAdmin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isLanding = location.pathname === '/';
    const isTransparent = isLanding;

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/how-it-works', label: 'How It Works' },
        { to: '/plan', label: 'Plan Trip' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isTransparent
                ? 'bg-transparent'
                : 'bg-white/80 backdrop-blur-xl shadow-lg shadow-purple-500/5 border-b border-white/20'
            }`}>
            <div className="section-container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-ocean-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow">
                            <MapPin className="text-white" size={20} />
                        </div>
                        <span className={`text-xl font-bold font-display ${isTransparent ? 'text-white' : 'gradient-text'}`}>
                            Time2Travel
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.to
                                        ? isTransparent ? 'bg-white/20 text-white' : 'bg-brand-50 text-brand-600'
                                        : isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                {isAdmin && (
                                    <Link
                                        to="/admin"
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                                            }`}
                                    >
                                        <LayoutDashboard size={16} /> Admin
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 group"
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-ocean-500 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-shadow">
                                        {user?.avatar}
                                    </div>
                                    <span className={`text-sm font-medium ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
                                        {user?.name}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className={`p-2 rounded-lg transition-all ${isTransparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${isTransparent ? 'text-white hover:bg-white/10' : 'text-brand-600 hover:bg-brand-50'
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-500 to-ocean-500 text-white hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-300"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen
                            ? <X className={isTransparent ? 'text-white' : 'text-gray-700'} size={24} />
                            : <Menu className={isTransparent ? 'text-white' : 'text-gray-700'} size={24} />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === link.to ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="border-t border-gray-100 pt-3 mt-3">
                                {isLoggedIn ? (
                                    <>
                                        <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
                                            <User size={18} /> Profile
                                        </Link>
                                        {isAdmin && (
                                            <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
                                                <LayoutDashboard size={18} /> Admin Dashboard
                                            </Link>
                                        )}
                                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full text-left text-sm font-medium">
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex gap-2">
                                        <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-3 rounded-xl text-brand-600 font-semibold border-2 border-brand-200">Login</Link>
                                        <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-ocean-500 text-white font-semibold">Sign Up</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
