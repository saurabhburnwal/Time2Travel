import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Home, MapPin, Search, Check, X, Clock, Star, ChevronRight, Shield, UserCheck, MessageSquare, Loader2, AlertTriangle, Trash2, Edit3, Plus, ExternalLink, Filter, ArrowUpDown, ChevronDown, Save, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import { 
    fetchTableData, addTableRow, updateTableRow, deleteTableRow,
    fetchPendingHostRegistrations, approveHostRegistration, rejectHostRegistration,
    updateAdminUserStatus, updateAdminHostStatus
} from '../services/adminService';
import { HostRegistrationRecord } from '../services/types';
import toast from 'react-hot-toast';

type Tab = 'overview' | 'users' | 'hosts' | 'registrations' | 'destinations' | 'hotels' | 'places' | 'reviews' | 'bookings' | 'expenses' | 'roadmaps' | 'travel_types' | 'roles' | 'group_types' | 'host_properties' | 'roadmap_types';

interface TabItem {
    key: Tab;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    category: 'System' | 'Hosts' | 'Directory' | 'Travel';
}

import { 
    CreditCard, Calendar, Map, Compass, Activity, 
    ArrowRight, Download, RefreshCw, BarChart, 
    Layers, Zap, Database 
} from 'lucide-react';

interface TableConfig {
    key: string;
    label: string;
    icon: React.ReactNode;
    tableName: string;
    fields: { key: string; label: string; type: 'text' | 'number' | 'boolean' | 'select'; options?: string[] }[];
}

const TABLE_CONFIGS: Record<string, TableConfig> = {
    users: {
        key: 'users',
        label: 'Users',
        icon: <Users size={18} />,
        tableName: 'users',
        fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'text' },
            { key: 'password', label: 'Password', type: 'text' },
        ]
    },
    destinations: {
        key: 'destinations',
        label: 'Destinations',
        icon: <MapPin size={18} />,
        tableName: 'destinations',
        fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'state', label: 'State', type: 'text' },
            { key: 'description', label: 'Description', type: 'text' },
            { key: 'best_season', label: 'Best Season', type: 'text' },
        ]
    },
    hotels: {
        key: 'hotels',
        label: 'Hotels',
        icon: <Home size={18} />,
        tableName: 'hotels',
        fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'destination_id', label: 'Dest ID', type: 'number' },
            { key: 'price_per_night', label: 'Price', type: 'number' },
            { key: 'rating', label: 'Rating', type: 'number' },
        ]
    },
    places: {
        key: 'places',
        label: 'Places',
        icon: <MapPin size={18} />,
        tableName: 'places',
        fields: [
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'destination_id', label: 'Dest ID', type: 'number' },
            { key: 'entry_fee', label: 'Entry Fee', type: 'number' },
            { key: 'avg_visit_time', label: 'Avg Time (hrs)', type: 'number' },
        ]
    },
    reviews: {
        key: 'reviews',
        label: 'Reviews',
        icon: <MessageSquare size={18} />,
        tableName: 'reviews',
        fields: [
            { key: 'user_id', label: 'User ID', type: 'number' },
            { key: 'roadmap_id', label: 'Roadmap ID', type: 'number' },
            { key: 'rating', label: 'Rating', type: 'number' },
            { key: 'comment', label: 'Comment', type: 'text' },
        ]
    },
    bookings: {
        key: 'bookings',
        label: 'Bookings',
        icon: <CreditCard size={18} />,
        tableName: 'host_bookings',
        fields: [
            { key: 'property_id', label: 'Property', type: 'number' },
            { key: 'host_id', label: 'Host ID', type: 'number' },
            { key: 'traveler_id', label: 'Traveler', type: 'number' },
            { key: 'status', label: 'Status', type: 'text' },
            { key: 'contribution_received', label: 'Amount', type: 'number' },
        ]
    },
    expenses: {
        key: 'expenses',
        label: 'Expenses',
        icon: <BarChart size={18} />,
        tableName: 'expenses',
        fields: [
            { key: 'roadmap_id', label: 'Roadmap ID', type: 'number' },
            { key: 'accommodation', label: 'Hotel Cost', type: 'number' },
            { key: 'food', label: 'Food Cost', type: 'number' },
            { key: 'transport', label: 'Transport', type: 'number' },
        ]
    },
    roadmaps: {
        key: 'roadmaps',
        label: 'Roadmaps',
        icon: <Map size={18} />,
        tableName: 'roadmaps',
        fields: [
            { key: 'user_id', label: 'User ID', type: 'number' },
            { key: 'destination_id', label: 'Dest ID', type: 'number' },
            { key: 'total_distance', label: 'Distance', type: 'number' },
        ]
    },
    travel_types: {
        key: 'travel_types',
        label: 'Travel Types',
        icon: <Compass size={18} />,
        tableName: 'travel_types',
        fields: [
            { key: 'name', label: 'Type Name', type: 'text' },
        ]
    },
    roles: {
        key: 'roles',
        label: 'Roles',
        icon: <Shield size={18} />,
        tableName: 'roles',
        fields: [
            { key: 'role_name', label: 'Role Name', type: 'text' },
        ]
    },
    group_types: {
        key: 'group_types',
        label: 'Groups',
        icon: <Users size={18} />,
        tableName: 'group_types',
        fields: [
            { key: 'type_name', label: 'Group Type', type: 'text' },
        ]
    },
    host_properties: {
        key: 'host_properties',
        label: 'Properties',
        icon: <Home size={18} />,
        tableName: 'host_properties',
        fields: [
            { key: 'host_id', label: 'Host ID', type: 'number' },
            { key: 'property_name', label: 'Name', type: 'text' },
            { key: 'address', label: 'Address', type: 'text' },
            { key: 'max_guests', label: 'Max Guests', type: 'number' },
        ]
    },
    roadmap_types: {
        key: 'roadmap_types',
        label: 'Roadmap Types',
        icon: <Compass size={18} />,
        tableName: 'roadmap_types',
        fields: [
            { key: 'type_name', label: 'Type Name', type: 'text' },
        ]
    }
};

