import React, { useState } from 'react';
import {
    MessageSquare,
    CreditCard,
    AtSign,
    Landmark,

} from 'lucide-react';
import './Integrations.css';
import IntegrationItem from './IntegrationItem';


const Integrations = () => {
    const [integrationsList, setIntegrationsList] = useState([
        {
            title: 'WhatsApp Business',
            description: 'Automate member updates, renewal reminders, and personalized workout plans directly through the world\'s most popular messaging app.',
            icon: MessageSquare,
            iconColor: '#168a3b',
            iconBg: '#e2f4e8',
            badge: 'CONNECTED',
            active: true,
            actionText: 'Configure',
            cardStyle: 'integ-card-white',
            provider:"WHATSAPP"
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
            cardStyle: 'integ-card-white',
            provider:"STRIPE"
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
            cardStyle: 'integ-card-tinted',
            provider:"SENDGRID"
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
            cardStyle: 'integ-card-tinted',
            provider:"RAZORPAY"
        }
    ]);

    const handleToggle = (index) => {
        const newList = [...integrationsList];
        newList[index].active = !newList[index].active;
        newList[index].badge = newList[index].active ? 'CONNECTED' : 'DISCONNECTED';
        newList[index].actionText = newList[index].active ? 'Configure' : 'Connect';
        setIntegrationsList(newList);
    };

    return (
        <div className="page-container integrations-page">
            <div className="integ-main-grid">
                
                {integrationsList.map((item, index) => (
                    <IntegrationItem key={index} {...item} onToggle={() => handleToggle(index)} />
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
