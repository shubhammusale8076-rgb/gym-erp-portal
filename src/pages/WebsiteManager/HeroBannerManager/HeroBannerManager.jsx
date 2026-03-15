import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import './HeroBannerManager.css';

const HeroBannerManager = () => {
  const [headline, setHeadline] = useState('Transform Your Body.\nElevate Your Mind.');
  const [subheadline, setSubheadline] = useState('Premium training facilities, expert coaches, and a community built to push you further than you thought possible.');
  const [ctaText, setCtaText] = useState('Start Your Journey');
  const [ctaLink, setCtaLink] = useState('/join');
  const [bgUrl, setBgUrl] = useState('');

  return (
    <div className="hbm-container page-container">
      <div className="wm-header">
        <div className="badge wm-badge">
          <span className="badge-dot"></span> HERO BANNER
        </div>
        <h1 className="heading-1 wm-title">HERO BANNER MANAGER</h1>
        <p className="subtitle hbm-subtitle">
          Control the first impression visitors get when they land on your website.
        </p>
      </div>

      <div className="hbm-grid">
        {/* Left Column: Form */}
        <div className="glass-card hbm-form-panel">
          
          <div className="form-group">
            <label className="form-label">MAIN HEADLINE</label>
            <textarea 
              className="form-control form-textarea hbm-headline-input"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">SUBHEADLINE</label>
            <textarea 
              className="form-control form-textarea hbm-subheadline-input"
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              rows={3}
            />
          </div>

          <div className="hbm-cta-row">
            <div className="form-group">
              <label className="form-label">CTA BUTTON TEXT</label>
              <input 
                type="text"
                className="form-control hbm-input"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">CTA LINK</label>
              <input 
                type="text"
                className="form-control hbm-input"
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">BACKGROUND IMAGE URL</label>
            <input 
              type="text"
              className="form-control hbm-input"
              value={bgUrl}
              onChange={(e) => setBgUrl(e.target.value)}
              placeholder="https://example.com/hero.jpg"
            />
          </div>

        </div>

        {/* Right Column: Preview & Summary */}
        <div className="hbm-preview-col">
          <div className="preview-label">LIVE PREVIEW</div>
          
          <div 
            className="hbm-live-preview"
            style={{ 
              backgroundImage: bgUrl ? `linear-gradient(rgba(20, 10, 10, 0.8), rgba(20, 10, 10, 0.8)), url(${bgUrl})` : 'linear-gradient(135deg, #1a0b0b 0%, #2a1111 100%)' 
            }}
          >
            <div className="preview-content">
              <h2 className="preview-headline">
                {headline.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== headline.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className="preview-subheadline">{subheadline}</p>
              <button className="preview-cta">{ctaText}</button>
            </div>
          </div>

          <div className="glass-card hbm-summary-card">
            <div className="summary-label">SUMMARY</div>
            
            <div className="summary-row">
              <span className="summary-key">Headline</span>
              <span className="summary-val hbm-truncate">
                {headline.replace(/\n/g, ' ')}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-key">CTA</span>
              <span className="summary-val">{ctaText} <span className="summary-arrow">&rarr;</span> {ctaLink}</span>
            </div>
            <div className="summary-row">
              <span className="summary-key">Background</span>
              <span className="summary-val">{bgUrl ? 'Custom image' : 'Default gradient'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card wm-ai-audit">
        <div className="ai-audit-content">
          <div className="ai-audit-header">
            <div className="ai-badge">
              <Sparkles size={16} /> AI COPY GENERATOR
            </div>
            <button className="btn wm-btn-ai">
              <Sparkles size={16} /> Generate with AI
            </button>
          </div>
          <p className="ai-audit-desc">
            Generate 3 distinct headline, subheadline, and CTA copy variations tailored to your gym's brand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerManager;
