import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Download, Mail, CheckCircle2, 
  RotateCcw, CreditCard, User, History, 
  Trophy, HelpCircle, Dumbbell, Eye
} from 'lucide-react';
import './PaymentDetail.css';
import PageHeader from '../../components/PageHeader/PageHeader';

const BILLING_HISTORY = [
  { id: 'TRX-88291', date: 'OCT 24, 2023', amount: 199.00, status: 'CURRENT' },
  { id: 'TRX-77412', date: 'SEP 24, 2023', amount: 149.00, status: 'PAID' },
  { id: 'TRX-66109', date: 'AUG 24, 2023', amount: 149.00, status: 'PAID' },
];

const PaymentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fmt = (n) => `$${n.toFixed(2)}`;

  return (
    <div className="pd-page">
      <PageHeader
        title="Payment Details"
        actions={[
          {
            label: "Resend Receipt",
            icon: <Mail size={16} />,
            onClick: () => { },
            className: "btn-secondary box-shadow"
          },
          {
            label: "Download PDF",
            icon: <Download size={16} />,
            onClick: () => { },
            className: "btn-primary"
          }
        ]}
      />

      <main className="pd-main-grid">
        <div className="pd-left-column">
          <section className="pd-card card">
            <div className="pd-ref-header">
              <div className="pd-ref-text">
                <span className="pd-ref-label">TRANSACTION REFERENCE</span>
                <h2 className="pd-ref-id">{id || 'TRX-88291'}</h2>
                <p className="pd-ref-date">Processed on Oct 24, 2023 • 14:32 PM</p>
              </div>
              <div className="pd-ref-badges">
                <span className="pd-status-pill paid">PAID</span>
                <div className="pd-stripe-tag">
                   <CheckCircle2 size={12} />
                   <span>Secured via Stripe</span>
                </div>
              </div>
            </div>

            <div className="pd-info-cards">
              <div className="pd-info-card-box">
                <div className="pd-member-display">
                  <img src="https://i.pravatar.cc/150?u=elena" alt="Elena" className="pd-display-avatar" />
                  <div className="pd-display-info">
                    <h3 className="pd-display-name">Elena Rodriguez</h3>
                    <p className="pd-display-plan">Pro Plan Member</p>
                    <p className="pd-display-email">elena.rod@example.com</p>
                  </div>
                </div>
              </div>

              <div className="pd-info-card-box">
                <div className="pd-method-display">
                  <span className="pd-method-label">PAYMENT METHOD</span>
                  <div className="pd-card-row">
                    <div className="pd-card-icon-box">
                      <CreditCard size={20} />
                    </div>
                    <div className="pd-card-details">
                      <p className="pd-card-number">Visa ending in 4242</p>
                      <p className="pd-card-expiry">Expires 08/26</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pd-statement">
              <h4 className="pd-section-title">Statement Items</h4>
              <div className="pd-items-list">
                <div className="pd-item-row">
                  <div className="pd-item-icon-box purple">
                     <Mail size={18} />
                  </div>
                  <div className="pd-item-info">
                    <p className="pd-item-name">Monthly Membership</p>
                    <p className="pd-item-desc">Billing cycle: Oct 2023</p>
                  </div>
                  <span className="pd-item-price">₹149.00</span>
                </div>

                <div className="pd-item-row">
                  <div className="pd-item-icon-box lavender">
                     <Dumbbell size={18} />
                  </div>
                  <div className="pd-item-info">
                    <p className="pd-item-name">Personal Training (1hr)</p>
                    <p className="pd-item-desc">Instructor: Marcus V.</p>
                  </div>
                  <span className="pd-item-price">₹50.00</span>
                </div>
              </div>
            </div>

            <div className="pd-breakdown">
              <div className="pd-price-row">
                <span>Subtotal</span>
                <span>₹199.00</span>
              </div>
              <div className="pd-price-row text-muted">
                <span>Tax (7%)</span>
                <span>₹13.93</span>
              </div>
              <div className="pd-price-row text-purple">
                <span>Discounts</span>
                <span>-₹13.93</span>
              </div>
              <div className="pd-total-row-main">
                <div className="pd-total-label-box">
                  <h2 className="pd-total-label">Total Paid</h2>
                </div>
                <div className="pd-total-value-box">
                  <h2 className="pd-total-amount">₹199.00</h2>
                  <span className="pd-currency">CURRENCY: INR</span>
                </div>
              </div>
            </div>

            <p className="pd-footer-thank">Thank you for being part of the Elite Community.</p>
          </section>
        </div>

        <aside className="pd-right-column">
          <section className="pd-card history-card card">
            <div className="pd-card-header">
               <History size={18} />
               <h3 className="pd-card-title">Recent Billing History</h3>
            </div>
            <div className="pd-timeline">
              {BILLING_HISTORY.map((item, idx) => (
                <div key={idx} className="pd-timeline-item">
                  <div className="pd-timeline-dot-connector">
                    <div className={`pd-timeline-dot ${item.status === 'CURRENT' ? 'active' : ''}`} />
                    {idx !== BILLING_HISTORY.length - 1 && <div className="pd-timeline-line" />}
                  </div>
                  <div className="pd-timeline-content">
                    <div className="pd-timeline-header-row">
                      <span className="pd-timeline-id">{item.id}</span>
                      <span className={`pd-timeline-status ${item.status.toLowerCase()}`}>{item.status}</span>
                    </div>
                    <p className="pd-timeline-date">{item.date}</p>
                    <p className="pd-timeline-amount">{fmt(item.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="pd-btn-full-history btn-secondary">View Full History</button>
          </section>

          {/* Account Standing */}
          <section className="pd-card card">
             <div className="pd-standing-header">
                <p className="pd-standing-label">Account Standing</p>
                <h2 className="pd-standing-tier">Elite Tier</h2>
             </div>
             <div className="pd-standing-stats">
                <div className="pd-standing-item">
                   <span className="pd-standing-key">LTV (Lifetime Value)</span>
                   <span className="pd-standing-val">₹2,840.00</span>
                </div>
                <div className="pd-standing-item">
                   <span className="pd-standing-key">Member Since</span>
                   <span className="pd-standing-val">Jan 2022</span>
                </div>
             </div>
             <div className="pd-progress-box">
                <div className="pd-progress-bar">
                   <div className="pd-progress-fill" style={{ width: '75%' }} />
                </div>
                <p className="pd-progress-text">75% Renewal Likelihood Score</p>
             </div>
          </section>

          {/* Help Box */}
          <section className="pd-card card">
             <div className="pd-help-content">
                <div className="pd-help-text-box">
                   <h4 className="pd-help-title">Need help with this?</h4>
                   <p className="pd-help-sub">Flag billing discrepancy</p>
                </div>
                <div className="pd-help-icon-box">
                   <HelpCircle size={20} />
                </div>
             </div>
          </section>
        </aside>
      </main>
    </div>
  );
};

export default PaymentDetail;
