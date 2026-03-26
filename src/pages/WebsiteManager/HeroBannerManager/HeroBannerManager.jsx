import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Plus, Image as ImageIcon } from 'lucide-react';
import './HeroBannerManager.css';
import PageHeader from '../../../components/PageHeader/PageHeader';

const HeroBannerManager = () => {
  const [headline, setHeadline] = useState('The sanctuary of elite performance.');
  const [subheadline, setSubheadline] = useState('Where state-of-the-art technology meets bespoke physical curation for the modern athlete.');
  const [ctaText, setCtaText] = useState('Explore Membership');
  const [accentPhrase, setAccentPhrase] = useState('The Signature Experience');
  const [bgUrl, setBgUrl] = useState('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop');

  return (
    <div className="hbm-container ">



      <PageHeader
        title="Hero Section Manager"
        subtitle="Curate your digital first impression."
        actions={[]}
      />

      <div className="hbm-grid">
        <div className="hbm-left-col">
          <div
            className="hbm-hero-preview"
            style={{
              backgroundImage: bgUrl ? `linear-gradient(to top, rgba(20, 10, 10, 0.9), rgba(20, 10, 10, 0.1)), url(${bgUrl})` : 'linear-gradient(135deg, #1a0b0b 0%, #2a1111 100%)'
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
              <button className="btn-primary cta-btn">{ctaText}</button>
            </div>
          </div>

          {/* Copy Configuration Form */}
          <div className="glass-card hbm-form-panel">
            <div className="form-panel-header">
              <Sparkles size={20} className="panel-icon" />
              <h3 className="panel-title">Copy Configuration</h3>
            </div>

            <div className="form-group mt-3">
              <label className="form-label">HEADLINE</label>
              <textarea
                className="form-control hbm-textarea-styled"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                rows={2}
              />
            </div>

            <div className="form-group">
              <label className="form-label">SUBTEXT</label>
              <textarea
                className="form-control hbm-textarea-styled"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                rows={3}
              />
            </div>

            <div className="hbm-cta-row">
              <div className="form-group">
                <label className="form-label">PRIMARY CTA LABEL</label>
                <input
                  type="text"
                  className="form-control hbm-input-styled"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">ACCENT PHRASE</label>
                <input
                  type="text"
                  className="form-control hbm-input-styled"
                  value={accentPhrase}
                  onChange={(e) => setAccentPhrase(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hbm-right-col">

          <div className="hbm-utility-card">
            <h3 className="utility-title">Publishing</h3>

            <div className="status-indicator">
              <div className="status-icon-bg">
                <CheckCircle2 size={20} className="status-icon" color="#475569" />
              </div>
              <div className="status-text">
                <span className="status-main">Auto-saved</span>
                <span className="status-sub">Today at 14:32</span>
              </div>
              <div className="badge draft-badge">DRAFT</div>
            </div>

            <button className="btn-primary ">
              PUBLISH TO LIVE
            </button>
            <button className="btn-secondary">
              SAVE AS DRAFT
            </button>
          </div>

          {/* Background Asset Card */}
          <div className="hbm-utility-card asset-card">
            <div className="asset-header">
              <h3 className="utility-title mb-0">Background Asset</h3>
              <div className="add-icon-btn"><Plus size={16} /></div>
            </div>

            <div className="asset-selected">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" alt="Midnight Sanctuary" className="asset-main-img" />
              <div className="asset-selected-badge">SELECTED</div>
            </div>
            <div className="asset-name">Midnight Sanctuary.jpg</div>

            <div className="asset-thumbnails">
              <div className="thumbnail-wrapper">
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" alt="Obsidian Steel" className="thumbnail-img" />
                <span className="thumbnail-name">Obsidian Steel.png</span>
              </div>
              <div className="thumbnail-wrapper">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" alt="Zen Morning" className="thumbnail-img" />
                <span className="thumbnail-name">Zen Morning.jpg</span>
              </div>
            </div>

            <button className="btn-secondary">
              <ImageIcon size={16} /> BROWSE LIBRARY
            </button>
          </div>

          {/* Curation Tip Card */}
          <div className="hbm-utility-card tip-card">
            <h3 className="tip-title">Curation Tip</h3>
            <p className="tip-text">
              High-contrast imagery with deep shadows performs 40% better for luxury conversion. Aim for photos with a "Museum" lighting quality.
            </p>
            <Sparkles className="bg-sparkle spark-1" size={65} />
            <Sparkles className="bg-sparkle spark-2" size={32} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBannerManager;
