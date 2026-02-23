import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Home, MapPin, Search, Check, X, Clock, Star, ChevronRight, Shield, UserCheck, MessageSquare, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import { fetchAllUsers, fetchAllHosts, fetchDestinationStats, fetchPendingHostRegistrations, approveHostRegistration, rejectHostRegistration, HostRegistrationRecord } from '../lib/supabaseService';
import toast from 'react-hot-toast';

type Tab = 'overview' | 'users' | 'hosts' | 'pending';

export default function AdminDashboard() {
    const { isAdmin, user } = useAuth();
    const navigate = useNavigate();
    const [tab, setTab] = useState<Tab>('overview');
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [hosts, setHosts] = useState<any[]>([]);
    const [pendingHosts, setPendingHosts] = useState<HostRegistrationRecord[]>([]);
    const [stats, setStats] = useState({ destinations: 0, hotels: 0, places: 0 });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [rejectModal, setRejectModal] = useState<{ id: number; name: string } | null>(null);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        if (!isAdmin) { navigate('/'); return; }
        loadData();
    }, [isAdmin]);

    const loadData = async () => {
        setLoading(true);
        const [u, h, s, p] = await Promise.all([
            fetchAllUsers(),
            fetchAllHosts(),
            fetchDestinationStats(),
            fetchPendingHostRegistrations(),
        ]);
        setUsers(u);
        setHosts(h);
        setStats(s);
        setPendingHosts(p);
        setLoading(false);
    };

    const handleApprove = async (id: number) => {
        setActionLoading(id);
        const success = await approveHostRegistration(id);
        if (success) {
            toast.success('Host registration approved!');
            setPendingHosts(prev => prev.filter(h => h.id !== id));
            loadData(); // Refresh data
        } else {
            toast.error('Failed to approve. Please try again.');
        }
        setActionLoading(null);
    };

    const handleReject = async () => {
        if (!rejectModal || !rejectReason.trim()) {
            toast.error('Please provide a rejection reason');
            return;
        }
        setActionLoading(rejectModal.id);
        const success = await rejectHostRegistration(rejectModal.id, rejectReason);
        if (success) {
            toast.success('Host registration rejected.');
            setPendingHosts(prev => prev.filter(h => h.id !== rejectModal.id));
        } else {
            toast.error('Failed to reject. Please try again.');
        }
        setRejectModal(null);
        setRejectReason('');
        setActionLoading(null);
    };

    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    const tabs: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
        { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
        { key: 'pending', label: 'Pending Hosts', icon: <Clock size={18} />, badge: pendingHosts.length },
        { key: 'users', label: 'Users', icon: <Users size={18} />, badge: users.length },
        { key: 'hosts', label: 'Active Hosts', icon: <Home size={18} />, badge: hosts.length },
    ];

    return (
        <AnimatedPage className="page-bg pt-20 pb-16 min-h-screen">
            <div className="page-decorations">
                <div className="deco-blob deco-blob-1 animate-pulse-soft" />
                <div className="deco-blob deco-blob-3 animate-pulse-soft" style={{ animationDelay: '2s' }} />
            </div>

            <div className="section-container max-w-6xl relative z-10">
                {/* Header */}
                <div className="hero-banner mb-8">
                    <img src="https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Admin" loading="eager" />
                    <div className="hero-overlay" />
                    <div className="hero-content justify-end">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium mb-3 border border-white/20">
                                <Shield size={14} /> Admin Panel
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold font-display text-white mb-2">
                                Admin <span className="text-ocean-200">Dashboard</span>
                            </h1>
                            <p className="text-white/60">Welcome back, {user?.name}. Manage users, hosts, and registrations.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-white rounded-xl p-1.5 shadow-md overflow-x-auto">
                    {tabs.map(t => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all text-sm whitespace-nowrap ${tab === t.key ? 'bg-brand-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {t.icon} {t.label}
                            {t.badge !== undefined && t.badge > 0 && (
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${tab === t.key ? 'bg-white/20 text-white' : t.key === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {t.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <Loader2 className="animate-spin mx-auto text-brand-500" size={36} />
                        <p className="text-gray-500 mt-4">Loading dashboard data...</p>
                    </div>
                ) : (
                    <>
                        {/* ===== OVERVIEW TAB ===== */}
                        {tab === 'overview' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Destinations', value: stats.destinations, color: 'from-brand-500 to-ocean-500', icon: <MapPin size={20} /> },
                                        { label: 'Hotels', value: stats.hotels, color: 'from-orange-400 to-red-500', icon: <Home size={20} /> },
                                        { label: 'Users', value: users.length, color: 'from-green-400 to-emerald-500', icon: <Users size={20} /> },
                                        { label: 'Pending', value: pendingHosts.length, color: 'from-amber-400 to-yellow-500', icon: <Clock size={20} /> },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="stat-card"
                                        >
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}>
                                                {stat.icon}
                                            </div>
                                            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                            <p className="text-sm text-gray-500">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Quick Actions */}
                                {pendingHosts.length > 0 && (
                                    <div className="tip-card flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                                                <AlertTriangle size={20} className="text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-orange-800">{pendingHosts.length} pending host registration{pendingHosts.length > 1 ? 's' : ''}</p>
                                                <p className="text-sm text-orange-600/70">Review and approve or reject new host applications</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setTab('pending')} className="flex items-center gap-1 text-brand-600 font-semibold text-sm hover:underline">
                                            Review <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ===== PENDING HOSTS TAB ===== */}
                        {tab === 'pending' && (
                            <div className="space-y-5">
                                {pendingHosts.length === 0 ? (
                                    <div className="text-center py-16 glass-card">
                                        <UserCheck size={48} className="text-green-400 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">All Caught Up!</h3>
                                        <p className="text-gray-500">No pending host registrations to review.</p>
                                    </div>
                                ) : (
                                    pendingHosts.map((host, i) => (
                                        <motion.div
                                            key={host.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="feature-card"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-ocean-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                                            {host.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-800 text-lg">{host.name}</h3>
                                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                                <MapPin size={14} /> {host.destination}, {host.state}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-600 text-sm mb-3">{host.description}</p>

                                                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                                                        <span className="bg-gray-100 px-3 py-1 rounded-full">{host.property_type}</span>
                                                        <span className="bg-gray-100 px-3 py-1 rounded-full">Max {host.max_guests} guests</span>
                                                        {host.provides_food && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Food Included</span>}
                                                        {host.pricing_info && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{host.pricing_info}</span>}
                                                    </div>

                                                    {host.amenities.length > 0 && (
                                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                                            {host.amenities.map(a => <span key={a} className="text-xs bg-brand-50 text-brand-600 px-2.5 py-1 rounded-full capitalize">{a}</span>)}
                                                        </div>
                                                    )}

                                                    <p className="text-xs text-gray-400">
                                                        Submitted {new Date(host.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        {host.phone && <> · Phone: {host.phone}</>}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => handleApprove(host.id)}
                                                        disabled={actionLoading === host.id}
                                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-green-500 text-white hover:bg-green-600 transition-all disabled:opacity-50 shadow-md"
                                                    >
                                                        {actionLoading === host.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => setRejectModal({ id: host.id, name: host.name })}
                                                        disabled={actionLoading === host.id}
                                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-all disabled:opacity-50 border border-red-200"
                                                    >
                                                        <X size={14} /> Reject
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* ===== USERS TAB ===== */}
                        {tab === 'users' && (
                            <div>
                                <div className="mb-6">
                                    <div className="relative max-w-md">
                                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name or email..." className="input-field pl-11" />
                                    </div>
                                </div>
                                <div className="glass-card overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50/80 text-left">
                                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">User</th>
                                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Email</th>
                                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Role</th>
                                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredUsers.map(u => (
                                                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-ocean-500 flex items-center justify-center text-white text-xs font-bold">{u.name.substring(0, 2).toUpperCase()}</div>
                                                            <span className="font-medium text-gray-800">{u.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500">{u.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : u.role === 'host' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-2"></span>
                                                        Active
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* ===== ACTIVE HOSTS TAB ===== */}
                        {tab === 'hosts' && (
                            <div className="grid md:grid-cols-2 gap-5">
                                {hosts.length === 0 ? (
                                    <div className="md:col-span-2 text-center py-16 glass-card">
                                        <Home size={48} className="text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">No Active Hosts</h3>
                                        <p className="text-gray-500">Approve pending registrations to add hosts.</p>
                                    </div>
                                ) : (
                                    hosts.map((host, i) => (
                                        <motion.div
                                            key={host.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="feature-card"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">{host.name.charAt(0)}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-bold text-gray-800">{host.name}</h3>
                                                        {host.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Verified</span>}
                                                    </div>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                                                        <MapPin size={14} /> {host.destination}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">Max {host.maxGuests} guests</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* ===== REJECT MODAL ===== */}
            {rejectModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setRejectModal(null)}>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative glass-card p-8 max-w-md w-full z-10"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Reject Registration</h3>
                        <p className="text-sm text-gray-500 mb-4">Provide a reason for rejecting <strong>{rejectModal.name}</strong>'s host registration.</p>
                        <textarea
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            placeholder="Reason for rejection (e.g., incomplete information, doesn't meet requirements)..."
                            className="input-field min-h-[100px] resize-none mb-4"
                        />
                        <div className="flex gap-3">
                            <button onClick={() => setRejectModal(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">Cancel</button>
                            <button onClick={handleReject} disabled={!rejectReason.trim()} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50 shadow-md">
                                Reject Registration
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatedPage>
    );
}
