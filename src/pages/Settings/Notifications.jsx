import React, { useState } from 'react';
import {
    Bell,
    Mail,
    MessageSquare,
    Clock,
    UserCheck,
    CreditCard,
    Save
} from 'lucide-react';
import './Notifications.css';

const NotificationRule = ({ title, description, icon: Icon, channels, enabled, toggleChannel }) => (
    <div className="glass-card notification-rule">
        <div className="rule-info">
            <div className="rule-icon">
                <Icon size={20} />
            </div>
            <div className="rule-text">
                <h3 className="heading-3">{title}</h3>
                <p className="text-muted text-sm">{description}</p>
            </div>
        </div>
        <div className="rule-channels">
            <label className="channel-toggle">
                <Mail size={16} className={channels.email ? 'text-primary' : 'text-muted'} />
                <input
                    type="checkbox"
                    checked={channels.email}
                    onChange={() => toggleChannel('email')}
                />
                <span className="toggle-slider"></span>
            </label>
            <label className="channel-toggle">
                <MessageSquare size={16} className={channels.whatsapp ? 'text-primary' : 'text-muted'} />
                <input
                    type="checkbox"
                    checked={channels.whatsapp}
                    onChange={() => toggleChannel('whatsapp')}
                />
                <span className="toggle-slider"></span>
            </label>
            <label className="channel-toggle">
                <Bell size={16} className={channels.push ? 'text-primary' : 'text-muted'} />
                <input
                    type="checkbox"
                    checked={channels.push}
                    onChange={() => toggleChannel('push')}
                />
                <span className="toggle-slider"></span>
            </label>
        </div>
    </div>
);

const Notifications = () => {
    const [rules, setRules] = useState([
        {
            id: 1,
            title: 'Membership Expiry',
            description: 'Send a reminder when a members plan is about to expire (3 days before).',
            icon: Clock,
            channels: { email: true, whatsapp: true, push: false }
        },
        {
            id: 2,
            title: 'New Lead Alert',
            description: 'Notify staff when a new lead is captured from the website contact form.',
            icon: UserCheck,
            channels: { email: true, whatsapp: false, push: true }
        },
        {
            id: 3,
            title: 'Payment Confirmation',
            description: 'Send a digital receipt after a successful membership payment.',
            icon: CreditCard,
            channels: { email: true, whatsapp: true, push: false }
        },
        {
            id: 4,
            title: 'Check-in Notification',
            description: 'Alert trainers when their assigned members check into the gym.',
            icon: UserCheck,
            channels: { email: false, whatsapp: false, push: true }
        }
    ]);

    const toggleChannel = (ruleId, channel) => {
        setRules(prev => prev.map(rule =>
            rule.id === ruleId
                ? { ...rule, channels: { ...rule.channels, [channel]: !rule.channels[channel] } }
                : rule
        ));
    };

    return (
        <div className="page-container notifications-page">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="heading-1">Notification Rules</h1>
                    <p className="subtitle">Configure how and when your members and staff stay informed.</p>
                </div>
                <button className="btn btn-primary">
                    <Save size={18} /> Save Settings
                </button>
            </header>

            <div className="notifications-list">
                <div className="list-header glass-panel mb-4">
                    <div className="header-label">Event / Trigger</div>
                    <div className="header-channels">
                        <span>Email</span>
                        <span>WhatsApp</span>
                        <span>Push</span>
                    </div>
                </div>

                {rules.map(rule => (
                    <NotificationRule
                        key={rule.id}
                        {...rule}
                        toggleChannel={(channel) => toggleChannel(rule.id, channel)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Notifications;
