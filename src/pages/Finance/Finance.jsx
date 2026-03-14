import React from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    FileText,
    RefreshCcw,
    Download,
    Plus
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import './Finance.css';

const REVENUE_DATA = [
    { month: 'Jan', revenue: 32000, expenses: 10000 },
    { month: 'Feb', revenue: 35000, expenses: 11000 },
    { month: 'Mar', revenue: 38000, expenses: 12000 },
    { month: 'Apr', revenue: 34000, expenses: 11500 },
    { month: 'May', revenue: 42000, expenses: 12500 },
    { month: 'Jun', revenue: 45200, expenses: 12800 },
];

const PLAN_DATA = [
    { name: 'Elite', value: 55 },
    { name: 'Pro', value: 30 },
    { name: 'Basic', value: 15 },
];

const COLORS = ['#52b7a6', '#f6ad55', '#f56565'];

const TRANSACTIONS = [
    { id: 'TRX-001', member: 'John Doe', plan: 'Elite', amount: '$150.00', date: '2026-06-12', method: 'Stripe', status: 'Success' },
    { id: 'TRX-002', member: 'Jane Smith', plan: 'Pro', amount: '$99.00', date: '2026-06-11', method: 'Cash', status: 'Success' },
    { id: 'TRX-003', member: 'Mike Jones', plan: 'Basic', amount: '$49.00', date: '2026-06-11', method: 'PayPal', status: 'Pending' },
    { id: 'TRX-004', member: 'Sarah Wilson', plan: 'Elite', amount: '$150.00', date: '2026-06-10', method: 'Stripe', status: 'Success' },
    { id: 'TRX-005', member: 'Tom Brown', plan: 'Pro', amount: '$99.00', date: '2026-06-10', method: 'Cash', status: 'Failed' },
];

const Finance = () => {
    return (
        <div className="finance-page">
            <div className="page-header">
                <div>
                    <h1 className="heading-1">Finance Overview</h1>
                    <p className="subtitle">Manage and track your gym's financial health.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <Download size={18} /> Export PDF
                    </button>
                    <button className="btn btn-primary">
                        <Plus size={18} /> Add Transaction
                    </button>
                </div>
            </div>

            <div className="kpi-grid">
                <div className="glass-card kpi-card">
                    <div className="kpi-icon revenue-bg">
                        <DollarSign size={24} />
                    </div>
                    <div className="kpi-info">
                        <p className="kpi-label">Total Revenue</p>
                        <h2 className="kpi-value">$45,200.00</h2>
                        <span className="kpi-trend positive"><TrendingUp size={14} /> +5.2%</span>
                    </div>
                </div>

                <Link to="/invoices" className="glass-card kpi-card hover:border-primary transition-all">
                    <div className="kpi-icon pending-bg">
                        <FileText size={24} />
                    </div>
                    <div className="kpi-info">
                        <p className="kpi-label">Pending Invoices</p>
                        <h2 className="kpi-value">12</h2>
                        <span className="kpi-trend text-secondary">Outstanding</span>
                    </div>
                </Link>

                <div className="glass-card kpi-card">
                    <div className="kpi-icon renewal-bg">
                        <RefreshCcw size={24} />
                    </div>
                    <div className="kpi-info">
                        <p className="kpi-label">Upcoming Renewals</p>
                        <h2 className="kpi-value">85</h2>
                        <span className="kpi-trend text-primary">In 30 days</span>
                    </div>
                </div>

                <div className="glass-card kpi-card">
                    <div className="kpi-icon expense-bg">
                        <TrendingDown size={24} />
                    </div>
                    <div className="kpi-info">
                        <p className="kpi-label">Operating Expenses</p>
                        <h2 className="kpi-value">$12,800.00</h2>
                        <span className="kpi-trend negative"><TrendingUp size={14} /> +1.2%</span>
                    </div>
                </div>
            </div>

            <div className="charts-grid">
                <div className="glass-card chart-container">
                    <h3 className="heading-3 mb-4">Revenue vs Expenses</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <LineChart data={REVENUE_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#52b7a6" strokeWidth={3} dot={{ r: 4, fill: '#52b7a6' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="expenses" stroke="#f6ad55" strokeWidth={3} dot={{ r: 4, fill: '#f6ad55' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card chart-container">
                    <h3 className="heading-3 mb-4">Revenue by Plan</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={PLAN_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {PLAN_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="pie-legend">
                        {PLAN_DATA.map((item, index) => (
                            <div key={item.name} className="legend-item">
                                <span className="legend-dot" style={{ backgroundColor: COLORS[index] }}></span>
                                <span className="legend-label">{item.name}</span>
                                <span className="legend-value">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-card table-section mt-8">
                <h3 className="heading-3 mb-4">Recent Transactions</h3>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Member</th>
                                <th>Plan</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TRANSACTIONS.map((trx) => (
                                <tr key={trx.id}>
                                    <td className="font-medium">{trx.id}</td>
                                    <td>{trx.member}</td>
                                    <td>{trx.plan}</td>
                                    <td>{trx.amount}</td>
                                    <td>{trx.date}</td>
                                    <td>{trx.method}</td>
                                    <td>
                                        <span className={`badge ${trx.status === 'Success' ? 'badge-success' :
                                            trx.status === 'Pending' ? 'badge-warning' : 'badge-danger'
                                            }`}>
                                            {trx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Finance;