export default function AdminDashboard() {
    const { isAdmin, user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    // Data states
    const [data, setData] = useState<any[]>([]);
    const [registrations, setRegistrations] = useState<HostRegistrationRecord[]>([]);
    const [stats, setStats] = useState({ 
        users: 0, hosts: 0, destinations: 0, registrations: 0,
        bookings: 0, reviews: 0, roadmaps: 0 
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    // UI States
    const [editingId, setEditingId] = useState<any>(null);
    const [editForm, setEditForm] = useState<any>({});
    const [isAdding, setIsAdding] = useState(false);
    const [actionLoading, setActionLoading] = useState<any>(null);
    const [rejectModal, setRejectModal] = useState<{ id: number; name: string } | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [visibleCount, setVisibleCount] = useState(15);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (!isAdmin) { navigate('/'); return; }
        loadOverview();
    }, [isAdmin]);

    useEffect(() => {
        if (activeTab !== 'overview') {
            loadTabData();
        } else {
            loadOverview();
        }
        setSearch('');
        setEditingId(null);
        setIsAdding(false);
        setVisibleCount(15);
    }, [activeTab]);

    const loadOverview = async () => {
        setLoading(true);
        try {
            const [u, h, d, r, b, rv, rm] = await Promise.all([
                fetchTableData('users'),
                fetchTableData('host_profiles'),
                fetchTableData('destinations'),
                fetchPendingHostRegistrations(),
                fetchTableData('host_bookings'),
                fetchTableData('reviews'),
                fetchTableData('roadmaps')
            ]);
            setStats({
                users: u.length,
                hosts: h.length,
                destinations: d.length,
                registrations: r.length,
                bookings: b.length,
                reviews: rv.length,
                roadmaps: rm.length
            });
            setRegistrations(r);
            
            // Generate recent activity feed from multiple sources
            const activities = [
                ...u.slice(0, 3).map(user => ({ type: 'user', title: `New User: ${user.name}`, time: user.created_at, icon: <UserCheck className="text-blue-500" /> })),
                ...b.slice(0, 3).map(book => ({ type: 'booking', title: `New Booking #${book.id || book.booking_id}`, time: book.created_at || new Date(), icon: <CreditCard className="text-rose-500" /> })),
                ...r.slice(0, 3).map(reg => ({ type: 'registration', title: `Host App: ${reg.name}`, time: reg.created_at, icon: <Shield className="text-emerald-500" /> }))
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            
            setRecentActivity(activities.slice(0, 5));
        } catch (err) {
            console.error('Overview load error:', err);
            toast.error('Failed to load overview data');
        } finally {
            setLoading(false);
        }
    };

    const loadTabData = async () => {
        setLoading(true);
        try {
            let result: any[] = [];
            if (activeTab === 'registrations') {
                result = await fetchPendingHostRegistrations();
            } else {
                const tableName = (activeTab === 'users' ? 'users' : 
                                  activeTab === 'hosts' ? 'host_profiles' : 
                                  TABLE_CONFIGS[activeTab]?.tableName);
                if (tableName) result = await fetchTableData(tableName);
            }
            setData(result);
        } catch (err) {
            console.error(`Tab load error (${activeTab}):`, err);
            toast.error(`Failed to load ${activeTab} data`);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (id: any) => {
        const config = TABLE_CONFIGS[activeTab];
        if (!config) return;
        
        setActionLoading(id);
        const success = await updateTableRow(config.tableName, id, editForm);
        if (success) {
            toast.success('Record updated successfully');
            setEditingId(null);
            loadTabData();
        } else {
            toast.error('Failed to update record');
        }
        setActionLoading(null);
    };

    const handleDelete = async (id: any) => {
        const tableName = (activeTab === 'users' ? 'users' : 
                          activeTab === 'hosts' ? 'host_profiles' : 
                          TABLE_CONFIGS[activeTab]?.tableName);
        if (!tableName) return;

        if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) return;

        setActionLoading(id);
        const success = await deleteTableRow(tableName, id);
        if (success) {
            toast.success('Record deleted');
            loadTabData();
        } else {
            toast.error('Failed to delete record');
        }
        setActionLoading(null);
    };

    const handleAdd = async () => {
        const config = TABLE_CONFIGS[activeTab];
        if (!config) return;
        
        setActionLoading('new');
        const success = await addTableRow(config.tableName, editForm);
        if (success) {
            toast.success('Record added successfully');
            setIsAdding(false);
            setEditForm({});
            loadTabData();
        } else {
            toast.error('Failed to add record. Ensure all fields are valid.');
        }
        setActionLoading(null);
    };

    const handleApproveRegistration = async (id: number) => {
        setActionLoading(id);
        const success = await approveHostRegistration(id);
        if (success) {
            toast.success('Host approved and promoted!');
            loadTabData();
        } else {
            toast.error('Approval failed');
        }
        setActionLoading(null);
    };

    const handleRejectRegistration = async () => {
        if (!rejectModal) return;
        setActionLoading(rejectModal.id);
        const success = await rejectHostRegistration(rejectModal.id, rejectReason);
        if (success) {
            toast.success('Registration rejected');
            setRejectModal(null);
            setRejectReason('');
            loadTabData();
        } else {
            toast.error('Rejection failed');
        }
        setActionLoading(null);
    };

    const filteredData = data.filter(item => {
        const searchStr = search.toLowerCase();
        return Object.values(item).some(val => 
            val !== null && val !== undefined && String(val).toLowerCase().includes(searchStr)
        );
    });

    const tabs: TabItem[] = [
        { key: 'overview', label: 'Monitor', icon: <LayoutDashboard size={16} />, category: 'System' },
        { key: 'users', label: 'User Directory', icon: <Users size={16} />, category: 'System' },
        { key: 'roles', label: 'Access Roles', icon: <Shield size={16} />, category: 'System' },
        
        { key: 'registrations', label: 'Host Applications', icon: <Clock size={16} />, badge: stats.registrations, category: 'Hosts' },
        { key: 'hosts', label: 'Active Hosts', icon: <UserCheck size={16} />, category: 'Hosts' },
        { key: 'host_properties', label: 'Property Listings', icon: <Home size={16} />, category: 'Hosts' },
        { key: 'bookings', label: 'Stay Bookings', icon: <CreditCard size={16} />, category: 'Hosts' },
        
        { key: 'destinations', label: 'Destinations', icon: <MapPin size={16} />, category: 'Directory' },
        { key: 'hotels', label: 'Hotels', icon: <Home size={16} />, category: 'Directory' },
        { key: 'places', label: 'Places', icon: <Compass size={16} />, category: 'Directory' },
        { key: 'reviews', label: 'User Feedback', icon: <MessageSquare size={16} />, category: 'Directory' },
        
        { key: 'roadmaps', label: 'Trip Roadmaps', icon: <Map size={16} />, category: 'Travel' },
        { key: 'expenses', label: 'Finance Logs', icon: <BarChart size={16} />, category: 'Travel' },
        { key: 'travel_types', label: 'Vibe Types', icon: <Compass size={16} />, category: 'Travel' },
        { key: 'group_types', label: 'Group dynamics', icon: <Users size={16} />, category: 'Travel' },
        { key: 'roadmap_types', label: 'Route Genres', icon: <Compass size={16} />, category: 'Travel' },
    ];

    const getPrimaryId = (item: any) => 
        item.id || item.user_id || item.host_id || item.destination_id || 
        item.hotel_id || item.place_id || item.review_id || item.expense_id || 
        item.roadmap_id || item.booking_id || item.travel_type_id || 
        item.role_id || item.group_type_id || item.property_id || item.roadmap_type_id;

    return (
        <AnimatedPage className="bg-slate-50 min-h-screen overflow-hidden flex">
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-slate-900 h-screen flex flex-col transition-all duration-300 relative z-[100] shadow-2xl`}>
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                             <span className="font-display font-bold text-xl text-white tracking-tighter">Admin<span className="text-brand-500">Panel</span></span>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold mx-auto">T</div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
                    {['System', 'Hosts', 'Directory', 'Travel'].map(category => (
                        <div key={category} className="mb-4">
                            {isSidebarOpen && <p className="px-6 text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2">{category}</p>}
                            <div className="px-3 space-y-0.5">
                                {tabs.filter(t => t.category === category).map(t => (
                                    <button
                                        key={t.key}
                                        onClick={() => setActiveTab(t.key)}
                                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all relative group ${
                                            activeTab === t.key 
                                            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/10' 
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        <span className={`${activeTab === t.key ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>{t.icon}</span>
                                        {isSidebarOpen && <span className="text-[11px] font-semibold flex-1 text-left">{t.label}</span>}
                                        {isSidebarOpen && t.badge !== undefined && t.badge > 0 && (
                                            <span className="bg-brand-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                                {t.badge}
                                            </span>
                                        )}
                                        {activeTab === t.key && <motion.div layoutId="active-pill" className="absolute right-0 w-1 h-3 bg-white rounded-l-full" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors text-xs font-bold"
                    >
                        <ExternalLink size={18} />
                        {isSidebarOpen && <span>Exit to Portal</span>}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Header Bar */}
                <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 relative z-50">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-brand-600 transition-colors bg-slate-50 rounded-lg">
                            <Layers size={18} />
                        </button>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight capitalize">
                            {activeTab.replace('_', ' ')}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div 
                            onClick={() => navigate('/admin/profile')}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-200 transition-colors"
                        >
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Operator: {user?.name}</span>
                        </div>
                        <button onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                            {user?.name?.charAt(0)}
                        </button>
                    </div>
                </header>

                {/* Sub-Header / Search Area (Only for non-overview) */}
                {activeTab !== 'overview' && (
                    <div className="bg-white border-b border-slate-100 px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                         <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            <input 
                                type="text" 
                                placeholder={`Global filter ${activeTab}...`} 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand-500 outline-none transition-all font-bold text-xs text-slate-700"
                            />
                        </div>
                        {TABLE_CONFIGS[activeTab] && (
                            <button 
                                onClick={() => { setIsAdding(true); setEditForm({}); }}
                                className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-brand-600 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus size={14} /> Insert Row
                            </button>
                        )}
                    </div>
                )}

                {/* Main Scrollable Viewport */}
                <main className="flex-1 overflow-y-auto p-10 scrollbar-hide bg-slate-50/50">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <Loader2 className="animate-spin text-brand-500 mb-4" size={48} />
                            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Matrix...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-7xl mx-auto"
                            >
                                {activeTab === 'overview' ? (
                                    <div className="space-y-6">
                                        {/* Hero Section */}
                                        <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg group bg-slate-900 mb-8">
                                            <img 
                                                src="/images/bg.png" 
                                                alt="Travel Dashboard" 
                                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                                            <div className="relative h-full flex flex-col justify-center px-10">
                                                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {user?.name}</h1>
                                                <p className="text-slate-200 text-sm max-w-md">Everything is looking great today. You have {stats.registrations} pending host applications to review.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {[
                                                { label: 'Total Users', value: stats.users, color: 'text-blue-500', bg: 'bg-blue-50', icon: <Users size={18} /> },
                                                { label: 'Verified Hosts', value: stats.hosts, color: 'text-emerald-500', bg: 'bg-emerald-50', icon: <Shield size={18} /> },
                                                { label: 'Destinations', value: stats.destinations, color: 'text-purple-500', bg: 'bg-purple-50', icon: <MapPin size={18} /> },
                                                { label: 'Host Requests', value: stats.registrations, color: 'text-amber-500', bg: 'bg-amber-50', icon: <Clock size={18} /> },
                                            ].map((stat) => (
                                                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                                    <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                                        {stat.icon}
                                                    </div>
                                                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                            <div className="lg:col-span-8">
                                                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                                    <h3 className="text-md font-bold text-slate-900 mb-6 flex items-center gap-2">
                                                        <Activity className="text-brand-500" size={18} /> System Activity
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {recentActivity.map((act, i) => (
                                                            <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                                                    {act.icon}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-xs font-bold text-slate-800">{act.title}</p>
                                                                    <p className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">{new Date(act.time).toLocaleString()}</p>
                                                                </div>
                                                                <ChevronRight size={14} className="text-slate-300" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:col-span-4">
                                                <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl h-full flex flex-col">
                                                    <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-brand-400">
                                                        <Database size={16} /> Server Status
                                                    </h3>
                                                    <div className="space-y-3 flex-1">
                                                        {[
                                                            { label: 'Database', status: 'Online', color: 'text-emerald-400' },
                                                            { label: 'SMTP', status: 'Active', color: 'text-emerald-400' },
                                                            { label: 'SSL', status: 'Verified', color: 'text-brand-400' },
                                                        ].map(item => (
                                                            <div key={item.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                                                                <span className="text-[9px] font-bold uppercase tracking-wider text-white/40">{item.label}</span>
                                                                <span className={`text-[9px] font-bold ${item.color}`}>{item.status}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : activeTab === 'registrations' ? (
                                    <div className="space-y-6">
                                        {data.length === 0 ? (
                                            <div className="bg-white py-32 rounded-[48px] border border-dashed border-slate-200 text-center">
                                                <RefreshCw size={64} className="mx-auto text-slate-100 mb-6 animate-spin-slow" />
                                                <h3 className="text-xl font-bold text-slate-300 uppercase tracking-[0.4em]">No Pending Citations</h3>
                                            </div>
                                        ) : (
                                            data.map((reg: any) => (
                                                <div key={reg.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 text-xl font-bold border border-slate-100">
                                                                {reg.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{reg.name}</h3>
                                                                <p className="text-brand-600 font-bold uppercase tracking-wider text-[9px] mt-0.5">{reg.destination}, {reg.state}</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-slate-500 font-medium mb-6 leading-relaxed text-sm px-1 line-clamp-2">"{reg.description}"</p>
                                                        <div className="flex flex-wrap gap-2 px-1">
                                                            {['phone', 'created_at'].map(k => (
                                                                <span key={k} className="bg-slate-50 px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold tracking-wider text-slate-400 border border-slate-100">
                                                                    {k}: {k === 'created_at' ? new Date(reg[k]).toLocaleDateString() : reg[k]}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2 min-w-[180px]">
                                                        <button 
                                                            onClick={() => handleApproveRegistration(reg.id)}
                                                            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-md hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                                                        >
                                                            <Check size={14} /> Approve
                                                        </button>
                                                        <button 
                                                            onClick={() => setRejectModal({ id: reg.id, name: reg.name })}
                                                            className="w-full py-3 bg-white text-rose-500 border border-rose-100 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-rose-50 transition-all"
                                                        >
                                                            Decline
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-6 pb-20">
                                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                                            <div className="overflow-x-auto scrollbar-hide">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                                            <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Identity</th>
                                                            {activeTab === 'users' && <>
                                                                    <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                                                                    <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                                                    <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Control</th>
                                                                </>}
                                                                {activeTab === 'hosts' && <>
                                                                    <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                                                    <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Control</th>
                                                                </>}
                                                            {TABLE_CONFIGS[activeTab]?.fields.map(f => (
                                                                <th key={f.key} className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-wider">{f.label}</th>
                                                            ))}
                                                            <th className="px-6 py-4 text-right"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-50">
                                                        {isAdding && (
                                                            <tr className="bg-brand-50/20">
                                                                <td className="px-10 py-8 font-black text-brand-600">NEW ENTRY</td>
                                                                {TABLE_CONFIGS[activeTab]?.fields.map(f => (
                                                                    <td key={f.key} className="px-10 py-8">
                                                                        <input 
                                                                            type={f.type === 'number' ? 'number' : 'text'}
                                                                            placeholder={f.label}
                                                                            value={editForm[f.key] || ''}
                                                                            onChange={(e) => setEditForm({...editForm, [f.key]: e.target.value})}
                                                                            className="w-full bg-white px-4 py-3 rounded-xl border border-brand-200 outline-none text-xs font-bold"
                                                                        />
                                                                    </td>
                                                                ))}
                                                                <td className="px-10 py-8 text-right flex items-center justify-end gap-3">
                                                                    <button onClick={handleAdd} className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg"><Save size={18} /></button>
                                                                    <button onClick={() => setIsAdding(false)} className="p-3 bg-white text-slate-400 rounded-xl border border-slate-100 shadow-sm"><X size={18} /></button>
                                                                </td>
                                                            </tr>
                                                        )}

                                                        {filteredData.slice(0, visibleCount).map(item => {
                                                            const itemId = getPrimaryId(item);
                                                            const isEditing = editingId === itemId;

                                                            return (
                                                                <tr key={itemId} className="hover:bg-slate-50/20 transition-colors group">
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="text-[9px] font-bold text-slate-300 group-hover:text-brand-500 transition-colors">#{itemId}</span>
                                                                            {activeTab === 'users' && <p className="font-bold text-slate-900 text-[11px]">{item.name}</p>}
                                                                            {activeTab === 'hosts' && <p className="font-bold text-slate-900 text-[11px]">{item.name}</p>}
                                                                        </div>
                                                                    </td>
                                                                    
                                                                    {activeTab === 'users' && <>
                                                                        <td className="px-6 py-4 font-semibold text-slate-400 text-[10px]">{item.email}</td>
                                                                        <td className="px-6 py-4">
                                                                            <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[8px] font-bold uppercase tracking-wider">{item.role}</span>
                                                                        </td>
                                                                    </>}
                                                                    
                                                                    {TABLE_CONFIGS[activeTab]?.fields.map(f => (
                                                                        <td key={f.key} className="px-10 py-8">
                                                                            {isEditing ? (
                                                                                <input 
                                                                                    type={f.type === 'number' ? 'number' : 'text'}
                                                                                    value={editForm[f.key] || ''}
                                                                                    onChange={(e) => setEditForm({...editForm, [f.key]: e.target.value})}
                                                                                    className="w-full bg-white px-4 py-3 rounded-xl border border-brand-500 outline-none text-xs font-bold"
                                                                                />
                                                                            ) : (
                                                                                <span className="text-slate-600 font-bold text-xs truncate max-w-[150px] inline-block">{item[f.key] || '-'}</span>
                                                                            )}
                                                                        </td>
                                                                    ))}

                                                                    <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <div className="flex items-center justify-end gap-2">
                                                                            {isEditing ? (
                                                                                <button onClick={() => handleSave(itemId)} className="p-2 bg-emerald-500 text-white rounded-lg"><Save size={14} /></button>
                                                                            ) : (
                                                                                <>
                                                                                    {activeTab === 'users' && (
                                                                                        <button 
                                                                                            onClick={async () => {
                                                                                                const success = await updateAdminUserStatus(itemId, !item.is_active);
                                                                                                if (success) {
                                                                                                    toast.success(`User ${!item.is_active ? 'Activated' : 'Deactivated'}`);
                                                                                                    loadTabData();
                                                                                                }
                                                                                            }}
                                                                                            className={`p-2 rounded-lg border transition-colors ${item.is_active ? 'text-amber-500 hover:bg-amber-50 border-amber-100' : 'text-emerald-500 hover:bg-emerald-50 border-emerald-100'}`}
                                                                                            title={item.is_active ? 'Deactivate' : 'Activate'}
                                                                                        >
                                                                                            <Zap size={14} className={item.is_active ? 'fill-amber-500' : ''} />
                                                                                        </button>
                                                                                    )}
                                                                                    {activeTab === 'hosts' && (
                                                                                        <button 
                                                                                            onClick={async () => {
                                                                                                const success = await updateAdminHostStatus(itemId, !item.is_active);
                                                                                                if (success) {
                                                                                                    toast.success(`Host ${!item.is_active ? 'Activated' : 'Deactivated'}`);
                                                                                                    loadTabData();
                                                                                                }
                                                                                            }}
                                                                                            className={`p-2 rounded-lg border transition-colors ${item.is_active ? 'text-amber-500 hover:bg-amber-50 border-amber-100' : 'text-emerald-500 hover:bg-emerald-50 border-emerald-100'}`}
                                                                                            title={item.is_active ? 'Deactivate' : 'Activate'}
                                                                                        >
                                                                                            <Zap size={14} className={item.is_active ? 'fill-amber-500' : ''} />
                                                                                        </button>
                                                                                    )}
                                                                                    {TABLE_CONFIGS[activeTab] && (
                                                                                        <button onClick={() => { setEditingId(itemId); setEditForm(item); }} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"><Edit3 size={14} /></button>
                                                                                    )}
                                                                                    <button onClick={() => handleDelete(itemId)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-slate-100"><Trash2 size={14} /></button>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {filteredData.length > visibleCount && (
                                            <div className="flex justify-center mt-6">
                                                <button 
                                                    onClick={() => setVisibleCount(v => v + 15)}
                                                    className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-sm hover:translate-y-[-2px] transition-all flex items-center gap-2"
                                                >
                                                    <RefreshCw size={12} /> Load Expansion Items
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </main>
            </div>

            {/* Reject Modal */}
            <AnimatePresence>
                {rejectModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRejectModal(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl">
                             <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Decline Application</h3>
                             <p className="text-slate-400 text-xs mb-6 font-medium">State the reason for declining <strong>{rejectModal.name}</strong>.</p>
                             <textarea 
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl min-h-[120px] outline-none focus:bg-white focus:border-rose-500 transition-all text-xs font-semibold mb-6"
                                placeholder="Explain why..."
                             />
                             <div className="flex gap-3">
                                <button onClick={() => setRejectModal(null)} className="flex-1 py-3 bg-slate-100 text-slate-400 rounded-xl font-bold uppercase text-[9px] tracking-wider">Cancel</button>
                                <button onClick={handleRejectRegistration} className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-bold uppercase text-[9px] tracking-wider shadow-lg shadow-rose-500/20">Confirm Decline</button>
                             </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AnimatedPage>
    );
}

