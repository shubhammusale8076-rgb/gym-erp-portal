import { ExternalLink, Link2, ToggleLeft, ToggleRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function IntegrationItem({ title, description, badge, active, actionText, icon: Icon, iconColor, iconBg, cardStyle, onToggle, provider }) {

    const navigate = useNavigate();

    const handleClick = () => {
        if (active) {
            navigate(`/settings/integrations/${provider.toLowerCase()}/details`);
        } else {
            navigate(`/integrations/${provider.toLowerCase()}`);
        }
    };
  return (
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
            <div className="integ-status-block" onClick={onToggle} style={{cursor: 'pointer'}}>
                {active ? (
                    <ToggleRight className="integ-toggle active" size={32} />
                ) : (
                    <ToggleLeft className="integ-toggle inactive" size={32} />
                )}
                <span className="integ-status-text">
                    {active ? 'ACTIVE' : 'INACTIVE'}
                </span>
            </div>
            <button onClick={handleClick} className={`integ-action-btn ${active ? 'active' : ''}`}>
                {actionText} {active ? <ExternalLink size={14} /> : <Link2 size={16} />}
            </button>
        </div>
    </div>
  )
}

export default IntegrationItem