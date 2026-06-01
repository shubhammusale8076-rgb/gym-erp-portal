import React, { useState } from 'react';
import { X, Users, MessageSquare, Send, AlertCircle } from 'lucide-react';
import WhatsAppActionButton from './WhatsAppActionButton';
import './Communication.css';

const BulkWhatsAppModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [audienceSegment, setAudienceSegment] = useState('active');

  if (!isOpen) return null;

  const segmentConfig = {
    active: { count: 1240, type: "Promotional Broadcast", preview: "Hi {{name}}, don't miss out on our summer bootcamp! Special 20% discount for active members." },
    expiring: { count: 185, type: "Renewal Reminder", preview: "Hi {{name}}, your Elite Club membership is expiring soon. Renew now to maintain your current rate." },
    inactive: { count: 342, type: "Win-back Campaign", preview: "We miss you at Elite Club, {{name}}! Come back this month and get a free personal training session." }
  };

  const currentSegment = segmentConfig[audienceSegment];

  const handleSend = () => {
    setLoading(true);
    // Placeholder logic
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bulk-wa-modal-overlay">
      <div className="bulk-wa-modal">
        <div className="bulk-wa-header">
          <div className="bulk-wa-title">
            <div className="bulk-wa-icon">
              <MessageSquare size={20} />
            </div>
            <h2>Send Bulk WhatsApp Message</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} color="#64748b" />
          </button>
        </div>

        <div className="bulk-wa-body">
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ background: '#E7FCEF', color: '#25D366', width: '60px', height: '60px', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Send size={24} />
              </div>
              <h3 style={{ margin: '0 0 8px', color: '#1e293b' }}>Messages Queued Successfully</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Your bulk messages are being processed by the integration service.</p>
            </div>
          ) : (
            <>
              <div className="audience-summary">
                <div className="audience-stat">
                  <h4>Target Audience Segment</h4>
                  <select 
                    value={audienceSegment} 
                    onChange={(e) => setAudienceSegment(e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '100%', marginTop: '8px', marginBottom: '8px', fontSize: '14px' }}
                  >
                    <option value="active">Active Members</option>
                    <option value="expiring">Expiring Soon (30 Days)</option>
                    <option value="inactive">Inactive Members</option>
                  </select>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <Users size={20} color="#64748b" /> {currentSegment.count} Members
                  </p>
                </div>
                <div className="audience-stat" style={{ textAlign: 'right' }}>
                  <h4>Message Type</h4>
                  <p style={{ fontSize: '16px', color: '#5c20b8', marginTop: '8px' }}>{currentSegment.type}</p>
                </div>
              </div>

              <div className="message-preview-box">
                <h5>Message Preview</h5>
                <p>{currentSegment.preview}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px', padding: '12px', background: '#fffbeb', borderRadius: '8px', color: '#b45309', fontSize: '12px' }}>
                <AlertCircle size={16} />
                <span>This action cannot be undone. Messages will be sent immediately to the selected audience.</span>
              </div>
            </>
          )}
        </div>

        {!success && (
          <div className="bulk-wa-footer">
            <button 
              onClick={onClose} 
              style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid #cbd5e1', background: 'white', color: '#64748b', fontWeight: '500', cursor: 'pointer' }}
              disabled={loading}
            >
              Cancel
            </button>
            <WhatsAppActionButton 
              label="Confirm & Send Broadcast" 
              icon={Send} 
              onClick={handleSend} 
              loading={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkWhatsAppModal;
