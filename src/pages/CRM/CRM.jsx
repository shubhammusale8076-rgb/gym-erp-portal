import React, { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  MapPin, 
  Clock, 
  MoreVertical, 
  Plus, 
  Filter, 
  Search,
  Instagram,
  Globe,
  UserCheck
} from 'lucide-react';
import './CRM.css';

// --- Types & Mock Data ---

const STAGES = {
  NEW_LEAD: 'newLead',
  TRIAL_SCHEDULED: 'trialScheduled',
  FOLLOW_UP: 'followUp',
  CONVERTED: 'converted'
};

const STAGE_CONFIG = {
  [STAGES.NEW_LEAD]: { title: 'New Lead', color: 'bg-blue-500', icon: UserCheck },
  [STAGES.TRIAL_SCHEDULED]: { title: 'Trial Scheduled', color: 'bg-purple-500', icon: Calendar },
  [STAGES.FOLLOW_UP]: { title: 'Follow-up', color: 'bg-orange-500', icon: Clock },
  [STAGES.CONVERTED]: { title: 'Converted to Member', color: 'bg-green-500', icon: UserCheck },
};

const INITIAL_LEADS = [
  {
    id: 'l1',
    name: 'Sarah Jenkins',
    phone: '+1 (555) 123-4567',
    source: 'Instagram',
    trialDate: null,
    stage: STAGES.NEW_LEAD,
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    lastContact: '2 hours ago'
  },
  {
    id: 'l2',
    name: 'Michael Chen',
    phone: '+1 (555) 987-6543',
    source: 'Walk-in',
    trialDate: '2026-03-08T10:00:00',
    stage: STAGES.TRIAL_SCHEDULED,
    avatar: 'https://i.pravatar.cc/150?u=michael',
    lastContact: '1 day ago'
  },
  {
    id: 'l3',
    name: 'Emma Watson',
    phone: '+1 (555) 246-8135',
    source: 'Google',
    trialDate: '2026-03-05T18:30:00',
    stage: STAGES.FOLLOW_UP,
    avatar: 'https://i.pravatar.cc/150?u=emma',
    lastContact: 'Tracking feedback'
  },
  {
    id: 'l4',
    name: 'James Rodriguez',
    phone: '+1 (555) 369-1478',
    source: 'Referral',
    trialDate: '2026-03-01T09:00:00',
    stage: STAGES.CONVERTED,
    avatar: 'https://i.pravatar.cc/150?u=james',
    lastContact: 'Signed up on Mar 1'
  },
  {
    id: 'l5',
    name: 'Olivia Martinez',
    phone: '+1 (555) 753-1594',
    source: 'Instagram',
    trialDate: null,
    stage: STAGES.NEW_LEAD,
    avatar: 'https://i.pravatar.cc/150?u=olivia',
    lastContact: 'Just now'
  }
];

// --- Helper Components ---

const SourceIcon = ({ source }) => {
  const iconStyle = { width: '14px', height: '14px' };
  switch (source.toLowerCase()) {
    case 'instagram': return <Instagram style={{ ...iconStyle, color: '#ec4899' }} />;
    case 'google': return <Globe style={{ ...iconStyle, color: '#3b82f6' }} />;
    case 'walk-in': return <MapPin style={{ ...iconStyle, color: '#f97316' }} />;
    default: return <UserCheck style={{ ...iconStyle, color: '#6b7280' }} />;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
};

// --- Main Component ---

const CRM = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering leads
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
    e.currentTarget.classList.add('is-dragging');
  };

  const handleDragEnd = (e) => {
     e.currentTarget.classList.remove('is-dragging');
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    if (leadId) {
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.id === leadId ? { ...lead, stage: newStage } : lead
        )
      );
    }
  };

  return (
    <div className="crm-page">
      
      {/* Header Area */}
      <div className="crm-header">
        <div>
          <h1 className="crm-title">Lead Management</h1>
          <p className="crm-subtitle">Track and convert prospects into loyal members.</p>
        </div>
        
        <div className="crm-actions">
          {/* Search Bar */}
          <div className="search-container">
            <span className="search-icon-wrapper">
              <Search size={16} />
            </span>
             <input 
               type="text" 
               placeholder="Search leads..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="search-input"
             />
          </div>
          <button className="btn-icon">
            <Filter size={20} />
          </button>
          <button className="btn-add">
            <Plus size={16} /> Add Lead
          </button>
        </div>
      </div>

      {/* Kanban Board Layout */}
      <div className="kanban-board">
        {Object.values(STAGES).map((stageKey) => {
          const config = STAGE_CONFIG[stageKey];
          const stageLeads = filteredLeads.filter(lead => lead.stage === stageKey);

          return (
            <div 
              key={stageKey}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stageKey)}
            >
              {/* Column Header */}
              <div className="column-header">
                <div className="column-title-wrapper">
                  <div className={`stage-dot ${config.color}`}></div>
                  <h3 className="column-title">{config.title}</h3>
                  <span className="lead-count">
                    {stageLeads.length}
                  </span>
                </div>
                <button className="more-options-btn">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Cards Container */}
              <div className="cards-container">
                {stageLeads.map((lead) => (
                  <div 
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onDragEnd={handleDragEnd}
                    className="lead-card"
                  >
                    {/* Follow-up reminder banner if it's the follow-up stage */}
                    {stageKey === STAGES.FOLLOW_UP && (
                        <div className="followup-badge">
                            <Clock size={12} /> Due Soon
                        </div>
                    )}

                    <div className="card-header">
                      <div className="user-info">
                        <img src={lead.avatar} alt={lead.name} className="user-avatar" />
                        <div className="user-details">
                          <h4>{lead.name}</h4>
                          <p>{lead.lastContact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="info-row">
                        <Phone size={14} />
                        <span>{lead.phone}</span>
                      </div>
                      
                      {lead.trialDate && (
                        <div className="info-row">
                          <div className="trial-date-container">
                            <Calendar size={14} />
                            <span className="trial-date-text">{formatDate(lead.trialDate)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="card-footer">
                      <div className="source-badge">
                        <SourceIcon source={lead.source} />
                        <span className="source-text">{lead.source}</span>
                      </div>
                      
                      <div className="drag-indicator">
                        <MoreVertical size={16} />
                      </div>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="empty-state">
                    <p className="empty-state-text">Drop leads here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CRM;
