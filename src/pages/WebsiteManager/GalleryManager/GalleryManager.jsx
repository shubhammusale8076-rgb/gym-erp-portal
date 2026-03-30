import React, { useState } from 'react';
import { UploadCloud, ChevronDown, Check, Image as LucideImage } from 'lucide-react';
import './GalleryManager.css';
import PageHeader from '../../../components/PageHeader/PageHeader';

const GalleryManager = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Interiors', 'Equipment', 'Staff'];

  const images = [
    { id: 1, url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80', selected: true },
    { id: 2, url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80', selected: false },
    { id: 3, url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80', selected: false },
    { id: 4, url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80', selected: false },
    { id: 5, url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80', selected: false },
    { id: 6, url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80', selected: false },
  ];

  return (
    <div className="gm-page">
      <PageHeader
        title="Website Gallery Manager"
        subtitle="Curate your brand's visual narrative."
        actions={[]}
      />

      <div className="gm-toolbar">
        <div className="gm-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`gm-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="gm-actions">
          <button className="gm-btn-outline">
            Bulk Actions <ChevronDown size={14} />
          </button>
          <button className="btn-primary">
            <UploadCloud size={16} /> Upload New Asset
          </button>
        </div>
      </div>

      <div className="gm-content">
        <div className="gm-grid">
          {images.map((img) => (
            <div key={img.id} className={`gm-card ${img.selected ? 'selected' : ''}`}>
              <div className={`gm-checkbox ${img.selected ? 'checked' : ''}`}>
                {img.selected && <Check size={12} strokeWidth={3} />}
              </div>
              <img src={img.url} alt="Gallery item" className="gm-card-img" />
            </div>
          ))}
          <div className="gm-upload-card">
            <LucideImage className="gm-upload-icon" size={24} />
            <p>Drop files to curate</p>
          </div>
        </div>

        <div className="gm-sidebar">
          <div className="gm-sidebar-header">
            <h2 className="gm-sidebar-title">Asset Details</h2>
            <span className="gm-badge-purple">EDITING</span>
          </div>

          <div className="gm-preview-container">
            <div className="gm-preview">
              <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80" alt="Current Selection" className="gm-preview-img" />
              <div className="gm-preview-overlay">
                <h3 className="gm-preview-text">CURRENT<br />SELECTION</h3>
              </div>
            </div>
          </div>

          <div className="gm-form">
            <div className="gm-form-group">
              <label>Asset Name</label>
              <input type="text" value="Obsidian Gym Floor" readOnly className="gm-input" />
            </div>

            <div className="gm-form-group">
              <label>Alt Text (SEO)</label>
              <div className="gm-textarea-wrapper">
                <textarea
                  className="gm-textarea"
                  readOnly
                  value="Atmospheric view of the Obsidian performance area featuring bespoke dark matte tiling and integrated neon light tracks."
                />
              </div>
            </div>

            <div className="gm-form-row">
              <div className="gm-form-group">
                <label>Category</label>
                <div className="gm-select-wrapper">
                  <select className="gm-select" defaultValue="Interiors">
                    <option value="Interiors">Interiors</option>
                  </select>
                  <ChevronDown className="gm-select-icon" size={14} />
                </div>
              </div>
              <div className="gm-form-group">
                <label>Display Status</label>
                <div className="gm-status-display">
                  <span className="gm-status-dot"></span> <span className="gm-status-text">Live</span>
                </div>
              </div>
            </div>
          </div>

          <div className="gm-sidebar-actions">
            <button className="gm-btn btn-secondary">Discard</button>
            <button className="gm-btn btn-primary">Update Asset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;
