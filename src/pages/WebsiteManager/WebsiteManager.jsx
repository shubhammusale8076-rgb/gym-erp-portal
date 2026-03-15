import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './WebsiteManager.css';

const WebsiteManager = () => {
  const sections = [
    { name: 'Hero Banner', path: '/website-manager/hero-banner', lastUpdated: '2 days ago', status: 'LIVE' },
    { name: 'Gallery', path: '/website-manager/gallery', lastUpdated: '5 days ago', status: 'LIVE' },
    { name: 'Trainers Page', path: '/website-manager/trainers', lastUpdated: '1 week ago', status: 'LIVE' },
    { name: 'Testimonials', path: '/website-manager/testimonials', lastUpdated: '3 weeks ago', status: 'NEEDS UPDATE' },
    { name: 'Contact Info', path: '/website-manager/contact', lastUpdated: '1 week ago', status: 'LIVE' },
  ];

  return (
    <div className="website-manager-container page-container">
      <div className="wm-header">
        <div className="badge wm-badge">
          <span className="badge-dot"></span> DASHBOARD
        </div>
        <h1 className="heading-1 wm-title">WEBSITE OVERVIEW</h1>
        <p className="subtitle wm-subtitle">
          Your gym's complete website health, section status, and quick actions.
        </p>
      </div>

      <div className="wm-stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">TOTAL SECTIONS</div>
          <div className="stat-value">6</div>
          <div className="stat-subtext text-danger">All live</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">SITE SCORE</div>
          <div className="stat-value">94</div>
          <div className="stat-subtext text-danger">+2 this week</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">ACTIVE TRAINERS</div>
          <div className="stat-value">5</div>
          <div className="stat-subtext text-danger">Profiles complete</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">LAST UPDATED</div>
          <div className="stat-value">2D</div>
          <div className="stat-subtext text-danger">Hero Banner</div>
        </div>
      </div>

      <div className="glass-card wm-section-status">
        <h3 className="section-title">SECTION STATUS</h3>
        <div className="status-list">
          {sections.map((sec, idx) => (
            <div key={idx} className="status-item">
              <div className="status-name">
                <span className={`status-dot ${sec.status === 'LIVE' ? 'dot-live' : 'dot-update'}`}></span>
                {sec.path ? (
                  <Link to={sec.path} className="section-link">{sec.name}</Link>
                ) : (
                  sec.name
                )}
              </div>
              <div className="status-meta">
                <span className="last-updated">{sec.lastUpdated}</span>
                <span className={`status-pill ${sec.status === 'LIVE' ? 'pill-live' : 'pill-update'}`}>
                  {sec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card wm-ai-audit">
        <div className="ai-audit-content">
          <div className="ai-audit-header">
            <div className="ai-badge">
              <Sparkles size={16} /> AI SITE AUDIT
            </div>
            <button className="btn wm-btn-ai">
              <Sparkles size={16} /> Generate with AI
            </button>
          </div>
          <p className="ai-audit-desc">
            Click Generate to run an AI audit of your gym website and receive prioritized improvement recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteManager;
