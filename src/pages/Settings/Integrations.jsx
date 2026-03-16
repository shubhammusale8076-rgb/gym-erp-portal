import React, { useState } from 'react';
import {
    MessageSquare,
    Mail,
    CreditCard,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import './Integrations.css';

const IntegrationItem = ({ title, description, icon: Icon, connected, status }) => (
    <div className="glass-card integration-item">
        <div className="integration-header">
            <div className="integration-icon-wrapper">
                <Icon size={24} />
            </div>
            <div className="integration-toggle">
                {connected ? (
                    <ToggleRight className="text-primary cursor-pointer" size={32} />
                ) : (
                    <ToggleLeft className="text-muted cursor-pointer" size={32} />
                )}
            </div>
        </div>
        <div className="integration-body">
            <h3 className="heading-3">{title}</h3>
            <p className="text-muted text-sm">{description}</p>
        </div>
        <div className="integration-footer">
            {connected ? (
                <span className="integration-status status-online">
                    <CheckCircle2 size={14} /> Connected
                </span>
            ) : (
                <span className="integration-status status-offline">
                    <AlertCircle size={14} /> Disconnected
                </span>
            )}
            <button className="btn-link">
                Configure <ExternalLink size={14} />
            </button>
        </div>
    </div>
);

const Integrations = () => {
    const [integrations] = useState([
        {
            title: 'WhatsApp Business',
            description: 'Send automated membership reminders and promotional messages directly to members.',
            icon: MessageSquare,
            connected: true,
            status: 'Online'
        },
        {
            title: 'SendGrid (Email)',
            description: 'Reliable email delivery for invoices, welcome kits, and monthly reports.',
            icon: Mail,
            connected: false,
            status: 'Offline'
        },
        {
            title: 'Stripe Payments',
            description: 'Secure online payment processing for membership renewals and merchandise.',
            icon: CreditCard,
            connected: true,
            status: 'Online'
        },
        {
            title: 'Razorpay',
            description: 'Local payment gateway integration for UPI, Cards, and Net Banking in India.',
            icon: CreditCard,
            connected: false,
            status: 'Offline'
        }
    ]);

    return (
        <div className="page-container integrations-page">
            <header className="mb-8">
                <h1 className="heading-1">Integrations</h1>
                <p className="subtitle">Connect your favorite tools to automate your gym operations.</p>
            </header>

            <div className="integrations-grid">
                {integrations.map((item, index) => (
                    <IntegrationItem key={index} {...item} />
                ))}
            </div>

            <div className="glass-panel p-8 mt-12">
                <h3 className="heading-2 mb-4">Webhooks</h3>
                <p className="text-muted mb-6">
                    Receive real-time notifications about events in your system by configuring webhook URLs.
                </p>
                <div className="webhook-field">
                    <input
                        type="text"
                        className="input-field w-full"
                        value="https://api.gymsync.com/v1/webhook/events"
                        readOnly
                    />
                    <button className="btn btn-secondary">Copy URL</button>
                </div>
            </div>
        </div>
    );
};

export default Integrations;
