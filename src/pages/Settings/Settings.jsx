import React from 'react';
import { Link } from 'react-router-dom';
import {
    Users,
    Building2,
    MessageSquare,
    BellRing,
    ShieldCheck,
    CreditCard,
    ChevronRight
} from 'lucide-react';
import './Settings.css';

const SettingsCard = ({ title, description, icon: Icon, to, badge }) => (
    <Link to={to} className="glass-card settings-card">
        <div className="flex justify-between items-start">
            <div className="settings-card-icon">
                <Icon size={24} />
            </div>
            <ChevronRight size={18} className="text-muted" />
        </div>
        <div className="settings-card-content">
            <h3 className="heading-3">{title}</h3>
            <p>{description}</p>
            {badge && <span className="badge badge-success settings-badge">{badge}</span>}
        </div>
    </Link>
);

const Settings = () => {
    const settingModules = [
        {
            title: 'User Management',
            description: 'Add and manage staff accounts, roles, and system permissions.',
            icon: Users,
            to: '/settings/users',
            badge: '5 Active'
        },
        {
            title: 'Gym Profile',
            description: 'Update your gym name, logo, address, and contact information.',
            icon: Building2,
            to: '/settings/profile'
        },
        {
            title: 'Integrations',
            description: 'Connect WhatsApp, Email, and SMS gateways for automation.',
            icon: MessageSquare,
            to: '/settings/integrations'
        },
        {
            title: 'Notifications',
            description: 'Configure auto-reminders for membership expiry and check-ins.',
            icon: BellRing,
            to: '/settings/notifications'
        },
        {
            title: 'Payments',
            description: 'Manage payment gateway API keys and billing settings.',
            icon: CreditCard,
            to: '/settings/payments'
        },
        {
            title: 'Security',
            description: 'Update admin password, enable 2FA, and view audit logs.',
            icon: ShieldCheck,
            to: '/settings/security'
        }
    ];

    return (
        <div className="page-container settings-dashboard">
            <header className="mb-8">
                <h1 className="heading-1">System Settings</h1>
                <p className="subtitle">Configure and manage your GymSync ERP platform preferences.</p>
            </header>

            <div className="settings-grid">
                {settingModules.map((module, index) => (
                    <SettingsCard key={index} {...module} />
                ))}
            </div>
        </div>
    );
};

export default Settings;
