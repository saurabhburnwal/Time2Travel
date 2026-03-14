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
                settledAmount: 0,
                pendingAmount: 0,
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
            
                {/* Hero Section */}
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg group bg-slate-900 mb-8 max-w-7xl mx-auto xl:px-0 px-4">
                    <img 
                        src="/images/bg.png" 
                        alt="Earnings Dashboard" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                    <div className="relative h-full flex flex-col justify-center px-10">
                         <div className="flex items-center gap-3 mb-2">
                             <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                             <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Revenue Management</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Earnings Report</h1>
                        <p className="text-slate-200 text-sm max-w-md">Track your hospitality contributions and financial performance.</p>
                    </div>
                </div>

            <div className="section-container max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <IndianRupee className="absolute -bottom-10 -right-10 text-white/5" size={200} />
                        <div className="relative z-10">
                            <p className="text-brand-400 mb-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                <IndianRupee size={16} /> Total Accumulated
                            </p>
                            <h2 className="text-5xl font-bold tracking-tight mb-8">₹{totalContributions.toLocaleString()}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Settled Balance</p>
                                    <p className="text-xl font-bold tracking-tight text-emerald-400">₹{(earningsData.settledAmount || 0).toLocaleString()}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pending</p>
                                    <p className="text-xl font-bold tracking-tight text-brand-400">₹{(earningsData.pendingAmount || 0).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center border border-brand-100">
                            <TrendingUp size={20} />
                        </div>
                        <div className="mt-6">
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">₹{Math.round(avgContribution).toLocaleString()}</p>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Contribution / Guest</p>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase mt-2">↑ 4% this week</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="w-10 h-10 bg-ocean-50 text-ocean-600 rounded-xl flex items-center justify-center border border-ocean-100">
                            <Home size={20} />
                        </div>
                        <div className="mt-6">
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">{propertyBreakdown.length}</p>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Active Listings</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Verified inventory</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Performance Graph */}
                    <div className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="text-brand-500" size={18} /> Performance Growth
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-500" />
                                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Net Revenue</span>
                            </div>
                        </div>
                        
                        {monthlyBreakdown.length === 0 ? (
                            <div className="h-[300px] flex flex-col items-center justify-center text-slate-300 gap-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                                    <BarChart3 size={24} className="opacity-40" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-bold tracking-tight">Financial data pending</p>
                                     <p className="text-sm font-medium uppercase tracking-wider mt-1 opacity-60">Awaiting your first stay event</p>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[300px] flex items-end gap-2 mt-8 overflow-x-auto pb-4">
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
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{monthLabel}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Breakdown Sidebar */}
                    <div className="lg:col-span-1 flex flex-col">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex-1">
                            <h2 className="text-md font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <IndianRupee className="text-brand-500" size={18} /> Top Revenue
                            </h2>
                            
                            {propertyBreakdown.length === 0 ? (
                                <div className="space-y-3 opacity-40">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-20 bg-slate-50 rounded-2xl animate-pulse border border-slate-100" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {propertyBreakdown.sort((a,b) => b.amount - a.amount).map((prop) => (
                                        <div key={prop.propertyId} className="group p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-brand-100 hover:bg-white transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                 <p className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Inventory ID #{prop.propertyId.toString().slice(-4)}</p>
                                                 <span className="text-[10px] font-medium text-slate-400">{(prop.amount / totalContributions * 100).toFixed(0)}% Share</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="font-bold text-gray-900 text-sm group-hover:text-brand-600 transition-colors truncate pr-4">{prop.propertyName}</div>
                                                <div className="font-bold text-brand-600 text-sm">₹{prop.amount.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
