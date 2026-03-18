import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Download, TrendingUp, TrendingDown,
  CreditCard, CheckCircle2, Clock, AlertCircle, RefreshCw,
  ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import './PaymentRecords.css';

const PAYMENTS_DATA = [
  { id: 'INV-2026-001', member: 'Sarah Connor',   email: 'sarah@example.com',  plan: 'Pro',   amount: 2499, tax: 449, date: '2026-03-15', method: 'UPI',         status: 'Paid',    txnId: 'TXN8823411' },
  { id: 'INV-2026-002', member: 'John Smith',     email: 'john@example.com',   plan: 'Basic', amount: 999,  tax: 179, date: '2026-03-14', method: 'Card',        status: 'Paid',    txnId: 'TXN8823402' },
  { id: 'INV-2026-003', member: 'Emma Wilson',    email: 'emma@example.com',   plan: 'VIP',   amount: 4999, tax: 899, date: '2026-03-13', method: 'Net Banking', status: 'Pending', txnId: 'TXN8823399' },
  { id: 'INV-2026-004', member: 'Michael Brown',  email: 'mike@example.com',   plan: 'Pro',   amount: 2499, tax: 449, date: '2026-03-10', method: 'Card',        status: 'Paid',    txnId: 'TXN8823381' },
  { id: 'INV-2026-005', member: 'Jessica Davis',  email: 'jess@example.com',   plan: 'Basic', amount: 999,  tax: 179, date: '2026-03-08', method: 'UPI',         status: 'Overdue', txnId: 'TXN8823370' },
  { id: 'INV-2026-006', member: 'Robert Taylor',  email: 'robert@example.com', plan: 'VIP',   amount: 4999, tax: 899, date: '2026-03-07', method: 'Card',        status: 'Paid',    txnId: 'TXN8823360' },
  { id: 'INV-2026-007', member: 'Laura Martinez', email: 'laura@example.com',  plan: 'Pro',   amount: 2499, tax: 449, date: '2026-03-05', method: 'Net Banking', status: 'Refunded',txnId: 'TXN8823349' },
  { id: 'INV-2026-008', member: 'Chris Johnson',  email: 'chris@example.com',  plan: 'Basic', amount: 999,  tax: 179, date: '2026-03-03', method: 'UPI',         status: 'Paid',    txnId: 'TXN8823340' },
  { id: 'INV-2026-009', member: 'Anna Garcia',    email: 'anna@example.com',   plan: 'VIP',   amount: 4999, tax: 899, date: '2026-03-01', method: 'Card',        status: 'Pending', txnId: 'TXN8823321' },
  { id: 'INV-2026-010', member: 'David Lee',      email: 'david@example.com',  plan: 'Pro',   amount: 2499, tax: 449, date: '2026-02-28', method: 'UPI',         status: 'Overdue', txnId: 'TXN8823310' },
];

const STATUS_META = {
  Paid:     { cls: 'badge-paid',     icon: CheckCircle2  },
  Pending:  { cls: 'badge-pending',  icon: Clock         },
  Overdue:  { cls: 'badge-overdue',  icon: AlertCircle   },
  Refunded: { cls: 'badge-refunded', icon: RefreshCw     },
};

const METHOD_META = {
  UPI:         'method-upi',
  Card:        'method-card',
  'Net Banking': 'method-nb',
};

const PAGE_SIZE = 7;

