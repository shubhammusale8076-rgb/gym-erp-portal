import { getToken, getUserId, getRole } from '../../../utils/auth';
import React from 'react';

import {
    ExternalLink,
    Link2,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { getGoogleConnectUrl } from '../../../apiservice/apiservice';

function IntegrationItem({ integration }) {

    const navigate = useNavigate();
    const token = getToken();

    const {
        service,
        displayName,
        description,
        icon,
        iconColor,
        iconBg,
        authType,
        connected,
        enabled,
        status
    } = integration;

    const handleClick = async () => {

        // ====================================
        // NOT CONNECTED
        // ====================================
        if (!connected) {

            // OAUTH FLOW
            if (authType === "OAUTH") {

                try {

                    const response = await getGoogleConnectUrl(token);

                    window.open(
                        response.authUrl,
                        "_blank",
                        "noopener,noreferrer"
                    );

                } catch (err) {

                    console.error(
                        "OAuth connection failed",
                        err
                    );
                }

                return;
            }

            // API KEY FLOW
            navigate(
                `/integrations/${service.toLowerCase()}`
            );

            return;
        }

        // ====================================
        // CONNECTED FLOW
        // ====================================
        navigate(
            `/settings/integrations/${service.toLowerCase()}/details`
        );
    };

    return (

        <div className="integ-card integ-card-white">

            {/* HEADER */}
            <div className="integ-header">
                <div className="integ-icon-box" style={{ background: iconBg, color: iconColor }}>
                    <img src={icon} alt={displayName} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                </div>

                <div className={`integ-badge ${connected ? 'badge-connected' : 'badge-disconnected'}`}>
                    {connected ? 'CONNECTED' : 'DISCONNECTED'}
                </div>
            </div>

            {/* BODY */}
            <div className="integ-body">
                <h3 className="integ-title">{displayName} </h3>
                <p className="integ-desc">{description}</p>
            </div>

            {/* FOOTER */}
            <div className="integ-footer">

                <div className="integ-status-block">

                    {enabled ? (
                        <ToggleRight className="integ-toggle active" size={32} />

                    ) : (
                        <ToggleLeft className="integ-toggle inactive" size={32} />
                    )}

                    <span className="integ-status-text"> {enabled ? 'ACTIVE' : 'INACTIVE'} </span>
                </div>

                <button onClick={handleClick} className={`integ-action-btn ${connected ? 'active' : ''}`}>
                    {connected ? 'Manage' : 'Connect'}
                    {connected ? <ExternalLink size={14} /> : <Link2 size={16} />}
                </button>
            </div>


        </div>
    );
}

export default IntegrationItem;