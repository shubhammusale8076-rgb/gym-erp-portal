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
            <header className="security-header">

                <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                    <Save size={18} /> {isSaving ? 'Saving...' : 'Update Security'}
                </button>
            </header>

            <div className="security-layout">
                <div className="security-main">
                    {/* Change Password */}
                    <div className="glass-panel security-card security-mb">
                        <h3 className="heading-2 security-section-title">
                            <Key size={24} className="security-icon-primary" /> Change Password
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

                        <div className="security-form-grid">
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

                        <div className="password-strength">
                            <div className="strength-bars">
                                <div className="bar filled"></div>
                                <div className="bar filled"></div>
                                <div className="bar filled"></div>
                                <div className="bar"></div>
                            </div>
                            <p className="security-text-xs security-text-muted security-mt-2">Password strength: <span className="security-text-success-bold">Strong</span></p>
                        </div>
                    </div>

                    {/* 2FA Section */}
                    <div className="glass-panel security-card">
                        <div className="security-2fa-header">
                            <div>
                                <h3 className="heading-2 security-section-title" style={{ marginBottom: 0 }}>
                                    <Smartphone size={24} className="security-icon-primary" /> Two-Factor Authentication
                                </h3>
                                <p className="security-text-sm security-text-muted">Add an extra layer of security to your account.</p>
                            </div>
                            <span className="badge badge-success">Enabled</span>
                        </div>

                        <div className="security-2fa-box">
                            <div className="security-2fa-icon-wrapper">
                                <CheckCircle2 className="security-icon-success" size={24} />
                            </div>
                            <div>
                                <p className="security-2fa-title">Authenticator App Linked</p>
                                <p className="security-text-xs security-text-muted">Google Authenticator / Authy is active.</p>
                            </div>
                            <button className="btn btn-secondary security-btn-ml-auto">Reset 2FA</button>
                        </div>
                    </div>
                </div>

                <div className="security-sidebar">
                    {/* Audit Logs */}
                    <div className="glass-panel security-card">
                        <h3 className="heading-3 security-history-title">
                            <History size={18} className="security-text-muted" /> Login History
                        </h3>
                        <div className="audit-logs">
                            {auditLogs.map(log => (
                                <div key={log.id} className="log-item">
                                    <div className="security-log-row">
                                        {log.action.includes('Failed') ?
                                            <AlertCircle size={16} className="security-icon-danger security-log-icon" /> :
                                            <Shield size={16} className="security-icon-primary security-log-icon" />
                                        }
                                        <div>
                                            <p className="security-log-title">{log.action}</p>
                                            <p className="security-text-xs security-text-muted">{log.time}</p>
                                            <p className="security-text-xs security-text-muted security-log-mt">{log.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-secondary security-btn-full">View Full Audit Log</button>
                    </div>

                    {/* Sessions */}
                    <div className="glass-card security-session-card">
                        <h3 className="heading-3 security-session-title">Active Sessions</h3>
                        <p className="security-text-xs security-text-muted security-session-subtitle">You are currently logged in on these devices.</p>
                        <div className="security-session-item">
                            <div>
                                <p className="security-session-name">This Device</p>
                                <p className="security-text-xs security-text-muted">Chrome on Windows</p>
                            </div>
                            <span className="security-badge-active">ACTIVE</span>
                        </div>
                        <button className="security-logout-btn">
                            Logout all other sessions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Security;
