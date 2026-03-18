import React from 'react';
import { Users, TrendingUp, CalendarCheck, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Jan', members: 400, revenue: 2400 },
  { name: 'Feb', members: 430, revenue: 2600 },
  { name: 'Mar', members: 450, revenue: 2800 },
  { name: 'Apr', members: 490, revenue: 3100 },
  { name: 'May', members: 520, revenue: 3500 },
  { name: 'Jun', members: 580, revenue: 4200 },
];

const StatCard = ({ title, value, trend, icon: Icon, colorClass }) => (
  <div className="stat-card">
    <div className="stat-card-content">
      <p className="stat-card-title">{title}</p>
      <h3 className="stat-card-value">{value}</h3>
      <p className={`stat-card-trend ${trend.startsWith('+') ? 'trend-up' : 'trend-down'}`}>
        {trend} from last month
      </p>
    </div>
    <div className={`stat-card-icon-wrapper ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-header-text">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <button className="dashboard-action-btn">Download Report</button>
      </header>

      <section className="dashboard-stats-grid">
        <StatCard 
          title="Total Members" 
          value="1,248" 
          trend="+12%" 
          icon={Users} 
          colorClass="icon-primary" 
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$42,500" 
          trend="+8.5%" 
          icon={TrendingUp} 
          colorClass="icon-secondary" 
        />
        <StatCard 
          title="Today's Check-ins" 
          value="342" 
          trend="+5%" 
          icon={CalendarCheck} 
          colorClass="icon-accent" 
        />
        <StatCard 
          title="Active Classes" 
          value="24" 
          trend="-2%" 
          icon={Activity} 
          colorClass="icon-danger" 
        />
      </section>

      {/* Charts Area */}
      <div className="dashboard-charts-layout">
        <div className="chart-main-panel">
          <h3 className="chart-panel-title">Revenue & Member Growth</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                <Area yAxisId="right" type="monotone" dataKey="members" stroke="var(--secondary)" fillOpacity={1} fill="url(#colorMembers)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="checkins-sidebar">
          <h3 className="chart-panel-title">Recent Check-ins</h3>
          <div className="checkins-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="checkin-item">
                <div className="checkin-user-info">
                  <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" className="checkin-avatar" />
                  <div className="checkin-text-details">
                    <p className="checkin-user-name">Sarah Connor</p>
                    <p className="checkin-user-plan">Pro Plan</p>
                  </div>
                </div>
                <span className="checkin-time-ago">10 mins ago</span>
              </div>
            ))}
          </div>
          <button className="checkins-view-all-btn">View All</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
