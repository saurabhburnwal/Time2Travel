import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Phone, Lock, Save, ArrowLeft, Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { getProfile, updateProfile } from '../services/api';

export default function AdminProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone_number: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setFormData({
                name: data.name || '',
                email: data.email || '',
                phone_number: data.phone_number || ''
            });
        } catch (error) {
            console.error('Failed to load admin profile:', error);
            toast.error('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Include password only if it's being updated
            const updatePayload: any = { ...formData };
            if (passwordData.newPassword) {
                if (passwordData.newPassword !== passwordData.confirmPassword) {
                    toast.error('New passwords do not match');
                    setSaving(false);
                    return;
                }
                updatePayload.password = passwordData.newPassword;
                updatePayload.currentPassword = passwordData.currentPassword;
            }

            // Using the existing updateProfile endpoint (which handles password internally if provided)
            await updateProfile(updatePayload);
            toast.success('Admin profile updated successfully');
            
            // Clear password fields on success
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            console.error('Update failed:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
            </div>
        );
    }

    return (
        <AnimatedPage className="min-h-screen bg-slate-900 p-8 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <button 
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold">Back to Dashboard</span>
                    </button>
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
                        <Shield size={16} className="text-brand-400" />
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Admin Control</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Identity Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl" />
                            <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-ocean-400 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-brand-500/20">
                                {formData.name.charAt(0) || 'A'}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{formData.name || 'System Admin'}</h2>
                            <p className="text-brand-400 font-semibold text-sm mb-6">{formData.email}</p>
                            
                            <div className="pt-6 border-t border-slate-700/50 flex flex-col gap-3 text-left">
                                <div className="flex items-center gap-3 text-slate-400 text-sm">
                                    <Shield size={16} />
                                    <span>Super Administrator</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400 text-sm">
                                    <Lock size={16} />
                                    <span>Full Access Granted</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                            <div className="flex gap-4">
                                <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                                <div>
                                    <h4 className="text-amber-500 font-bold mb-1">Security Notice</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">Changes made here affect your root access. Ensure your new password meets complexity requirements.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Editing Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        <form onSubmit={handleProfileUpdate} className="space-y-8">
                            
                            {/* Personal Information */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <User className="text-brand-400" size={20} /> Identity Settings
                                </h3>
                                
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                                <input
                                                    type="tel"
                                                    value={formData.phone_number}
                                                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Lock className="text-brand-400" size={20} /> Access Control
                                    </h3>
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPasswords(!showPasswords)}
                                        className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                                    >
                                        {showPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
                                        {showPasswords ? 'Hide' : 'Show'}
                                    </button>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Password (Required for changes)</label>
                                        <input
                                            type={showPasswords ? "text" : "password"}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                                            placeholder="Enter current password..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Password <span className="text-slate-600 normal-case tracking-normal">(Optional)</span></label>
                                            <input
                                                type={showPasswords ? "text" : "password"}
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                                                placeholder="Leave blank to keep current"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm New Password</label>
                                            <input
                                                type={showPasswords ? "text" : "password"}
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                                                placeholder="Re-enter new password"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl font-bold flex items-center gap-3 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                    Commit Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}
