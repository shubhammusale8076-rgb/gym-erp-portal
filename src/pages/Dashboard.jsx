import React from 'react';
import { Users, TrendingUp, CalendarCheck, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', members: 400, revenue: 2400 },
  { name: 'Feb', members: 430, revenue: 2600 },
  { name: 'Mar', members: 450, revenue: 2800 },
  { name: 'Apr', members: 490, revenue: 3100 },
  { name: 'May', members: 520, revenue: 3500 },
  { name: 'Jun', members: 580, revenue: 4200 },
];

const StatCard = ({ title, value, trend, icon: Icon, colorClass }) => (
  <div className="glass-card p-6 flex items-center justify-between">
    <div>
      <p className="subtitle mb-1">{title}</p>
      <h3 className="heading-2">{value}</h3>
      <p className={`text-sm mt-2 ${trend.startsWith('+') ? 'text-primary' : 'text-danger'}`}>
        {trend} from last month
      </p>
    </div>
    <div className={`p-4 rounded-full ${colorClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="heading-1">Dashboard</h1>
          <p className="subtitle mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">Download Report</button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Members" 
          value="1,248" 
          trend="+12%" 
          icon={Users} 
          colorClass="bg-primary bg-opacity-20 text-primary" 
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$42,500" 
          trend="+8.5%" 
          icon={TrendingUp} 
          colorClass="bg-secondary bg-opacity-20 text-secondary" 
        />
        <StatCard 
          title="Today's Check-ins" 
          value="342" 
          trend="+5%" 
          icon={CalendarCheck} 
          colorClass="bg-accent bg-opacity-20 text-accent" 
        />
        <StatCard 
          title="Active Classes" 
          value="24" 
          trend="-2%" 
          icon={Activity} 
          colorClass="bg-danger bg-opacity-20 text-danger" 
        />
      </div>

      {/* Charts Area */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="glass-panel p-6 flex-[2]">
          <h3 className="heading-3 mb-6">Revenue & Member Growth</h3>
          <div style={{ height: '300px' }}>
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

        <div className="glass-panel p-6 flex-1">
          <h3 className="heading-3 mb-6">Recent Check-ins</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-medium text-text-primary">Sarah Connor</p>
                    <p className="text-sm text-text-secondary">Pro Plan</p>
                  </div>
                </div>
                <span className="text-sm text-text-muted">10 mins ago</span>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary w-full mt-4">View All</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
