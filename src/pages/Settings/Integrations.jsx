import React from 'react';
import {
    MessageSquare,
    CreditCard,
    AtSign,
    Landmark,
    ExternalLink,
    ToggleLeft,
    ToggleRight,
    Link2
} from 'lucide-react';
import './Integrations.css';

const IntegrationItem = ({ title, description, badge, active, actionText, icon: Icon, iconColor, iconBg, cardStyle }) => (
    <div className={`integ-card ${cardStyle}`}>
        <div className="integ-header">
            <div className="integ-icon-box" style={{ background: iconBg, color: iconColor }}>
                <Icon size={24} strokeWidth={2.5} />
            </div>
            <div className={`integ-badge ${active ? 'badge-connected' : 'badge-disconnected'}`}>
                {badge}
            </div>
        </div>
        
        <div className="integ-body">
            <h3 className="integ-title">{title}</h3>
            <p className="integ-desc">{description}</p>
        </div>
        
        <div className="integ-footer">
            <div className="integ-status-block">
                {active ? (
                    <ToggleRight className="integ-toggle active" size={32} />
                ) : (
                    <ToggleLeft className="integ-toggle inactive" size={32} />
                )}
                <span className="integ-status-text">
                    {active ? 'ACTIVE' : 'INACTIVE'}
                </span>
            </div>
            <button className={`integ-action-btn ${active ? 'active' : ''}`}>
                {actionText} {active ? <ExternalLink size={14} /> : <Link2 size={16} />}
            </button>
        </div>
    </div>
);

const Integrations = () => {
    const integrationsList = [
        {
            title: 'WhatsApp Business',
            description: 'Automate member updates, renewal reminders, and personalized workout plans directly through the world\'s most popular messaging app.',
            icon: MessageSquare,
            iconColor: '#168a3b',
            iconBg: '#e2f4e8',
            badge: 'CONNECTED',
            active: true,
            actionText: 'Configure',
            cardStyle: 'integ-card-white'
        },
        {
            title: 'Stripe Payments',
            description: 'Secure, high-end payment processing for memberships, personal training, and retail. Handle recurring billing with editorial grace.',
            icon: CreditCard,
            iconColor: '#345dc7',
            iconBg: '#e9eefb',
            badge: 'CONNECTED',
            active: true,
            actionText: 'Configure',
            cardStyle: 'integ-card-white'
        },
        {
            title: 'SendGrid',
            description: 'Design and deploy high-conversion email newsletters and automated lifecycle campaigns for your member base.',
            icon: AtSign,
            iconColor: '#4f4f5f',
            iconBg: '#e5e2e8',
            badge: 'DISCONNECTED',
            active: false,
            actionText: 'Connect',
            cardStyle: 'integ-card-tinted'
        },
        {
            title: 'Razorpay',
            description: 'A powerful payments solution for scaling your presence in the Indian market. Full support for UPI and local banking.',
            icon: Landmark,
            iconColor: '#4f4f5f',
            iconBg: '#e5e2e8',
            badge: 'DISCONNECTED',
            active: false,
            actionText: 'Connect',
            cardStyle: 'integ-card-tinted'
        }
    ];

    return (
        <div className="page-container integrations-page">
            <div className="integ-main-grid">
                
                {integrationsList.map((item, index) => (
                    <IntegrationItem key={index} {...item} />
                ))}

                <div className="integ-promo-card">
                    <div className="promo-overlay"></div>
                    <div className="promo-card-content">
                        <span className="promo-badge">ELITE PARTNERSHIP</span>
                        <h2 className="promo-title">Elevate Your<br/>Operational IQ</h2>
                        <p className="promo-desc">
                            Our API-first approach ensures that your gym stays ahead of the curve with bespoke tool integrations.
                        </p>
                        <button className="btn-primary">Request Custom Integration</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Integrations;
