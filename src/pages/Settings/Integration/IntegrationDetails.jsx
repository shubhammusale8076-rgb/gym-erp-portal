import { getToken, getUserId, getRole } from '../../../utils/auth';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Settings2, RefreshCw, Eye, Copy, Activity, RefreshCwIcon, CheckCircle, AlertTriangle, Zap, LogOut, FileText, Link2, EyeOff, RefreshCcw } from 'lucide-react';
import './IntegrationDetails.css';
import { getIntegrationByService } from '../../../apiservice/apiservice';
import IntegrationTestModal from './IntegrationTestModal';
import ReconnectIntegrationModal from './ReconnectIntegrationModal';
import { disconnectIntegrationApi } from '../../../apiservice/integrationService';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../redux/toastSlice';

const IntegrationDetails = () => {
    const { provider } = useParams();
    const navigate = useNavigate();
    const [integration, setIntegration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [revealedSecrets, setRevealedSecrets] = useState({});
    const [testModalOpen, setTestModalOpen] = useState(false);
    const [reconnectModalOpen, setReconnectModalOpen] = useState(false);
    const dispatch = useDispatch();


    async function fetchIntegration() {
        try {
            setLoading(true);
            const response = await getIntegrationByService(provider.toUpperCase());
            setIntegration(response);
        } catch (error) {
            console.error('Error:', error.response || error.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchIntegration();
    }, [provider]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const isSensitiveField = (key) => {
        const sensitiveKeys = ['accessToken', 'apiSecret', 'webhookSecret', 'secretKey', 'webhookVerifyToken'];
        return sensitiveKeys.some(k => key.toLowerCase().includes(k.toLowerCase()));
    };

    const maskSecret = (value, key) => {
        if (!value) return '';
        if (isSensitiveField(key) && !revealedSecrets[key]) {
            return '••••••••••••••••••••••••';
        }
        return value;
    };

    const formatStatus = (status) => {
        if (!status) return 'UNKNOWN';
        return status.toUpperCase().replace('_', ' ');
    };

    const toggleSecretReveal = (key) => {
        setRevealedSecrets(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const disconnectIntegration = async () => {
        try {
            setLoading(true);
            const response = await disconnectIntegrationApi(integration.service.toUpperCase());
            dispatch(showToast({ message: response?.message, type: "success" }));
            fetchIntegration()

        } catch (error) {
            console.error('Error:', error.response || error.message);
            dispatch(showToast({ message: error.response?.message, type: "error" }));

        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="integration-details-page">
                <div className="details-loading">Loading integration...</div>
            </div>
        );
    }

    if (!integration) {
        return (
            <div className="integration-details-page">
                <div className="details-loading">Integration not found</div>
            </div>
        );
    }

    const webhookUrl = integration?.metadata?.webhookUrl || `https://api.yourdomain.com/webhooks/${integration.service?.toLowerCase()}`;
    const statusClass = integration.status === 'CONNECTED' ? 'success'
        : integration.status === 'FAILED' ? 'error'
            : integration.status === 'PENDING' ? 'warning'
                : 'neutral';

    return (
        <div className="integration-details-page">
            <button className="back-link" onClick={() => navigate('/settings/integrations')}>
                <ArrowLeft size={16} /> BACK TO INTEGRATIONS
            </button>

            {/* HEADER OVERVIEW */}
            <div className="details-header">
                <div className="header-left">
                    <div className="provider-icon-large" style={{ background: integration.iconBg || '#f3f4f6' }}>
                        <img
                            src={integration.icon}
                            alt={integration.displayName}
                            className="provider-logo-img"
                        />
                    </div>
                    <div className="header-titles">
                        <div className="title-row">
                            <h1>{integration.displayName}</h1>
                            <span className={`live-badge ${statusClass}`}>
                                <div className="dot"></div>
                                {formatStatus(integration.status || (integration.connected ? 'CONNECTED' : 'DISCONNECTED'))}
                            </span>
                        </div>
                        <p>{integration.description}</p>
                    </div>
                </div>
                <div className="header-actions">
                    {integration.connected ? (
                        <>
                            <button className="btn-secondary btn-integ" onClick={() => navigate('/events')}>
                                <FileText size={16} style={{ marginRight: '0.5rem', verticalAlign: 'text-top' }} /> Logs
                            </button>
                            <button className="btn-secondary btn-integ btn-danger" onClick={() => disconnectIntegration()}>
                                <LogOut size={16} style={{ marginRight: '0.5rem', verticalAlign: 'text-top' }} /> Disconnect
                            </button>
                            <button className="btn-primary btn-integ" onClick={() => setTestModalOpen(true)}>
                                <Activity size={16} style={{ marginRight: '0.5rem', verticalAlign: 'text-top' }} /> Test Connection
                            </button>
                        </>
                    ) : (
                        <button className="btn-primary btn-integ" onClick={() => setReconnectModalOpen(true)}>
                            <RefreshCcw size={16} style={{ marginRight: '0.5rem', verticalAlign: 'text-top' }} /> Reconnect Integration
                        </button>
                    )}
                </div>
            </div>

            <div className="details-grid">
                <div className="details-col details-left">
                    <div className="details-card card">
                        <div className="card-header">
                            <Info size={18} className="header-icon" />
                            <h3>Connection Details</h3>
                        </div>
                        <div className="status-banner">
                            <span className="tiny-label">INTEGRATION STATUS</span>
                            <p>{integration.connected ? 'Integration is connected and operational.' : 'Integration is currently inactive.'}</p>
                        </div>

                        <div className="stats-list">
                            <div className="stat-row">
                                <span className="stat-label">Mode</span>
                                <span className="stat-value">{formatStatus(integration.mode || 'N/A')}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Active State</span>
                                <span className="stat-value">{integration.active ? 'Active' : 'Inactive'}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Auth Method</span>
                                <span className="stat-value">{integration.authType || 'N/A'}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Connected At</span>
                                <span className="stat-value">{formatDate(integration.connectedAt)}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">Last Updated</span>
                                <span className="stat-value">{formatDate(integration.updatedAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* SUPPORTED EVENTS */}
                    {integration.supportedEvents?.length > 0 && (
                        <div className="details-card card">
                            <div className="card-header">
                                <Zap size={18} className="header-icon" />
                                <h3>Supported Events</h3>
                            </div>
                            <div className="events-chip-container">
                                {integration.supportedEvents.map((event, index) => (
                                    <div className="event-chip" key={index}>
                                        <CheckCircle size={14} className="chip-icon" />
                                        {event}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="details-col details-right">

                    {/* DYNAMIC METADATA CONFIGURATION */}
                    {integration.metadata && Object.keys(integration.metadata).length > 0 && (
                        <div className="details-card card">
                            <div className="card-header">
                                <Settings2 size={18} className="header-icon" />
                                <h3>Provider Configuration</h3>
                            </div>
                            <div className="config-keys-row">
                                {Object.entries(integration.metadata).map(([key, value]) => {
                                    const isArray = Array.isArray(value);
                                    const isSensitive = isSensitiveField(key);

                                    return (
                                        <div className="input-group" key={key}>
                                            <label>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                                            <div className="input-box-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                {isArray ? (
                                                    <div className="metadata-array-chips" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', minHeight: '42px', width: '100%', border: '1px solid #e2e8f0' }}>
                                                        {value.map((item, idx) => (
                                                            <span key={idx} className="metadata-chip" style={{ background: '#e2e8f0', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#475569' }}>{item}</span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <input
                                                        type={isSensitive && !revealedSecrets[key] ? "password" : "text"}
                                                        className="input-box"
                                                        value={maskSecret(value, key)}
                                                        readOnly
                                                        style={{ paddingRight: isSensitive ? '2.5rem' : '1rem', width: '100%' }}
                                                    />
                                                )}
                                                {isSensitive && !isArray && (
                                                    <button
                                                        className="reveal-btn"
                                                        onClick={() => toggleSecretReveal(key)}
                                                        style={{ position: 'absolute', right: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    >
                                                        {revealedSecrets[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* WEBHOOKS */}
                    {!integration?.metadata?.webhookUrl && (
                        <div className="details-card card">
                            <div className="card-header space-between">
                                <div className="header-title-group">
                                    <Activity size={18} className="header-icon" />
                                    <h3>Webhook Settings</h3>
                                </div>
                                <span className={`status-pill ${integration?.metadata?.webhookUrl ? 'active' : 'warning'}`}>
                                    <div className="dot"></div>
                                    {integration?.metadata?.webhookUrl ? 'ACTIVE LISTENER' : 'NOT CONFIGURED'}
                                </span>
                            </div>

                            {integration?.metadata?.webhookUrl ? (
                                <div className="warning-banner" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#fffbeb', color: '#b45309', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #fef3c7' }}>
                                    <AlertTriangle size={18} style={{ marginTop: '2px' }} />
                                    <div>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600' }}>Webhook Not Configured Yet</h4>
                                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Webhook URL is missing. Please configure it in your provider dashboard.</p>
                                    </div>
                                </div>
                            ) : null}

                            <div className="input-group mt-4">
                                <label>WEBHOOK URL</label>
                                <div className="input-box with-copy">
                                    <span>{webhookUrl}</span>
                                    <button
                                        className="copy-btn"
                                        onClick={() => navigator.clipboard.writeText(webhookUrl)}
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <p className="input-help">Configure this endpoint in your provider's developer console to receive event updates.</p>
                            </div>

                            <div className="test-environment-box" style={{ marginTop: '24px' }}>
                                <div className="test-info">
                                    <h4>Developer Tools</h4>
                                    <p>Configure and trigger test events to validate integration pipelines.</p>
                                </div>
                                <button className="btn-test"><Settings2 size={14} style={{ marginRight: '0.25rem', verticalAlign: 'text-top' }} /> Configure Webhook</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <IntegrationTestModal
                open={testModalOpen}
                onClose={() => setTestModalOpen(false)}
                provider={integration.service.toLowerCase()}
                integration={integration}
            />

            <ReconnectIntegrationModal
                isOpen={reconnectModalOpen}
                onClose={() => setReconnectModalOpen(false)}
                integration={integration}
                onSuccess={fetchIntegration}
            />
        </div>
    );
};

export default IntegrationDetails;
