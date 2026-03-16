import React, { useState } from 'react';
import { Shield, Key, Smartphone, History, Eye, EyeOff, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import './Security.css';

const Security = () => {
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false });
    const [isSaving, setIsSaving] = useState(false);

    const togglePassword = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const auditLogs = [
        { id: 1, action: 'Login Successful', location: 'Gurgaon, IN (IP: 192.168.1.1)', time: '2026-03-16 11:45 AM', device: 'Chrome / Windows' },
        { id: 2, action: 'Password Changed', location: 'Mumbai, IN (IP: 103.21.12.4)', time: '2026-03-10 09:20 PM', device: 'Safari / iPhone' },
        { id: 3, action: '2FA Enabled', location: 'Delhi, IN (IP: 182.48.20.1)', time: '2026-03-05 02:15 PM', device: 'Firefox / MacOS' },
        { id: 4, action: 'Login Attempt Failed', location: 'London, UK (IP: 45.12.1.99)', time: '2026-03-01 04:30 AM', device: 'Edge / Windows' },
    ];

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Security settings updated successfully.');
        }, 1000);
    };

    return (
        <div className="page-container security-settings">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="heading-1">Security & Access</h1>
                    <p className="subtitle">Protect your account and monitor system access.</p>
                </div>
                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    <Save size={18} /> {isSaving ? 'Saving...' : 'Update Security'}
                </button>
            </header>

            <div className="security-layout">
                <div className="security-main">
                    {/* Change Password */}
                    <div className="glass-panel p-8 mb-8">
                        <h3 className="heading-2 mb-6 flex items-center gap-2">
                            <Key size={24} className="text-primary" /> Change Password
                        </h3>

                        <div className="input-group">
                            <label className="input-label">Current Password</label>
                            <div className="password-field-wrapper">
                                <input
                                    type={showPasswords.current ? "text" : "password"}
                                    className="input-field"
                                    placeholder="Enter current password"
                                />
                                <button className="password-toggle" onClick={() => togglePassword('current')}>
                                    {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-grid mt-4">
                            <div className="input-group">
                                <label className="input-label">New Password</label>
                                <div className="password-field-wrapper">
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        className="input-field"
                                        placeholder="Min. 8 characters"
                                    />
                                    <button className="password-toggle" onClick={() => togglePassword('new')}>
                                        {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Confirm New Password</label>
                                <input type="password" className="input-field" placeholder="Repeat new password" />
                            </div>
                        </div>

                        <div className="password-strength mt-4">
                            <div className="strength-bars">
                                <div className="bar filled"></div>
                                <div className="bar filled"></div>
                                <div className="bar filled"></div>
                                <div className="bar"></div>
                            </div>
                            <p className="text-xs text-muted mt-2">Password strength: <span className="text-success font-semibold">Strong</span></p>
                        </div>
                    </div>

                    {/* 2FA Section */}
                    <div className="glass-panel p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="heading-2 flex items-center gap-2">
                                    <Smartphone size={24} className="text-primary" /> Two-Factor Authentication
                                </h3>
                                <p className="text-sm text-muted mt-1">Add an extra layer of security to your account.</p>
                            </div>
                            <span className="badge badge-success">Enabled</span>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <CheckCircle2 className="text-success" size={24} />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Authenticator App Linked</p>
                                <p className="text-xs text-muted">Google Authenticator / Authy is active.</p>
                            </div>
                            <button className="btn btn-secondary text-xs ml-auto">Reset 2FA</button>
                        </div>
                    </div>
                </div>

                <div className="security-sidebar">
                    {/* Audit Logs */}
                    <div className="glass-panel p-6">
                        <h3 className="heading-3 mb-6 flex items-center gap-2">
                            <History size={18} className="text-muted" /> Login History
                        </h3>
                        <div className="audit-logs">
                            {auditLogs.map(log => (
                                <div key={log.id} className="log-item">
                                    <div className="flex items-start gap-3">
                                        {log.action.includes('Failed') ?
                                            <AlertCircle size={16} className="text-danger mt-1" /> :
                                            <Shield size={16} className="text-primary mt-1" />
                                        }
                                        <div>
                                            <p className="text-sm font-semibold">{log.action}</p>
                                            <p className="text-xs text-muted">{log.time}</p>
                                            <p className="text-xs text-muted mt-1">{log.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-secondary w-full mt-6 text-sm">View Full Audit Log</button>
                    </div>

                    {/* Sessions */}
                    <div className="glass-card p-6 mt-6 border-accent/20 bg-accent/5">
                        <h3 className="heading-3 mb-4">Active Sessions</h3>
                        <p className="text-xs text-muted mb-4">You are currently logged in on these devices.</p>
                        <div className="session-item flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold">This Device</p>
                                <p className="text-xs text-muted">Chrome on Windows</p>
                            </div>
                            <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-1 rounded">ACTIVE</span>
                        </div>
                        <button className="text-danger text-sm font-semibold mt-6 flex items-center gap-2 hover:underline">
                            Logout all other sessions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;
