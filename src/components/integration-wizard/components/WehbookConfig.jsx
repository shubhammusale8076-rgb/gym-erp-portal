import React, { useState } from 'react';
import { Copy, Info, Check, Shield } from 'lucide-react';

function WehbookConfig() {
    const [copied, setCopied] = useState(false);
    const webhookUrl = "https://api.aura-premium.com/v1/webhooks/sc_8291_c...";

    const handleCopy = () => {
        navigator.clipboard.writeText(webhookUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const [active , setActive]= useState(false)

    return (
        <div className="webhook-config-container">
            <div className="webhook-left-panel">
                <h2 className="guide-title">Webhook Configuration</h2>
                <p className="guide-description">
                    Connect your external systems with real-time data streams. Follow these steps to complete your elite management integration.
                </p>

                <div className="info-box">
                    <div className="info-icon">
                        <Info size={18} />
                    </div>
                    <div className="info-content">
                        <h4>What are Webhooks?</h4>
                        <p>Webhooks allow Aura Premium to push real-time updates to your server whenever a specific event occurs in your gym management portal, ensuring perfect data synchronization without polling.</p>
                    </div>
                </div>

                <div className="guide-steps">
                    <div className="guide-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Copy Endpoint URL</h3>
                            <p>Generate and copy the secure unique endpoint provided in the configuration panel.</p>
                        </div>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Configure Destination</h3>
                            <p>Paste this URL into your target application's webhook settings page.</p>
                        </div>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Select Event Triggers</h3>
                            <p>Choose which member activities should trigger a data transmission to your server.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="webhook-right-panel">
                <div className="webhook-main-card">
                    <div className="webhook-section">
                        <div className="webhook-card-header">
                            <h4>GENERATED WEBHOOK URL</h4>
                        </div>
                        <div className="webhook-url-box">
                            <span className="url-text">{webhookUrl}</span>
                            <button className="copy-btn" onClick={handleCopy}>
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                <span>{copied ? 'COPIED' : 'COPY'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="webhook-section">
                        <div className="webhook-card-header split-header">
                            <h4>SELECT EVENT TRIGGERS</h4>
                            <button className="text-btn">Select All</button>
                        </div>

                        <div className="triggers-grid">
                            <label className="trigger-item">
                                <input type="checkbox" defaultChecked />
                                <div className="trigger-item-content">
                                    <span className="trigger-title">Member Check-in</span>
                                    <span className="trigger-desc">Triggers when a member scans their digital pass at entry.</span>
                                </div>
                            </label>
                            <label className="trigger-item">
                                <input type="checkbox" defaultChecked />
                                <div className="trigger-item-content">
                                    <span className="trigger-title">New Subscription</span>
                                    <span className="trigger-desc">Triggers when a payment is processed for new tiers.</span>
                                </div>
                            </label>
                            <label className="trigger-item">
                                <input type="checkbox" />
                                <div className="trigger-item-content">
                                    <span className="trigger-title">Class Cancellation</span>
                                    <span className="trigger-desc">Triggers if a member unenrolls from a scheduled class.</span>
                                </div>
                            </label>
                            <label className="trigger-item">
                                <input type="checkbox" />
                                <div className="trigger-item-content">
                                    <span className="trigger-title">Profile Update</span>
                                    <span className="trigger-desc">Triggers on changes to contact or health data.</span>
                                </div>
                            </label>
                            <label className="trigger-item">
                                <input type="checkbox" />
                                <div className="trigger-item-content">
                                    <span className="trigger-title">Payment Failure</span>
                                    <span className="trigger-desc">Immediate alert for declined or expired billing.</span>
                                </div>
                            </label>
                            <label className="trigger-item">
                                <input type="checkbox" defaultChecked />
                                <div className="trigger-item-content">
                                    <span className="trigger-title">Locker Assignment</span>
                                    <span className="trigger-desc">Triggers when a digital locker is allocated to a user.</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="webhook-card secret-card">
                    <div className="secret-content">
                        <Shield size={20} className="secret-icon" />
                        <div className="secret-text">
                            <h4>Signing Secret</h4>
                            <p>Enable cryptographic signing for added security.</p>
                        </div>
                    </div>
                    <div className="testi-visibility-toggle large">
                        <button
                            className={`testi-toggle-btn ${active ? 'active' : ''}`}
                            onClick={()=>setActive(!active)}
                        >
                            <div className="testi-toggle-slider"></div>
                        </button>
 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WehbookConfig;