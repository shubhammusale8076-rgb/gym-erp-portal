import React, { useState } from 'react';
import { MapPin, Target, Copy, Instagram, Facebook, Twitter, Youtube, Clock, ToggleLeft, ToggleRight, MessageCircleQuestion } from 'lucide-react';
import './ContactManager.css';
import PageHeader from '../../../components/PageHeader/PageHeader';

const ContactManager = () => {
  const [hours] = useState([
    { day: 'Monday', isOpen: true, openTime: '05:00 AM', closeTime: '11:00 PM' },
    { day: 'Wednesday', isOpen: true, openTime: '05:00 AM', closeTime: '11:00 PM' },
    { day: 'Sunday', isOpen: false, openTime: '08:00 AM', closeTime: '08:00 PM' },
  ]);

  return (
    <div className="contact-cx-page">

      <PageHeader
        title="Contact Manager"
        subtitle="Configure how your elite members connect with the club. Manage public facing identifiers, social presence, and facility availability."
        actions={[]}
      />
      <div className="contact-cx-grid">

        {/* Left Column */}
        <div className="contact-cx-col">

          {/* Card 1: Public Presence */}
          <div className="contact-card card-white">
            <div className="contact-card-header">
              <div className="card-icon-box purple-bg">
                <MessageCircleQuestion size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="card-title-stack">
                <h3 className="cc-title">Public Presence</h3>
                <span className="cc-subtitle">CORE INFORMATION</span>
              </div>
            </div>

            <div className="cc-form-section cc-mb">
              <label className="cc-label">SUPPORT EMAIL ADDRESS</label>
              <div className="cc-read-value">concierge@aurapremium.fit</div>
            </div>

            <div className="cc-form-row cc-mb">
              <div className="cc-form-section">
                <label className="cc-label">PHONE NUMBER</label>
                <div className="cc-read-value">+1 (555) 890-2100</div>
              </div>
              <div className="cc-form-section">
                <label className="cc-label">EMERGENCY CONTACT</label>
                <div className="cc-read-value">+1 (555) 890-2199</div>
              </div>
            </div>

            <div className="cc-form-section">
              <label className="cc-label">PHYSICAL ADDRESS</label>
              <div className="cc-read-value">
                882 Skyline Boulevard, Penthouse Level<br />
                Manhattan, NY 10013
              </div>
            </div>
          </div>

          <div className="contact-card card-white">
            <h3 className="social-title">Social Ecosystem</h3>

            <div className="social-list">
              <div className="social-item">
                <div className="social-icon ig"><Instagram size={18} color="white" /></div>
                <div className="social-text">
                  <label>INSTAGRAM</label>
                  <span>@aura_premium_nyc</span>
                </div>
              </div>

              <div className="social-item">
                <div className="social-icon tw"><Twitter size={18} color="white" /></div>
                <div className="social-text">
                  <label>X / TWITTER</label>
                  <span>@aura_elite</span>
                </div>
              </div>
              <div className="social-item">
                <div className="social-icon fb"><Facebook size={18} color="white" /></div>
                <div className="social-text">
                  <label>FACEBOOK</label>
                  <span>fb.com/aurapremium</span>
                </div>
              </div>
              <div className="social-item">
                <div className="social-icon yt"><Youtube size={18} color="white" /></div>
                <div className="social-text">
                  <label>YOUTUBE</label>
                  <span>youtube.com/c/AuraPremium</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="contact-cx-col">

          {/* Card 3: Map UI */}
          <div className="contact-card card-white card-no-pad-top">
            <div className="map-image-area">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" alt="Map" className="map-bg-img" />
              <div className="map-overlay"></div>

              <div className="map-badges-container">
                <div className="map-badge-pill">
                  <MapPin size={14} className="purple-text" />
                  <span>Live Location Sync</span>
                </div>
                <button className="target-btn">
                  <Target size={18} color="white" />
                </button>
              </div>
            </div>

            <div className="embed-section">
              <label className="cc-label">WEBSITE EMBED SNIPPET</label>
              <div className="embed-box">
                <code className="embed-code">
                  &lt;iframe src="https://maps.google.com/embed?pb=!1m...<br />
                  ..." width="100%" height="400"&gt;
                </code>
                <button className="copy-btn">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>


          <div className="contact-card card-tinted">
            <div className="contact-hours-header">
              <div className="card-icon-box gold-bg">
                <Clock size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="card-title-stack flex-grow">
                <h3 className="cc-title">Operating Hours</h3>
                <span className="cc-subtitle">WEEKLY AVAILABILITY</span>
              </div>
              <button className="text-btn-purple">Apply to all</button>
            </div>

            <div className="hours-list">
              {hours.map((day, idx) => (
                <div key={idx} className="hour-row">
                  <span className="day-name">{day.day}</span>
                  {day.isOpen ? (
                    <div className="time-range active-range">
                      <div className="time-pill">
                        {day.openTime} <Clock size={12} className="time-icon" />
                      </div>
                      <span className="time-sep">to</span>
                      <div className="time-pill">
                        {day.closeTime} <Clock size={12} className="time-icon" />
                      </div>
                      <ToggleRight size={26} className="toggle-active" />
                    </div>
                  ) : (
                    <div className="time-range closed-range">
                      <span className="closed-msg">Facility is closed for maintenance</span>
                      <ToggleLeft size={26} className="toggle-inactive" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          <div className="contact-page-actions">
            <button className="btn-secondary">Discard Changes</button>
            <button className="btn-primary">Publish Changes</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactManager;
