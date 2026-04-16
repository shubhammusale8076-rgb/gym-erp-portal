import React from "react";
import { ExternalLink, Info, Search } from "lucide-react";

const StepGuide = ({ provider }) => {
    const providerName = provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : 'Provider';

    return (
        <div className="step-guide-container">
            <div className="step-guide-left">
                <h1 className="guide-title">
                    Get your <span>{providerName}</span> API Keys
                </h1>
                <p className="guide-description">
                    To sync your gym's revenue and member billing, we need to securely connect to your {providerName} account. Follow these steps to find your credentials.
                </p>

                <div className="guide-steps">
                    <div className="guide-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Login to {providerName}</h3>
                            <p>Access your dashboard at {provider}.com with your administrator credentials.</p>
                        </div>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Go to Developers</h3>
                            <p>Locate the "Developers" link in the top right navigation menu of your dashboard.</p>
                        </div>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>API Keys</h3>
                            <p>Click on "API Keys" in the left sidebar under the Developers section.</p>
                        </div>
                    </div>
                    <div className="guide-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Copy Secret Key</h3>
                            <p>Reveal your 'Secret key' and copy the string starting with <code>sk_live_...</code></p>
                        </div>
                    </div>
                </div>

                <a
                    href={`https://dashboard.${provider || 'stripe'}.com`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary open-dashboard-btn"
                >
                    Open {providerName} Dashboard <ExternalLink size={16} />
                </a>

                <div className="security-note">
                    <Info size={18} className="security-icon" />
                    <p>
                        <strong>Security Note:</strong> We never store your Secret Key in plain text. All credentials are encrypted using industry-standard AES-256 protocols.
                    </p>
                </div>
            </div>

            <div className="step-guide-right">
                <div className="visual-guide-wrapper">
                    <div className="mock-browser">
                        <div className="mock-browser-header">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <div className="mock-address-bar"></div>
                        </div>
                        <div className="mock-browser-body">
                            <div className="mock-sidebar">
                                <div className="mock-line"></div>
                                <div className="mock-line"></div>
                                <div className="mock-line active"></div>
                                <div className="mock-line"></div>
                            </div>
                            <div className="mock-content">
                                <div className="mock-btn-dev">
                                    <Search size={14} /> Click Developers
                                </div>
                            </div>
                        </div>
                        
                        <div className="visual-guide-overlay">
                            <div className="search-icon-wrapper">
                                <Search size={24} />
                            </div>
                            <h4>Visual Guide</h4>
                            <p>Find the API keys under the developers tab to continue the setup.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepGuide;