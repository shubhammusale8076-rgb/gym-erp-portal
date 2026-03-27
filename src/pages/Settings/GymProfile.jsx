import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Globe, Save, Info, Sparkles, Lightbulb, Users, Dumbbell } from 'lucide-react';
import './GymProfile.css';

const GymProfile = () => {
    const [profile, setProfile] = useState({
        name: 'GymSync Fitness Club',
        tagline: 'Precision in Performance, Excellence in Execution',
        phone: '+91 98765 43210',
        email: 'concierge@gymsync.fit',
        website: 'www.gymsync.fitness',
        address: 'Level 5, Signature Towers',
        description: 'Elite boutique fitness facility focusing on personalized training protocols and state-of-the-art performance metrics for the dedicated athlete.',
        logo: null // Set to null to show initials placeholder
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Mock API call
        setTimeout(() => {
            setIsSaving(false);
            // alert('Profile updated successfully!');
        }, 1000);
    };

    return (
        <div className="gym-profile-page">
            <div className="profile-layout">
                {/* Left Column */}
                <div className="profile-main">
                    {/* General Information */}
                    <div className="profile-card">
                        <div className="section-header">
                            <div className="section-icon-wrap">
                                <Info size={20} />
                            </div>
                            <h2 className="section-title">General Information</h2>
                        </div>

                        <div className="profile-input-group">
                            <label className="profile-label">Gym Name</label>
                            <input
                                type="text"
                                name="name"
                                className="profile-input"
                                value={profile.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="profile-input-group">
                            <label className="profile-label">Tagline</label>
                            <input
                                type="text"
                                name="tagline"
                                className="profile-input"
                                value={profile.tagline}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="profile-input-group" style={{ marginBottom: 0 }}>
                            <label className="profile-label">Description</label>
                            <textarea
                                name="description"
                                className="profile-input profile-textarea"
                                value={profile.description}
                                onChange={handleChange}
                                rows="4"
                            ></textarea>
                        </div>
                    </div>

                    {/* Contact & Location */}
                    <div className="profile-card">
                        <div className="section-header">
                            <div className="section-icon-wrap">
                                <MapPin size={20} />
                            </div>
                            <h2 className="section-title">Contact & Location</h2>
                        </div>

                        <div className="profile-form-grid">
                            <div className="profile-input-group">
                                <label className="profile-label">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="profile-input"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-input-group">
                                <label className="profile-label">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="profile-input"
                                    value={profile.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="profile-form-grid" style={{ marginBottom: 0 }}>
                            <div className="profile-input-group" style={{ marginBottom: 0 }}>
                                <label className="profile-label">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    className="profile-input"
                                    value={profile.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="profile-input-group" style={{ marginBottom: 0 }}>
                                <label className="profile-label">Office Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="profile-input"
                                    value={profile.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="save-btn-container">
                        <button
                            className="save-profile-btn btn-primary"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Profile'} <Sparkles size={18} />
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="profile-sidebar">
                    {/* Brand Insignia */}
                    <div className="profile-card brand-insignia-card">
                        <h3 className="profile-label" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Brand Insignia</h3>
                        <div className="logo-container">
                            <div className="logo-initials">GS</div>
                            <button className="logo-edit-btn">
                                <Camera size={16} />
                            </button>
                        </div>
                        <p className="recommended-text">
                            Recommended: 1024x1024<br />SVG/PNG
                        </p>
                    </div>

                    {/* Facility Overview */}
                    <div className="profile-card-dark">
                        <h3 className="facility-overview-title">Facility Overview</h3>

                        <div className="stat-item">
                            <div className="stat-icon"><Users size={20} /></div>
                            <div className="stat-label">Members</div>
                            <div className="stat-value">1,248</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon"><Dumbbell size={20} /></div>
                            <div className="stat-label">Trainers</div>
                            <div className="stat-value">24</div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <MapPin size={20} />
                            </div>
                            <div className="stat-label">Location</div>
                            <div className="location-text">
                                <div className="location-city">Gurgaon</div>
                                <div className="location-country">INDIA, IN</div>
                            </div>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=500&auto=format&fit=crop"
                            alt="Facility"
                            className="facility-preview-img"
                        />
                    </div>

                    {/* Pro Tip */}
                    <div className="profile-card-yellow">
                        <div className="tip-header">
                            <Lightbulb size={20} fill="currentColor" />
                            <h3 className="tip-title">Pro Tip</h3>
                        </div>
                        <p className="tip-content">
                            Consistent branding increases member retention by 23%. Ensure your logo and tagline match your physical interior.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymProfile;
