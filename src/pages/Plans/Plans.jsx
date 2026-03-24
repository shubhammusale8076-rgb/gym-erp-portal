import React, { useState } from 'react';
import { 
  Check, 
  Plus, 
  Edit2, 
  X, 
  AlertTriangle,
  Archive,
  BarChart3,
  Download
} from 'lucide-react';
import './Plans.css';
import PageHeader from '../../components/PageHeader/PageHeader';

const initialPlans = [
  {
    id: 1,
    name: 'Standard',
    badge: 'ESSENTIAL',
    price: '99',
    period: 'month',
    isPopular: false,
    features: [
      '24/7 Gym Floor Access',
      'Locker & Shower Access',
      'Standard Group Classes'
    ]
  },
  {
    id: 2,
    name: 'Elite',
    badge: 'MOST POPULAR',
    price: '149',
    period: 'month',
    isPopular: true,
    features: [
      'All Standard Benefits',
      'Sauna & Spa Access',
      '2 Guest Passes/Month',
      'Priority Booking'
    ]
  },
  {
    id: 3,
    name: 'Platinum',
    badge: 'ALL-INCLUSIVE',
    price: '249',
    period: 'month',
    isPopular: false,
    features: [
      'All Elite Benefits',
      'Personal Training (4/mo)',
      'VIP Lounge Access',
      'Nutrition Coaching'
    ]
  }
];

const COMPARISON_FEATURES = [
  { name: '24/7 Facility Access',    std: true,   elite: true,      plat: true },
  { name: 'Pool & Sauna Access',     std: false,  elite: true,      plat: true },
  { name: 'Personal Training Sess.', std: 'None', elite: '1/month', plat: '4/month' },
  { name: 'Guest Passes',            std: '0',    elite: '2/month', plat: 'Unlimited' },
  { name: 'Complimentary Towels',    std: false,  elite: true,      plat: true },
  { name: 'Priority Class Booking',  std: false,  elite: '24h Early',plat: '48h Early' }
];

