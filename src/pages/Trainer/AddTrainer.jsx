import React, { useState } from 'react';
import { User, Check, Upload, Tag, Asterisk, PlusCircle, ArrowRight, Camera } from 'lucide-react';
import './AddTrainer.css';

const AddTrainer = ({ onClose, onAdd, initialData }) => {
    const [formData, setFormData] = useState({
        fullName: initialData?.name || '',
        email: initialData?.email || '',
        phoneNumber: '',
        specialization: initialData?.specialty || 'Strength Training',
        bio: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
    });

    const isEdit = !!initialData;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <div className="at-overlay" onClick={onClose}>
            <div className="at-modal" onClick={e => e.stopPropagation()}>
                <header className="at-header">
                    <span className="at-subtitle">TEAM CURATOR</span>
                    <h1 className="at-title">{isEdit ? 'Edit Trainer Profile' : 'Add New Trainer'}</h1>
                    <p className="at-desc">
                        {isEdit ? 'Update the details and specialization for the existing professional in the Elite Club staff.' : 'Onboard a new professional into the Elite Club coaching team. Precision and clarity ensure a seamless transition.'}
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="at-grid">
                    
                    {/* LEFT COLUMN */}
                    <div className="at-col">
                        
                        {/* Personal Info Card */}
                        <div className="at-card card-white">
                            <div className="at-card-header mb-8">
                                <div>
                                    <h2 className="at-card-title">Professional Information</h2>
                                    <span className="at-card-subtitle">Basic details and contact securely stored.</span>
                                </div>
                                <User className="icon-purple" size={24} />
                            </div>

                            <div className="at-form-grid">
                                <div className="at-form-group">
                                    <label>FULL NAME</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Alex Rivera"
                                        value={formData.fullName}
                                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="at-form-group">
                                    <label>EMAIL ADDRESS</label>
                                    <input 
                                        type="email" 
                                        placeholder="alex@eliteclub.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="at-form-group">
                                    <label>PHONE NUMBER</label>
                                    <input 
                                        type="tel" 
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phoneNumber}
                                        onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                                    />
                                </div>
                                <div className="at-form-group">
                                    <label>SHORT BIO</label>
                                    <input 
                                        type="text" 
                                        placeholder="Experienced fitness coach..."
                                        value={formData.bio}
                                        onChange={e => setFormData({...formData, bio: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Specialization Selection */}
                        <div className="at-card card-tinted">
                            <div className="at-card-header mb-6">
                                <div>
                                    <h2 className="at-card-title">Primary Specialization</h2>
                                    <span className="at-card-subtitle">Select the main expertise area for the schedule.</span>
                                </div>
                                <Tag className="icon-purple" size={24} />
                            </div>

                            <div className="at-tier-grid">
                                
                                {/* Strength */}
                                <div 
                                    className={`at-tier-card ${formData.specialization === 'Strength Training' ? 'border-purple shadow-purple' : ''}`}
                                    onClick={() => setFormData({...formData, specialization: 'Strength Training'})}
                                >
                                    <div className="tier-card-top">
                                        <span className={formData.specialization === 'Strength Training' ? 'tier-badge-solid' : 'tier-badge-outline'}>STRENGTH</span>
                                        <div className={`radio-circle ${formData.specialization === 'Strength Training' ? 'active' : ''}`}></div>
                                    </div>
                                    <ul className="tier-features">
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'Strength Training' ? 'feature-check purple' : 'feature-check'} /> Free Weights</li>
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'Strength Training' ? 'feature-check purple' : 'feature-check'} /> Powerlifting</li>
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'Strength Training' ? 'feature-check purple' : 'feature-check'} /> Bodybuilding</li>
                                    </ul>
                                </div>

                                {/* Yoga */}
                                <div 
                                    className={`at-tier-card ${formData.specialization === 'Yoga & Mindfulness' ? 'border-purple shadow-purple' : ''}`}
                                    onClick={() => setFormData({...formData, specialization: 'Yoga & Mindfulness'})}
                                >
                                    <div className="tier-card-top">
                                        <span className={formData.specialization === 'Yoga & Mindfulness' ? 'tier-badge-solid' : 'tier-badge-outline'}>YOGA</span>
                                        <div className={`radio-circle ${formData.specialization === 'Yoga & Mindfulness' ? 'active' : ''}`}></div>
                                    </div>
                                    <ul className="tier-features">
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'Yoga & Mindfulness' ? 'feature-check purple' : 'feature-check'} /> Vinyasa Flow</li>
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'Yoga & Mindfulness' ? 'feature-check purple' : 'feature-check'} /> Meditation</li>
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'Yoga & Mindfulness' ? 'feature-check purple' : 'feature-check'} /> Flexibility</li>
                                    </ul>
                                </div>

                                {/* HIIT */}
                                <div 
                                    className={`at-tier-card ${formData.specialization === 'HIIT Master' ? 'border-purple shadow-purple' : ''}`}
                                    onClick={() => setFormData({...formData, specialization: 'HIIT Master'})}
                                >
                                    <div className="tier-card-top">
                                        <span className={formData.specialization === 'HIIT Master' ? 'tier-badge-solid' : 'tier-badge-outline'}>HIIT</span>
                                        <div className={`radio-circle ${formData.specialization === 'HIIT Master' ? 'active' : ''}`}></div>
                                    </div>
                                    <ul className="tier-features">
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'HIIT Master' ? 'feature-check purple' : 'feature-check'} /> Circuit Training</li>
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'HIIT Master' ? 'feature-check purple' : 'feature-check'} /> Cardio Burn</li>
                                        <li><Check size={12} strokeWidth={4} className={formData.specialization === 'HIIT Master' ? 'feature-check purple' : 'feature-check'} /> Endurance</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="at-col">
                        
                        {/* Profile Portrait */}
                        <div className="at-card card-white">
                            <div className="at-card-header justify-start gap-2 mb-6">
                                <Camera className="icon-purple" size={18} />
                                <h2 className="at-card-title" style={{fontSize: '1rem'}}>Profile Portrait</h2>
                            </div>
                            
                            <div className="avatar-upload-area">
                                <div className="avatar-circle">
                                    <User size={48} strokeWidth={1.5} className="avatar-placeholder-icon" />
                                    <button type="button" className="upload-btn-circle">
                                        <Upload size={16} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                            <p className="at-upload-hint text-center">
                                Upload a high-resolution portrait. JPEG or PNG, max 5MB. Must align with Elite Club brand guidelines.
                            </p>
                        </div>

                        {/* Emergency */}
                        <div className="at-card card-white" style={{flex: 1}}>
                            <div className="at-card-header justify-start gap-2 mb-6">
                                <Asterisk className="icon-red" size={18} />
                                <h2 className="at-card-title" style={{fontSize: '1rem'}}>Emergency Contact</h2>
                            </div>
                            
                            <div className="at-form-stack">
                                <input 
                                    className="pink-input" 
                                    type="text" 
                                    placeholder="Full Name"
                                    value={formData.emergencyContactName}
                                    onChange={e => setFormData({...formData, emergencyContactName: e.target.value})}
                                />
                                <input 
                                    className="pink-input" 
                                    type="tel" 
                                    placeholder="Phone Number"
                                    value={formData.emergencyContactPhone}
                                    onChange={e => setFormData({...formData, emergencyContactPhone: e.target.value})}
                                />
                            </div>

                            <div className="at-divider"></div>

                        </div>

                        {/* Action Buttons */}
                        <div className="at-actions">
                            <button type="submit" className="at-btn-submit">
                                {isEdit ? 'Save Profile Changes' : 'Create Trainer Profile'} <ArrowRight size={16} />
                            </button>
                            <button type="button" className="at-btn-cancel" onClick={onClose}>
                                Discard and Return
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTrainer;
