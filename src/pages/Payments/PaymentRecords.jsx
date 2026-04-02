import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, Download, TrendingUp, TrendingDown,
  CreditCard, CheckCircle2, Clock, AlertCircle, RefreshCw,
  ChevronLeft, ChevronRight, Eye, Plus
} from 'lucide-react';
import './PaymentRecords.css';
import KpiCard from '../../components/KpiCard/KpiCard';
import PageHeader from '../../components/PageHeader/PageHeader';
import Dropdown from '../../components/Dropdown/Dropdown';

const PAYMENTS_DATA = [
  { id: 'TRX-88291', member: 'Elena Rodriguez', method: 'Visa •••• 4242', amount: 199.00, status: 'COMPLETED', date: 'Oct 24, 10:15 AM', avatar: 'https://i.pravatar.cc/150?u=elena' },
  { id: 'TRX-88290', member: 'Marcus Thorne', method: 'Apple Pay', amount: 145.00, status: 'PENDING', date: 'Oct 24, 09:42 AM', avatar: 'https://i.pravatar.cc/150?u=marcus' },
  { id: 'TRX-88289', member: 'Sophia Chen', method: 'Mastercard •••• 8812', amount: 299.00, status: 'COMPLETED', date: 'Oct 23, 04:15 PM', avatar: 'https://i.pravatar.cc/150?u=sophia' },
  { id: 'TRX-88288', member: 'James Wilson', method: 'Visa •••• 1009', amount: 89.00, status: 'REFUNDED', date: 'Oct 23, 01:22 PM', avatar: 'https://i.pravatar.cc/150?u=james' },
  { id: 'TRX-88287', member: 'Isabella Ross', method: 'Google Pay', amount: 199.00, status: 'COMPLETED', date: 'Oct 22, 11:30 AM', avatar: 'https://i.pravatar.cc/150?u=isabella' },
];

