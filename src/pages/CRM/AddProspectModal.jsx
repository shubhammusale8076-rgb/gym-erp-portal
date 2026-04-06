import React, { useState } from 'react';
import { Camera, Instagram, MapPin, Phone, Globe, X, User, Edit3, Activity, UserPlus, ChevronDown } from 'lucide-react';
import './AddProspectModal.css';

const AddProspectModal = ({ isOpen, onClose, onAdd }) => {
  const [source, setSource] = useState('Website');
  const [interestMap, setInterestMap] = useState('HIGH');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [goal, setGoal] = useState('VIP Membership');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (onAdd && name) {
      onAdd({
        name,
        email,
        phone,
        source,
        notes,
        goal,
        interest: interestMap
      });
      onClose();
    }
  };

  return (
    <div className="add-prospect-overlay">
      <div className="add-prospect-modal">
        <button className="modal-close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-header-section">
          <span className="module-label">CURATION MODULE</span>
          <h2>Add New Prospect</h2>
          <p className="modal-header-desc">Expand the Aura circle. Input lead metadata with precision to ensure a tailored onboarding experience.</p>
        </div>

        <div className="modal-content">
          <div className="left-column">
             <div className="prospect-card">
                 <h3 className="card-title"><User size={18} className="title-icon" color="#6d28d9" /> Prospect Profile</h3>
                 
                 <div className="upload-area">
                    <div className="upload-circle">
                       <Camera size={24} />
                    </div>
                    <span className="upload-text">UPLOAD LEAD PORTRAIT</span>
                 </div>
                 
                 <div className="input-group-row">
                    <div className="input-field">
                       <label>FULL NAME</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Julianne Sterling" 
                         value={name}
                         onChange={e => setName(e.target.value)}
                       />
                    </div>
                    <div className="input-field">
                       <label>EMAIL ADDRESS</label>
                       <input 
                         type="email" 
                         placeholder="j.sterling@example.com"
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                       />
                    </div>
                 </div>

                 <div className="input-field">
                    <label>PHONE NUMBER</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                 </div>
             </div>

             <div className="prospect-card curator-notes">
                 <h3 className="card-title"><Edit3 size={18} className="title-icon" color="#6d28d9" /> Curator Notes</h3>
                 <div className="input-field">
                    <label>INITIAL ASSESSMENT & THOUGHTS</label>
                    <textarea 
                      placeholder="Mention specific preferences, referral details, or personality traits..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    ></textarea>
                 </div>
             </div>
          </div>

          <div className="right-column">
             <div className="prospect-card metadata-card">
                <h3 className="card-title"><Activity size={16} className="title-icon" color="var(--primary)" /> Metadata</h3>
                
                <div className="metadata-section">
                   <label>LEAD SOURCE</label>
                   <div className="source-grid">
                      <button 
                        className={`source-btn ${source === 'Instagram' ? 'active' : ''}`}
                        onClick={() => setSource('Instagram')}
                      >
                         <Instagram size={18} className="btn-icon"/> Instagram
                      </button>
                      <button 
                        className={`source-btn ${source === 'Walk-in' ? 'active' : ''}`}
                        onClick={() => setSource('Walk-in')}
                      >
                         <MapPin size={18} className="btn-icon"/> Walk-in
                      </button>
                      <button 
                        className={`source-btn ${source === 'Direct Call' ? 'active' : ''}`}
                        onClick={() => setSource('Direct Call')}
                      >
                         <Phone size={18} className="btn-icon"/> Direct Call
                      </button>
                      <button 
                        className={`source-btn ${source === 'Website' ? 'active' : ''}`}
                        onClick={() => setSource('Website')}
                      >
                         <Globe size={18} className="btn-icon"/> Website
                      </button>
                   </div>
                </div>

                <div className="metadata-section">
                   <label>INTEREST LEVEL</label>
                   <div className="interest-toggle">
                      <button 
                        className={`interest-btn ${interestMap === 'LOW' ? 'active' : ''}`}
                        onClick={() => setInterestMap('LOW')}
                      >
                        LOW
                      </button>
                      <button 
                        className={`interest-btn ${interestMap === 'HIGH' ? 'active' : ''}`}
                        onClick={() => setInterestMap('HIGH')}
                      >
                        HIGH
                      </button>
                      <button 
                        className={`interest-btn ${interestMap === 'MEDIUM' ? 'active' : ''}`}
                        onClick={() => setInterestMap('MEDIUM')}
                      >
                        MEDIUM
                      </button>
                   </div>
                </div>

                <div className="metadata-section">
                   <label>PRIMARY GOAL</label>
                   <div className="select-wrapper">
                     <select 
                       className="goal-select" 
                       value={goal} 
                       onChange={e => setGoal(e.target.value)}
                     >
                        <option>VIP Membership</option>
                        <option>Weight Loss</option>
                        <option>Muscle Gain</option>
                        <option>Personal Coaching</option>
                     </select>
                     <ChevronDown size={16} className="select-icon" />
                   </div>
                </div>
             </div>

             <button className="add-prospect-submit-btn" onClick={handleSubmit}>
                <UserPlus size={18} /> Add Prospect
             </button>
             <button className="cancel-btn" onClick={onClose}>
                Cancel
             </button>

             <div className="aura-statement-card">
                <div className="statement-overlay">
                  <span className="statement-label">AURA STATEMENT</span>
                  <p>Every lead is a journey into elite performance.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProspectModal;
