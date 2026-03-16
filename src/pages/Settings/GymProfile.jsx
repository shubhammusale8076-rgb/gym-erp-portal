import React, { useState } from 'react';
import { Camera, MapPin, Phone, Mail, Globe, Save } from 'lucide-react';
import './GymProfile.css';

const GymProfile = () => {
    const [profile, setProfile] = useState({
        name: 'GymSync Fitness Club',
        tagline: 'Precision in Performance, Excellence in Execution',
        phone: '+91 98765 43210',
        email: 'contact@gymsync.com',
        website: 'www.gymsync.com',
        address: '123 Iron Street, Sector 15, Gurgaon, Haryana - 122001',
        description: 'We are a premium fitness facility dedicated to providing the best training experience with state-of-the-art equipment and elite trainers.',
        logo: 'https://ui-avatars.com/api/?name=GS&background=0d9488&color=fff&size=128'
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
            alert('Profile updated successfully!');
        }, 1000);
    };

    return (
        <div className="page-container gym-profile-page">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="heading-1">Gym Profile</h1>
                    <p className="subtitle">Update your gym's public information and branding.</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    <Save size={18} /> {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
            </header>

            <div className="profile-layout">
                <div className="profile-sidebar">
                    <div className="glass-card logo-card">
                        <h3 className="heading-3 mb-4">Gym Logo</h3>
                        <div className="logo-upload">
                            <img src={profile.logo} alt="Gym Logo" className="profile-logo-preview" />
                            <button className="logo-edit-btn">
                                <Camera size={16} />
                            </button>
                        </div>
                        <p className="text-muted text-center text-sm mt-4">
                            Recommended size: 512x512px. <br /> PNG or JPG format.
                        </p>
                    </div>

                    <div className="glass-card mt-6">
                        <h3 className="heading-3 mb-4">Quick Stats</h3>
                        <div className="quick-stat-item">
                            <span className="text-secondary">Members</span>
                            <span className="font-bold">1,248</span>
                        </div>
                        <div className="quick-stat-item">
                            <span className="text-secondary">Trainers</span>
                            <span className="font-bold">24</span>
                        </div>
                        <div className="quick-stat-item">
                            <span className="text-secondary">Location</span>
                            <span className="font-bold text-sm">Gurgaon, IN</span>
                        </div>
                    </div>
                </div>

                <div className="profile-main">
                    <div className="glass-panel p-8">
                        <h3 className="heading-2 mb-6">General Information</h3>

                        <div className="form-grid">
                            <div className="input-group">
                                <label className="input-label">Gym Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input-field"
                                    value={profile.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Tagline</label>
                                <input
                                    type="text"
                                    name="tagline"
                                    className="input-field"
                                    value={profile.tagline}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="input-group mt-4">
                            <label className="input-label">Description</label>
                            <textarea
                                name="description"
                                className="input-field min-h-[100px]"
                                rows="4"
                                value={profile.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <h3 className="heading-2 mt-10 mb-6">Contact & Location</h3>

                        <div className="form-grid">
                            <div className="input-group">
                                <label className="input-label flex items-center gap-2">
                                    <Phone size={14} className="text-muted" /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="input-field"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label flex items-center gap-2">
                                    <Mail size={14} className="text-muted" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    value={profile.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-grid mt-4">
                            <div className="input-group">
                                <label className="input-label flex items-center gap-2">
                                    <Globe size={14} className="text-muted" /> Website
                                </label>
                                <input
                                    type="text"
                                    name="website"
                                    className="input-field"
                                    value={profile.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label flex items-center gap-2">
                                    <MapPin size={14} className="text-muted" /> Office Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="input-field"
                                    value={profile.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GymProfile;
