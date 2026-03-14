import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HostNav from '../components/HostNav';
import { Calendar, Save, CheckCircle2, Clock } from 'lucide-react';
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
            
            <div className="section-container py-10 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-brand-200">Operation Control</span>
                             <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic">Availability</h1>
                        <p className="text-gray-400 font-medium text-lg">Define your hosting window and engagement protocols.</p>
                    </div>

                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Clock className="animate-spin" size={20} /> : <Save size={20} />}
                        Confirm Preferences
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7 bg-white rounded-[48px] p-12 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Weekly Schedule</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Acceptance Windows</p>
                            </div>
                            <Calendar className="text-brand-500" size={32} />
                        </div>

                        <div className="space-y-4">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <div key={day} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[32px] border border-transparent hover:border-brand-100 hover:bg-white group transition-all duration-300">
                                    <span className="font-black text-gray-800 text-lg italic tracking-tight">{day}</span>
                                    <div className="flex items-center gap-10">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">AM</span>
                                            <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-brand-600 border-slate-200 focus:ring-brand-500 cursor-pointer transition-all" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">PM</span>
                                            <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-ocean-600 border-slate-200 focus:ring-brand-500 cursor-pointer transition-all" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-10">
                        <div className="bg-white rounded-[48px] p-10 shadow-sm border border-slate-100">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tighter italic">Execution Policy</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Operational constraints</p>
                                </div>
                                <CheckCircle2 className="text-emerald-500" size={28} />
                            </div>

                            <div className="space-y-8">
                                <div className="p-8 bg-emerald-50/50 rounded-[40px] border border-emerald-100 relative overflow-hidden group">
                                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                          <CheckCircle2 size={60} className="text-emerald-500" />
                                     </div>
                                     <div className="relative z-10">
                                        <p className="text-sm text-emerald-900 font-black italic tracking-tight mb-1">Instant Approval Flow</p>
                                        <p className="text-xs text-emerald-600 font-medium leading-relaxed mb-6">Confirmed reservations will bypass manual queueing during valid windows.</p>
                                        <div className="flex justify-start">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-14 h-8 bg-emerald-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:transition-all peer-checked:bg-emerald-600"></div>
                                            </label>
                                        </div>
                                     </div>
                                </div>
                                
                                <div className="p-8 bg-slate-50/50 rounded-[40px] border border-slate-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">Minimal Latency</p>
                                    <p className="text-sm text-gray-800 font-black italic tracking-tight mb-6">Prerequisite notice period for inbound arrivals.</p>
                                    <select className="w-full bg-white px-6 py-4 rounded-[24px] border border-slate-100 text-xs font-black uppercase tracking-widest text-slate-700 outline-none shadow-sm focus:border-brand-500 transition-all cursor-pointer">
                                        <option>24 Hours Minimum</option>
                                        <option>48 Hours Requirement</option>
                                        <option>72 Hours Strict</option>
                                        <option>Same Day Acceptance</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-brand-600 to-ocean-700 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl">
                             <div className="absolute -bottom-10 -right-10 opacity-10">
                                  <Clock size={200} />
                             </div>
                             <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-4 tracking-tighter italic">Hosting Hiatus</h3>
                                <p className="text-sm text-white/80 leading-relaxed mb-10 italic font-medium">
                                    Temporarily suspend your portfolio visibility. Existing reservations will remain active until concluded.
                                </p>
                                <button className="w-full py-4 rounded-2xl bg-white text-brand-600 font-black text-[10px] uppercase tracking-widest hover:bg-brand-50 transition-all shadow-xl active:scale-95">
                                    Engage Global Pause
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
