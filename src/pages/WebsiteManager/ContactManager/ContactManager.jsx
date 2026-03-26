import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, Clock, Save, Building } from 'lucide-react';
import './ContactManager.css';
import PageHeader from '../../../components/PageHeader/PageHeader';

const ContactManager = () => {
  const [contactData, setContactData] = useState({
    email: 'support@gymsync.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fitness Blvd, Suite 100\nMetropolis, NY 10001',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    socials: {
      instagram: 'https://instagram.com/gymsync',
      facebook: 'https://facebook.com/gymsync',
      twitter: 'https://twitter.com/gymsync',
      youtube: 'https://youtube.com/c/gymsync'
    },
    hours: [
      { day: 'Monday', isOpen: true, openTime: '06:00', closeTime: '22:00' },
      { day: 'Tuesday', isOpen: true, openTime: '06:00', closeTime: '22:00' },
      { day: 'Wednesday', isOpen: true, openTime: '06:00', closeTime: '22:00' },
      { day: 'Thursday', isOpen: true, openTime: '06:00', closeTime: '22:00' },
      { day: 'Friday', isOpen: true, openTime: '06:00', closeTime: '22:00' },
      { day: 'Saturday', isOpen: true, openTime: '08:00', closeTime: '20:00' },
      { day: 'Sunday', isOpen: false, openTime: '08:00', closeTime: '20:00' },
    ]
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleTextChange = (field, value) => {
    setContactData({ ...contactData, [field]: value });
    setHasChanges(true);
  };

  const handleSocialChange = (platform, value) => {
    setContactData({
      ...contactData,
      socials: { ...contactData.socials, [platform]: value }
    });
    setHasChanges(true);
  };

  const handleHourToggle = (index) => {
    const newHours = [...contactData.hours];
    newHours[index].isOpen = !newHours[index].isOpen;
    setContactData({ ...contactData, hours: newHours });
    setHasChanges(true);
  };

  const handleTimeChange = (index, field, value) => {
    const newHours = [...contactData.hours];
    newHours[index][field] = value;
    setContactData({ ...contactData, hours: newHours });
    setHasChanges(true);
  };

  const extractIframeSrc = (input) => {
    if (!input) return '';
    // If they paste the whole <iframe src="..."> snippet, extract just the URL
    if (input.includes('<iframe')) {
      const match = input.match(/src="([^"]+)"/);
      return match ? match[1] : input;
    }
    // If it's just a raw URL, return it
    return input;
  };

  const handleMapUrlChange = (e) => {
    const rawInput = e.target.value;
    const cleanUrl = extractIframeSrc(rawInput);
    handleTextChange('mapEmbedUrl', cleanUrl);
  };

  const saveChanges = () => {
    // API Call logic would go here
    console.log('Saving contact data:', contactData);
    setHasChanges(false);
  };

  return (
    <div className="contact-cx-container page-container">

      <PageHeader
        title="Contact & Location"
        subtitle="Manage your physical address, operating hours, and social media presence used across the site."
        actions={[{
          label: " Save Information",
          icon: <Save size={16} />,
          onClick: () => { },
          className: "btn-primary"
        }]}
      />

      <div className="contact-cx-grid">

        {/* Left Column: Contact & Social */}
        <div className="contact-cx-col">

          {/* Card 1: Core Info */}
          <div className="glass-card contact-cx-card">
            <div className="contact-card-header">
              <Building className="contact-text-primary" size={20} />
              <h3 className="heading-3">Primary Contact</h3>
            </div>

            <div className="form-group contact-fg">
              <label>Support Email</label>
              <div className="contact-input-wrap">
                <Mail className="contact-icon contact-icon-muted" size={18} />
                <input
                  type="email"
                  className="input-field contact-input-pl"
                  value={contactData.email}
                  onChange={(e) => handleTextChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group contact-fg">
              <label>Phone Number</label>
              <div className="contact-input-wrap">
                <Phone className="contact-icon contact-icon-muted" size={18} />
                <input
                  type="tel"
                  className="input-field contact-input-pl"
                  value={contactData.phone}
                  onChange={(e) => handleTextChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group contact-fg">
              <label>Physical Address</label>
              <div className="contact-input-wrap align-top">
                <MapPin className="contact-icon contact-icon-muted top-icon" size={18} />
                <textarea
                  className="input-field contact-textarea-pl"
                  rows="3"
                  value={contactData.address}
                  onChange={(e) => handleTextChange('address', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Card 4: Social Links */}
          <div className="glass-card contact-cx-card">
            <div className="contact-card-header">
              <Instagram className="contact-text-primary" size={20} />
              <h3 className="heading-3">Social Profiles</h3>
            </div>

            <div className="contact-social-forms">
              <div className="contact-input-wrap">
                <div className="social-icon-box ig"><Instagram size={16} /></div>
                <input
                  type="text"
                  className="input-field social-input"
                  placeholder="Instagram URL"
                  value={contactData.socials.instagram}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                />
              </div>
              <div className="contact-input-wrap">
                <div className="social-icon-box fb"><Facebook size={16} /></div>
                <input
                  type="text"
                  className="input-field social-input"
                  placeholder="Facebook URL"
                  value={contactData.socials.facebook}
                  onChange={(e) => handleSocialChange('facebook', e.target.value)}
                />
              </div>
              <div className="contact-input-wrap">
                <div className="social-icon-box tw"><Twitter size={16} /></div>
                <input
                  type="text"
                  className="input-field social-input"
                  placeholder="X (Twitter) URL"
                  value={contactData.socials.twitter}
                  onChange={(e) => handleSocialChange('twitter', e.target.value)}
                />
              </div>
              <div className="contact-input-wrap">
                <div className="social-icon-box yt"><Youtube size={16} /></div>
                <input
                  type="text"
                  className="input-field social-input"
                  placeholder="YouTube URL"
                  value={contactData.socials.youtube}
                  onChange={(e) => handleSocialChange('youtube', e.target.value)}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Maps & Hours */}
        <div className="contact-cx-col">

          {/* Card 2: Google Maps */}
          <div className="glass-card contact-cx-card">
            <div className="contact-card-header">
              <MapPin className="contact-text-primary" size={20} />
              <h3 className="heading-3">Map Location</h3>
            </div>

            <p className="contact-map-hint">
              Paste the "Embed a map" iframe snippet or URL from Google Maps to display it on your website footer.
            </p>

            <div className="form-group contact-mb-4">
              <input
                type="text"
                className="input-field contact-w-full"
                placeholder="Paste <iframe src='...'> or raw URL"
                value={contactData.mapEmbedUrl}
                onChange={handleMapUrlChange}
              />
            </div>

            <div className="contact-map-preview">
              {contactData.mapEmbedUrl ? (
                <iframe
                  src={contactData.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Preview"
                ></iframe>
              ) : (
                <div className="contact-map-empty">
                  <MapPin size={32} className="contact-map-icon-empty" />
                  <span>No map URL provided</span>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Operating Hours */}
          <div className="glass-card contact-cx-card">
            <div className="contact-card-header contact-mb-4">
              <Clock className="contact-text-primary" size={20} />
              <h3 className="heading-3">Operating Hours</h3>
            </div>

            <div className="contact-hours-list">
              {contactData.hours.map((dayObj, i) => (
                <div key={dayObj.day} className={`contact-hour-row ${!dayObj.isOpen ? 'closed' : ''}`}>

                  <div className="contact-day-toggle">
                    <button
                      className={`testi-toggle-btn ${dayObj.isOpen ? 'active' : ''}`}
                      onClick={() => handleHourToggle(i)}
                    >
                      <div className="testi-toggle-slider"></div>
                    </button>
                    <span className="contact-day-name">{dayObj.day}</span>
                  </div>

                  {dayObj.isOpen ? (
                    <div className="contact-time-inputs">
                      <input
                        type="time"
                        value={dayObj.openTime}
                        onChange={(e) => handleTimeChange(i, 'openTime', e.target.value)}
                      />
                      <span className="contact-time-to">to</span>
                      <input
                        type="time"
                        value={dayObj.closeTime}
                        onChange={(e) => handleTimeChange(i, 'closeTime', e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="contact-closed-label-text">Closed</div>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactManager;
