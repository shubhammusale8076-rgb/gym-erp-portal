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
  UserCheck,
  LayoutGrid,
  List,
  ChevronDown,
  Trash2,
  Mail,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  X,
  Edit2
} from 'lucide-react';
import './CRM.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import KpiCard from '../../components/KpiCard/KpiCard';
import Dropdown from '../../components/Dropdown/Dropdown';

// --- Types & Mock Data ---

const STAGES = {
  NEW_LEAD: 'newLead',
  TRIAL_SCHEDULED: 'trialScheduled',
  FOLLOW_UP: 'followUp',
  CONVERTED: 'converted'
};

const STAGE_CONFIG = {
  [STAGES.NEW_LEAD]: { title: 'New Lead', color: 'stage-purple', icon: UserCheck },
  [STAGES.TRIAL_SCHEDULED]: { title: 'Trial Scheduled', color: 'stage-blue', icon: Calendar },
  [STAGES.FOLLOW_UP]: { title: 'Follow-up', color: 'stage-orange', icon: Clock },
  [STAGES.CONVERTED]: { title: 'Converted', color: 'stage-green', icon: UserCheck },
};

const INITIAL_LEADS = [
  {
    id: 'l1',
    name: 'Julian Thorne',
    email: 'j.thorne@premium.com',
    phone: '+1 (555) 123-4567',
    source: 'Instagram',
    trialDate: null,
    stage: STAGES.NEW_LEAD,
    avatar: 'https://i.pravatar.cc/150?u=julian',
    lastContact: '2h ago',
    lastContactSubtext: 'OUTBOUND CALL'
  },
  {
    id: 'l2',
    name: 'Elena Rodriguez',
    email: 'elena.rod@webmail.com',
    phone: '+1 (555) 987-6543',
    source: 'Website',
    trialDate: '2026-03-08T10:00:00',
    stage: STAGES.FOLLOW_UP,
    avatar: 'https://i.pravatar.cc/150?u=elena',
    lastContact: '1d ago',
    lastContactSubtext: 'E-MAIL SENT'
  },
  {
    id: 'l3',
    name: 'Marcus Bennett',
    email: '+1 455-092-3312',
    phone: '+1 455-092-3312',
    source: 'Walk-in',
    trialDate: '2026-03-05T18:30:00',
    stage: STAGES.CONVERTED,
    avatar: 'https://i.pravatar.cc/150?text=MB',
    lastContact: '5h ago',
    lastContactSubtext: 'TOUR COMPLETED'
  },
  {
    id: 'l4',
    name: 'Sophia Chen',
    email: 's.chen@outlook.com',
    phone: '+1 (555) 369-1478',
    source: 'Direct Call',
    trialDate: '2026-03-01T09:00:00',
    stage: STAGES.NEW_LEAD,
    avatar: 'https://i.pravatar.cc/150?u=sophia',
    lastContact: 'Just now',
    lastContactSubtext: 'INBOUND CALL'
  }

];

// --- Helper Components ---

