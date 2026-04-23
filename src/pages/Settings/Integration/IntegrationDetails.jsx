import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Info, Settings2, RefreshCw, Eye, Copy, Activity } from 'lucide-react';
import './IntegrationDetails.css';

const IntegrationDetails = () => {
    const { provider } = useParams();
    const navigate = useNavigate();

    // Just mocking a capitalised provider string
    const providerName = provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : 'Integration';

    return (
        <div className="integration-details-page">
            <button className="back-link" onClick={() => navigate('/settings/integrations')}>
                <ArrowLeft size={16} /> BACK TO INTEGRATIONS
            </button>

            <div className="details-header">
                <div className="header-left">
                    <div className="provider-icon-large">
                        <div className="mock-icon-inner"></div>
                    </div>
                    <div className="header-titles">
                        <div className="title-row">
                            <h1>{providerName}</h1>
                            <span className="live-badge"> <div className="dot"></div> LIVE CONNECTION</span>
                        </div>
                        <p>Unified payments infrastructure for scaling businesses. Synchronize your gym memberships and billing cycles seamlessly.</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary btn-integ" onClick={() => navigate('/events')}>
                        <Eye size={16} style={{marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'text-top'}}/> View Events
                    </button>
                    <button className="btn-secondary btn-integ">Deactivate</button>
                    <button className="btn-primary btn-integ">Save Changes</button>
                </div>
            </div>

            <div className="details-grid">

                {/* LEFT COLUMN */}
                <div className="details-col details-left">
                    {/* Overview Card */}
                    <div className="details-card card">
                        <div className="card-header">
                            <Info size={18} className="header-icon" />
                            <h3>Overview</h3>
                        </div>
                        <div className="status-banner">
                            <span className="tiny-label">INTEGRATION STATUS</span>
                            <p>Successfully connected since Oct 24, 2023. All systems operational.</p>
                        </div>

                        <div className="stats-list">
                            <div className="stat-row">
                                <span className="stat-label">Last Sync</span>
                                <span className="stat-value">2 mins ago</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Uptime</span>
                                <span className="stat-value success-text">99.9%</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Auth Method</span>
                                <span className="stat-value">OAuth 2.0 / API Keys</span>
                            </div>
                        </div>
                    </div>

                    {/* Events Mapping Card */}
                    <div className="details-card card">
                        <div className="card-header">
                            <RefreshCw size={18} className="header-icon" />
                            <h3>Events Mapping</h3>
                        </div>

                        <div className="mapping-list">
                            <div className="mapping-item">
                                <div className="mapping-info">
                                    <h4>Payment Success</h4>
                                    <p>Trigger membership activation</p>
                                </div>
                                <div className="toggle-switch active">
                                    <div className="slider"></div>
                                </div>
                            </div>

                            <div className="mapping-item">
                                <div className="mapping-info">
                                    <h4>Payment Failed</h4>
                                    <p>Notify administrator immediately</p>
                                </div>
                                <div className="toggle-switch active">
                                    <div className="slider"></div>
                                </div>
                            </div>

                            <div className="mapping-item">
                                <div className="mapping-info">
                                    <h4 className="disabled-text">Lead Created</h4>
                                    <p>Sync with marketing CRM</p>
                                </div>
                                <div className="toggle-switch">
                                    <div className="slider"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="details-col details-right">

                    {/* Configuration Card */}
                    <div className="details-card card">
                        <div className="card-header">
                            <Settings2 size={18} className="header-icon" />
                            <h3>Configuration</h3>
                        </div>

                        <div className="config-keys-row">
                            <div className="input-group">
                                <label>API KEY</label>
                                <input className="input-box" value="rzp_live_G9y4Uj92Lmn9z" />
                            </div>
                            <div className="input-group">
                                <label>SECRET KEY</label>
                                <input type="password" className="input-box with-icon" value="********************" />
                            </div>
                        </div>

                        <div className="input-group mt-4">
                            <label>WEBHOOK URL (AUTO-GENERATED)</label>
                            <div className="input-box with-copy">
                                <span>https://api.aurapremium.io/v1/webhooks/{providerName.toLowerCase()}/78x2-99kz</span>
                                <button className="copy-btn"><Copy size={16} /></button>
                            </div>
                            <p className="input-help">Copy this URL and paste it into your {providerName} Dashboard under Webhook settings.</p>
                        </div>
                    </div>

                    {/* Webhooks Testing Card */}
                    <div className="details-card card">
                        <div className="card-header space-between">
                            <div className="header-title-group">
                                <Activity size={18} className="header-icon" />
                                <h3>Webhooks Testing</h3>
                            </div>
                            <span className="status-pill"><div className="dot"></div> ACTIVE LISTENER</span>
                        </div>

                        <div className="test-environment-box">
                            <div className="test-info">
                                <h4>Developer Test Environment</h4>
                                <p>Trigger a mock payment success payload to verify your integration logic and automated workflows.</p>
                            </div>
                            <button className="btn-test">
                                <RefreshCw size={14} /> Test Webhook
                            </button>
                        </div>

                        <div className="payload-delivery-section">
                            <label className="section-label">RECENT PAYLOAD DELIVERY</label>
                            <div className="code-console">
                                <div className="console-header">
                                    <span className="status-code">200 OK</span>
                                    <span className="request-path">POST /v1/webhooks/{providerName.toLowerCase()}</span>
                                    <span className="timestamp">12:44:02 PM</span>
                                </div>
                                <pre className="code-block">
                                {`
                                    {
                                        "event": "payment.captured",
                                        "payload": {
                                            "payment": {
                                            "entity": {
                                                "id": "pay_KkS0PRjN7Yv6",
                                                "amount": 4900,
                                                "currency": "INR",
                                                "status": "captured"
                                                }
                                            }
                                        }
                                    }`
                                }
                                </pre>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default IntegrationDetails;
