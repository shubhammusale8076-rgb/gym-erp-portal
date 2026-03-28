import React, { useState } from 'react';
import { Bell, CreditCard, Calendar, MessageSquare, Settings, ArrowRight, CheckCheck } from 'lucide-react';
import './NotificationModal.css';

const NotificationModal = ({ onClose }) => {
    const [settings, setSettings] = useState({
        emailAlerts: true,
        pushNotifications: true,
        summaryReports: false,
    });

    const toggleSetting = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

    return (
        <div className="nm-overlay" onClick={onClose}>
            <div className="nm-modal" onClick={e => e.stopPropagation()}>
                <header className="nm-header">
                    <span className="nm-subtitle">SYSTEM INTELLIGENCE</span>
                    <h1 className="nm-title">Notification Center</h1>
                    <p className="nm-desc">
                        Review urgent operational alerts and monitor club ecosystem activity. Ensure rapid response to critical membership events.
                    </p>
                </header>

                <div className="nm-grid">
                    
                    {/* LEFT COLUMN: ACTIVE ALERTS */}
                    <div className="nm-col">
                        
                        <div className="nm-card card-white">
                            <div className="nm-card-header mb-8">
                                <div className="nm-card-header justify-start">
                                    <Bell className="icon-purple" size={24} />
                                    <div>
                                        <h2 className="nm-card-title">Recent Activity</h2>
                                        <span className="nm-card-subtitle">3 Unread priority alerts.</span>
                                    </div>
                                </div>
                                <button className="nm-btn-cancel" style={{fontSize: '0.75rem'}}>Mark all read</button>
                            </div>

                            <div className="nm-list">
                                {/* Alert 1 */}
                                <div className="nm-alert-pill">
                                    <div className="nm-circle-icon bg-purple-light">
                                        <Calendar size={18} />
                                    </div>
                                    <div className="nm-alert-content">
                                        <span className="nm-alert-text">New Lead Assignment</span>
                                        <span className="nm-alert-time">Today, 09:42 AM</span>
                                    </div>
                                </div>
                                {/* Alert 2 */}
                                <div className="nm-alert-pill">
                                    <div className="nm-circle-icon bg-orange-light">
                                        <CreditCard size={18} />
                                    </div>
                                    <div className="nm-alert-content">
                                        <span className="nm-alert-text">Pending Payment: Alex Rivera</span>
                                        <span className="nm-alert-time">Yesterday, 14:15 PM</span>
                                    </div>
                                </div>
                                {/* Alert 3 */}
                                <div className="nm-alert-pill">
                                    <div className="nm-circle-icon bg-blue-light">
                                        <MessageSquare size={18} />
                                    </div>
                                    <div className="nm-alert-content">
                                        <span className="nm-alert-text">Website Contact Form Submission</span>
                                        <span className="nm-alert-time">Monday, 11:20 AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: PREFERENCES */}
                    <div className="nm-col">
                        
                        <div className="nm-card card-tinted" style={{flex: 1}}>
                            <div className="nm-card-header justify-start gap-2 mb-6">
                                <Settings className="icon-purple" size={18} />
                                <h2 className="nm-card-title" style={{fontSize: '1rem'}}>Delivery Preferences</h2>
                            </div>
                            
                            <div className="nm-setting-row">
                                <div className="nm-setting-info">
                                    <h4>Email Alerts</h4>
                                    <p>Receive activity digests.</p>
                                </div>
                                <div>
                                    <input type="checkbox" id="t-email" className="nm-toggle" checked={settings.emailAlerts} onChange={() => toggleSetting('emailAlerts')} />
                                    <label htmlFor="t-email" className="nm-toggle-label"></label>
                                </div>
                            </div>
                            
                            <div className="nm-setting-row">
                                <div className="nm-setting-info">
                                    <h4>Push Notifications</h4>
                                    <p>Instant browser popups.</p>
                                </div>
                                <div>
                                    <input type="checkbox" id="t-push" className="nm-toggle" checked={settings.pushNotifications} onChange={() => toggleSetting('pushNotifications')} />
                                    <label htmlFor="t-push" className="nm-toggle-label"></label>
                                </div>
                            </div>

                            <div className="nm-setting-row">
                                <div className="nm-setting-info">
                                    <h4>Summary Reports</h4>
                                    <p>Weekly manager intel.</p>
                                </div>
                                <div>
                                    <input type="checkbox" id="t-sum" className="nm-toggle" checked={settings.summaryReports} onChange={() => toggleSetting('summaryReports')} />
                                    <label htmlFor="t-sum" className="nm-toggle-label"></label>
                                </div>
                            </div>

                            <div className="nm-actions">
                                <button type="button" className="nm-btn-submit" onClick={onClose}>
                                    Acknowledge & Close <CheckCheck size={16} />
                                </button>
                                <button type="button" className="nm-btn-cancel" onClick={onClose}>
                                    Dismiss
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
