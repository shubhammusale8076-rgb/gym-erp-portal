import React, { useState } from 'react';
import { User, Check, Upload, Tag, Asterisk, PlusCircle, ArrowRight, Camera } from 'lucide-react';
import './AddMember.css';

const AddMember = ({ onClose, onAdd, initialData }) => {
    const [formData, setFormData] = useState({
        fullName: initialData?.name || '',
        email: initialData?.email || '',
        phoneNumber: '',
        dateOfBirth: '',
        membershipPlan: initialData?.plan || 'Elite',
        emergencyContactName: '',
        emergencyContactPhone: '',
        trainer: ''
    });

    const isEdit = !!initialData;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    const handlePlanSelect = (plan) => {
        setFormData({ ...formData, membershipPlan: plan });
    };

    return (
        <div className="am-overlay">
            <div className="am-modal">
                <header className="am-header">
                    <span className="am-subtitle">MEMBER CURATOR</span>
                    <h1 className="am-title">{isEdit ? 'Edit Member Profile' : 'Add New Member'}</h1>
                    <p className="am-desc">
                        {isEdit ? 'Update the details and membership tier for the existing athlete in the Elite Club ecosystem.' : 'Onboard a new athlete into the Elite Club ecosystem. Precision and clarity ensure a seamless transition into their new lifestyle.'}
                    </p>
                </header>

                <form className="am-grid" onSubmit={handleSubmit}>
                    {/* Left Column */}
                    <div className="am-col">
                        
                        {/* Personal Information */}
                        <div className="am-card card-white">
                            <div className="am-card-header mb-8">
                                <h3 className="am-card-title">Personal Information</h3>
                                <User size={16} className="icon-purple" />
                            </div>
                            
                            <div className="am-form-grid">
                                <div className="am-form-group">
                                    <label>FULL NAME</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Julian Sterling" 
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="am-form-group">
                                    <label>EMAIL ADDRESS</label>
                                    <input 
                                        type="email" 
                                        placeholder="julian.s@auraelite.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div className="am-form-group">
                                    <label>PHONE NUMBER</label>
                                    <input 
                                        type="tel" 
                                        placeholder="+1 (555) 000-0000" 
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                    />
                                </div>
                                <div className="am-form-group am-relative">
                                    <label>DATE OF BIRTH</label>
                                    <input 
                                        type="text" 
                                        placeholder="mm/dd/yyyy"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Membership Tier */}
                        <div className="am-card card-tinted">
                            <div className="am-card-header mb-8">
                                <div className="am-title-stack">
                                    <h3 className="am-card-title">Membership Tier</h3>
                                    <span className="am-card-subtitle">Select the curated experience for the member.</span>
                                </div>
                                <Tag size={16} className="icon-purple" />
                            </div>

                            <div className="am-tier-grid">
                                {/* Standard */}
                                <div 
                                    className={`am-tier-card ${formData.membershipPlan === 'Standard' ? 'selected' : ''}`}
                                    onClick={() => handlePlanSelect('Standard')}
                                >
                                    <div className="tier-card-top">
                                        <span className="tier-badge-outline">STANDARD</span>
                                        <div className={`radio-circle ${formData.membershipPlan === 'Standard' ? 'active' : ''}`}></div>
                                    </div>
                                    <div className="tier-price">
                                        <h2>$99</h2><span>/mo</span>
                                    </div>
                                    <ul className="tier-features">
                                        <li><Check size={12} className="feature-check"/> Gym Access</li>
                                        <li><Check size={12} className="feature-check"/> Locker Room</li>
                                    </ul>
                                </div>
                                {/* Elite */}
                                <div 
                                    className={`am-tier-card ${formData.membershipPlan === 'Elite' ? 'selected border-purple shadow-purple' : ''}`}
                                    onClick={() => handlePlanSelect('Elite')}
                                >
                                    <div className="tier-card-top">
                                        <span className="tier-badge-solid">ELITE</span>
                                        <div className="badge-star-icon">★</div>
                                    </div>
                                    <div className="tier-price">
                                        <h2>$189</h2><span>/mo</span>
                                    </div>
                                    <ul className="tier-features">
                                        <li className="purple-text"><Check size={12} className="feature-check purple"/> All Standard Perks</li>
                                        <li className="purple-text"><Check size={12} className="feature-check purple"/> Pool & Sauna</li>
                                        <li className="purple-text"><Check size={12} className="feature-check purple"/> 2 Guest Passes</li>
                                    </ul>
                                </div>
                                {/* Platinum */}
                                <div 
                                    className={`am-tier-card ${formData.membershipPlan === 'Platinum' ? 'selected' : ''}`}
                                    onClick={() => handlePlanSelect('Platinum')}
                                >
                                    <div className="tier-card-top">
                                        <span className="tier-badge-outline">PLATINUM</span>
                                        <div className={`radio-circle ${formData.membershipPlan === 'Platinum' ? 'active' : ''}`}></div>
                                    </div>
                                    <div className="tier-price">
                                        <h2>$299</h2><span>/mo</span>
                                    </div>
                                    <ul className="tier-features">
                                        <li><Check size={12} className="feature-check"/> All Elite Perks</li>
                                        <li><Check size={12} className="feature-check"/> Private Training</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="am-col">
                        
                        {/* Profile Portrait */}
                        <div className="am-card card-white text-center">
                            <h3 className="am-card-title mb-6 mx-auto">Profile Portrait</h3>
                            
                            <div className="avatar-upload-area">
                                <div className="avatar-circle">
                                    <Camera size={48} className="avatar-placeholder-icon" strokeWidth={1.5} />
                                    <button className="upload-btn-circle" type="button">
                                        <Upload size={16} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                            
                            <p className="am-upload-hint">
                                High-resolution portraits<br/>(JPEG, PNG) elevate the<br/>member directory<br/>experience.
                            </p>
                        </div>

                        {/* Emergency Contact & Trainer */}
                        <div className="am-card card-white">
                            {/* Emergency Contact */}
                            <div className="am-card-header mb-8 justify-start gap-2">
                                <Asterisk size={16} className="icon-red" />
                                <h3 className="am-card-title">Emergency Contact</h3>
                            </div>
                            
                            <div className="am-form-stack mb-8">
                                <input 
                                    type="text" 
                                    placeholder="Contact Name" 
                                    className="pink-input"
                                    value={formData.emergencyContactName}
                                    onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                                />
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    className="pink-input"
                                    value={formData.emergencyContactPhone}
                                    onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                                />
                            </div>
                            
                            <div className="am-divider"></div>

                            {/* Assign Trainer */}
                            <div className="am-card-header mb-8 justify-start gap-2">
                                <PlusCircle size={16} className="icon-purple" />
                                <h3 className="am-card-title">Assign Trainer</h3>
                            </div>

                            <select 
                                className="pink-input"
                                value={formData.trainer}
                                onChange={(e) => setFormData({...formData, trainer: e.target.value})}
                            >
                                <option value="">No Trainer Assigned</option>
                                <option value="trainer1">John Smith</option>
                                <option value="trainer2">Jane Doe</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="am-actions">
                            <button type="submit" className="am-btn-submit">
                                {isEdit ? 'Save Profile Changes' : 'Create Member Account'} <ArrowRight size={16} />
                            </button>
                            <button type="button" className="am-btn-cancel" onClick={onClose}>
                                Discard and Return
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMember;