const Plans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | 'delete'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({
    name: '',
    badge: '',
    price: '',
    period: 'month',
    features: [],
    isPopular: false
  });
  const [newFeature, setNewFeature] = useState('');

  const openCreate = () => {
    setForm({ name: '', badge: '', price: '', period: 'month', features: [], isPopular: false });
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
    <div className="plans-page page-container">
        <PageHeader
        title="Subscription Tiers"
        subtitle="Manage pricing, exclusive benefits, and global access levels for the Elite Club community."
        actions={[
          {
            label: " Add New Plan",
            icon: <Plus size={16} />,
            onClick: () => { },
            className: "btn-primary"
          },
          {
            label: " Archive All",
            icon: <Archive size={16} />,
            onClick: () => { },
            className: "btn-primary"
          }
        ]}
      />
      {/* ── Page Header ── */}
      

      {/* ── Top Section: Tier Cards ── */}
      <div className="plans-cards-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`plan-card ${plan.isPopular ? 'popular' : ''}`}>
            
            <div className="plan-badge-wrapper">
              {plan.badge && (
                <div className="plan-badge">
                  {plan.badge}
                </div>
              )}
            </div>

            <h3 className="plan-name">{plan.name}</h3>
            
            <div className="plan-price-wrapper">
              <span className="plan-currency">₹</span>
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">/ {plan.period}</span>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="feature-item">
                  <div className="feature-check">
                    <Check size={12} strokeWidth={3.5} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="plan-footer-actions">
              <button className="plan-edit-btn" onClick={() => openEdit(plan)}>
                <Edit2 size={13} strokeWidth={2.5}/> {plan.isPopular ? 'EDIT PLAN' : 'EDIT'}
              </button>
              <button className="plan-archive-icon-btn" onClick={() => openDelete(plan)}>
                <Archive size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Middle Section: Split View ── */}
      <div className="plans-middle-grid">
        
        {/* Left: Insights & Forecast */}
        <div className="plans-sidebar-col">
          <div className="plans-insight-card">
            <h4 className="insight-card-title">Subscription Insights</h4>
            
            <div className="insight-bars">
              <div className="insight-bar-row">
                <div className="insight-label-row">
                  <span>Standard</span>
                  <span>24%</span>
                </div>
                <div className="insight-progress-bg">
                  <div className="insight-progress-fill lavender" style={{width: '24%'}}></div>
                </div>
              </div>

              <div className="insight-bar-row">
                <div className="insight-label-row">
                  <span className="text-purple-bold">Elite</span>
                  <span className="text-purple-bold">58%</span>
                </div>
                <div className="insight-progress-bg">
                  <div className="insight-progress-fill purple" style={{width: '58%'}}></div>
                </div>
              </div>

              <div className="insight-bar-row">
                <div className="insight-label-row">
                  <span>Platinum</span>
                  <span>18%</span>
                </div>
                <div className="insight-progress-bg">
                  <div className="insight-progress-fill dark" style={{width: '18%'}}></div>
                </div>
              </div>
            </div>

            <div className="insight-total-box">
              <p className="insight-total-label">TOTAL ACTIVE MEMBERS</p>
              <h2 className="insight-total-val">1,482</h2>
            </div>
          </div>

          <div className="plans-forecast-card">
            <div className="forecast-icon">
               <div className="f-icon-inner"><BarChart3 size={16} /></div>
            </div>
            <div className="forecast-text">
              <h4 className="forecast-title">Forecast Report</h4>
              <p className="forecast-sub">Analyze quarterly growth trends and member retention by plan tier.</p>
            </div>
          </div>
        </div>

        {/* Right: Feature Comparison */}
        <div className="plans-table-card">
          <div className="table-header-row">
            <h3 className="table-title">Feature Comparison</h3>
            <button className="table-export-btn">
               <Download size={16} />
            </button>
          </div>

          <div className="table-container">
            <table className="feature-table">
              <thead>
                <tr>
                  <th>BENEFITS & ACCESS</th>
                  <th>STANDARD</th>
                  <th className="th-elite">ELITE</th>
                  <th>PLATINUM</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((item, i) => (
                  <tr key={i}>
                    <td className="td-feature">{item.name}</td>
                    <td>
                      {typeof item.std === 'boolean' 
                        ? (item.std ? <Check size={16} strokeWidth={2.5} className="table-check" /> : <span className="table-dash">—</span>) 
                        : <span className="table-text-val">{item.std}</span>}
                    </td>
                    <td>
                      {typeof item.elite === 'boolean' 
                        ? (item.elite ? <Check size={16} strokeWidth={2.5} className="table-check" /> : <span className="table-dash">—</span>) 
                        : <span className="table-text-val active">{item.elite}</span>}
                    </td>
                    <td>
                      {typeof item.plat === 'boolean' 
                        ? (item.plat ? <Check size={16} strokeWidth={2.5} className="table-check" /> : <span className="table-dash">—</span>) 
                        : <span className="table-text-val active">{item.plat}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Bottom Section: Promotional Cards ── */}
      <div className="plans-promo-grid">
        <div className="promo-image-card boutique-bg">
           <div className="promo-overlay"></div>
           <div className="promo-content">
              <h3>Boutique Experience</h3>
              <p>Manage the visual identity of each membership tier.</p>
           </div>
        </div>
        <div className="promo-image-card wellness-bg">
           <div className="promo-overlay"></div>
           <div className="promo-content">
              <h3>Wellness Integration</h3>
              <p>Elite and Platinum tiers feature integrated spa services.</p>
           </div>
        </div>
      </div>

      {/* CRUD Modals (Retained and styled) */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="modal-overlay" onClick={() => setModalMode(null)}>
          <div className="modal-dialog plan-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="heading-3">{modalMode === 'create' ? 'Create New Plan' : 'Edit Plan'}</h2>
              <button className="icon-btn" onClick={() => setModalMode(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="plans-form-grid">
                <div className="input-group">
                  <label className="input-label">Plan Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Pro Plus"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Badge Text</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.badge}
                    onChange={e => setForm({ ...form, badge: e.target.value })}
                    placeholder="e.g. MOST POPULAR"
                  />
                </div>
              </div>

              <div className="plans-form-grid">
                <div className="input-group">
                  <label className="input-label">Price ($)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="99"
                  />
                </div>
                <div className="plans-checkbox-wrapper" style={{alignSelf: 'flex-end', paddingBottom: '0.8rem'}}>
                  <input
                    type="checkbox"
                    id="pop"
                    checked={form.isPopular}
                    onChange={e => setForm({ ...form, isPopular: e.target.checked })}
                  />
                  <label htmlFor="pop" className="plans-label-mb-0">Highlight as Elite/Popular layout</label>
                </div>
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
                  {form.features.length === 0 && <p className="plans-empty-features">No features added yet.</p>}
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
              <h2 className="heading-3">Archive Plan</h2>
              <button className="icon-btn" onClick={() => setModalMode(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="delete-confirm-content">
                <div className="delete-icon-wrapper">
                  <AlertTriangle size={28} color="var(--danger)" />
                </div>
                <p>Are you sure you want to archive the <strong>{selectedPlan?.name}</strong> plan?</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setModalMode(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Archive Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
