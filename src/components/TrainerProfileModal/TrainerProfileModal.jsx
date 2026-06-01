import React, { useState, useEffect } from "react";
import './TrainerProfileModal.css'
import { X, Camera, Users, Link as LinkIcon, Plus, Upload } from "lucide-react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useDispatch } from "react-redux";
import { deleteProfileImage, uploadProfileImage } from "../../apiservice/apiservice";
import { showToast } from "../../redux/toastSlice";

const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const TrainerProfileModal = ({ isOpen, onClose, data, onSave }) => {
  const [trainer, setTrainer] = useState(null);
  const [newSkillText, setNewSkillText] = useState("");
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [profileImagePublicId, setProfileImagePublicId] = useState('');



  useEffect(() => {
    if (data) {
      setTrainer({
        ...data,
        availability: data.availability || []
      });
    }
  }, [data]);

  if (!isOpen || !trainer) return null;

  // ---------------- HANDLERS ----------------

  const handleChange = (field, value) => {
    setTrainer(prev => ({ ...prev, [field]: value }));
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

  // ----------- AVAILABILITY HANDLERS -----------

  const addAvailability = () => {
    setTrainer(prev => ({
      ...prev,
      availability: [
        ...(prev.availability || []),
        { dayOfWeek: "MON", startTime: "", endTime: "" }
      ]
    }));
  };

  const updateAvailability = (index, field, value) => {
    const updated = [...trainer.availability];
    updated[index][field] = value;

    setTrainer(prev => ({
      ...prev,
      availability: updated
    }));
  };

  const removeAvailability = (index) => {
    const updated = trainer.availability.filter((_, i) => i !== index);

    setTrainer(prev => ({
      ...prev,
      availability: updated
    }));
  };

  const handleSave = () => {
    onSave(trainer);
    onClose();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadProfileImage(file, "TRAINER");

      // delete old image if exists
      if (profileImagePublicId) {
        await deleteProfileImage(profileImagePublicId);
      }
      dispatch(showToast({ message: data.message, type: "success" }));


      setProfileImageUrl(data.url);
      setProfileImagePublicId(data.publicId);

    } catch (err) {
      alert("Image upload failed");
      console.log(err)
    } finally {
      setUploading(false);
    }
  };

  // 🔥 REMOVE IMAGE
  const handleRemoveImage = async () => {
    try {
      if (profileImagePublicId) {
        const response = await deleteProfileImage(profileImagePublicId);
        dispatch(showToast({ message: response.message, type: "success" }));
      }

      setProfileImageUrl('');
      setProfileImagePublicId('');

    } catch (err) {
      console.error(err);
    }
  };

  const displayProfileImage =profileImageUrl || trainer?.profileImageUrl;

  // ---------------- UI ----------------

  return (
    <div className="tm-modal-overlay">
      <div className="tm-modal glass-panel">

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
                {displayProfileImage ? (
                  <img src={displayProfileImage} alt="Profile" className="tm-avatar" />
                ) : (
                  <div className="tm-avatar-placeholder">
                    <Camera size={40} />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="profileUpload" className="tm-badge-btn-photo">
                  {uploading ? "..." : <Upload size={16} />}
                </label>
              </div>

              <span className="tm-photo-hint">
                Recommended: 800x800px high-res portrait.
              </span>

              {profileImageUrl && (
                <button type="button" className="btn-secondary" onClick={handleRemoveImage}>
                  Remove Image
                </button>
              )}

            </div>

            {/* SOCIAL */}
            <div className="tm-social-section">
              <span className="tm-section-label">COMMUNITY LINKS</span>

              <div className="tm-input-group-icon">
                <span className="tm-input-icon"><Users size={16} /></span>
                <input
                  type="text"
                  className="tm-modal-input"
                  placeholder="@instagram"
                  value={trainer.instagramHandle}
                  onChange={(e) => handleChange("instagramHandle", e.target.value)}
                />
              </div>

              <div className="tm-input-group-icon">
                <span className="tm-input-icon"><LinkIcon size={16} /></span>
                <input
                  type="text"
                  className="tm-modal-input"
                  placeholder="linkedin.com/in/..."
                  value={trainer.linkedinUrl}
                  onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="tm-modal-col-right">

            {/* BASIC INFO */}
            <div className="tm-form-row">
              <div className="tm-form-group">
                <label className="tm-section-label">Trainer Name</label>
                <input
                  type="text"
                  className="tm-modal-input tm-input-large"
                  value={trainer.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
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

            {/* EMAIL + PHONE */}
            <div className="tm-form-row">
              <div className="tm-form-group">
                <label className='tm-section-label'>Email</label>
                <input
                  type="email"
                  className="tm-modal-input tm-input-large"
                  value={trainer.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="tm-form-group">
                <label className='tm-section-label'>Phone</label>
                <input
                  type="text"
                  className="tm-modal-input tm-input-large"
                  value={trainer.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="tm-form-group">
              <label className='tm-section-label'>Experience (Years)</label>
              <input
                type="number"
                className="tm-modal-input tm-input-large"
                value={trainer.experienceInYears}
                onChange={(e) => handleChange("experienceInYears", e.target.value)}
              />
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

            {/* AVAILABILITY (NEW MODEL) */}
            <div className="tm-form-group">
              <label className="tm-section-label">AVAILABILITY SCHEDULE</label>

              <div className="tm-availability-list">

                {(trainer.availability || []).map((slot, index) => (
                  <div key={index} className="tm-form-row">

                    <div className="tm-form-group">
                      <select
                        className="tm-modal-input"
                        value={slot.dayOfWeek}
                        onChange={(e) =>
                          updateAvailability(index, "dayOfWeek", e.target.value)
                        }
                      >
                        {daysOfWeek.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>

                    <div className="tm-form-group">
                      <input
                        type="time"
                        className="tm-modal-input"
                        value={slot.startTime}
                        onChange={(e) =>
                          updateAvailability(index, "startTime", e.target.value)
                        }
                      />
                    </div>

                    <div className="tm-form-group">
                      <input
                        type="time"
                        className="tm-modal-input"
                        value={slot.endTime}
                        onChange={(e) =>
                          updateAvailability(index, "endTime", e.target.value)
                        }
                      />
                    </div>

                    <button
                      type="button"
                      className="tm-remove-btn"
                      onClick={() => removeAvailability(index)}
                    >
                      <X size={16} />
                    </button>

                  </div>
                ))}

                <button
                  type="button"
                  className="tm-skill-add-btn"
                  onClick={addAvailability}
                >
                  <Plus size={14} /> Add Slot
                </button>

              </div>
            </div>

            {/* STATUS */}
            <div className="tm-form-group">
              <label className="tm-section-label">Status</label>

              <div className="tm-toggle-row">
                <ToggleSwitch
                  label="Active"
                  checked={trainer.active}
                  onChange={(val) => handleChange("active", val)}
                />

                <ToggleSwitch
                  label="Available"
                  checked={trainer.available}
                  onChange={(val) => handleChange("available", val)}
                />

                <ToggleSwitch
                  label="Visible"
                  checked={trainer.visibleOnWebsite}
                  onChange={(val) => handleChange("visibleOnWebsite", val)}
                />

                <ToggleSwitch
                  label="Featured"
                  checked={trainer.featured}
                  onChange={(val) => handleChange("featured", val)}
                />
              </div>
            </div>

          </div>
        </div>

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