const SourceIcon = ({ source }) => {
  const iconStyle = { width: '14px', height: '14px' };
  switch (source.toLowerCase()) {
    case 'instagram': return <Instagram style={iconStyle} />;
    case 'website': return <Globe style={iconStyle} />;
    case 'walk-in': return <MapPin style={iconStyle} />;
    case 'direct call': return <Phone style={iconStyle} />;
    default: return <UserCheck style={iconStyle} />;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
};

// --- Main Component ---
const platform = ['Instagram', 'Website', 'Walk-in', 'Direct Call'];
const status = ['New Lead', 'Trial Scheduled', 'Follow Up', 'Converted'];

const CRM = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('kanban'); // 'list' or 'kanban'
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectedSidebarLead, setSelectedSidebarLead] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = (lead) => {
    setSelectedSidebarLead(lead);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedSidebarLead(null), 300);
  };

  const [filterPlatform, setFilterPlatform] = useState('Select Platform');
  const [filterStatus, setFilterStatus] = useState('Select Status');

  // Filtering leads
  const normalize = (str) =>
    str.toLowerCase().replace(/[\s_]+/g, '');

  const filteredLeads = leads.filter((lead) => {
    const searchLower = searchQuery.toLowerCase();

    const searchMatch =
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.source.toLowerCase().includes(searchLower);

    const platformMatch =
      filterPlatform === 'Select Platform' ||
      normalize(lead.source) === normalize(filterPlatform);

    const statusMatch =
      filterStatus === 'Select Status' ||
      normalize(lead.stage) === normalize(filterStatus);

    return searchMatch && platformMatch && statusMatch;
  });

  const handleBatchDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedLeads.length} leads?`)) {
      setLeads(leads.filter(l => !selectedLeads.includes(l.id)));
      setSelectedLeads([]);
    }
  };

  const handleBatchUpdateStatus = () => {
    const newStage = window.prompt("Enter new stage value (newLead, trialScheduled, followUp, converted):");
    if (newStage) {
      const validStage = STAGES[newStage.toUpperCase()] || newStage;
      setLeads(leads.map(l => selectedLeads.includes(l.id) ? { ...l, stage: validStage } : l));
      setSelectedLeads([]);
    }
  };

  const handleBatchMessage = () => {
    window.alert(`Message interface opened for ${selectedLeads.length} selected leads.`);
  };

  const handleAddLead = () => {
    const name = window.prompt("Enter new lead name:");
    if (name) {
      const newLead = {
        id: `l${Date.now()}`,
        name: name,
        email: `${name.split(' ')[0].toLowerCase()}@example.com`,
        phone: '+1 (555) 000-0000',
        source: 'Website',
        trialDate: null,
        stage: STAGES.NEW_LEAD,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random&color=fff`,
        lastContact: 'Just now',
        lastContactSubtext: 'SYSTEM ENTRY'
      };
      setLeads([newLead, ...leads]);
    }
  };

  // HTML5 Drag and Drop handlers for Kanban
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

      <PageHeader
        title="Lead Management Pipeline"
        subtitle="Curate and nurture your elite prospects through a sophisticated conversion journey."
        actions={[
          {
            label: viewMode === 'kanban' ? "Kanban" : "List",
            custom: (
              <div className="view-toggles">
                <button
                  className={`view-toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`}
                  onClick={() => setViewMode('kanban')}
                >
                  <LayoutGrid size={16} /> Kanban
                </button>

                <button
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} /> List
                </button>
              </div>
            )
          },
          {
            label: "Add Lead",
            icon: <Plus size={16} />,
            onClick: handleAddLead,
            className: "btn-primary"
          }
        ]}
      />

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <KpiCard title="Total Members" value="1,534" theme="teal" />
        <KpiCard title="Monthly Revenue" value="42,500" theme="blue" />
        <KpiCard title="Today's Check-ins" value="342" theme="purple" />
        <KpiCard title="Active Classes" value="24" theme="orange" />
      </section>

      <div className="filter-row">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-inline" />
          <input
            type="text"
            placeholder="Search members by name or email..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="action-buttons-group">

          <Dropdown
            label={filterPlatform}
            actions={[
              {
                label: "Clear",
                onClick: () => setFilterPlatform("Select Platform")
              },
              ...platform.map(g => ({
                label: g,
                onClick: () => setFilterPlatform(g)
              }))]}
          />
          <Dropdown
            label={filterStatus}
            actions={[
              {
                label: "Clear",
                onClick: () => setFilterStatus("Select Status")
              },
              ...status.map(g => ({
                label: g,
                onClick: () => setFilterStatus(g)
              }))]}
          />

        </div>
      </div>

      {/* Batch Action Bar */}
      {/* Batch Action Bar */}
      {selectedLeads.length > 0 && (
        <div className="batch-action-bar">
          <div className="batch-count">
            <span className="count-number">{selectedLeads.length}</span>
            <span className="count-text">SELECTED</span>
          </div>
          <p className="batch-instruction">Perform batch actions on selected prospects</p>

          <div className="batch-actions">
            <button className="batch-btn" onClick={handleBatchUpdateStatus}>Update Status</button>
            <button className="batch-btn" onClick={handleBatchMessage}>Send Bulk Message</button>
            <button className="batch-btn" onClick={() => window.alert('Assign owner opened')}>Assign Owner</button>
            <button className="batch-btn-danger" onClick={handleBatchDelete}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="table-container-wrapper">
          <table className="table-container">
            <thead>
              <tr>

                <th>LEAD PROFILE</th>
                <th>STATUS</th>
                <th>PLATFORM</th>
                <th>LAST INTERACTION</th>
                <th className="th-actions">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={selectedLeads.includes(lead.id) ? 'selected-row' : ''}>

                  <td className="td-profile">
                    <div className="lead-profile-col">
                      {lead.avatar.includes('text=MB') ? (
                        <div className="avatar-placeholder">MB</div>
                      ) : (
                        <img src={lead.avatar} alt={lead.name} className="lead-avatar" />
                      )}
                      <div>
                        <div className="lead-name">{lead.name}</div>
                        <div className="lead-email">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-status">
                    <span className={`status-pill pill-${lead.stage}`}>
                      {STAGE_CONFIG[lead.stage].title.toUpperCase()}
                    </span>
                  </td>
                  <td className="td-platform">
                    <div className="platform-col">
                      <SourceIcon source={lead.source} />
                      <span>{lead.source}</span>
                    </div>
                  </td>
                  <td className="td-interaction">
                    <div className="interaction-col">
                      <div className="interaction-time">{lead.lastContact}</div>
                      <div className="interaction-subtext">{lead.lastContactSubtext}</div>
                    </div>
                  </td>
                  <td className="td-actions">
                    <div className="action-buttons">
                      <button className="row-action-btn" onClick={() => window.alert(`Message interface opened for ${lead.name}`)}><MessageSquare size={16} /></button>
                      <button className="row-action-btn" onClick={() => window.alert(`Email interface opened for ${lead.email}`)}><Mail size={16} /></button>
                      <button className="row-action-btn" onClick={() => openSidebar(lead)}><Eye size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-footer">
            <span className="showing-text">Showing {filteredLeads.length} of 128 Elite Prospects</span>
            <div className="pagination-controls">
              <button className="page-btn"><ChevronLeft size={16} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      )}


      {viewMode === 'kanban' && (
        <div className="kanban-board">
          {Object.values(STAGES).map((stageKey) => {
            const config = STAGE_CONFIG[stageKey];
            const stageLeads = filteredLeads.filter(lead => lead.stage === stageKey);

            return (
              <div
                key={stageKey}
                className="kanban-column card"
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
                          {lead.avatar.includes('text=MB') ? (
                            <div className="avatar-placeholder small">MB</div>
                          ) : (
                            <img src={lead.avatar} alt={lead.name} className="user-avatar" />
                          )}
                          <div className="user-details">
                            <h4 onClick={() => openSidebar(lead)} style={{ cursor: 'pointer' }}>{lead.name}</h4>
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
      )}

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={closeSidebar}>

      </div>

      <div className={`lead-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>LEAD PROFILE</h3>
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>

        {selectedSidebarLead && (
          <div className="sidebar-content">
            <div className="sidebar-profile-section">
              <div className="sidebar-avatar-wrapper">
                {selectedSidebarLead.avatar.includes('text=MB') ? (
                  <div className="avatar-placeholder large">MB</div>
                ) : (
                  <img src={selectedSidebarLead.avatar} alt={selectedSidebarLead.name} className="sidebar-avatar" />
                )}
                <div className="status-dot"></div>
              </div>
              <h2 className="sidebar-name">{selectedSidebarLead.name}</h2>
              <p className="sidebar-role">ELITE PROSPECT • {selectedSidebarLead.source.toUpperCase()} SOURCE</p>

              <div className="sidebar-actions">
                <button className="btn-primary">Schedule Intro</button>
                <button className="btn-more-actions"><MoreVertical size={16} /></button>
              </div>
            </div>

            <div className="sidebar-timeline">
              <div className="timeline-header">
                <h3>Curation History</h3>
                <a href="#" className="view-all-link">VIEW ALL</a>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker purple"></div>
                <div className="timeline-content">
                  <span className="timeline-time">2 HOURS AGO</span>
                  <h4 className="timeline-title">Initial Inquiry Received</h4>
                  <p className="timeline-desc">{selectedSidebarLead.name.split(' ')[0]} reached out via {selectedSidebarLead.source} DM inquiring about "Elite Curation" programs for weight loss. She mentioned she has a busy executive schedule.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker grey"></div>
                <div className="timeline-content">
                  <span className="timeline-time">5 HOURS AGO</span>
                  <h4 className="timeline-title">Automated Outreach Sent</h4>
                  <p className="timeline-desc">Sent "The Aura Philosophy" digital brochure and invitation to visit the studio.</p>
                </div>
              </div>
            </div>

            <div className="sidebar-notes">
              <h3>Curator Notes</h3>
              <div className="notes-card">
                <button className="btn-edit-note"><Edit2 size={12} /></button>
                <p>"{selectedSidebarLead.name.split(' ')[0]} seems highly motivated but price-sensitive to the premium tier. Focus on the 'Time-Saving' aspect of our executive programs. She travels 2 weeks a month, so mention our digital concierge support."</p>
                <span className="note-author">— HEAD COACH JULIAN</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CRM;
