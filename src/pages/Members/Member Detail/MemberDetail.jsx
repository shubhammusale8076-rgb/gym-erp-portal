import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Edit2, Snowflake, MoreHorizontal, 
  CheckCircle2, ChevronRight, CreditCard, Coffee, 
  Bell, FileText, Key, XCircle, ArrowRight
} from 'lucide-react';
import './MemberDetail.css';

const MemberDetail = () => {
  const { id } = useParams();

  return (
    <div className="member-detail-page">
      
      {/* Profile Header Section */}
      <section className="profile-header-section">
        <div className="profile-info-wrapper">
          <div className="profile-image-container">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop" 
              alt="Elena Rodriguez" 
              className="profile-image" 
            />
            <span className="tier-badge">ELITE TIER</span>
          </div>
          
          <div className="profile-details">
            <div className="member-id-pill">MEMBER ID: #AUR-9872</div>
            <h1 className="detail-page-member-name">Elena<br/>Rodriguez</h1>
            
            <div className="member-contact-info">
              <div className="contact-item">
                <Mail size={14} className="contact-icon" />
                <span>elena.r@lifestyle.com</span>
              </div>
              <div className="contact-item">
                <Phone size={14} className="contact-icon" />
                <span>+1 (555) 892-0043</span>
              </div>
              <div className="contact-item">
                <MapPin size={14} className="contact-icon" />
                <span>Manhattan, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-action-buttons">
          <button className="btn-edit-profile">
            <Edit2 size={14} /> Edit Profile
          </button>
          <button className="btn-freeze-account">
            <Snowflake size={14} /> Freeze Account
          </button>
          <button className="btn-more-options">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </section>

      {/* KPI Cards Section */}
     {/* KPI Cards Section */}
        <section className="kpi-cards-section">
          <div className="kpi-card join-date">
            <div className="kpi-top">
              <span className="kpi-title">JOIN DATE</span>
              <div className="kpi-icon-circle">
                <span className="material-symbols-outlined">groups</span>
              </div>
            </div>
            <h3 className="kpi-number">Mar 2022</h3>
            <p className="kpi-text">Loyalty Member (2.4 yrs)</p>
            <div className="kpi-wave"></div>
          </div>

          <div className="kpi-card expiry">
            <div className="kpi-top">
              <span className="kpi-title">MEMBERSHIP EXPIRY</span>
              <div className="kpi-icon-circle">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
            </div>
            <h3 className="kpi-number">Apr 2025</h3>
            <p className="kpi-text">Auto-renew active</p>
            <div className="kpi-wave"></div>
          </div>

          <div className="kpi-card attendance">
            <div className="kpi-top">
              <span className="kpi-title">TOTAL ATTENDANCE</span>
              <div className="kpi-icon-circle">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
            </div>
            <h3 className="kpi-number">412</h3>
            <p className="kpi-text">Check-ins since registration</p>
            <div className="kpi-wave"></div>
          </div>

          <div className="kpi-card balance">
            <div className="kpi-top">
              <span className="kpi-title">ACCOUNT BALANCE</span>
              <div className="kpi-icon-circle">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
            </div>
            <h3 className="kpi-number">$180.00</h3>
            <p className="kpi-text">Pre-paid spa credits</p>
            <div className="kpi-wave"></div>
          </div>
        </section>

      {/* Main Content Grid */}
      <section className="main-content-grid">
        
        {/* Left Column */}
        <div className="content-left-col">
          
          <div className="section-block">
            <h3 className="section-title">Plan Configuration</h3>
            <div className="plan-card">
              <h4 className="plan-name">Elite Curator</h4>
              <p className="plan-desc">Tailored wellness experience for the high-achieving individual.</p>
              
              <ul className="plan-features">
                <li><span className="feature-icon-wrapper"><CheckCircle2 size={12} strokeWidth={3} /></span> Personal Wellness Concierge</li>
                <li><span className="feature-icon-wrapper"><CheckCircle2 size={12} strokeWidth={3} /></span> 24/7 Premium Club Access</li>
                <li><span className="feature-icon-wrapper"><CheckCircle2 size={12} strokeWidth={3} /></span> Unlimited Recovery & Spa Suite</li>
                <li><span className="feature-icon-wrapper"><CheckCircle2 size={12} strokeWidth={3} /></span> 4 Guest Monthly Passes</li>
              </ul>
              
              <button className="btn-upgrade-plan">
                Upgrade Plan Options <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="section-block">
            <h3 className="section-title">Recent Transactions</h3>
            <div className="transactions-list">
              <div className="transaction-item">
                <div className="tx-icon-wrapper"><CreditCard size={18} /></div>
                <div className="tx-details">
                  <span className="tx-title">Monthly Subscription</span>
                  <span className="tx-date">Oct 1, 2023</span>
                </div>
                <div className="tx-amount-status">
                  <span className="tx-amount negative">-$350.00</span>
                  <span className="tx-status success">SUCCESS</span>
                </div>
              </div>
              <div className="transaction-item">
                <div className="tx-icon-wrapper"><Coffee size={18} /></div>
                <div className="tx-details">
                  <span className="tx-title">Aura Juice Bar</span>
                  <span className="tx-date">Sep 28, 2023</span>
                </div>
                <div className="tx-amount-status">
                  <span className="tx-amount negative">-$12.50</span>
                  <span className="tx-status success">SUCCESS</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="content-right-col">
          
          <div className="section-block">
            <h3 className="section-title">Attendance Timeline</h3>
            <div className="timeline-container">
              
              <div className="timeline-item">
                <div className="timeline-marker default"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-time">YESTERDAY, 07:15 AM</span>
                    <span className="timeline-badge completed">Completed</span>
                  </div>
                  <h4 className="timeline-class">Vinyasa Yoga: Morning Ritual</h4>
                  <p className="timeline-instructor">Studio A • Instructor: Marc Ohara</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker light"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-time">OCT 03, 18:45 PM</span>
                    <span className="timeline-badge completed">Completed</span>
                  </div>
                  <h4 className="timeline-class">Zen Flow Meditation</h4>
                  <p className="timeline-instructor">Garden Terrace • Instructor: Sarah Ling</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker light"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-time">OCT 02, 08:30 AM</span>
                    <span className="timeline-badge completed">Completed</span>
                  </div>
                  <h4 className="timeline-class">Elite Performance Personal Training</h4>
                  <p className="timeline-instructor">Personal Suite 2 • Trainer: David Blake</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-marker dark"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-time">TOMORROW, 06:00 PM</span>
                    <span className="timeline-badge upcoming">Upcoming</span>
                  </div>
                  <h4 className="timeline-class">Candlelight Yin Yoga</h4>
                  <p className="timeline-instructor">Studio B • Instructor: Elena Rodriguez (Self)</p>
                </div>
              </div>

            </div>
          </div>

          <div className="financial-overview-card">
            <h3 className="financial-title">Financial Overview</h3>
            <div className="financial-details">
              <div className="financial-data-block">
                <span className="data-label">NEXT PAYMENT</span>
                <span className="data-value">Nov 01, 2023</span>
              </div>
              <div className="financial-data-block">
                <span className="data-label">AMOUNT DUE</span>
                <span className="data-value">$350.00</span>
              </div>
              <button className="btn-pay-now">Pay Now</button>
            </div>
          </div>

        </div>

      </section>

      {/* Footer / Admin Section */}
      <section className="admin-control-section">
        <div className="admin-buttons-row">
          <span className="admin-label">Administrative Control Panel:</span>
          <button className="btn-admin"><Bell size={16} /> Send Notification</button>
          <button className="btn-admin"><FileText size={16} /> Full Audit Log</button>
          <button className="btn-admin"><Key size={16} /> Reset Password</button>
        </div>
        <button className="btn-terminate">
          <XCircle size={16} /> Terminate Membership
        </button>
      </section>

    </div>
  );
};

export default MemberDetail;