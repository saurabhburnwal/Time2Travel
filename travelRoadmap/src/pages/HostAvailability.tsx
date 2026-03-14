import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HostNav from '../components/HostNav';
import { Calendar, Clock, Save, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HostAvailability() {
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            toast.success('Availability preferences saved');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <HostNav />
            <div className="section-container max-w-7xl">
                {/* Hero Section */}
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg group bg-slate-900 mb-8 xl:px-0 px-4">
                    <img 
                        src="/images/bg.png" 
                        alt="Availability Dashboard" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                    <div className="relative h-full flex flex-col justify-center px-10">
                         <div className="flex items-center gap-3 mb-2">
                             <span className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                             <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Scheduling</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Availability Calendar</h1>
                        <p className="text-slate-200 text-sm max-w-md">Configure your hosting availability and operational constraints.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Active Windows</h2>
                                <p className="text-sm text-gray-500 mt-1">Standard recurring availability</p>
                            </div>
                            <Calendar className="text-brand-500" size={32} />
                        </div>

                        <div className="space-y-3">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <div key={day} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-brand-100 hover:bg-white transition-colors">
                                    <span className="font-bold text-gray-800">{day}</span>
                                    <div className="flex items-center gap-8">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">AM</span>
                                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-brand-600 border-slate-200 focus:ring-brand-500" />
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">PM</span>
                                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-brand-600 border-slate-200 focus:ring-brand-500" />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Execution Policy</h2>
                                    <p className="text-sm text-gray-500 mt-1">Operational constraints</p>
                                </div>
                                <CheckCircle2 className="text-emerald-500" size={24} />
                            </div>

                            <div className="space-y-4">
                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center group">
                                     <div>
                                        <p className="text-sm text-emerald-900 font-bold mb-1">Instant Approval</p>
                                        <p className="text-xs text-emerald-600 font-medium">Auto-accept reservations during active windows</p>
                                     </div>
                                     <label className="relative inline-flex items-center cursor-pointer">
                                         <input type="checkbox" className="sr-only peer" defaultChecked />
                                         <div className="w-11 h-6 bg-emerald-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:transition-all peer-checked:bg-emerald-600"></div>
                                     </label>
                                </div>
                                
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-sm font-bold text-gray-800 mb-2">Advance Notice</p>
                                    <p className="text-xs text-gray-500 mb-4">Minimum time required before a guest can arrive.</p>
                                    <select className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 outline-none shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all cursor-pointer">
                                        <option>24 Hours Minimum</option>
                                        <option>48 Hours Requirement</option>
                                        <option>72 Hours Strict</option>
                                        <option>Same Day Acceptance</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
                             <div className="absolute -bottom-6 -right-6 opacity-10">
                                  <Clock size={160} />
                             </div>
                             <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3 tracking-tight">Pause Hosting</h3>
                                <p className="text-sm text-slate-300 leading-relaxed mb-8 font-medium">
                                    Temporarily hide your properties from new search results. Existing reservations will not be affected.
                                </p>
                                <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/10 active:scale-95">
                                    Suspend Portfolio
                                </button>
                                <button className="w-full mt-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm active:scale-95">
                                    Save Changes
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
