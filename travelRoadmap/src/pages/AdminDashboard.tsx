import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Search, Building2, Eye, LayoutDashboard, Loader2, Shield, Activity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import { fetchAllUsers, fetchDestinationStats, fetchAllHosts } from '../lib/supabaseService';

export default function AdminDashboard() {
    const { isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'hosts' | 'places'>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [hosts, setHosts] = useState<any[]>([]);
    const [stats, setStats] = useState({ destinations: 0, hotels: 0, places: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) return;
        (async () => {
            setLoading(true);
            const [u, h, s] = await Promise.all([fetchAllUsers(), fetchAllHosts(), fetchDestinationStats()]);
            setUsers(u);
            setHosts(h);
            setStats(s);
            setLoading(false);
        })();
    }, [isAdmin]);

    if (!isAdmin) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <Shield size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Admin Access Required</h2>
                    <p className="text-gray-500 mb-6">Login as admin to access the dashboard</p>
                    <Link to="/login" className="btn-primary">Go to Login</Link>
                </div>
            </AnimatedPage>
        );
    }

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
        { id: 'users', label: 'Users', icon: <Users size={16} /> },
        { id: 'hosts', label: 'Hosts', icon: <Building2 size={16} /> },
        { id: 'places', label: 'Places', icon: <MapPin size={16} /> },
    ] as const;

    const overviewCards = [
        { label: 'Total Users', value: users.length || '—', icon: <Users size={24} className="text-brand-500" />, bg: 'bg-brand-50' },
        { label: 'Active Hosts', value: hosts.length || '—', icon: <Building2 size={24} className="text-green-500" />, bg: 'bg-green-50' },
        { label: 'Destinations', value: stats.destinations || '—', icon: <MapPin size={24} className="text-ocean-400" />, bg: 'bg-blue-50' },
        { label: 'Hotels', value: stats.hotels || '—', icon: <Building2 size={24} className="text-amber-500" />, bg: 'bg-amber-50' },
    ];

    const recentActivities = [
        { icon: <TrendingUp size={16} />, text: 'Database connected successfully', time: 'Just now', color: 'text-green-500 bg-green-50' },
        { icon: <Users size={16} />, text: `${users.length} user${users.length !== 1 ? 's' : ''} registered`, time: 'Real-time', color: 'text-brand-500 bg-brand-50' },
        { icon: <MapPin size={16} />, text: `${stats.destinations} destinations active`, time: 'Real-time', color: 'text-ocean-400 bg-blue-50' },
        { icon: <Activity size={16} />, text: `${stats.hotels} hotels listed`, time: 'Real-time', color: 'text-amber-500 bg-amber-50' },
    ];

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-display">Admin <span className="gradient-text">Dashboard</span></h1>
                    <p className="text-gray-500 mt-1">Manage your platform</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-white rounded-xl p-1.5 shadow-sm overflow-x-auto">
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-brand-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <Loader2 className="animate-spin mx-auto text-brand-500" size={32} />
                        <p className="text-gray-500 mt-3">Loading dashboard data...</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {overviewCards.map((card, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5 card-hover">
                                            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>{card.icon}</div>
                                            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                                            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="glass-card p-6">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Activity size={18} className="text-brand-500" /> Recent Activity</h3>
                                    <div className="space-y-3">
                                        {recentActivities.map((a, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.color}`}>{a.icon}</div>
                                                <span className="text-sm text-gray-700 flex-1">{a.text}</span>
                                                <span className="text-xs text-gray-400">{a.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="space-y-4">
                                <div className="relative max-w-md">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search users..." className="input-field pl-11" />
                                </div>
                                {filteredUsers.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Users size={40} className="mx-auto mb-3 opacity-50" />
                                        <p>No users found {searchQuery ? 'matching your search' : 'in the database'}</p>
                                    </div>
                                ) : (
                                    <div className="glass-card overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr><th className="text-left p-4 font-semibold text-gray-600">User</th><th className="text-left p-4 font-semibold text-gray-600">Email</th><th className="text-left p-4 font-semibold text-gray-600">Role</th><th className="text-center p-4 font-semibold text-gray-600">Status</th></tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.map(u => (
                                                    <tr key={u.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                                        <td className="p-4 flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-ocean-300 flex items-center justify-center text-white text-sm font-bold">{u.name.substring(0, 2).toUpperCase()}</div>
                                                            <span className="font-medium text-gray-800">{u.name}</span>
                                                        </td>
                                                        <td className="p-4 text-gray-500">{u.email}</td>
                                                        <td className="p-4"><span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${u.role === 'admin' ? 'bg-red-100 text-red-700' : u.role === 'host' ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'}`}>{u.role}</span></td>
                                                        <td className="p-4 text-center"><span className={`inline-block w-2.5 h-2.5 rounded-full ${u.active ? 'bg-green-400' : 'bg-gray-300'}`} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'hosts' && (
                            <div className="space-y-4">
                                {hosts.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Building2 size={40} className="mx-auto mb-3 opacity-50" />
                                        <p>No hosts registered yet</p>
                                    </div>
                                ) : (
                                    hosts.map((h, i) => (
                                        <motion.div key={h.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5 card-hover">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">{h.name.charAt(0)}</div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{h.name}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14} /> {h.destination}</p>
                                                </div>
                                                <div className="ml-auto flex items-center gap-2">
                                                    {h.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>}
                                                    <span className="text-xs text-gray-400">Max {h.maxGuests} guests</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'places' && (
                            <div className="glass-card p-8 text-center">
                                <MapPin size={40} className="mx-auto text-brand-400 mb-3 opacity-50" />
                                <h3 className="font-bold text-lg text-gray-800 mb-2">{stats.places} Places in Database</h3>
                                <p className="text-gray-500 text-sm">Places are managed per destination in the Supabase database.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AnimatedPage>
    );
}
