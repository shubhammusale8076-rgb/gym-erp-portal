import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    UserCog, Building2, Store, Mail, MessageSquare, Link2, Bell, Calendar,
    Wallet, ShieldCheck, ArrowRight, ToggleRight, ToggleLeft, Key, Lock, Network
} from 'lucide-react';
import './Settings.css';
import PageHeader from '../../components/PageHeader/PageHeader';


const SettingWrapper = () => {

    const location = useLocation();
    
    const tabs = [
        { name: "Settings", path: "/settings" },
        { name: "Profile", path: "/settings/profile" },
        { name: "Security", path: "/settings/security" },
        { name: "Integrations", path: "/settings/integrations" },
        { name: "Notifications", path: "/settings/notifications" },
        { name: "Payments", path: "/settings/payments" }
    ];

    const headerConfig = {
        "/settings": {
            title: "System Control Panel",
            subtitle: "Configure and manage your GymSync ERP platform preferences.",
            actions: []
        },
        "/settings/profile": {
            title: "Profile Settings",
            subtitle: "Manage your gym identity and branding.",
            actions: []
        },
        "/settings/security": {
            title: "Security Settings",
            subtitle: "Protect your account and monitor system access.",
            actions: []
        },
        "/settings/integrations": {
            title: "Integrations",
            subtitle: "Connect external services like WhatsApp & payments.",
            actions: []
        },
        "/settings/notifications": {
            title: "Notifications",
            subtitle: "Configure how and when your members and staff stay informed.",
            actions: []
        },
        "/settings/payments": {
            title: "Payments",
            subtitle: "Manage payment gateways, billing cycles, and transaction settings.",
            actions: []
        }
    };


    const currentHeader =
        headerConfig[location.pathname] || {
            title: "System Control Panel",
            subtitle: "Configure your platform.",
            actions: []
        };

    return (
        <div className="page-container settings-dashboard">

            <div className='setting-header'>
                <PageHeader
                    title={currentHeader.title}
                    subtitle={currentHeader.subtitle}
                    actions={currentHeader.actions}
                />
                <div className="settings-tabs">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            className={`tab-link ${location.pathname === tab.path ? 'active' : ''
                                }`}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="settings-content">
                <Outlet />
            </div>
        </div>
    );
};

export default SettingWrapper;