const PaymentRecords = () => {
  const navigate = useNavigate();
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState('All');
  const [page, setPage]           = useState(1);

  const filtered = useMemo(() => {
    return PAYMENTS_DATA.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = p.member.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // KPI values
  const totalRevenue = PAYMENTS_DATA.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const paidCount    = PAYMENTS_DATA.filter(p => p.status === 'Paid').length;
  const pendingAmt   = PAYMENTS_DATA.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);
  const overdueAmt   = PAYMENTS_DATA.filter(p => p.status === 'Overdue').reduce((s, p) => s + p.amount, 0);

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

  const handleExport = () => {
    const csv = [
      ['Invoice ID','Member','Email','Plan','Amount','Tax','Date','Method','Status','TxnID'],
      ...PAYMENTS_DATA.map(p => [p.id, p.member, p.email, p.plan, p.amount, p.tax, p.date, p.method, p.status, p.txnId])
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url; a.download = 'payments.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pr-page page-container">

      {/* ── Page Header ── */}
      <header className="pr-header">
        <div>
          <h1 className="heading-1">Payments</h1>
          <p className="subtitle">Track all member payment records and receipts.</p>
        </div>
        <button className="btn btn-primary" onClick={handleExport}>
          <Download size={16} /> Export CSV
        </button>
      </header>

      {/* ── KPI Cards ── */}
      <div className="pr-kpi-grid">
        <div className="pr-kpi-card pr-kpi-revenue glass-card">
          <div className="pr-kpi-icon"><CreditCard size={22} /></div>
          <div>
            <p className="pr-kpi-label">Total Revenue</p>
            <p className="pr-kpi-value">{fmt(totalRevenue)}</p>
            <p className="pr-kpi-trend up"><TrendingUp size={13}/> +12% from last month</p>
          </div>
        </div>
        <div className="pr-kpi-card pr-kpi-paid glass-card">
          <div className="pr-kpi-icon pr-kpi-icon-green"><CheckCircle2 size={22}/></div>
          <div>
            <p className="pr-kpi-label">Paid Invoices</p>
            <p className="pr-kpi-value">{paidCount}</p>
            <p className="pr-kpi-trend up"><TrendingUp size={13}/> 80% collection rate</p>
          </div>
        </div>
        <div className="pr-kpi-card pr-kpi-pending glass-card">
          <div className="pr-kpi-icon pr-kpi-icon-amber"><Clock size={22}/></div>
          <div>
            <p className="pr-kpi-label">Pending</p>
            <p className="pr-kpi-value">{fmt(pendingAmt)}</p>
            <p className="pr-kpi-trend neutral">2 invoices awaiting</p>
          </div>
        </div>
        <div className="pr-kpi-card pr-kpi-overdue glass-card">
          <div className="pr-kpi-icon pr-kpi-icon-red"><AlertCircle size={22}/></div>
          <div>
            <p className="pr-kpi-label">Overdue</p>
            <p className="pr-kpi-value">{fmt(overdueAmt)}</p>
            <p className="pr-kpi-trend down"><TrendingDown size={13}/> 2 members flagged</p>
          </div>
        </div>
      </div>

      {/* ── Table Panel ── */}
      <section className="pr-table-panel glass-panel">

        {/* Filters */}
        <div className="pr-filters">
          <div className="pr-search-box">
            <Search size={16} className="pr-search-icon" />
            <input
              type="text"
              placeholder="Search by name or invoice ID…"
              className="pr-search-input"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="pr-filter-group">
            <Filter size={16} className="pr-filter-icon" />
            {['All','Paid','Pending','Overdue','Refunded'].map(s => (
              <button
                key={s}
                className={`pr-filter-chip ${statusFilter === s ? 'active' : ''}`}
                onClick={() => { setStatus(s); setPage(1); }}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="data-table pr-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Member</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(p => {
                const { cls, icon: Icon } = STATUS_META[p.status];
                return (
                  <tr key={p.id} className="pr-table-row" onClick={() => navigate(`/payments/${p.id}`)}>
                    <td><span className="pr-inv-id">{p.id}</span></td>
                    <td>
                      <div className="pr-member-cell">
                        <img
                          src={`https://ui-avatars.com/api/?name=${p.member.replace(' ','+')}&background=random&size=36`}
                          alt={p.member}
                          className="pr-avatar"
                        />
                        <div>
                          <p className="pr-member-name">{p.member}</p>
                          <p className="pr-member-email">{p.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge ${p.plan === 'VIP' ? 'badge-warning' : p.plan === 'Pro' ? 'badge-success' : 'pr-badge-basic'}`}>{p.plan}</span></td>
                    <td><span className="pr-amount">{fmt(p.amount)}</span></td>
                    <td className="pr-date">{p.date}</td>
                    <td><span className={`pr-method-badge ${METHOD_META[p.method]}`}>{p.method}</span></td>
                    <td>
                      <span className={`badge pr-status-badge ${cls}`}>
                        <Icon size={12} /> {p.status}
                      </span>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="icon-btn" title="View Details" onClick={() => navigate(`/payments/${p.id}`)}>
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="pr-empty">No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pr-pagination">
          <p className="pr-pagination-info">
            Showing <strong>{Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)}</strong> of <strong>{filtered.length}</strong> records
          </p>
          <div className="pr-pagination-controls">
            <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft size={16}/> Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i+1}
                className={`pr-page-num ${page === i+1 ? 'active' : ''}`}
                onClick={() => setPage(i+1)}
              >{i+1}</button>
            ))}
            <button className="btn btn-secondary" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)}>
              Next <ChevronRight size={16}/>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentRecords;
