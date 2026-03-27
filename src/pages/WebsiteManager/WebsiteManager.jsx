import React from 'react';
import {
  Pencil,
  Gauge,
  Activity,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  MessageSquare,
  Clock,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';
import './WebsiteManager.css';
import PageHeader from '../../components/PageHeader/PageHeader';

const WebsiteManager = () => {
  const bars = [25, 50, 75, 100, 125];

  return (
    <div className="website-manager-container">

      <PageHeader
        title="Website Manager"
        subtitle="Curate your club's digital presence. Manage content, analyze reach, and maintain your elite brand standards."
        actions={[]}
      />

      {/* Top Row: Preview & SEO */}
      <div className="wm-top-row">
        <div
          className="live-preview-card box-shadow"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1000&auto=format&fit=crop")' }}
        >
          <div className="live-badge">LIVE PREVIEW</div>
          <div className="preview-info">
            <div className="preview-text">
              <h2 className="preview-title">Homepage Hero v2.4</h2>
              <p className="preview-meta">Last published 2 hours ago by Sarah J.</p>
            </div>
            <button className="edit-site-btn">
              <Pencil size={18} /> Edit Live Site
            </button>
          </div>
        </div>

        <div className="seo-health-card box-shadow">
          <div className="seo-header">
            <div className="seo-icon-box">
              <Gauge size={24} />
            </div>
            <div className="score-display">
              <div className="score-label">Performance</div>
              <div className="score-main">98<span className="score-total">/100</span></div>
            </div>
          </div>
          <div className="seo-body">
            <h3 className="seo-title">SEO Health Status</h3>
            <div className="seo-progress-container">
              <div className="seo-progress-bg">
                <div className="seo-progress-bar" style={{ width: '92%' }}></div>
              </div>
              <span className="seo-percent">92%</span>
            </div>
            <p className="seo-desc">
              All core vitals are within elite parameters. Search visibility increased by 12% this week.
            </p>
          </div>
        </div>
      </div>

      {/* Middle Row: Engagement Analytics */}
      <div className="engagement-card">
        <div className="card-header-flex">
          <h3 className="analytics-title">Engagement Analytics</h3>
          <button className="download-link"><Download size={16} /> Download Report</button>
        </div>

        <div className="analytics-grid">
          <div className="stat-item">
            <div className="stat-label-caps">
              Weekly Unique Visitors
            </div>
            <div className="stat-main-flex">
              <div className="stat-val-large">14,280</div>
              <div className="stat-trend">~8%</div>
            </div>
            <div className="mini-chart">
              {bars.map((height, i) => (
                <div
                  key={i}
                  className={`chart-bar ${i === bars.length - 1 ? 'active' : ''}`}
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="stat-item">
            <div className="stat-label-caps">Conversion Rate</div>
            <div className="stat-main-flex">
              <div className="stat-val-large">4.2%</div>
              <div className="stat-trend">~1.5%</div>
            </div>
            <div className="ref-info">Leads to Membership</div>
          </div>

          {/* Top Source */}
          <div className="stat-item">
            <div className="stat-label-caps">Top Referring Source</div>
            <div className="stat-main-flex">
              <div className="stat-val-large">Instagram</div>
            </div>
            <div className="ref-info">
              <span className="purple-dot"></span> 64% of total social traffic
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Content & Activity */}
      <div className="wm-bottom-row">
        <div className="wm-content-slots card">
          <h3 className="content-slots-title">Content Slots</h3>
          <div className="slots-list">
            <div className="slot-item">
              <div className="slot-image">
                <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop" alt="Hero" />
              </div>
              <div className="slot-content">
                <div className="slot-label-mini">Hero Announcement</div>
                <h4 className="slot-title">New Aura Wellness Spa Opening</h4>
                <p className="slot-meta">Live in 3 sections on homepage</p>
              </div>
              <ChevronRight className="slot-arrow" size={20} />
            </div>

            <div className="slot-item">
              <div className="slot-icon-box">
                <TrendingUp size={32} />
              </div>
              <div className="slot-content">
                <div className="slot-label-mini">Elite Summer</div>
                <h4 className="slot-title">Complimentary Guest Pass Drive</h4>
                <p className="slot-meta">Active Promotion • 12 Days remaining</p>
              </div>
              <ChevronRight className="slot-arrow" size={20} />
            </div>

            <div className="slot-item">
              <div className="slot-image">
                <img src="https://images.unsplash.com/photo-1518611012118-29a7d6334e48?q=80&w=200&auto=format&fit=crop" alt="Featured" />
              </div>
              <div className="slot-content">
                <div className="slot-label-mini">Featured Class</div>
                <h4 className="slot-title">Sunrise Vinyasa Flow</h4>
                <p className="slot-meta">Weekly rotation • Updated Monday</p>
              </div>
              <ChevronRight className="slot-arrow" size={20} />
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h3 className="activity-title">Recent Activity</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon" style={{ background: '#7e22ce' }}>
                <CheckCircle2 size={14} />
              </div>
              <div className="timeline-content">
                <div className="activity-name">Price List Updated</div>
                <div className="activity-desc">Marcus V. changed Elite Plus monthly rate.</div>
                <div className="activity-time">Today, 10:24 AM</div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon" style={{ background: '#7e22ce' }}>
                <ImageIcon size={14} />
              </div>
              <div className="timeline-content">
                <div className="activity-name">New Media Assets Uploaded</div>
                <div className="activity-desc">Sarah J. added 14 photos to Studio Gallery.</div>
                <div className="activity-time">Yesterday, 4:30 PM</div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon" style={{ background: '#7e22ce' }}>
                <Pencil size={14} />
              </div>
              <div className="timeline-content">
                <div className="activity-name">SEO Meta Descriptions</div>
                <div className="activity-desc">System updated 12 landing page descriptions.</div>
                <div className="activity-time">Oct 24, 11:18 AM</div>
              </div>
            </div>
          </div>
          <a href="#" className="view-audit-link">
            View Audit Log <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebsiteManager;
