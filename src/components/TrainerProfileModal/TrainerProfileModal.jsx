import React, { useState, useEffect } from "react";
import './TrainerProfileModal.css'
import { X, Camera, Users, Link as LinkIcon, Plus, Sun, Moon } from "lucide-react";

const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];


const TrainerProfileModal = ({ isOpen, onClose, data, onSave }) => {
  const [trainer, setTrainer] = useState(null);
  const [newSkillText, setNewSkillText] = useState("");

  useEffect(() => {
    if (data) {
      setTrainer(data);
    }
  }, [data]);

  if (!isOpen || !trainer) return null;

  // ---------------- HANDLERS ----------------

  const handleChange = (field, value) => {
    setTrainer(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (field, value) => {
    setTrainer(prev => ({
      ...prev,
      social: { ...prev.social, [field]: value }
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (!newSkillText.trim()) return;

      setTrainer(prev => ({
        ...prev,
        skills: [...prev.skills, newSkillText.trim()]
      }));

      setNewSkillText("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setTrainer(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const toggleDay = (day) => {
    setTrainer(prev => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...prev.availability, day]
    }));
  };

  const toggleShift = (shift) => {
    setTrainer(prev => ({
      ...prev,
      shifts: prev.shifts.includes(shift)
        ? prev.shifts.filter(s => s !== shift)
        : [...prev.shifts, shift]
    }));
  };

  const handleSave = () => {
    onSave(trainer);
    onClose();
  };

  // ---------------- UI ----------------

  return (
    <div className="tm-modal-overlay">
      <div className="tm-modal glass-panel">

        {/* HEADER */}
        <div className="tm-modal-header">
          <div>
            <h2 className="tm-modal-title">Trainer Profile Settings</h2>
            <p className="tm-modal-subtitle">
              Personalize your community presence and availability.
            </p>
          </div>
          <button className="tm-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="tm-modal-body">

          {/* LEFT */}
          <div className="tm-modal-col-left">

            {/* PHOTO */}
            <div className="tm-photo-section">
              <span className="tm-section-label">PROFILE PHOTO</span>

              <div className="tm-avatar-wrapper">
                {trainer.imageUrl ? (
                  <img src={trainer.imageUrl} alt="Profile" className="tm-avatar" />
                ) : (
                  <div className="tm-avatar-placeholder">
                    <Camera size={40} />
                  </div>
                )}
                <button className="tm-badge-btn-photo">
                  <Camera size={14} />
                </button>
              </div>

              <button className="tm-btn-upload">Upload New Photo</button>
              <span className="tm-photo-hint">
                Recommended: 800x800px high-res portrait.
              </span>
            </div>

            {/* SOCIAL */}
            <div className="tm-social-section">
              <span className="tm-section-label">COMMUNITY LINKS</span>

              <div className="tm-input-group-icon">
                <span className="tm-input-icon"><Users size={16} /></span>
                <input
                  type="text"
                  className="tm-modal-input"
                  placeholder="@username"
                  value={trainer.social.community}
                  onChange={(e) => handleSocialChange("community", e.target.value)}
                />
              </div>

              <div className="tm-input-group-icon">
                <span className="tm-input-icon"><LinkIcon size={16} /></span>
                <input
                  type="text"
                  className="tm-modal-input"
                  placeholder="linkedin.com/in/..."
                  value={trainer.social.linkedin}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="tm-modal-col-right">

            {/* NAME + CERT */}
            <div className="tm-form-row">
              <div className="tm-form-group">
                <label className="tm-section-label">Trainer Name</label>
                <input
                  type="text"
                  className="tm-modal-input tm-input-large"
                  value={trainer.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              <div className="tm-form-group">
                <label className="tm-section-label">Certifications</label>
                <input
                  type="text"
                  className="tm-modal-input tm-input-large"
                  value={trainer.certifications}
                  onChange={(e) => handleChange("certifications", e.target.value)}
                />
              </div>
            </div>

            {/* SKILLS */}
            <div className="tm-form-group">
              <label className="tm-section-label">Specialized Skills</label>

              <div className="tm-skills-container">
                {trainer.skills.map(skill => (
                  <span key={skill} className="tm-skill-pill">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}

                <div className="tm-skill-add-wrapper">
                  <input
                    type="text"
                    placeholder="Type and press Enter"
                    className="tm-skill-input"
                    value={newSkillText}
                    onChange={e => setNewSkillText(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                  <button className="tm-skill-add-btn" onClick={handleAddSkill}>
                    <Plus size={14} /> Add Skill
                  </button>
                </div>
              </div>
            </div>

            {/* BIO */}
            <div className="tm-form-group">
              <label className="tm-section-label">My Journey (Bio)</label>
              <textarea
                className="tm-modal-textarea"
                rows="4"
                value={trainer.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
            </div>

            {/* AVAILABILITY */}
            <div className="tm-form-group">
              <label className="tm-section-label">AVAILABILITY SCHEDULE</label>

              <div className="tm-days-row">
                {daysOfWeek.map(day => {
                  const isActive = trainer.availability.includes(day);
                  return (
                    <button
                      key={day}
                      className={`tm-day-circle ${isActive ? "active" : ""}`}
                      onClick={() => toggleDay(day)}
                      type="button"
                    >
                      {day}
                      <span className="tm-day-dot"></span>
                    </button>
                  );
                })}
              </div>

              <div className="tm-shifts-row">
                <button
                  className={`tm-shift-card ${trainer.shifts.includes("morning") ? "active" : ""}`}
                  onClick={() => toggleShift("morning")}
                  type="button"
                >
                  <Sun size={20} />
                  <div>
                    <span>MORNING</span>
                    <span>06:00 AM - 11:00 AM</span>
                  </div>
                </button>

                <button
                  className={`tm-shift-card ${trainer.shifts.includes("evening") ? "active" : ""}`}
                  onClick={() => toggleShift("evening")}
                  type="button"
                >
                  <Moon size={20} />
                  <div>
                    <span>EVENING</span>
                    <span>04:00 PM - 09:00 PM</span>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="tm-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfileModal;