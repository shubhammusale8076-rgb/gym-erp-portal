import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Download, Mail, CheckCircle2, Clock,
  AlertCircle, RefreshCw, X, Send, Printer, Dumbbell
} from 'lucide-react';
import './PaymentDetail.css';

const PAYMENTS_DATA = [
  { id: 'INV-2026-001', member: 'Sarah Connor',   email: 'sarah@example.com',  plan: 'Pro',   amount: 2499, tax: 449,  date: '2026-03-15', dueDate: '2026-04-15', method: 'UPI',         status: 'Paid',    txnId: 'TXN8823411' },
  { id: 'INV-2026-002', member: 'John Smith',     email: 'john@example.com',   plan: 'Basic', amount: 999,  tax: 179,  date: '2026-03-14', dueDate: '2026-04-14', method: 'Card',        status: 'Paid',    txnId: 'TXN8823402' },
  { id: 'INV-2026-003', member: 'Emma Wilson',    email: 'emma@example.com',   plan: 'VIP',   amount: 4999, tax: 899,  date: '2026-03-13', dueDate: '2026-04-13', method: 'Net Banking', status: 'Pending', txnId: 'TXN8823399' },
  { id: 'INV-2026-004', member: 'Michael Brown',  email: 'mike@example.com',   plan: 'Pro',   amount: 2499, tax: 449,  date: '2026-03-10', dueDate: '2026-04-10', method: 'Card',        status: 'Paid',    txnId: 'TXN8823381' },
  { id: 'INV-2026-005', member: 'Jessica Davis',  email: 'jess@example.com',   plan: 'Basic', amount: 999,  tax: 179,  date: '2026-03-08', dueDate: '2026-03-22', method: 'UPI',         status: 'Overdue', txnId: 'TXN8823370' },
  { id: 'INV-2026-006', member: 'Robert Taylor',  email: 'robert@example.com', plan: 'VIP',   amount: 4999, tax: 899,  date: '2026-03-07', dueDate: '2026-04-07', method: 'Card',        status: 'Paid',    txnId: 'TXN8823360' },
  { id: 'INV-2026-007', member: 'Laura Martinez', email: 'laura@example.com',  plan: 'Pro',   amount: 2499, tax: 449,  date: '2026-03-05', dueDate: '2026-04-05', method: 'Net Banking', status: 'Refunded',txnId: 'TXN8823349' },
  { id: 'INV-2026-008', member: 'Chris Johnson',  email: 'chris@example.com',  plan: 'Basic', amount: 999,  tax: 179,  date: '2026-03-03', dueDate: '2026-04-03', method: 'UPI',         status: 'Paid',    txnId: 'TXN8823340' },
  { id: 'INV-2026-009', member: 'Anna Garcia',    email: 'anna@example.com',   plan: 'VIP',   amount: 4999, tax: 899,  date: '2026-03-01', dueDate: '2026-04-01', method: 'Card',        status: 'Pending', txnId: 'TXN8823321' },
  { id: 'INV-2026-010', member: 'David Lee',      email: 'david@example.com',  plan: 'Pro',   amount: 2499, tax: 449,  date: '2026-02-28', dueDate: '2026-03-15', method: 'UPI',         status: 'Overdue', txnId: 'TXN8823310' },
];

const STATUS_META = {
  Paid:     { cls: 'badge-paid',     icon: CheckCircle2, label: 'Payment Confirmed' },
  Pending:  { cls: 'badge-pending',  icon: Clock,        label: 'Awaiting Payment'  },
  Overdue:  { cls: 'badge-overdue',  icon: AlertCircle,  label: 'Payment Overdue'   },
  Refunded: { cls: 'badge-refunded', icon: RefreshCw,    label: 'Amount Refunded'   },
};

const fmt  = (n) => `₹${n.toLocaleString('en-IN')}`;

