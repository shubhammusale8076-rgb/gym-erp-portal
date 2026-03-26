import React from 'react';
import { Link } from 'react-router-dom';
import {
    UserCog, Building2, Store, Mail, MessageSquare, Link2, Bell, Calendar,
    Wallet, ShieldCheck, ArrowRight, ToggleRight, ToggleLeft, Key, Lock, Network
} from 'lucide-react';
import './Settings.css';
import PageHeader from '../../components/PageHeader/PageHeader';

const Settings = () => {
    return (
        <div className="page-container settings-dashboard">

            <div className='setting-header'>
                <PageHeader
                    title="System Control Panel"
                    subtitle="Configure and manage your GymSync ERP platform preferences."
                    actions={[]}
                />
                <div className="settings-nav-links">
                    <a href="/settings/profile">Profile</a>
                    <a href="/settings/security">Security</a>
                    <a href="/settings/integrations">integrations</a>
                    <a href="/settings/notifications">Notifications</a>
                    <a href="/settings/payment">Payment</a>
                </div>
            </div>
            <div className="set-grid">

                {/* 1. User Management */}
                <div className="set-card set-card-user">
                    <div className="set-icon-box">
                        <UserCog size={22} className="set-icon-svg" />
                    </div>
                    <div className="set-content">
                        <h2 className="set-title">User Management</h2>
                        <p className="set-desc">
                            Orchestrate your team. Add staff accounts, define bespoke
                            roles, and calibrate system permissions.
                        </p>
                    </div>
                    <div className="set-footer-user">
                        <span className="set-stat">12 ACTIVE STAFF</span>
                        <Link to="/settings/users" className="set-link">
                            Manage <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* 2. Gym Profile */}
                <div className="set-card set-card-gym">
                    <div className="set-icon-box">
                        <Store size={22} className="set-icon-svg" />
                    </div>
                    <div className="set-content">
                        <h2 className="set-title">Gym Profile</h2>
                        <div className="set-gym-pill">
                            <Building2 size={16} className="set-gym-pill-icon" />
                            <span className="set-gym-pill-text">Aura Premium Downtown</span>
                        </div>
                        <p className="set-desc">
                            Update your public identity. Manage brand logos, contact details,
                            and physical studio locations.
                        </p>
                    </div>
                    <div className="set-footer-gym">
                        <Link to="/settings/profile" className="btn-secondary">
                            Edit Identity
                        </Link>
                    </div>
                </div>

                {/* 3. Integrations */}
                <div className="set-card set-card-integrations">
                    <div className="set-header-split">
                        <div className="set-icon-box-white">
                            <Network size={22} className="set-icon-svg" />
                        </div>
                        <span className="set-api-badge">API CONNECTED</span>
                    </div>
                    <div className="set-content">
                        <h2 className="set-title">Integrations</h2>
                        <p className="set-desc dark-desc">
                            Connect your ecosystem. Seamlessly link WhatsApp, SMS gateways,
                            and marketing automation tools.
                        </p>
                    </div>
                    <div className="set-footer-integrations">
                        <div className='footer-icon-wrapper'>
                            <div className="set-app-icon"><Mail size={16} /></div>
                            <div className="set-app-icon"><MessageSquare size={16} /></div>
                            <div className="set-app-icon"><Link2 size={16} /></div>
                        </div>
                        <div>
                            <Link to="/settings/integrations" className="set-link">
                                Manage <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                </div>

                {/* 4. Notifications & Alerts */}
                <div className="set-card set-card-notifications">
                    <div className="set-notif-left">
                        <div className="set-icon-box">
                            <Bell size={22} className="set-icon-svg" />
                        </div>
                        <h2 className="set-title">Notifications & Alerts</h2>
                        <p className="set-desc">
                            Automate the conversation. Configure reminders for membership expirations,
                            class check-ins, and promotional bursts.
                        </p>
                    </div>
                    <div className="set-notif-right">
                        <div className="set-toggle-card">
                            <div className="set-toggle-icon-wrap"><Bell size={16} /></div>
                            <span className="set-toggle-label">Membership<br />Expiry</span>
                            <ToggleRight size={32} className="set-toggle-active" weight="fill" />
                        </div>
                        <div className="set-toggle-card inactive">
                            <div className="set-toggle-icon-wrap"><Calendar size={16} /></div>
                            <span className="set-toggle-label">Class<br />Reminders</span>
                            <ToggleLeft size={32} className="set-toggle-inactive" />
                        </div>
                    </div>
                </div>

                {/* 5. Payments */}
                <div className="set-card set-card-payments">
                    <div className="set-icon-box">
                        <Wallet size={22} className="set-icon-svg" />
                    </div>
                    <div className="set-content">
                        <h2 className="set-title">Payments</h2>
                        <p className="set-desc">
                            Manage the flow. Configure API keys for Stripe, PayPal, and automate
                            monthly recurring billing cycles.
                        </p>
                    </div>
                    <div className="set-footer-payments">
                        <div className="set-key-pill">
                            <Key size={12} className="set-key-icon" />
                            STRIPE_LIVE_...8X2
                        </div>
                    </div>
                </div>

                {/* 6. Security (Full Width) */}
                <div className="set-card set-card-security">
                    <div className="set-sec-left">
                        <div className="set-sec-badge">
                            <ShieldCheck size={14} className="set-sec-badge-icon" />
                            HIGH SECURITY MODE
                        </div>
                        <h2 className="set-title-large">Security & Resilience</h2>
                        <p className="set-desc-large">
                            Fortify your platform. Enable mandatory Two-Factor Authentication (2FA),
                            rotate administrative credentials, and monitor real-time audit logs for every system access.
                        </p>
                        <div className="set-sec-actions">
                            <button className="btn-primary">Update Credentials</button>
                            <button className="btn-secondary">View Audit Logs</button>
                        </div>
                    </div>
                    <div className="set-sec-right">
                        <div className="set-lock-illustration">
                            {/* CSS Illustration of the Lock to avoid external image dependencies */}
                            <img alt="Abstract security technology"
                                className=""
                                data-alt="close-up of a high-tech glowing blue and purple server interface with data streams and binary code in a dark room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAezofHYs_LuqcWf02AAhUrWK61E-xNF3W66OxszpYAcvRZ35KIDB_pGSVvrfEnW_wXfW1C63I0IjeZJ73DKmG_Kt8b4-ZlYp1NpxqeeZL4giQry4l19hcns48tX1Bhg7VhmcOuWWz9AIrnrvQjPMufPoAQm3vVKv8Kuf7T9iodyAtpR0krFpuMML4-UV5MB38kWPKQjD3Ioa6zauyCxJXHvajP8yzx9te3H6bojXXZyTFiFqi4vcD94ZaQGJ_zo1QRY9Kchuet108" />
                            <div className="set-2fa-pill">
                                <span className="set-2fa-dot"></span> 2FA Active
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;
