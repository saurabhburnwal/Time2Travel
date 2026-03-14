import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, Users, DollarSign, Star, Calendar } from 'lucide-react';

const navItems = [
    { to: '/host-dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/host-properties', label: 'My Properties', icon: Home },
    { to: '/host-guests', label: 'Guests', icon: Users },
    { to: '/host-earnings', label: 'Earnings', icon: DollarSign },
    { to: '/host-reviews', label: 'Reviews', icon: Star },
    { to: '/host-availability', label: 'Availability', icon: Calendar },
];

export default function HostNav() {
    return (
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-[72px] z-40">
            <div className="section-container">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex overflow-x-auto hide-scrollbar gap-2 py-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                                        isActive
                                            ? 'bg-gradient-to-r from-brand-600 to-ocean-600 text-white shadow-lg'
                                            : 'text-gray-500 hover:bg-slate-50 hover:text-brand-600'
                                    }`
                                }
                            >
                                <item.icon size={18} />
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3 py-3 border-l pl-6 border-gray-100">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Host Level</p>
                            <p className="text-sm font-bold text-brand-600">Premium Partner</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-black">
                            L1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
