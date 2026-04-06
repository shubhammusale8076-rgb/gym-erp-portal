import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
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
        <div className="add-plan-overlay" onClick={onClose}>
            <div className="add-plan-modal" onClick={e => e.stopPropagation()}>
                <button className="close-action-btn" onClick={onClose}>
                    <X size={20} strokeWidth={2} />
                </button>
                
                <div className="add-plan-header">
                    <h1 className="title">{isEdit ? 'Edit Plan' : 'Create New Plan'}</h1>
                    <span className="subtitle">AURA PREMIUM MEMBERSHIP ARCHITECTURE</span>
                </div>
                
                <div className="add-plan-grid">
                    {/* Left Column */}
                    <div className="add-plan-col left-col">
                        
                        <div className="input-group">
                            <label className="section-label">PLAN IDENTITY</label>
                            <input
                                type="text"
                                className="input-pill"
                                placeholder="e.g. Diamond Executive"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label className="section-label">BADGE TEXT</label>
                            <input
                                type="text"
                                className="input-pill"
                                placeholder="MOST POPULAR"
                                value={form.badge}
                                onChange={e => setForm({ ...form, badge: e.target.value })}
                            />
                        </div>
                        
                        <div className="monetization-card">
                            <label className="section-label purple-label">MONETIZATION</label>
                            <div className="price-display">
                                <span className="currency-sign">$</span>
                                <input
                                    type="number"
                                    className="price-input"
                                    placeholder="00.00"
                                    value={form.price}
                                    onChange={e => setForm({ ...form, price: e.target.value })}
                                />
                            </div>
                            <span className="billed-text">Billed monthly per member</span>
                        </div>
                        
                        <div className="cover-image-placeholder">
                            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop" alt="Gym Background" />
                        </div>
                        
                    </div>
                    
                    {/* Right Column */}
                    <div className="add-plan-col right-col">
                        
                        <div className="section-header-flex">
                            <label className="section-label">CORE BENEFITS</label>
                            <button className="btn-add-benefit" onClick={addFeature}>
                                <div className="plus-icon-circle"><Plus size={10} strokeWidth={4} /></div> 
                                <span>Add Benefit</span>
                            </button>
                        </div>
                        
                        <div className="benefits-list">
                            {form.features.map((f, i) => {
                                const text = typeof f === 'string' ? f : f.text;
                                return (
                                    <div key={i} className="benefit-pill">
                                        <div className="hollow-check-icon">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="benefit-text">{text}</span>
                                        <button className="remove-benefit-btn" onClick={() => removeFeature(i)}>
                                            <X size={14} />
                                        </button>
                                    </div>
                                );
                            })}
                            
                            <div className="benefit-pill new-benefit-pill">
                                <input
                                    type="text"
                                    className="new-benefit-input"
                                    placeholder="Enter new benefit..."
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
                        </div>
                        
                        <div className="settings-section">
                            <label className="section-label">PLAN SETTINGS</label>
                            <div className="settings-card">
                                <div className="settings-info">
                                    <h4>Elite Distinction</h4>
                                    <p>Highlight this plan with a premium gold border and exclusive animation in the member portal.</p>
                                </div>
                                <div className="toggle-switch-wrapper">
                                    <input
                                        type="checkbox"
                                        id="eliteToggle"
                                        className="toggle-checkbox"
                                        checked={form.isPopular}
                                        onChange={e => setForm({ ...form, isPopular: e.target.checked })}
                                    />
                                    <label htmlFor="eliteToggle" className="toggle-label"></label>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <div className="add-plan-footer">
                    <button className="btn-cancel-text" onClick={onClose}>Cancel</button>
                    
                    <div className="footer-right-actions">
                        <p className="marketplace-text">
                            New plans are published immediately to<br />the Aura marketplace.
                        </p>
                        <button className="btn-solid-purple-pill" onClick={handleSubmit}>
                            {isEdit ? 'Update Plan' : 'Create Plan'}
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default AddPlan;
