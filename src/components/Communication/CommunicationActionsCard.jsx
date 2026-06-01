import React from 'react';
import { MessageCircle } from 'lucide-react';
import './Communication.css';

const CommunicationActionsCard = ({
  title = "Communication Quick Actions",
  description = "Send manual updates and reminders to members directly.",
  icon: HeaderIcon = MessageCircle,
  children
}) => {
  return (
    <div className="communication-card card">
      <div className="comm-card-header">
        <div className="comm-header-icon-wrapper">
          <HeaderIcon size={20} className="comm-header-icon" />
        </div>
        <div className="comm-header-text">
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>
      
      <div className="comm-card-body">
        <div className="comm-actions-grid">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommunicationActionsCard;
