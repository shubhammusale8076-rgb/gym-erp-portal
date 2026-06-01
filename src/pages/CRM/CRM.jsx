import React, { useState } from 'react';
import {
  Phone,
  Calendar,
  MapPin,
  Clock,
  MoreVertical,
  Plus,
  Search,
  Instagram,
  Globe,
  UserCheck,
  LayoutGrid,
  List,
  Mail,
  Eye,
  MessageSquare,
  X,
  Edit2,
  Flame,
  AlertTriangle,
  IndianRupee,
  PhoneCall,
  CalendarDays,
  User
} from 'lucide-react';

import './CRM.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import KpiCard from '../../components/KpiCard/KpiCard';
import Dropdown from '../../components/Dropdown/Dropdown';
import AddProspectModal from './AddProspectModal';
import Pagination from '../../components/Pagination/Pagination';
import WhatsAppActionButton from '../../components/Communication/WhatsAppActionButton';
import CommunicationActionsCard from '../../components/Communication/CommunicationActionsCard';

const STAGES = {
  NEW_LEAD: 'newLead',
  TRIAL_SCHEDULED: 'trialScheduled',
  FOLLOW_UP: 'followUp',
  CONVERTED: 'converted'
};

const STAGE_CONFIG = {
  [STAGES.NEW_LEAD]: {
    title: 'New Lead',
    color: 'stage-purple',
    icon: UserCheck
  },
  [STAGES.TRIAL_SCHEDULED]: {
    title: 'Trial Scheduled',
    color: 'stage-blue',
    icon: Calendar
  },
  [STAGES.FOLLOW_UP]: {
    title: 'Follow-up',
    color: 'stage-orange',
    icon: Clock
  },
  [STAGES.CONVERTED]: {
    title: 'Converted',
    color: 'stage-green',
    icon: UserCheck
  }
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
    lastContactSubtext: 'OUTBOUND CALL',

    priority: 'HOT',
    nextAction: 'Call at 6 PM',
    leadScore: 82,
    expectedRevenue: 18000,
    leadAge: '2 Days',
    goal: 'Weight Loss',
    assignedTo: 'Rahul',
    conversionChance: 'HIGH'
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
    lastContactSubtext: 'E-MAIL SENT',

    priority: 'WARM',
    nextAction: 'Send Pricing PDF',
    leadScore: 65,
    expectedRevenue: 12000,
    leadAge: '5 Days',
    goal: 'Fat Loss',
    assignedTo: 'Amit',
    conversionChance: 'MEDIUM'
  },
  {
    id: 'l3',
    name: 'Marcus Bennett',
    email: 'marcus@fitmail.com',
    phone: '+1 455-092-3312',
    source: 'Walk-in',
    trialDate: '2026-03-05T18:30:00',
    stage: STAGES.CONVERTED,
    avatar: 'https://i.pravatar.cc/150?text=MB',
    lastContact: '5h ago',
    lastContactSubtext: 'TOUR COMPLETED',

    priority: 'HOT',
    nextAction: 'Welcome Call',
    leadScore: 95,
    expectedRevenue: 24000,
    leadAge: '1 Day',
    goal: 'Muscle Gain',
    assignedTo: 'Karan',
    conversionChance: 'HIGH'
  }
];

const SourceIcon = ({ source }) => {
  const iconStyle = { width: '14px', height: '14px' };

  switch (source.toLowerCase()) {
    case 'instagram':
      return <Instagram style={iconStyle} />;
    case 'website':
      return <Globe style={iconStyle} />;
    case 'walk-in':
      return <MapPin style={iconStyle} />;
    case 'direct call':
      return <Phone style={iconStyle} />;
    default:
      return <UserCheck style={iconStyle} />;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'HOT':
      return 'priority-hot';
    case 'WARM':
      return 'priority-warm';
    default:
      return 'priority-cold';
  }
};

const getChanceClass = (chance) => {
  switch (chance) {
    case 'HIGH':
      return 'chance-high';
    case 'MEDIUM':
      return 'chance-medium';
    default:
      return 'chance-low';
  }
};

const platform = ['Instagram', 'Website', 'Walk-in', 'Direct Call'];
const status = ['New Lead', 'Trial Scheduled', 'Follow Up', 'Converted'];