const PaymentRecords = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(PAYMENTS_DATA[0]);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [timeFilter, setTimeFilter] = useState('Last 30 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredPayments = PAYMENTS_DATA.filter(payment => {
    const matchesSearch = payment.member.toLowerCase().includes(searchQuery.toLowerCase()) || payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage) || 1;
  const currentPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    const csv = [
      ['Transaction ID', 'Member', 'Method', 'Amount', 'Status', 'Date'],
      ...PAYMENTS_DATA.map(p => [p.id, p.member, p.method, p.amount, p.status, p.date])
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'payments.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const fmt = (n) => `$${n.toFixed(2)}`;

  const timeLine = ["Last 30 Days", "Last 7 Days", "Last 12 Months"]
  const paymentStatus = ["All Status", "COMPLETED", "PENDING", "REFUNDED"]

  return (
    <div className="pr-page page-container">
      {/* ── Page Header ── */}
      <PageHeader
        title="Payment Management"
        subtitle="Track all member payment records and receipts."
        actions={[
          {
            label: "Export CSV",
            icon: <Download size={16} />,
            onClick: { handleExport },
            className: "btn-primary"
          }
        ]}
      />

      {/* ── KPI Cards ── */}
      <div className="pr-kpi-grid">
        <KpiCard title="Total Revenue" value="$42,850.00" theme="blue" Icon={CreditCard} />
        <KpiCard title="Paid Invoices" value="1,240" theme="orange" Icon={CheckCircle2} />
        <KpiCard title="Pending" value="$2,450.00" theme="teal" Icon={Clock} />
        <KpiCard title="Overdue" value="$890.00" theme="purple" Icon={AlertCircle} />
      </div>

      {/* ── Filter Bar ── */}
      <div className="pr-action-bar">
        <div className="pr-filters-container">
          <div className="search-bar-wrapper" >
            <Search size={16} className="search-icon-inline" style={{ color: 'var(--text-secondary)', marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search by ID or Member..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>

          <div className="pr-dropdown-group">

            <Dropdown
              label={timeFilter}
              actions={[{
                label: "Clear",
                onClick: () => setTimeFilter("All Plans")
              },
              ...timeLine.map(g => ({
                label: g,
                onClick: () => setTimeFilter(g)
              }))
              ]}
            />
            <Dropdown
              label={statusFilter || "All Status"}
              actions={[{
                label: "Clear",
                onClick: () => setStatusFilter("")
              },
              ...paymentStatus.map(g => ({
                label: g,
                onClick: () => setStatusFilter(g)
              }))
              ]}
            />

          </div>
        </div>

      </div>

      {/* ── Main Content Split ── */}
      <main className="pr-main-layout">
        <div className="table-container-wrapper">
          <table className="table-container">
            <thead>
              <tr>
                <th>TRANSACTION ID</th>
                <th>MEMBER</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No payments found.</td>
                </tr>
              )}
              {currentPayments.map(payment => (
                <tr
                  key={payment.id}
                  className={`pr-table-row ${selectedPayment?.id === payment.id ? 'active' : ''}`}
                  onClick={() => setSelectedPayment(payment)}
                >
                  <td>
                    <div className="pr-id-cell">
                      <span className="pr-row-id">{payment.id}</span>
                      <span className="pr-row-date">{payment.date}</span>
                    </div>
                  </td>
                  <td>
                    <div className="pr-member-cell">
                      <img src={payment.avatar} alt={payment.member} className="pr-row-avatar" />
                      <div className="pr-member-info">
                        <span className="pr-row-name">{payment.member}</span>
                        <span className="pr-row-method">{payment.method}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="pr-row-amount">{fmt(payment.amount)}</span>
                  </td>
                  <td>
                    <span className={`pr-status-pill ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-footer" >
            <span>Showing {filteredPayments.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of {filteredPayments.length} transactions</span>
            <div className='pagination-btn-wrapper'>
              <button className='pagination-btn' onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} >Prev</button>
              <button className='pagination-btn' onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} >Next</button>
            </div>
          </div>
        </div>

        {/* ── Receipt Preview Sidebar ── */}
        <aside className="pr-receipt-sidebar card">
          {selectedPayment && (
            <div className="pr-receipt">
              <div className="pr-receipt-header">
                <div className="pr-receipt-title-group">
                  <p className="pr-receipt-label">RECEIPT PREVIEW</p>
                  <h2 className="pr-receipt-name">{selectedPayment.member}</h2>
                </div>
                <button onClick={() => navigate(`/payments/${selectedPayment.id}`)} className="pr-receipt-icon-box">
                  <Eye size={20} className="pr-receipt-main-icon" />
                </button>
              </div>

              <div className="pr-receipt-info-grid">
                <div className="pr-receipt-status-line">
                  <span className="pr-receipt-status-label">STATUS</span>
                  <span className="pr-receipt-status-value">
                    <CheckCircle2 size={14} /> Paid in Full
                  </span>
                </div>
                <div className="pr-receipt-info-item">
                  <span className="pr-receipt-info-label">DATE</span>
                  <span className="pr-receipt-info-value">{selectedPayment.date}</span>
                </div>
                <div className="pr-receipt-info-item">
                  <span className="pr-receipt-info-label">REFERENCE</span>
                  <span className="pr-receipt-info-value">{selectedPayment.id}-ER</span>
                </div>
              </div>

              <div className="pr-receipt-breakdown">
                <div className="pr-breakdown-row">
                  <span>Monthly Membership</span>
                  <span>$149.00</span>
                </div>
                <div className="pr-breakdown-row">
                  <span>Personal Training (1hr)</span>
                  <span>$50.00</span>
                </div>
              </div>

              <div className="pr-receipt-total-box">
                <div className="pr-total-main">
                  <span className="pr-total-label">TOTAL PAID</span>
                  <div className="pr-total-value-row">
                    <span className="pr-total-amount">{fmt(selectedPayment.amount)}</span>
                    <div className="pr-tax-info">
                      <span>TAX</span>
                      <span>INCLUDED</span>
                      <span className="pr-tax-amt">$14.20</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pr-receipt-actions">
                <button className="pr-btn-email">Send to Email</button>
                <button className="pr-btn-download">
                  <Download size={20} />
                </button>
              </div>

              <p className="pr-receipt-footer">
                Generated by Elite Club Financial Engine. Authorized for administrative use only.
              </p>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

export default PaymentRecords;
