import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getHostProfile } from '../services/hostProfileService';
import { getHostEarnings, HostEarningsData } from '../services/hostEarningsService';
import { DBHostProfile } from '../services/supabaseClient';
import HostNav from '../components/HostNav';
import { Loader2, TrendingUp, IndianRupee, Home, BarChart3, CreditCard, HelpCircle } from 'lucide-react';

export default function HostEarnings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<DBHostProfile | null>(null);
    const [earningsData, setEarningsData] = useState<HostEarningsData | null>(null);

    useEffect(() => {
        if (!user) return;
        loadData();
    }, [user]);

    const loadData = async () => {
        setLoading(true);
        let hostProfile = await getHostProfile(user!.id);
        setProfile(hostProfile);
        
        if (hostProfile) {
            const data = await getHostEarnings(hostProfile.host_id);
            setEarningsData(data);
        } else {
            // Mock empty data for pending hosts
            setEarningsData({
                totalContributions: 0,
                monthlyBreakdown: [],
                propertyBreakdown: [],
                avgContribution: 0
            });
            // Provision empty profile
            setProfile({ host_id: -1 } as any);
        }
        setLoading(false);
    };

    if (loading || !profile || !earningsData) {
        return (
            <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    const { totalContributions, monthlyBreakdown, propertyBreakdown, avgContribution } = earningsData;

    // Chart math
    const maxMonthly = Math.max(...monthlyBreakdown.map(m => m.amount), 1); // Avoid div by 0

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <HostNav />
            
            <div className="section-container py-10 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                             <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-brand-200">Revenue Management</span>
                             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter italic">Earnings</h1>
                        <p className="text-gray-400 font-medium text-lg">Track your hospitality contributions and financial performance.</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
                         <button className="px-6 py-3 bg-brand-600 text-white rounded-[18px] text-xs font-black uppercase tracking-widest shadow-lg shadow-brand-500/20">Monthly</button>
                         <button className="px-6 py-3 text-slate-400 rounded-[18px] text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-colors">Quarterly</button>
                         <button className="px-6 py-3 text-slate-400 rounded-[18px] text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-colors">Yearly</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                        <IndianRupee className="absolute -bottom-10 -right-10 text-white/5" size={240} />
                        <div className="relative z-10">
                            <p className="text-brand-400 mb-2 font-black uppercase tracking-widest italic text-sm">
                                Total Accumulated
                            </p>
                            <h2 className="text-7xl font-black tracking-tighter italic">₹{totalContributions.toLocaleString()}</h2>
                            <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Settled Balance</p>
                                    <p className="text-xl font-black tracking-tight">₹{(totalContributions * 0.9).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Pending</p>
                                    <p className="text-xl font-black tracking-tight">₹{(totalContributions * 0.1).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-[20px] flex items-center justify-center border border-slate-100 transition-all group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:rotate-6">
                            <TrendingUp size={32} />
                        </div>
                        <div className="mt-8">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Contribution / Guest</p>
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter italic">₹{Math.round(avgContribution).toLocaleString()}</h3>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase mt-2 tracking-tighter">↑ 4% this week</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-[20px] flex items-center justify-center border border-slate-100 transition-all group-hover:bg-ocean-50 group-hover:text-ocean-600 group-hover:-rotate-6">
                            <Home size={32} />
                        </div>
                        <div className="mt-8">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Active Listings</p>
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter italic">{propertyBreakdown.length}</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">Verified inventory</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Performance Graph */}
                    <div className="lg:col-span-8 bg-white rounded-[48px] p-12 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Performance</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Growth overview</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-brand-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Net Revenue</span>
                            </div>
                        </div>
                        
                        {monthlyBreakdown.length === 0 ? (
                            <div className="h-[400px] flex flex-col items-center justify-center text-slate-300 gap-6 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-100">
                                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                                    <BarChart3 size={40} className="opacity-20" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-black italic tracking-tight">Financial data pending</p>
                                    <p className="text-sm font-bold uppercase tracking-widest mt-1 opacity-60">Awaiting your first stay event</p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[400px] flex items-end gap-6 px-4">
                                {monthlyBreakdown.map((item, index) => {
                                    const heightPercentage = (item.amount / maxMonthly) * 100;
                                    const dateObj = new Date(item.month + '-01');
                                    const monthLabel = dateObj.toLocaleDateString('en-US', { month: 'short' });
                                    
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center group h-full justify-end">
                                            <div className="w-full flex justify-center mb-6 items-end relative h-full">
                                                <motion.div 
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${heightPercentage}%` }}
                                                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                    className="w-full max-w-[60px] bg-gradient-to-t from-brand-600 to-ocean-400 rounded-2xl relative group-hover:from-brand-500 group-hover:to-ocean-300 transition-all cursor-pointer shadow-lg shadow-brand-500/10 overflow-hidden"
                                                >
                                                     <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </motion.div>
                                                <div className="absolute -top-12 w-max left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-20 pointer-events-none shadow-2xl tracking-widest">
                                                    ₹{item.amount.toLocaleString()}
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">{monthLabel}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Breakdown Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-white rounded-[48px] p-10 shadow-sm border border-slate-100 h-full">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tighter italic mb-8">Top Revenue</h2>
                            
                            {propertyBreakdown.length === 0 ? (
                                <div className="space-y-4 opacity-20">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-20 bg-slate-100 rounded-[28px] animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {propertyBreakdown.sort((a,b) => b.amount - a.amount).map((prop) => (
                                        <div key={prop.propertyId} className="group p-6 bg-slate-50 rounded-[32px] border border-transparent hover:border-brand-100 hover:bg-white transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                 <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest italic">Inventory ID #{prop.propertyId.toString().slice(-4)}</p>
                                                 <span className="text-[10px] font-black text-slate-400 italic">{(prop.amount / totalContributions * 100).toFixed(0)}% Share</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="font-black text-gray-900 text-lg tracking-tight group-hover:text-brand-600 transition-colors truncate pr-4">{prop.propertyName}</div>
                                                <div className="font-black text-brand-600 italic">₹{prop.amount.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                             <div className="mt-12 p-8 bg-gradient-to-br from-brand-600 to-ocean-600 rounded-[32px] text-white">
                                <p className="text-xs font-black uppercase tracking-widest mb-2 italic">Pro Tip</p>
                                <p className="text-sm font-medium leading-relaxed opacity-90 italic">
                                    "Transparent contribution models increase guest trust and lead to 25% higher payouts on average."
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
