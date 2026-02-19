import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Hotel, Shield, Star, BarChart3, Eye, EyeOff, CheckCircle, XCircle, Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';

// Mock admin data
const mockUsers = [
    { id: 1, name: 'Sudeepa', email: 'sudeepa@example.com', role: 'traveler', active: true, trips: 3 },
    { id: 2, name: 'Priya Kumar', email: 'priya@example.com', role: 'host', active: true, trips: 0 },
    { id: 3, name: 'Arjun Menon', email: 'arjun@example.com', role: 'traveler', active: true, trips: 5 },
    { id: 4, name: 'Lakshmi Iyer', email: 'lakshmi@example.com', role: 'host', active: false, trips: 0 },
    { id: 5, name: 'Ravi Shankar', email: 'ravi@example.com', role: 'traveler', active: true, trips: 1 },
];

const mockHosts = [
    { id: 1, name: 'Priya Kumar', destination: 'Munnar', verified: true, maxGuests: 2, rating: 4.9 },
    { id: 2, name: 'Lakshmi Iyer', destination: 'Coorg', verified: false, maxGuests: 3, rating: 0 },
    { id: 3, name: 'Ravi Shankar', destination: 'Ooty', verified: true, maxGuests: 2, rating: 4.8 },
    { id: 4, name: 'Meera Nair', destination: 'Wayanad', verified: false, maxGuests: 1, rating: 0 },
];

const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: <Users size={20} />, color: 'from-brand-400 to-brand-600' },
    { label: 'Active Hosts', value: '89', change: '+5%', icon: <Hotel size={20} />, color: 'from-ocean-400 to-ocean-600' },
    { label: 'Destinations', value: '130+', change: '+20', icon: <MapPin size={20} />, color: 'from-green-400 to-emerald-600' },
    { label: 'Avg Rating', value: '4.7', change: '+0.2', icon: <Star size={20} />, color: 'from-yellow-400 to-orange-500' },
];

export default function AdminDashboard() {
    const { isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'hosts' | 'places'>('overview');
    const [search, setSearch] = useState('');

    if (!isAdmin) {
        return (
            <AnimatedPage className="page-bg pt-28 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold mb-2">Admin Access Required</h2>
                    <p className="text-gray-500 mb-6">Login as admin to access the dashboard</p>
                    <Link to="/login" className="btn-primary">Go to Login</Link>
                </div>
            </AnimatedPage>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
        { id: 'users', label: 'Users', icon: <Users size={16} /> },
        { id: 'hosts', label: 'Hosts', icon: <Shield size={16} /> },
        { id: 'places', label: 'Places & Hotels', icon: <MapPin size={16} /> },
    ];

    return (
        <AnimatedPage className="page-bg pt-28 pb-16">
            <div className="section-container">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-display">Admin <span className="gradient-text">Dashboard</span></h1>
                        <p className="text-gray-500">Manage your Time2Travel platform</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 overflow-x-auto">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-white shadow-md text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, i) => (
                                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>{stat.icon}</div>
                                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="glass-card p-6">
                            <h3 className="font-bold mb-4">Recent Activity</h3>
                            <div className="space-y-3">
                                {[
                                    { text: 'Sudeepa planned a trip to Munnar', time: '2 hours ago', icon: '✈️' },
                                    { text: 'Priya Kumar registered as a host', time: '5 hours ago', icon: '🏠' },
                                    { text: 'New review submitted for Hampi', time: '1 day ago', icon: '⭐' },
                                    { text: 'Arjun completed 5 trips milestone', time: '2 days ago', icon: '🏆' },
                                    { text: 'Meera Nair host application pending', time: '3 days ago', icon: '⏳' },
                                ].map((activity, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
                                        <span className="text-lg">{activity.icon}</span>
                                        <div className="flex-1"><p className="text-sm text-gray-800">{activity.text}</p></div>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg">User Management</h3>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-brand-400 focus:outline-none" />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead><tr className="border-b border-gray-100">
                                    <th className="text-left text-xs text-gray-500 uppercase pb-3 font-semibold">User</th>
                                    <th className="text-left text-xs text-gray-500 uppercase pb-3 font-semibold">Role</th>
                                    <th className="text-left text-xs text-gray-500 uppercase pb-3 font-semibold">Trips</th>
                                    <th className="text-left text-xs text-gray-500 uppercase pb-3 font-semibold">Status</th>
                                    <th className="text-left text-xs text-gray-500 uppercase pb-3 font-semibold">Action</th>
                                </tr></thead>
                                <tbody>
                                    {mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
                                        <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                            <td className="py-3"><div><p className="font-semibold text-sm text-gray-800">{u.name}</p><p className="text-xs text-gray-400">{u.email}</p></div></td>
                                            <td className="py-3"><span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${u.role === 'host' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span></td>
                                            <td className="py-3 text-sm text-gray-600">{u.trips}</td>
                                            <td className="py-3">{u.active ? <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle size={14} /> Active</span> : <span className="flex items-center gap-1 text-red-500 text-xs"><XCircle size={14} /> Inactive</span>}</td>
                                            <td className="py-3"><button className="text-xs text-brand-600 hover:underline font-medium">Edit</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Hosts Tab */}
                {activeTab === 'hosts' && (
                    <div className="glass-card p-6">
                        <h3 className="font-bold text-lg mb-6">Host Verification</h3>
                        <div className="space-y-4">
                            {mockHosts.map(host => (
                                <div key={host.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-400 to-brand-500 flex items-center justify-center text-white font-bold">{host.name.split(' ').map(n => n[0]).join('')}</div>
                                        <div>
                                            <div className="flex items-center gap-2"><p className="font-semibold text-gray-800">{host.name}</p>{host.verified && <Shield size={14} className="text-green-500" />}</div>
                                            <p className="text-sm text-gray-500">{host.destination} · Max {host.maxGuests} guests</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {host.verified ? (
                                            <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1"><CheckCircle size={14} /> Verified</span>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button className="text-xs bg-green-500 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-green-600 transition-colors">Approve</button>
                                                <button className="text-xs bg-red-100 text-red-600 px-4 py-1.5 rounded-lg font-medium hover:bg-red-200 transition-colors">Reject</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Places Tab */}
                {activeTab === 'places' && (
                    <div className="glass-card p-6">
                        <h3 className="font-bold text-lg mb-6">Destination Management</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {['Hyderabad', 'Munnar', 'Goa', 'Ooty', 'Hampi', 'Coorg'].map(dest => (
                                <div key={dest} className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-gray-800 mb-2">{dest}</h4>
                                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">10 Hotels</span>
                                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full">10 Places</span>
                                        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full">5 Hosts</span>
                                    </div>
                                    <button className="text-xs text-brand-600 hover:underline font-medium flex items-center gap-1">Manage <ChevronRight size={12} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AnimatedPage>
    );
}
