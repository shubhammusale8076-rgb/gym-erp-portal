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
  MoreVertical 
} from 'lucide-react';

const Attendance = () => {
    
  // Mock Data
  const recentActivity = [
    {
      id: 1,
      name: "Sarah Jenkins",
      memberId: "M2940",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      checkIn: "08:15 AM",
      checkOut: "--",
      plan: "Pro Elite",
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "David Chen",
      memberId: "M1822",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      checkIn: "07:45 AM",
      checkOut: "09:00 AM",
      plan: "Basic",
      status: "SIGNED OUT"
    },
    {
      id: 3,
      name: "Maria Garcia",
      memberId: "M4103",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      checkIn: "07:30 AM",
      checkOut: "--",
      plan: "Family",
      status: "ACTIVE"
    },
    {
      id: 4,
      name: "James Wilson",
      memberId: "M1055",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      checkIn: "06:55 AM",
      checkOut: "08:30 AM",
      plan: "Pro Elite",
      status: "SIGNED OUT"
    }
  ];

  return (
    <div className="attendance-page">
      {/* HEADER */}
        <div className="attendance-header">
          <div>
            <h1>Attendance Management</h1>
            <p>Real-time tracking of gym floor activity and active sessions.</p>
          </div>
          <div className="header-actions">
            <button className="btn-filter">
              <Filter size={16} /> Filter Results
            </button>
            <button className="btn-manual">
              <PlusCircle size={16} /> Manual Check-In
            </button>
          </div>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <SignIn size={20} className="stat-icon" />
          </div>
          <div className="stat-trend positive">+12.5%</div>
          <div className="stat-info">
            <span className="stat-label">Total Check-Ins Today</span>
            <span className="stat-value">142</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Clock size={20} className="stat-icon" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Peak Hour</span>
            <span className="stat-value">06:00 PM</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">
            <BarChart2 size={20} className="stat-icon" />
          </div>
          <div className="stat-trend positive">+5.2%</div>
          <div className="stat-info">
            <span className="stat-label">Avg. Daily Attendance</span>
            <span className="stat-value">118</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper teal">
            <UserCheck size={20} className="stat-icon" />
            <span className="online-dot"></span>
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Members Now</span>
            <span className="stat-value">24</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="attendance-content">
        
          {/* LEFT COMPONENT: TABLE */}
          <div className="recent-activity-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <button className="btn-outline">All Membership Plans</button>
            </div>
            
            <div className="table-responsive">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>MEMBER</th>
                    <th>CHECK-IN</th>
                    <th>CHECK-OUT</th>
                    <th>PLAN</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <div className="member-profile">
                          <img src={record.avatar} alt={record.name} className="avatar" />
                          <div>
                            <span className="member-name">{record.name}</span>
                            <span className="member-id">ID: #{record.memberId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="time-text">{record.checkIn}</td>
                      <td className="time-text">{record.checkOut}</td>
                      <td>
                        <span className={`plan-badge ${record.plan.toLowerCase().replace(' ', '-')}`}>
                          {record.plan}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${record.status === 'ACTIVE' ? 'active' : 'signed-out'}`}>
                          <span className="dot"></span> {record.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-icon"><MoreVertical size={16} color="#a0aec0" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="view-all-link">
              <button className="btn-text">View All Attendance Logs</button>
            </div>
          </div>

          {/* RIGHT COMPONENTS: CHARTS & TRAINERS */}
            <div className="right-sidebar">
              
                  {/* Chart Widget */}
                  <div className="chart-widget list-widget">
                    <div className="chart-header">
                      <h3>Weekly Attendance Trends</h3>
                      <div className="chart-stats">
                        <span className="big-num">826</span>
                        <span className="trend positive">+8% vs last week</span>
                      </div>
                    </div>
                    
                    {/* Simple CSS Bar Chart Representation */}
                    <div className="bar-chart">
                      <div className="bar-col">
                          <div className="bar-bg">
                              <div className="bar-fill green-light" style={{height: '40%'}}></div>
                              <div className="bar-fill green-solid" style={{height: '30%'}}></div>
                          </div>
                          <span className="day-label">MON</span>
                      </div>
                      <div className="bar-col">
                          <div className="bar-bg">
                              <div className="bar-fill green-light" style={{height: '60%'}}></div>
                              <div className="bar-fill green-solid" style={{height: '50%'}}></div>
                          </div>
                          <span className="day-label">TUE</span>
                      </div>
                      <div className="bar-col">
                          <div className="bar-bg">
                              <div className="bar-fill green-light" style={{height: '65%'}}></div>
                              <div className="bar-fill green-solid" style={{height: '55%'}}></div>
                          </div>
                          <span className="day-label">WED</span>
                      </div>
                      <div className="bar-col">
                          <div className="bar-bg">
                              <div className="bar-fill green-light" style={{height: '80%'}}></div>
                              <div className="bar-fill green-solid" style={{height: '70%'}}></div>
                          </div>
                          <span className="day-label">THU</span>
                      </div>
                      <div className="bar-col">
                          <div className="bar-bg">
                              <div className="bar-fill green-light" style={{height: '45%'}}></div>
                              <div className="bar-fill green-solid" style={{height: '35%'}}></div>
                          </div>
                          <span className="day-label">FRI</span>
                      </div>
                      <div className="bar-col">
                          <div className="bar-bg">
                              <div className="bar-fill green-light" style={{height: '35%'}}></div>
                              <div className="bar-fill green-solid" style={{height: '20%'}}></div>
                          </div>
                          <span className="day-label">SAT</span>
                      </div>
                      <div className="bar-col">
                          <div className="bar-bg">
                              <div className="bar-fill green-light" style={{height: '30%'}}></div>
                              <div className="bar-fill green-solid" style={{height: '15%'}}></div>
                          </div>
                          <span className="day-label">SUN</span>
                      </div>
                    </div>
                    
                    <div className="chart-footer">
                      <span className="label">Highest Day:</span>
                      <span className="value">Thursday (164)</span>
                    </div>
                  </div>

                  {/* Trainers Widget */}
                  <div className="trainers-widget">
                    <div className="widget-header">
                        <div className="icon-wrapper">
                          <UserCheck size={16} />
                        </div>
                        <h3>Trainers on Floor</h3>
                    </div>
                    
                    <div className="trainer-list">
                        <div className="trainer-item">
                          <img src="https://randomuser.me/api/portraits/men/21.jpg" alt="Coach Marcus" className="trainer-avatar" />
                          <div className="trainer-info">
                              <h4>Coach Marcus</h4>
                              <p>WEIGHTLIFTING</p>
                          </div>
                          <span className="status-dot online"></span>
                        </div>
                        
                        <div className="trainer-item">
                          <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Elena Rodriguez" className="trainer-avatar" />
                          <div className="trainer-info">
                              <h4>Elena Rodriguez</h4>
                              <p>YOGA & CORE</p>
                          </div>
                          <span className="status-dot online"></span>
                        </div>
                    </div>
                    
                    <button className="btn-assign">ASSIGN DUTIES</button>
                  </div>

            </div>
      </div>
    </div>
  );
};

export default Attendance;
