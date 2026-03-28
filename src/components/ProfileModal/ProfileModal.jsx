import React, { useState } from 'react';
import { User, ShieldCheck, Upload, ArrowRight, Camera } from 'lucide-react';
import './ProfileModal.css';

const ProfileModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: 'Taylor Admin',
        email: 'admin@eliteclub.com',
        phoneNumber: '+1 (555) 123-4567',
        role: 'Administrator',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className="pm-overlay" onClick={onClose}>
            <div className="pm-modal" onClick={e => e.stopPropagation()}>
                <header className="pm-header">
                    <span className="pm-subtitle">IDENTITY & SECURITY</span>
                    <h1 className="pm-title">My Profile</h1>
                    <p className="pm-desc">
                        Manage your administrative persona, contact preferences, and robust security protocols bridging the Elite Club network.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="pm-grid">
                    
                    {/* LEFT COLUMN */}
                    <div className="pm-col">
                        
                        <div className="pm-card card-white">
                            <div className="pm-card-header mb-8">
                                <div>
                                    <h2 className="pm-card-title">Personal Details</h2>
                                    <span className="pm-card-subtitle">General contact and administrative routing parameters.</span>
                                </div>
                                <User className="icon-purple" size={24} />
                            </div>

                            <div className="pm-form-grid">
                                <div className="pm-form-group full-width">
                                    <label>FULL NAME</label>
                                    <input 
                                        type="text" 
                                        value={formData.fullName}
                                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="pm-form-group">
                                    <label>EMAIL ADDRESS</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="pm-form-group">
                                    <label>PHONE NUMBER</label>
                                    <input 
                                        type="tel" 
                                        value={formData.phoneNumber}
                                        onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pm-card card-tinted">
                            <div className="pm-card-header mb-8">
                                <div>
                                    <h2 className="pm-card-title">Security & Access</h2>
                                    <span className="pm-card-subtitle">Elevated permissions and encrypted credentials.</span>
                                </div>
                                <ShieldCheck className="icon-purple" size={24} />
                            </div>

                            <div className="pm-form-grid">
                                <div className="pm-form-group">
                                    <label>AUTHORIZATION ROLE</label>
                                    <input 
                                        type="text" 
                                        value={formData.role}
                                        disabled
                                        style={{opacity: 0.6, cursor: 'not-allowed'}}
                                    />
                                </div>
                                <div className="pm-form-group">
                                    <label>NEW PASSWORD</label>
                                    <input 
                                        type="password" 
                                        placeholder="Enter to update..."
                                        value={formData.password}
                                        onChange={e => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="pm-col">
                        
                        <div className="pm-card card-white" style={{flex: 1}}>
                            <div className="pm-card-header justify-start gap-2 mb-6">
                                <Camera className="icon-purple" size={18} />
                                <h2 className="pm-card-title" style={{fontSize: '1rem'}}>Profile Portrait</h2>
                            </div>
                            
                            <div className="avatar-upload-area">
                                <div className="avatar-circle">
                                    <span className="avatar-text-placeholder">TA</span>
                                    <button type="button" className="upload-btn-circle">
                                        <Upload size={16} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                            <p className="pm-upload-hint mb-8">
                                Represents your presence in the portal. Maximum size 5MB.
                            </p>

                            <div className="pm-actions" style={{marginTop: 'auto'}}>
                                <button type="submit" className="pm-btn-submit">
                                    Save Profile State <ArrowRight size={16} />
                                </button>
                                <button type="button" className="pm-btn-cancel" onClick={onClose}>
                                    Discard and Return
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
