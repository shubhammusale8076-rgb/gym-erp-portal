import React from 'react';
import { Users, TrendingUp, CalendarCheck, Activity, PlusCircle, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import KpiCard from '../../components/KpiCard/KpiCard';
import './Dashboard.css';
import PageHeader from '../../components/PageHeader/PageHeader';

const chartData = [
  { name: 'JAN', value: 10 },
  { name: 'FEB', value: 25 },
  { name: 'MAR', value: 35 },
  { name: 'APR', value: 55 },
  { name: 'MAY', value: 75 },
  { name: 'JUN', value: 95 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Curating the peak performance of Elite Club"
        actions={[
          {
            label: "Download Report",
            icon: <Download size={16} />,
            onClick: () => { },
            className: "btn-primary"
          }
        ]}
      />

      {/* KPI Cards section kept as is */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', margin: '24px 0' }}>
        <KpiCard title="Total Members" value="1,534" theme="teal" Icon={Users} />
        <KpiCard title="Monthly Revenue" value="42,500" theme="blue" Icon={TrendingUp} />
        <KpiCard title="Today's Check-ins" value="342" theme="purple" Icon={CalendarCheck} />
        <KpiCard title="Active Classes" value="24" theme="orange" Icon={Activity} />
      </section>

      {/* New Charts Layout Section */}
      <div className="dashboard-grid">

        {/* 1. Membership Growth */}
        <div className="card growth-card">
          <div className="card-header-flex">
            <div>
              <h3 className="card-title-main">Membership Growth</h3>
              <p className="card-subtitle-small">Performance analysis for H1 2024</p>
            </div>
            <div className="time-filters">
              <span className="filter-pill active">6 MONTHS</span>
              <span className="filter-pill">1 YEAR</span>
            </div>
          </div>
          <div className="growth-chart-container">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8130b0" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8130b0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8130b0"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#growthGradient)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#afafb6' }}
                  dy={10}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Recent Activity */}
        <div className="card activity-sidebar-card">
          <h3 className="card-title-main">Recent Activity</h3>
          <p className="card-subtitle-small">Real-time gym events</p>
          <div className="activity-items">
            <div className="activity-row">
              <div className="activity-icon-circle purple-bg">
                <Users size={16} color="#fff" />
              </div>
              <div className="activity-details">
                <p className="activity-text-bold">New member joined</p>
                <p className="activity-desc">Julianna Vance has enrolled in Premium Annual Plan.</p>
                <span className="activity-time">7 MINS AGO</span>
              </div>
            </div>
            <div className="activity-row">
              <div className="activity-icon-circle lavender-bg">
                <CalendarCheck size={16} color="#8130b0" />
              </div>
              <div className="activity-details">
                <p className="activity-text-bold">Class booking confirmed</p>
                <p className="activity-desc">Summer Yoga with Elena is now at full capacity.</p>
                <span className="activity-time">45 MINS AGO</span>
              </div>
            </div>
            <div className="activity-row">
              <div className="activity-icon-circle gold-bg">
                <TrendingUp size={16} color="#b45309" />
              </div>
              <div className="activity-details">
                <p className="activity-text-bold">Payment processed</p>
                <p className="activity-desc">Subscription renewal for Marcus Thorne ($199.00).</p>
                <span className="activity-time">2 HOURS AGO</span>
              </div>
            </div>
          </div>
          <button className="view-all-text-btn">View All Activities</button>
        </div>

        {/* 3. Revenue Streams */}
        <div className="card revenue-card">
          <h3 className="card-title-main">Revenue Streams</h3>
          <div className="revenue-list">
            <div className="revenue-item-stack">
              <div className="revenue-label-row">
                <span>Memberships</span>
                <span className="revenue-value">$98,400</span>
              </div>
              <div className="progress-bar-wide"><div className="fill" style={{ width: '85%' }}></div></div>
            </div>
            <div className="revenue-item-stack">
              <div className="revenue-label-row">
                <span>Personal Training</span>
                <span className="revenue-value">$32,100</span>
              </div>
              <div className="progress-bar-wide"><div className="fill" style={{ width: '45%' }}></div></div>
            </div>
            <div className="revenue-item-stack">
              <div className="revenue-label-row">
                <span>Retail & Cafe</span>
                <span className="revenue-value">$12,000</span>
              </div>
              <div className="progress-bar-wide"><div className="fill" style={{ width: '25%' }}></div></div>
            </div>
          </div>
        </div>

        {/* 4. Spotlight Event */}
        <div className="spotlight-card">
          <p className="spotlight-badge">SPOTLIGHT EVENT</p>
          <h2 className="spotlight-title">Summer Strength Workshop</h2>
          <p className="spotlight-desc">Master the deadlift with Pro Coach Marcus. Limited to 15 members.</p>
          <div className="spotlight-footer">
            <div className="date-box">
              <span className="month">JUNE</span>
              <span className="day">24</span>
              <span className="time">10:00 AM</span>
            </div>
            <button className="join-btn-white">Join Now</button>
          </div>
        </div>

        {/* 5. Facility Status */}
        <div className="card facility-card">
          <div className="card-header-simple">
            <Activity size={18} color="#8c8c8c" />
            <h3 className="card-title-status">FACILITY STATUS</h3>
          </div>
          <div className="facility-status-list">
            <div className="status-row">
              <div className="status-indicator red-dot"></div>
              <span className="facility-name">Treadmill #04</span>
              <span className="status-pill-text red">OUT OF ORDER</span>
            </div>
            <div className="status-row">
              <div className="status-indicator brown-dot"></div>
              <span className="facility-name">Main Pool Area</span>
              <span className="status-pill-text brown">MAINT. 22:00</span>
            </div>
            <div className="status-row">
              <div className="status-indicator green-dot"></div>
              <span className="facility-name">Squash Courts</span>
              <span className="status-pill-text green">OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* 6. Elite Trainers */}
        <div className="elite-trainers-card">
          <div className="card-header-flex">
            <h3 className="card-title-main">Elite Trainers</h3>
            <span className="view-all-link-sm">View All</span>
          </div>
          <div className="trainer-cards-row">
            <div className="trainer-mini-card">
              <div className="initials-avatar purple">ER</div>
              <div className="trainer-mini-info">
                <p className="trainer-mini-name">Elena Rodriguez</p>
                <p className="trainer-mini-spec">YOGA & PILATES SPECIALIST</p>
              </div>
            </div>
            <div className="trainer-mini-card">
              <div className="initials-avatar lavender">MT</div>
              <div className="trainer-mini-info">
                <p className="trainer-mini-name">Marcus Thorne</p>
                <p className="trainer-mini-spec">STRENGTH & CONDITIONING</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Capacity Cards */}
        <div className="capacity-group">
          <div className="card capacity-small-card">
            <div className="capacity-icon-wrap"><Activity size={16} /></div>
            <div className="capacity-text">
              <p className="cap-title">HIIT</p>
              <p className="cap-percent">98% CAPACITY</p>
            </div>
          </div>
          <div className="card capacity-small-card">
            <div className="capacity-icon-wrap"><Users size={16} /></div>
            <div className="capacity-text">
              <p className="cap-title">Yoga</p>
              <p className="cap-percent">84% CAPACITY</p>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="floating-actions">
          <button className="fab fab-secondary"><Activity size={24} /></button>
          <button className="fab fab-primary"><PlusCircle size={28} /></button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
