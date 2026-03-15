import React, { useState } from 'react';
import { Check, Plus, Star, Edit2, Trash2, X, PlusCircle, AlertTriangle } from 'lucide-react';
import './Plans.css';

const initialPlans = [
  {
    id: 1,
    name: 'Basic',
    price: '29',
    period: 'monthly',
    description: 'Perfect for beginners just starting out.',
    features: [
      'Access to gym equipment',
      'Locker room access',
      '1 Intro session with trainer',
      'Free Wi-Fi'
    ],
    isPopular: false
  },
  {
    id: 2,
    name: 'Pro',
    price: '49',
    period: 'monthly',
    description: 'Our most popular plan for dedicated lifters.',
    features: [
      'Everything in Basic',
      'Access to all group classes',
      'Guest passes (2/month)',
      '10% off supplements',
      'Advanced app features'
    ],
    isPopular: true
  },
  {
    id: 3,
    name: 'VIP',
    price: '99',
    period: 'monthly',
    description: 'The ultimate experience with coaching.',
    features: [
      'Everything in Pro',
      'Unlimited group classes',
      '4 Personal training sessions',
      'Free monthly massage',
      'Priority locker selection',
      'Smoothie bar credit'
    ],
    isPopular: false
  }
];

const Plans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | 'delete'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({
    name: '',
    price: '',
    period: 'monthly',
    description: '',
    features: [],
    isPopular: false
  });
  const [newFeature, setNewFeature] = useState('');

  const openCreate = () => {
    setForm({ name: '', price: '', period: 'monthly', description: '', features: [], isPopular: false });
    setModalMode('create');
  };

  const openEdit = (plan) => {
    setSelectedPlan(plan);
    setForm({ ...plan });
    setModalMode('edit');
  };

  const openDelete = (plan) => {
    setSelectedPlan(plan);
    setModalMode('delete');
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newPlan = { ...form, id: Date.now() };
      setPlans([...plans, newPlan]);
    } else {
      setPlans(plans.map(p => p.id === selectedPlan.id ? form : p));
    }
    setModalMode(null);
  };

  const handleDelete = () => {
    setPlans(plans.filter(p => p.id !== selectedPlan.id));
    setModalMode(null);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm({ ...form, features: [...form.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="plans-page">
      <div className="plans-page-header">
        <div>
          <h1 className="heading">Membership Plans</h1>
          <p className="subtitle">Design and manage subscription tiers for your members.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={18} />
          Create New Plan
        </button>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.isPopular ? 'popular' : ''}`}>
            {plan.isPopular && (
              <div className="popular-tag">
                <Star size={12} fill="white" />
                Most Popular
              </div>
            )}
            
            <div className="plan-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price-wrapper">
                <span className="plan-currency">$</span>
                <span className="plan-price">{plan.price}</span>
                <span className="plan-period">/{plan.period === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <p className="plan-desc">{plan.description}</p>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="feature-item">
                  <div className="feature-icon-box">
                    <Check size={12} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="plan-actions">
              <button className="btn plan-btn-edit" onClick={() => openEdit(plan)}>
                Edit Details
              </button>
              <button className="plan-btn-delete" onClick={() => openDelete(plan)}>
                Remove Plan
              </button>
            </div>
          </div>
        ))}

        {/* Add Plan Placeholder */}
        <div className="plan-card" style={{ borderStyle: 'dashed', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: 0.6 }} onClick={openCreate}>
          <div className="text-center">
            <PlusCircle size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p className="font-bold" style={{ color: 'var(--text-muted)' }}>ADD NEW TIER</p>
          </div>
        </div>
      </div>

      {/* Promotional Codes Section */}
      <div className="promo-code glass-panel">
        <div>
          <h2 className="heading-2">Promotional Codes</h2>
          <p className="subtitle">Manage active campaign discounts and seasonal offers.</p>
        </div>
        <button className="btn btn-secondary">View Codes</button>
      </div>

      {/* CRUD Modals */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div className="modal-dialog plan-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="heading-3">{modalMode === 'create' ? 'Create New Plan' : 'Edit Plan'}</h2>
              <button className="icon-btn" onClick={() => setModalMode(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Plan Name</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={form.name} 
                    onChange={e => setForm({...form, name: e.target.value})} 
                    placeholder="e.g. Pro Plus"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Price ($)</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    value={form.price} 
                    onChange={e => setForm({...form, price: e.target.value})} 
                    placeholder="99"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea 
                  className="input-field" 
                  rows="2" 
                  value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})}
                  placeholder="Short summary of the value proposition"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="checkbox" 
                  id="pop" 
                  checked={form.isPopular} 
                  onChange={e => setForm({...form, isPopular: e.target.checked})}
                />
                <label htmlFor="pop" className="input-label mb-0">Highlight as "Most Popular"</label>
              </div>

              <div className="input-group">
                <label className="input-label">Include Features</label>
                <div className="feature-input-row">
                  <input 
                    type="text" 
                    className="input-field" 
                    style={{ flex: 1 }} 
                    placeholder="e.g. Personal Training Sessions"
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && addFeature()}
                  />
                  <button className="btn btn-primary" style={{ padding: '0.75rem' }} onClick={addFeature}>
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="feature-list-preview">
                  {form.features.map((f, i) => (
                    <div key={i} className="preview-feature-item">
                      <span>{f}</span>
                      <button className="remove-feature-btn" onClick={() => removeFeature(i)}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {form.features.length === 0 && <p className="text-center text-sm text-text-muted py-2">No features added yet.</p>}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>
                {modalMode === 'create' ? 'Create Plan' : 'Update Plan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {modalMode === 'delete' && (
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div className="modal-dialog modal-dialog-sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="heading-3">Delete Plan</h2>
              <button className="icon-btn" onClick={() => setModalMode(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="delete-confirm-content">
                <div className="delete-icon-wrapper">
                  <AlertTriangle size={28} color="var(--danger)" />
                </div>
                <p>Are you sure you want to delete the <strong>{selectedPlan?.name}</strong> plan? This might affect existing subscribers.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete Permanently</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