const PaymentDetail = () => {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [showEmail, setShowEmail]   = useState(false);
  const [emailTo, setEmailTo]       = useState('');
  const [sent, setSent]             = useState(false);
  const [sending, setSending]       = useState(false);

  const payment = PAYMENTS_DATA.find(p => p.id === id);

  if (!payment) {
    return (
      <div className="pd-not-found">
        <AlertCircle size={48} />
        <h2>Invoice not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/payments')}>Back to Payments</button>
      </div>
    );
  }

  const { cls, icon: StatusIcon, label } = STATUS_META[payment.status];
  const subtotal = payment.amount;
  const tax      = payment.tax;
  const total    = subtotal + tax;

  const handlePrint = () => window.print();

  const handleSendEmail = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => { setSent(false); setShowEmail(false); }, 2500);
    }, 1500);
  };

  return (
    <div className="pd-page page-container">

      {/* ── Top Bar ── */}
      <div className="pd-topbar no-print">
        <button className="pd-back-btn" onClick={() => navigate('/payments')}>
          <ArrowLeft size={18} /> Back to Payments
        </button>
        <div className="pd-topbar-actions">
          <button className="btn btn-secondary" onClick={() => { setEmailTo(payment.email); setShowEmail(true); }}>
            <Mail size={16} /> Send Receipt
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} /> Download Receipt
          </button>
        </div>
      </div>

      {/* ── Receipt Card ── */}
      <div className="pd-receipt-wrapper">
        <div className="pd-receipt" id="receipt-print">

          {/* Receipt Header */}
          <div className="pd-receipt-head">
            <div className="pd-brand">
              <div className="pd-brand-icon"><Dumbbell size={20}/></div>
              <div>
                <h2 className="pd-brand-name">GymSync</h2>
                <p className="pd-brand-sub">Professional Fitness Center</p>
              </div>
            </div>
            <div className="pd-receipt-meta">
              <h3 className="pd-receipt-title">RECEIPT</h3>
              <p className="pd-invoice-id">{payment.id}</p>
              <span className={`badge pr-status-badge ${cls} pd-status-badge`}>
                <StatusIcon size={12} /> {payment.status}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="pd-divider"/>

          {/* Member + Payment Info */}
          <div className="pd-info-grid">
            <div className="pd-info-col">
              <p className="pd-info-label">Billed To</p>
              <div className="pd-member-row">
                <img
                  src={`https://ui-avatars.com/api/?name=${payment.member.replace(' ','+')}&background=1d1d2b&color=d4ff3d&size=48`}
                  alt={payment.member}
                  className="pd-member-avatar"
                />
                <div>
                  <p className="pd-member-name">{payment.member}</p>
                  <p className="pd-member-email">{payment.email}</p>
                </div>
              </div>
            </div>
            <div className="pd-info-col pd-info-right">
              <div className="pd-detail-row">
                <span className="pd-detail-key">Issue Date</span>
                <span className="pd-detail-val">{payment.date}</span>
              </div>
              <div className="pd-detail-row">
                <span className="pd-detail-key">Due Date</span>
                <span className="pd-detail-val">{payment.dueDate}</span>
              </div>
              <div className="pd-detail-row">
                <span className="pd-detail-key">Payment Method</span>
                <span className="pd-detail-val pd-method">{payment.method}</span>
              </div>
              <div className="pd-detail-row">
                <span className="pd-detail-key">Transaction ID</span>
                <span className="pd-detail-val pd-txn">{payment.txnId}</span>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="pd-line-items">
            <div className="pd-line-header">
              <span>Description</span>
              <span>Plan</span>
              <span>Amount</span>
            </div>
            <div className="pd-line-row">
              <span>Gym Membership Subscription</span>
              <span>{payment.plan}</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="pd-line-row pd-line-dimmed">
              <span>GST / Tax (18%)</span>
              <span>—</span>
              <span>{fmt(tax)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="pd-total-row">
            <span className="pd-total-label">Total Amount</span>
            <span className="pd-total-value">{fmt(total)}</span>
          </div>

          {/* Perforated bottom + footer */}
          <div className="pd-perf-line"/>
          <div className="pd-receipt-foot">
            <p className="pd-foot-status">{label}</p>
            <p className="pd-foot-note">Thank you for being a GymSync member. Keep pushing your limits! 💪</p>
          </div>
        </div>

        {/* Side summary (no-print) */}
        <div className="pd-side-panel no-print">
          <div className="pd-side-card glass-card">
            <h4 className="pd-side-title">Payment Summary</h4>
            <div className="pd-side-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="pd-side-row"><span>GST (18%)</span><span>{fmt(tax)}</span></div>
            <div className="pd-side-total"><span>Total</span><span>{fmt(total)}</span></div>
          </div>
          <div className="pd-side-card glass-card pd-side-actions-card">
            <h4 className="pd-side-title">Actions</h4>
            <button className="btn btn-primary pd-action-btn" onClick={handlePrint}>
              <Download size={16}/> Download Receipt
            </button>
            <button className="btn btn-secondary pd-action-btn" onClick={() => { setEmailTo(payment.email); setShowEmail(true); }}>
              <Mail size={16}/> Send via Email
            </button>
          </div>
        </div>
      </div>

      {/* ── Email Modal ── */}
      {showEmail && (
        <div className="pd-modal-overlay" onClick={() => setShowEmail(false)}>
          <div className="pd-modal" onClick={e => e.stopPropagation()}>
            <div className="pd-modal-header">
              <h3>Send Receipt by Email</h3>
              <button className="pd-modal-close" onClick={() => setShowEmail(false)}><X size={18}/></button>
            </div>
            <p className="pd-modal-sub">A copy of <strong>{payment.id}</strong> will be sent to:</p>
            <div className="input-group">
              <label className="input-label">Recipient Email</label>
              <input
                className="input-field"
                type="email"
                value={emailTo}
                onChange={e => setEmailTo(e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            {sent ? (
              <div className="pd-toast-success">
                <CheckCircle2 size={18}/> Receipt sent successfully!
              </div>
            ) : (
              <button
                className="btn btn-primary pd-modal-send-btn"
                onClick={handleSendEmail}
                disabled={!emailTo || sending}
              >
                {sending ? <span className="pd-spinner"/> : <Send size={15}/>}
                {sending ? 'Sending…' : 'Send Receipt'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetail;
