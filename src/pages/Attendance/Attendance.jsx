import React from 'react';
import './Attendance.css';
import {
  Filter,
  PlusCircle,
  LogOut,
  LogOut as SignIn,
  Clock,
  BarChart2,
  UserCheck,
  MoreVertical,
  Search
} from 'lucide-react';
import KpiCard from '../../components/KpiCard';
import PageHeader from '../../components/PageHeader/PageHeader';

const Attendance = () => {

  // Mock Data
  const recentActivity = [
    {
      id: 1,
      name: "Elena Rodriguez",
      memberId: "#8821",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      checkIn: "08:15 AM",
      plan: "Premium Plus",
    },
    {
      id: 2,
      name: "Marcus Thorne",
      memberId: "#9012",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
      checkIn: "08:42 AM",
      plan: "Standard",
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      memberId: "#4432",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      checkIn: "09:05 AM",
      plan: "VIP Access",
    },
    {
      id: 4,
      name: "David Chen",
      memberId: "#1290",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      checkIn: "09:12 AM",
      plan: "Platinum",
    },
    {
      id: 5,
      name: "David Chen",
      memberId: "#1290",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      checkIn: "09:30 AM",
      plan: "Platinum",
    }
  ];

  const todaySchedule = [
    {
      id: 1,
      name: "High Intensity Pilates",
      time: "10:00 AM • Studio A",
      joinRate: 92,
      badge: "IN 45M",
      badgeType: "urgent"
    },
    {
      id: 2,
      name: "Power Lifting 101",
      time: "12:30 PM • Main Floor",
      joinRate: 45,
      badge: "UPCOMING",
      badgeType: "normal"
    },
    {
      id: 3,
      name: "Ashtanga Yoga Flow",
      time: "04:00 PM • Zen Room",
      joinRate: 78,
      badge: "UPCOMING",
      badgeType: "normal"
    }
  ];

  return (
    <div className="attendance-page">
      {/* HEADER - Kept as requested */}
      <PageHeader
        title="Attendance Management"
        subtitle="Real-time tracking of gym floor activity and active sessions."
        actions={[
          {
            label: "Filter Results",
            icon: <Filter size={16} />,
            onClick: () => { },
            className: "btn-filter"
          },
          {
            label: "Manual Check-In",
            icon: <SignIn size={16} />,
            onClick: () => { },
            className: "btn-primary"
          }
        ]}
      />


      {/* STAT CARDS - Kept as requested */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <KpiCard title="Total Check-Ins Today" value="142" theme="blue" Icon={SignIn} />
        <KpiCard title="Peak Hour" value="06:00 PM" theme="purple" Icon={Clock} />
        <KpiCard title="Avg. Daily Attendance" value="118" theme="orange" Icon={BarChart2} />
        <KpiCard title="Active Members Now" value="24" theme="teal" Icon={UserCheck} />
      </div>

      {/* MAIN CONTENT SPLIT - UPDATED */}
      <div className="attendance-content">

        {/* LEFT COMPONENT: ACTIVE MEMBERS LIST */}
        <div className="active-members-section card">
          <div className="members-section-header">
            <h2 className="heading-5">Active Members</h2>
            <div className="search-filter-group">
              <div className="search-bar-wrapper">
                <Search size={16} className="search-icon-inline" />
                <input
                  type="text"
                  placeholder="Search members by name or email..."
                  className="search-input-pill"
                />
              </div>
              <button className="btn-filter">
                <Filter size={14} />
                <span>Filters Result</span>
              </button>
            </div>
          </div>

          <div className="members-card-list">
            {recentActivity.map((member) => (
              <div key={member.id} className="member-status-card">
                <div className="member-main-info">
                  <div className="avatar-rounded">
                    <img src={member.avatar} alt={member.name} />
                  </div>
                  <div className="member-text">
                    <h4 className="member-name-bold">{member.name}</h4>
                    <p className="member-sub-info">
                      {member.plan} • ID: {member.memberId}
                    </p>
                  </div>
                </div>

                <div className="member-checkin-info">
                  <div className="checkin-time-block">
                    <span className="info-label">CHECKED IN</span>
                    <span className="info-value-time">{member.checkIn}</span>
                  </div>
                  <button className="more-btn-circular">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR: TODAY'S SCHEDULE - UPDATED */}
        <aside className="schedule-sidebar-lavender">
          <div className="sidebar-header">
            <Clock size={20} className="header-icon-purple" />
            <h3 className="heading-6">Today's Schedule</h3>
          </div>

          <div className="schedule-items-list">
            {todaySchedule.map((item) => (
              <div key={item.id} className="schedule-item-card">
                <div className="item-left-status">
                  <div className="activity-main">
                    <h4 className="activity-title">{item.name}</h4>
                    <p className="activity-meta">{item.time}</p>
                  </div>
                  <div className="join-rate-section">
                    <div className="join-rate-header">
                      <span className="join-label">JOIN RATE</span>
                      <span className="join-percent">{item.joinRate}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${item.joinRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className={`status-pill-badge ${item.badgeType}`}>
                  {item.badge}
                </div>
              </div>
            ))}
          </div>

          <button className="btn-dashed-add">
            <PlusCircle size={18} />
            <span>Add Extra Session</span>
          </button>
        </aside>

      </div>
    </div>
  );
};

export default Attendance;
