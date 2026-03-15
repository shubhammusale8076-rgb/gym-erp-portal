import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, UserPlus, X, Camera } from 'lucide-react';
import './AddMember.css';

const AddMember = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        membershipPlan: 'PRO',
        joinDate: new Date().toISOString().split('T')[0],
        billingCycle: 'Monthly',
        trainer: 'None (General Access)',
        emergencyContactName: '',
        emergencyContactPhone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    const handlePlanSelect = (plan) => {
        setFormData({ ...formData, membershipPlan: plan });
    };

    return (
        <div className="add-member-overlay">
            <div className="add-member-modal">
                <header className="add-member-header">
                    <div>
                        <div className="breadcrumb">
                            <span>Dashboard</span>
                            <span className="separator">&gt;</span>
                            <span>Members</span>
                            <span className="separator">&gt;</span>
                            <span className="current">Add New Member</span>
                        </div>
                        <h1 className="heading-1">Add New Member</h1>
                        <p className="subtitle">Register a new client and assign them to a membership plan.</p>
                    </div>
                    <button className="btn btn-secondary back-btn" onClick={onClose}>
                        <ArrowLeft size={18} />
                        Back to Directory
                    </button>
                </header>

            <form className="add-member-grid" onSubmit={handleSubmit}>
                <div className="main-content">
                    {/* Personal Information */}
                    <section className="glass-panel section-card">
                        <div className="section-header">
                            <User className="section-icon" size={20} />
                            <h3>Personal Information</h3>
                        </div>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. John Doe" 
                                    className="input-field"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="input-field"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input 
                                    type="text" 
                                    placeholder="+1 (555) 000-0000" 
                                    className="input-field"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <div className="date-input-wrapper">
                                    <input 
                                        type="date" 
                                        className="input-field"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select 
                                    className="input-field"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Membership Details */}
                    <section className="glass-panel section-card">
                        <div className="section-header">
                            <Calendar className="section-icon" size={20} />
                            <h3>Membership Details</h3>
                        </div>
                        <div className="plan-selection">
                            <div 
                                className={`plan-card ${formData.membershipPlan === 'BASIC' ? 'active' : ''}`}
                                onClick={() => handlePlanSelect('BASIC')}
                            >
                                <span className="plan-name">BASIC</span>
                                <span className="plan-price">$29/mo</span>
                            </div>
                            <div 
                                className={`plan-card ${formData.membershipPlan === 'PRO' ? 'active' : ''}`}
                                onClick={() => handlePlanSelect('PRO')}
                            >
                                <div className="active-check">✓</div>
                                <span className="plan-name">PRO</span>
                                <span className="plan-price">$59/mo</span>
                                <span className="most-popular">MOST POPULAR</span>
                            </div>
                            <div 
                                className={`plan-card ${formData.membershipPlan === 'ELITE' ? 'active' : ''}`}
                                onClick={() => handlePlanSelect('ELITE')}
                            >
                                <span className="plan-name">ELITE</span>
                                <span className="plan-price">$99/mo</span>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Join Date</label>
                                <input 
                                    type="date" 
                                    className="input-field"
                                    value={formData.joinDate}
                                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Billing Cycle</label>
                                <select 
                                    className="input-field"
                                    value={formData.billingCycle}
                                    onChange={(e) => setFormData({...formData, billingCycle: e.target.value})}
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Assignment & Emergency */}
                    <section className="glass-panel section-card">
                        <div className="section-header">
                            <UserPlus className="section-icon" size={20} />
                            <h3>Assignment & Emergency</h3>
                        </div>
                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Assign Personal Trainer</label>
                                <select 
                                    className="input-field"
                                    value={formData.trainer}
                                    onChange={(e) => setFormData({...formData, trainer: e.target.value})}
                                >
                                    <option value="None (General Access)">None (General Access)</option>
                                    <option value="John Smith">John Smith</option>
                                    <option value="Jane Doe">Jane Doe</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Contact person name" 
                                    className="input-field"
                                    value={formData.emergencyContactName}
                                    onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact Phone</label>
                                <input 
                                    type="text" 
                                    placeholder="+1 (555) 000-0000" 
                                    className="input-field"
                                    value={formData.emergencyContactPhone}
                                    onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="sidebar">
                    {/* Profile Picture */}
                    <section className="glass-panel section-card">
                        <h3>Profile Picture</h3>
                        <div className="profile-upload-container">
                            <div className="avatar-preview">
                                <User size={48} className="placeholder-user" />
                                <div className="camera-icon-bg">
                                    <Camera size={16} color="white" />
                                </div>
                            </div>
                            <p className="upload-tip">Upload a high-resolution portrait. JPG or PNG, max 5MB.</p>
                            <button type="button" className="btn btn-secondary upload-btn">Upload Photo</button>
                        </div>
                    </section>

                    {/* Form Actions */}
                    <section className="glass-panel section-card">
                        <h3>Form Actions</h3>
                        <div className="actions-stack">
                            <button type="submit" className="btn btn-primary create-btn">
                                <UserPlus size={18} />
                                Create Member
                            </button>
                            <button type="button" className="btn btn-secondary cancel-btn" onClick={onClose}>
                                <X size={18} />
                                Cancel
                            </button>
                        </div>
                        <div className="invoice-info-card">
                            <div className="info-icon">i</div>
                            <p>Submitting this form will automatically generate an invoice for the first billing cycle.</p>
                        </div>
                    </section>
                </div>
            </form>
            </div>
        </div>
    );
};

export default AddMember;
