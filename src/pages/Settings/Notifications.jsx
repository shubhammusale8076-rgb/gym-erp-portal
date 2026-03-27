import React, { useState } from 'react';
import {
    Bell,
    Mail,
    MessageSquare,
    Clock,
    UserCheck,
    CreditCard,
    Save,
    Megaphone,
    Calendar,
    Users,
    Wallet,
    DoorOpen,
    Cake,
    MoreVertical,
    Info,
    Check
} from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
    const [rules, setRules] = useState([
        {
            id: 1,
            title: 'Membership Expiry',
            description: 'Triggered 7 days before end',
            icon: Calendar,
            channels: { email: true, whatsapp: true, push: false }
        },
        {
            id: 2,
            title: 'New Lead Alert',
            description: 'Immediate staff routing',
            icon: Users,
            channels: { email: true, whatsapp: false, push: true }
        },
        {
            id: 3,
            title: 'Payment Confirmation',
            description: 'Sent upon ledger sync',
            icon: Wallet,
            channels: { email: true, whatsapp: true, push: true }
        },
        {
            id: 4,
            title: 'Check-in Notification',
            description: 'Arrival logging confirmation',
            icon: DoorOpen,
            channels: { email: false, whatsapp: false, push: true }
        },
        {
            id: 5,
            title: 'Member Anniversary',
            description: 'Loyalty engagement pulse',
            icon: Cake,
            channels: { email: true, whatsapp: true, push: false }
        }
    ]);

    const [preferences, setPreferences] = useState({
        silentMode: true,
        batchReports: false,
        rsvpAlerts: true
    });

    const toggleChannel = (ruleId, channel) => {
        setRules(prev => prev.map(rule =>
            rule.id === ruleId
                ? { ...rule, channels: { ...rule.channels, [channel]: !rule.channels[channel] } }
                : rule
        ));
    };

    const togglePreference = (pref) => {
        setPreferences(prev => ({ ...prev, [pref]: !prev[pref] }));
    };

    return (
        <div className="notifications-page">
            <div className="notifications-layout">
                <div className="notif-sidebar">
                    <div className="efficiency-card">
                        <div className="notif-icon-box">
                            <Megaphone size={24} />
                        </div>
                        <h2 className="efficiency-title">Channel Efficiency</h2>
                        <p className="efficiency-desc">
                            Currently delivering 84% of automated communications via WhatsApp.
                        </p>
                        <div className="reach-box">
                            <span className="reach-label">Reach Score</span>
                            <span className="reach-score">EXCELLENT</span>
                            <div className="reach-progress-bg">
                                <div className="reach-progress-bar" style={{ width: '84%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="pref-card card">
                        <h3 className="pref-title">
                            <span style={{ color: '#7e22ce' }}>●</span> Quick Preferences
                        </h3>
                        
                        <div className="pref-item">
                            <span className="pref-label">Silent Mode (10PM - 6AM)</span>
                            <div 
                                className={`notif-toggle ${preferences.silentMode ? 'active' : ''}`}
                                onClick={() => togglePreference('silentMode')}
                            >
                                <div className="notif-toggle-circle"></div>
                            </div>
                        </div>

                        <div className="pref-item">
                            <span className="pref-label">Daily Batch Reports</span>
                            <div 
                                className={`notif-toggle ${preferences.batchReports ? 'active' : ''}`}
                                onClick={() => togglePreference('batchReports')}
                            >
                                <div className="notif-toggle-circle"></div>
                            </div>
                        </div>

                        <div className="pref-item">
                            <span className="pref-label">Member RSVP Alerts</span>
                            <div 
                                className={`notif-toggle ${preferences.rsvpAlerts ? 'active' : ''}`}
                                onClick={() => togglePreference('rsvpAlerts')}
                            >
                                <div className="notif-toggle-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="notif-main card">
                    <div className="notif-table-header">
                        <div className="th-label">Automated Trigger</div>
                        <div className="th-label">Email</div>
                        <div className="th-label">WhatsApp</div>
                        <div className="th-label">Push</div>
                        <div className="th-label">Action</div>
                    </div>

                    <div className="notif-rows">
                        {rules.map(rule => (
                            <div key={rule.id} className="notif-row">
                                <div className="trigger-info">
                                    <div className="trigger-icon">
                                        <rule.icon size={20} />
                                    </div>
                                    <div className="trigger-text">
                                        <h4 className="trigger-title">{rule.title}</h4>
                                        <p className="trigger-desc">{rule.description}</p>
                                    </div>
                                </div>
                                
                                <div className="channel-status">
                                    <div 
                                        className={`status-circle ${rule.channels.email ? 'active' : ''}`}
                                        onClick={() => toggleChannel(rule.id, 'email')}
                                    >
                                        <Check size={14} />
                                    </div>
                                </div>

                                <div className="channel-status">
                                    <div 
                                        className={`status-circle ${rule.channels.whatsapp ? 'active' : ''}`}
                                        onClick={() => toggleChannel(rule.id, 'whatsapp')}
                                    >
                                        <Check size={14} />
                                    </div>
                                </div>

                                <div className="channel-status">
                                    <div 
                                        className={`status-circle ${rule.channels.push ? 'active' : ''}`}
                                        onClick={() => toggleChannel(rule.id, 'push')}
                                    >
                                        <Check size={14} />
                                    </div>
                                </div>

                                <div className="channel-status">
                                    <button className="action-btn">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Banner */}
                    <div className="notif-banner">
                        <div className="banner-content">
                            <Info size={20} />
                            <span>Changes to WhatsApp templates require 24h approval from Meta.</span>
                        </div>
                        <div className="banner-actions">
                            <button className="text-btn">View Logs</button>
                            <button className="dark-btn">Test Sandbox</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
