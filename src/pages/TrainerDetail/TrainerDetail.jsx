import React from 'react';
import './TrainerDetail.css';
import { X, Camera, Users, Share2, Plus, Sun, Moon } from 'lucide-react';

const TrainerDetail = ({ trainer, onClose }) => {
  if (!trainer) return null;

  return (
    <div className="trainer-detail-overlay">
      <div className="trainer-detail-modal">
        {/* HEADER */}
        <div className="td-header">
          <div>
            <h2>Trainer Profile Settings</h2>
            <p>Personalize your community presence and availability.</p>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24}/></button>
        </div>

        {/* CONTENT */}
        <div className="td-content">
          {/* Left Column */}
          <div className="td-left">
            <div className="profile-img-container">
               <img src={trainer.img || "https://randomuser.me/api/portraits/men/32.jpg"} alt={trainer.name} className="profile-img" />
               <button className="camera-btn"><Camera size={16} color="white" /></button>
            </div>
            <button className="upload-btn">Upload New Photo</button>
            <p className="recommend-text">Recommended: 800x800px high-res portrait.</p>

            <div className="community-links">
              <h5>COMMUNITY LINKS</h5>
              <div className="input-group">
                <Users size={18} className="input-icon" />
                <input type="text" defaultValue="@alex_the_coach" />
              </div>
              <div className="input-group">
                <Share2 size={18} className="input-icon" />
                <input type="text" defaultValue="linkedin.com/in/arivera" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="td-right">
            <div className="name-cert-row">
              <input type="text" defaultValue={trainer.name} className="form-input" />
              <input type="text" defaultValue="NASM-CPT, Precision Nutrition L1" className="form-input" />
            </div>

            <div className="skills-section">
              <h5>Specialized Skills</h5>
              <div className="skills-tags">
                <span className="skill-tag">Yoga <X size={14}/></span>
                <span className="skill-tag">HIIT <X size={14}/></span>
                <span className="skill-tag">Powerlifting <X size={14}/></span>
                <button className="add-skill-btn"><Plus size={16}/> Add Skill</button>
              </div>
            </div>

            <div className="bio-section">
              <h5>My Journey (Bio)</h5>
              <textarea 
                defaultValue="Certified personal trainer with over 8 years of experience helping clients achieve their fitness goals through functional movement and strength training. Specialized in athletic performance and recovery protocols. I believe fitness is a communal journey." 
                rows="4"
              ></textarea>
            </div>

            <div className="availability-section">
              <h5>AVAILABILITY SCHEDULE</h5>
              <div className="days-row">
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => (
                  <div key={day} className={`day-circle ${[0,1,3,4].includes(idx) ? 'active' : ''}`}>
                    {day}
                    {[0,1,3,4].includes(idx) && <span className="dot"></span>}
                  </div>
                ))}
              </div>

              <div className="shifts-row">
                <div className="shift-card">
                  <div className="shift-icon-bg"><Sun size={20} className="shift-icon sun" /></div>
                  <div className="shift-info">
                    <h6>MORNING SHIFT</h6>
                    <p>06:00 AM - 11:00 AM</p>
                  </div>
                </div>
                <div className="shift-divider"></div>
                <div className="shift-card">
                  <div className="shift-icon-bg"><Moon size={20} className="shift-icon moon" /></div>
                  <div className="shift-info">
                    <h6>EVENING SHIFT</h6>
                    <p>04:00 PM - 09:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="td-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel Changes</button>
          <button className="save-btn">Save Profile</button>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;
