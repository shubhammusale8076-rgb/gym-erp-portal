import React, { useState } from 'react';
import {
    User,
    Settings as SettingsIcon,
    CreditCard,
    Bell,
    Shield,
    MapPin,
    Camera,
    Save,
    ChevronRight
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', name: 'Profile', icon: <User size={18} /> },
        { id: 'gym', name: 'Gym Info', icon: <MapPin size={18} /> },
        { id: 'subscription', name: 'Subscription', icon: <CreditCard size={18} /> },
        { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
        { id: 'security', name: 'Security', icon: <Shield size={18} /> },
    ];

    return (
        <div className="settings-page">
            <div className="page-header mb-8">
                <h1 className="heading-1">Admin Settings</h1>
                <p className="subtitle">Manage your account preferences and gym configurations.</p>
            </div>

            <div className="settings-container">
                {/* Sidebar Tabs */}
                <aside className="settings-sidebar glass-panel">
                    <div className="p-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.name}</span>
                                <ChevronRight size={14} className="ml-auto" />
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Content Area */}
                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="glass-card p-6">
                            <h3 className="heading-2 mb-6">Personal Profile</h3>
                            <div className="profile-upload mb-8 flex items-center gap-6">
                                <div className="relative">
                                    <img
                                        src="https://ui-avatars.com/api/?name=Admin+User&background=10b981&color=fff&size=128"
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                                    />
                                    <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg hover:scale-110 transition-transform">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <div>
                                    <h4 className="font-bold">Aakash Yadav</h4>
                                    <p className="text-sm text-secondary">Manager @ FitFlow Gym</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="input-group">
                                    <label className="input-label">Full Name</label>
                                    <input type="text" className="input-field" defaultValue="Aakash Yadav" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email Address</label>
                                    <input type="email" className="input-field" defaultValue="aakash@fitflow.com" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Phone Number</label>
                                    <input type="tel" className="input-field" defaultValue="+91 98765 43210" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Language</label>
                                    <select className="input-field">
                                        <option>English (US)</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t flex justify-end">
                                <button className="btn btn-primary">
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'gym' && (
                        <div className="glass-card p-6">
                            <h3 className="heading-2 mb-6">Gym Information</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="input-group">
                                    <label className="input-label">Gym Name</label>
                                    <input type="text" className="input-field" defaultValue="FitFlow Fitness Center" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Primary Address</label>
                                    <textarea className="input-field h-24" defaultValue="123 Wellness Blvd, Fitness Dist, NY 10001"></textarea>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="input-group">
                                        <label className="input-label">Gym Website</label>
                                        <input type="url" className="input-field" defaultValue="https://fitflowgym.com" />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label">Support Email</label>
                                        <input type="email" className="input-field" defaultValue="support@fitflowgym.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t flex justify-end">
                                <button className="btn btn-primary">
                                    <Save size={18} /> Update Gym Info
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="glass-card p-6">
                            <h3 className="heading-2 mb-6">Notification Preferences</h3>
                            <div className="space-y-6">
                                {[
                                    { title: 'Member Signups', desc: 'Get notified when a new member joins your gym.' },
                                    { title: 'Failed Payments', desc: 'Alerts for failed monthly membership transactions.' },
                                    { title: 'Training Sessions', desc: 'Reminders for upcoming personal training sessions.' },
                                    { title: 'Inventory Alerts', desc: 'Low stock notifications for supplements or equipment.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-border-light rounded-xl">
                                        <div>
                                            <h4 className="font-bold text-sm">{item.title}</h4>
                                            <p className="text-xs text-secondary">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={i % 2 === 0} />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'subscription' && (
                        <div className="glass-card p-6">
                            <h3 className="heading-2 mb-6">Current Plan</h3>
                            <div className="bg-primary bg-opacity-10 p-6 rounded-2xl border border-primary border-opacity-20 flex justify-between items-center">
                                <div>
                                    <span className="badge badge-success mb-2 uppercase">Pro Plan</span>
                                    <h2 className="heading-1">$99<span className="text-lg text-secondary">/mo</span></h2>
                                    <p className="text-sm text-secondary mt-1">Next bill: Nov 15, 2026</p>
                                </div>
                                <button className="btn btn-primary shadow-lg scale-110">Upgrade Plan</button>
                            </div>

                            <div className="mt-12">
                                <h4 className="heading-3 mb-4">Payment Methods</h4>
                                <div className="p-4 border border-border-light rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-xs">VISA</div>
                                        <div>
                                            <p className="text-sm font-bold">Visa ending in 4242</p>
                                            <p className="text-xs text-secondary">Expires 12/28</p>
                                        </div>
                                    </div>
                                    <button className="text-primary text-sm font-semibold hover:underline">Edit</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
