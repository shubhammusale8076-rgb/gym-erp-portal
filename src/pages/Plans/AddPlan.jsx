import React, { useState } from 'react';
import { X, Plus, Check, Archive, Wallet, Star, ArrowRight } from 'lucide-react';
import './AddPlan.css';

const AddPlan = ({ onClose, onSave, initialData }) => {
    const isEdit = !!initialData;
    
    const [form, setForm] = useState({
        name: initialData?.name || '',
        badge: initialData?.badge || '',
        price: initialData?.price || '',
        period: initialData?.period || 'month',
        features: initialData?.features || [],
        isPopular: initialData?.isPopular || false
    });
    
    const [newFeature, setNewFeature] = useState('');

    const addFeature = () => {
        if (newFeature.trim()) {
            setForm({ ...form, features: [...form.features, { text: newFeature.trim(), included: true }] });
            setNewFeature('');
        }
    };

    const removeFeature = (index) => {
        setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
    };

    const handleSubmit = () => {
        onSave(form);
    };

    return (
        <div className="cp-overlay" onClick={onClose}>
            <div className="cp-modal" onClick={e => e.stopPropagation()}>
                <div className="cp-header">
                    <div className="cp-header-text">
                        <h1 className="cp-title">{isEdit ? 'Edit Plan' : 'Create New Plan'}</h1>
                        <span className="cp-subtitle">TIER ARCHITECTURE & REVENUE DESIGN</span>
                    </div>
                    <button className="cp-close-btn" onClick={onClose}>
                        <X size={20} strokeWidth={2} />
                    </button>
                </div>

                <div className="cp-grid">
                    {/* Left Column */}
                    <div className="cp-col">
                        
                        {/* Plan Identity Card */}
                        <div className="cp-card">
                            <span className="cp-card-label">PLAN IDENTITY</span>
                            
                            <div className="cp-form-group">
                                <label>Plan Name</label>
                                <input 
                                    type="text" 
                                    className="cp-line-input" 
                                    placeholder="e.g., Pro Plus"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            
                            <div className="cp-form-group">
                                <label>Badge Text</label>
                                <input 
                                    type="text" 
                                    className="cp-line-input" 
                                    placeholder="e.g., MOST POPULAR"
                                    value={form.badge}
                                    onChange={e => setForm({ ...form, badge: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Monetization Card */}
                        <div className="cp-card cp-row-between">
                            <div className="cp-price-section">
                                <span className="cp-card-label">MONETIZATION</span>
                                <div className="cp-price-input-wrapper">
                                    <span className="cp-currency">₹</span>
                                    <input 
                                        type="number" 
                                        className="cp-price-input" 
                                        placeholder="0.00"
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="cp-money-icon-box">
                                <Wallet size={20} strokeWidth={2.5} className="cp-money-icon" />
                            </div>
                        </div>

                        {/* Elite Distinction Card */}
                        <div className="cp-card cp-card-compact cp-row-between">
                            <div className="cp-elite-left">
                                <div className="cp-star-circle">
                                    <Star size={16} className="cp-star"  />
                                </div>
                                <div className="cp-elite-text">
                                    <h4>Elite Distinction</h4>
                                    <p>Highlight as Elite/Popular layout in member portal</p>
                                </div>
                            </div>
                            <div className="cp-toggle-wrapper">
                                <input 
                                    type="checkbox" 
                                    id="elite-toggle" 
                                    className="cp-toggle"
                                    checked={form.isPopular}
                                    onChange={e => setForm({ ...form, isPopular: e.target.checked })}
                                />
                                <label htmlFor="elite-toggle" className="cp-toggle-label"></label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="cp-col">
                        {/* Include Features Card */}
                        <div className="cp-card cp-card-white cp-full-height">
                            <div className="cp-features-header">
                                <span className="cp-card-label">INCLUDE FEATURES</span>
                                <button className="cp-btn-text" onClick={addFeature}>
                                    <Plus size={14} /> ADD
                                </button>
                            </div>

                            {/* Add Feature Inline Input */}
                            <div className="cp-add-feature-row">
                                <input 
                                    type="text" 
                                    className="cp-line-input cp-feature-input"
                                    placeholder="Type a benefit..."
                                    value={newFeature}
                                    onChange={e => setNewFeature(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addFeature();
                                        }
                                    }}
                                />
                            </div>

                            <div className="cp-features-list">
                                {form.features.map((f, i) => {
                                    const text = typeof f === 'string' ? f : f.text;
                                    return (
                                        <div key={i} className="cp-feature-pill">
                                            <div className="cp-check-circle">
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                            <span className="cp-feature-text">{text}</span>
                                            <button type="button" className="cp-feature-remove" onClick={() => removeFeature(i)}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            {form.features.length === 0 && (
                                <div className="cp-empty-bundles">
                                    <Archive size={20} className="cp-empty-icon" />
                                    <span>NEW SERVICE BUNDLES APPEAR HERE</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="cp-footer">
                    <button className="cp-btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="cp-btn-primary" onClick={handleSubmit}>
                        {isEdit ? 'Update Plan' : 'Create Plan'} <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPlan;
