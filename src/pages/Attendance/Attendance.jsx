import React, { useState } from 'react';
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
import KpiCard from '../../components/KpiCard/KpiCard';
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropdown from '../../components/Dropdown/Dropdown';

const Attendance = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('Select Plan');
  const allPlans = ["Standard", "Platinum", "Elite"];

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      name: "Elena Rodriguez",
      memberId: "#8821",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      checkIn: "08:15 AM",
      plan: "Elite",
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
      plan: "Platinum",
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
  ]);

  const [todaySchedule, setTodaySchedule] = useState([
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
  ]);

  const handleManualCheckIn = () => {
    const name = window.prompt("Enter member name for check-in:");
    if (name) {
      const newCheckIn = {
        id: Date.now(),
        name: name,
        memberId: `#${Math.floor(1000 + Math.random() * 9000)}`,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random&color=fff`,
        checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        plan: "Standard",
      };
      setRecentActivity([newCheckIn, ...recentActivity]);
    }
  };

  const handleAddSession = () => {
    const sessionName = window.prompt("Enter new session name:");
    if (sessionName) {
      const newSession = {
        id: Date.now(),
        name: sessionName,
        time: "TBD • Main Floor",
        joinRate: 0,
        badge: "NEW",
        badgeType: "normal"
      };
      setTodaySchedule([...todaySchedule, newSession]);
    }
  };

  const filteredActivity = recentActivity.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.memberId.includes(searchTerm);
    const matchesPlan = filterPlan === 'Select Plan' || member.plan.includes(filterPlan);
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="attendance-page">
      {/* HEADER - Kept as requested */}
      <PageHeader
        title="Attendance Management"
        subtitle="Real-time tracking of gym floor activity and active sessions."
        actions={[
          {
            label: "Manual Check-In",
            icon: <SignIn size={16} />,
            onClick: handleManualCheckIn,
            className: "btn-primary"
          }
        ]}
      />


      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <KpiCard title="Total Check-Ins Today" value="142" theme="blue" Icon={SignIn} />
        <KpiCard title="Peak Hour" value="06:00 PM" theme="purple" Icon={Clock} />
        <KpiCard title="Avg. Daily Attendance" value="118" theme="orange" Icon={BarChart2} />
        <KpiCard title="Active Members Now" value="24" theme="teal" Icon={UserCheck} />
      </div>


      <div className="attendance-content">

        <div className="active-members-section card">
          <div className="members-section-header">
            <h2 className="heading-5">Active Members</h2>
            <div className="search-filter-group">
              <div className="search-bar-wrapper">
                <Search size={16} className="search-icon-inline" />
                <input
                  type="text"
                  placeholder="Search members by name or ID..."
                  className="search-input-pill"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dropdown
                label={filterPlan || "All Plans"}
                actions={[{
                  label: "Clear",
                  onClick: () => setFilterPlan("")
                },
                ...allPlans.map(g => ({
                  label: g,
                  onClick: () => setFilterPlan(g)
                }))
                ]}
              />

            </div>
          </div>

          <div className="members-card-list">
            {filteredActivity.length === 0 && (
              <div className="empty-state" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No recent activity found.
              </div>
            )}
            {filteredActivity.map((member) => (
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

          <button className="btn-dashed-add" onClick={handleAddSession}>
            <PlusCircle size={18} />
            <span>Add Extra Session</span>
          </button>
        </aside>

      </div>
    </div>
  );
};

export default Attendance;