const CRM = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('kanban');
  const [selectedSidebarLead, setSelectedSidebarLead] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

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

  const totalPages = Math.ceil(filteredLeads.length / pageSize) || 1;

  const currentLeads = filteredLeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
    e.currentTarget.classList.add('is-dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('is-dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();

    const leadId = e.dataTransfer.getData('leadId');

    if (leadId) {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId
            ? {
              ...lead,
              stage: newStage
            }
            : lead
        )
      );
    }
  };

  return (
    <div className="crm-page">
      <PageHeader
        title="Lead Management Pipeline"
        subtitle="Track, nurture and convert high-quality fitness prospects efficiently."
        actions={[
          {
            label: viewMode === 'kanban' ? 'Kanban' : 'List',
            custom: (
              <div className="view-toggles">
                <button
                  className={`view-toggle-btn ${viewMode === 'kanban' ? 'active' : ''
                    }`}
                  onClick={() => setViewMode('kanban')}
                >
                  <LayoutGrid size={16} /> Kanban
                </button>

                <button
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''
                    }`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} /> List
                </button>
              </div>
            )
          },
          {
            label: 'Add Lead',
            icon: <Plus size={16} />,
            onClick: () => setIsAddModalOpen(true),
            className: 'btn-primary'
          }
        ]}
      />

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          margin: '24px 0'
        }}
      >
        <KpiCard title="New Leads Today" value="18" theme="purple" />
        <KpiCard title="Follow-Ups Due" value="7" theme="orange" />
        <KpiCard title="Conversion Rate" value="34%" theme="green" />
        <KpiCard title="Missed Leads" value="4" theme="teal" Icon={AlertTriangle} />
      </section>
      {/* 
      <div className="crm-live-feed card">
        <div className="crm-live-feed-header">
          <h3>Live Activity</h3>
        </div>

        <div className="crm-feed-items">
          <div className="crm-feed-item">
            🔥 Rahul converted Elena Rodriguez
          </div>

          <div className="crm-feed-item">
            ⚠ 3 follow-ups overdue
          </div>

          <div className="crm-feed-item">
            💰 New premium package inquiry from Instagram
          </div>
        </div>
      </div> */}


      <div className="filter-row">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-inline" />

          <input
            type="text"
            placeholder="Search leads by name, email or source..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="action-buttons-group">
          <Dropdown
            label={filterPlatform}
            actions={[
              {
                label: 'Clear',
                onClick: () => setFilterPlatform('Select Platform')
              },
              ...platform.map((g) => ({
                label: g,
                onClick: () => setFilterPlatform(g)
              }))
            ]}
          />

          <Dropdown
            label={filterStatus}
            actions={[
              {
                label: 'Clear',
                onClick: () => setFilterStatus('Select Status')
              },
              ...status.map((g) => ({
                label: g,
                onClick: () => setFilterStatus(g)
              }))
            ]}
          />
        </div>
      </div>

      {viewMode === 'kanban' && (
        <>

          <div className="kanban-board">
            {Object.values(STAGES).map((stageKey) => {
              const config = STAGE_CONFIG[stageKey];

              const stageLeads = filteredLeads.filter(
                (lead) => lead.stage === stageKey
              );

              return (
                <div
                  key={stageKey}
                  className="kanban-column card"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stageKey)}
                >
                  <div className="column-header">
                    <div className="column-title-wrapper">
                      <div className={`stage-dot ${config.color}`}></div>

                      <h3 className="column-title">{config.title}</h3>

                      <span className="lead-count">
                        {stageLeads.length}
                      </span>
                    </div>
                  </div>

                  <div className="cards-container">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onDragEnd={handleDragEnd}
                        className={`lead-card`}
                      >


                        <div className="card-header">
                          <div className="user-info">
                            <img
                              src={lead.avatar}
                              alt={lead.name}
                              className="user-avatar"
                            />

                            <div className="user-details">
                              <h4
                                onClick={() => openSidebar(lead)}
                                style={{ cursor: 'pointer' }}
                              >
                                {lead.name}
                              </h4>

                              <p>{lead.lastContact}</p>
                            </div>
                          </div>

                          <div
                            className={`priority-badge ${getPriorityClass(
                              lead.priority
                            )}`}
                          >
                            {lead.priority}
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="info-row">
                            <Phone size={14} />
                            <span>{lead.phone}</span>
                          </div>

                          <div className="lead-score-row">
                            <span>Lead Score</span>
                            <strong>{lead.leadScore}</strong>
                          </div>

                          <div
                            className={`conversion-chip ${getChanceClass(
                              lead.conversionChance
                            )}`}
                          >
                            {lead.conversionChance} CHANCE
                          </div>

                          <div className="meta-chips">
                            <span className="meta-chip">
                              {lead.goal}
                            </span>

                            <span className="meta-chip">
                              {lead.assignedTo}
                            </span>

                            <span className="meta-chip">
                              {lead.leadAge}
                            </span>
                          </div>
                        </div>

                        <div className="card-footer">
                          <div className="next-action-row">
                            <Clock size={12} />
                            <span>{lead.nextAction}</span>
                          </div>

                          <div className="source-badge">
                            <SourceIcon source={lead.source} />
                            <span className="source-text">
                              {lead.source}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {viewMode === 'list' && (
        <div className="table-container-wrapper">
          <table className="table-container">
            <thead>
              <tr>
                <th>LEAD PROFILE</th>
                <th>STATUS</th>
                <th>PRIORITY</th>
                <th>PLATFORM</th>
                <th>CONVERSION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {currentLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="td-profile">
                    <div className="lead-profile-col">
                      <img
                        src={lead.avatar}
                        alt={lead.name}
                        className="lead-avatar"
                      />

                      <div>
                        <div className="lead-name"
                          onClick={() => openSidebar(lead)}
                          style={{ cursor: 'pointer' }}
                        >
                          {lead.name}
                        </div>
                        <div className="lead-email">{lead.email}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`status-pill pill-${lead.stage}`}>
                      {STAGE_CONFIG[lead.stage].title.toUpperCase()}
                    </span>
                  </td>

                  <td>
                    <div
                      className={`priority-badge ${getPriorityClass(
                        lead.priority
                      )}`}
                    >
                      {lead.priority}
                    </div>
                  </td>

                  <td>
                    <div className="platform-col">
                      <SourceIcon source={lead.source} />
                      <span>{lead.source}</span>
                    </div>
                  </td>

                  <td>
                    <div
                      className={`conversion-chip ${getChanceClass(
                        lead.conversionChance
                      )}`}
                    >
                      {lead.conversionChance}
                    </div>
                  </td>

                  <td>
                    <div className="action-buttons">


                      <button className="row-action-btn">
                        <MessageSquare size={16} />
                      </button>

                      <button
                        className="row-action-btn"
                        onClick={() => openSidebar(lead)}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-footer">
            <span className="showing-text">
              Showing {filteredLeads.length} leads
            </span>

            {filteredLeads.length > pageSize && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      )}

      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      ></div>

      <div className={`lead-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>LEAD PROFILE</h3>

          <button
            className="sidebar-close-btn"
            onClick={closeSidebar}
          >
            <X size={20} />
          </button>
        </div>

        {selectedSidebarLead && (
          <div className="sidebar-content">
            <div className="sidebar-profile-section">
              <div className="sidebar-avatar-wrapper">

                <img
                  src={selectedSidebarLead.avatar}
                  alt={selectedSidebarLead.name}
                  className="sidebar-avatar"
                />

              </div>
              <h2 className="sidebar-name">
                {selectedSidebarLead.name}
              </h2>

              <p className="sidebar-role">
                ELITE PROSPECT •
                {selectedSidebarLead.source.toUpperCase()} SOURCE
              </p>

              <div className="sidebar-actions">
                <button className="btn-primary">
                  Schedule Follow-Up
                </button>

                <button className="btn-more-actions">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="sidebar-stats-grid">
                <div className="sidebar-stat-card">
                  <span>Lead Score</span>
                  <strong>{selectedSidebarLead.leadScore}</strong>
                </div>

                <div className="sidebar-stat-card">
                  <span>Expected Revenue</span>
                  <strong>
                    ₹{selectedSidebarLead.expectedRevenue}
                  </strong>
                </div>

                <div className="sidebar-stat-card">
                  <span>Assigned To</span>
                  <strong>{selectedSidebarLead.assignedTo}</strong>
                </div>

                <div className="sidebar-stat-card">
                  <span>Conversion</span>
                  <strong>
                    {selectedSidebarLead.conversionChance}
                  </strong>
                </div>
              </div>

              <div className="sidebar-action-center">
                <button className="sidebar-action-btn">
                  <PhoneCall size={15} /> Call Lead
                </button>

                <button className="sidebar-action-btn">
                  <CalendarDays size={15} /> Schedule Trial
                </button>

                <button className="sidebar-action-btn">
                  <User size={15} /> Convert Member
                </button>
              </div>

              <div className="sidebar-communication-section" style={{ marginTop: '24px' }}>
                <CommunicationActionsCard
                  title="Lead Communication"
                  description="Send manual WhatsApp reminders and follow-ups to this lead."
                >
                  <WhatsAppActionButton
                    label="Send Follow-up"
                    icon={MessageSquare}
                    eventType="FOLLOW_UP"
                    payload={{ leadId: selectedSidebarLead.id }}
                    variant="primary"
                  />
                  <WhatsAppActionButton
                    label="Send Trial Reminder"
                    icon={CalendarDays}
                    eventType="TRIAL_REMINDER"
                    payload={{ leadId: selectedSidebarLead.id }}
                    variant="secondary"
                  />
                </CommunicationActionsCard>
              </div>
            </div>

            <div className="sidebar-timeline">
              <div className="timeline-header">
                <h3>Curation History</h3>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker purple"></div>

                <div className="timeline-content">
                  <span className="timeline-time">2 HOURS AGO</span>

                  <h4 className="timeline-title">
                    Initial Inquiry Received
                  </h4>

                  <p className="timeline-desc">
                    Prospect inquired about premium transformation
                    programs.
                  </p>
                </div>
              </div>
            </div>

            <div className="sidebar-notes">
              <h3>Curator Notes</h3>

              <div className="notes-card">
                <button className="btn-edit-note">
                  <Edit2 size={12} />
                </button>

                <p>
                  Interested in premium coaching but needs flexible
                  timings.
                </p>
              </div>
            </div>

            <div className="lead-task-section">
              <h3>Lead Tasks</h3>

              <div className="task-item">
                <input type="checkbox" />
                <span>Send pricing PDF</span>
              </div>

              <div className="task-item">
                <input type="checkbox" />
                <span>Schedule trial session</span>
              </div>

              <div className="task-item">
                <input type="checkbox" />
                <span>Follow-up tomorrow evening</span>
              </div>
            </div>
          </div>
        )}
      </div>



      <AddProspectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default CRM;
