import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend
} from 'recharts';
import { Download, Calendar, Filter, Plus } from 'lucide-react';
import './Reports.css';

const GROWTH_DATA = [
    { name: 'Mon', new: 4, churn: 1 },
    { name: 'Tue', new: 3, churn: 2 },
    { name: 'Wed', new: 7, churn: 1 },
    { name: 'Thu', new: 5, churn: 0 },
    { name: 'Fri', new: 8, churn: 2 },
    { name: 'Sat', new: 12, churn: 3 },
    { name: 'Sun', new: 10, churn: 1 },
];

const PERFORMANCE_DATA = [
    { subject: 'Member Rating', A: 120, fullMark: 150 },
    { subject: 'Session Attendance', A: 98, fullMark: 150 },
    { subject: 'Revenue Contribution', A: 86, fullMark: 150 },
    { subject: 'Punctuality', A: 99, fullMark: 150 },
    { subject: 'Exercise Tech', A: 85, fullMark: 150 },
    { subject: 'Safety', A: 65, fullMark: 150 },
];

const Reports = () => {
    return (
        <div className="reports-page">
            <div className="page-header">
                <div>
                    <h1 className="heading-1">Reports & Analytics</h1>
                    <p className="subtitle">Data-driven insights for your gym operations.</p>
                </div>
                <div className="header-actions">
                    <div className="date-picker-wrapper glass-panel px-3 py-1 flex items-center gap-2">
                        <Calendar size={16} className="text-secondary" />
                        <span className="text-sm font-medium">Oct 1 - Oct 31, 2023</span>
                    </div>
                    <button className="btn btn-secondary">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            <div className="reports-grid mt-8">
                {/* Growth Analytics */}
                <div className="glass-card p-6 col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="heading-3">Member Growth vs Churn</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <span className="dot bg-primary"></span>
                                <span className="text-xs text-secondary font-medium">New Members</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="dot bg-secondary"></span>
                                <span className="text-xs text-secondary font-medium">Churned</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={GROWTH_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="new" fill="#52b7a6" radius={[4, 4, 0, 0]} barSize={30} />
                                <Bar dataKey="churn" fill="#f6ad55" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Trainer Performance */}
                <div className="glass-card p-6">
                    <h3 className="heading-3 mb-6">Trainer Performance Index</h3>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PERFORMANCE_DATA}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                    name="Quality"
                                    dataKey="A"
                                    stroke="#52b7a6"
                                    fill="#52b7a6"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Heatmap Placeholder */}
                <div className="glass-card p-6 col-span-3">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="heading-3">Weekly Attendance Peak Hours</h3>
                        <button className="text-primary text-sm font-semibold hover:underline">View Detailed View</button>
                    </div>
                    <div className="attendance-heatmap">
                        <div className="heatmap-header flex">
                            <div className="w-16"></div>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <div key={day} className="flex-1 text-center text-xs text-muted font-bold">{day}</div>
                            ))}
                        </div>
                        <div className="heatmap-body mt-2">
                            {['6 AM', '10 AM', '2 PM', '6 PM', '10 PM'].map((time, i) => (
                                <div key={time} className="flex items-center mb-1">
                                    <div className="w-16 text-xs text-muted font-medium">{time}</div>
                                    {[1, 2, 3, 4, 5, 6, 7].map(day => {
                                        const opacity = Math.random();
                                        return (
                                            <div
                                                key={day}
                                                className="flex-1 h-10 rounded-sm m-0.5"
                                                style={{ backgroundColor: `rgba(82, 183, 166, ${opacity})` }}
                                                title={`${time} ${day}: ${Math.floor(opacity * 100)}% Capacity`}
                                            ></div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
