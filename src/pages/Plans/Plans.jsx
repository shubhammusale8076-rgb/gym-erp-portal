import React, { useState } from 'react';
import { 
  Check, 
  Plus, 
  Edit2, 
  X, 
  AlertTriangle,
  Archive,
  BarChart3,
  Download,
  Trash2,
  Dumbbell,
  Award,
  Gem,
  Wallet,
  Star,
  ArrowRight
} from 'lucide-react';
import './Plans.css';
import PageHeader from '../../components/PageHeader/PageHeader';

const initialPlans = [
  {
    id: 1,
    name: 'Standard',
    badge: '',
    price: '999',
    period: 'MONTH',
    isPopular: false,
    theme: 'standard',
    icon: 'Dumbbell',
    features: [
      { text: 'Full gym floor access', included: true },
      { text: 'Standard locker room access', included: true },
      { text: '1 Guest pass per month', included: true },
    ]
  },
  {
    id: 2,
    name: 'Elite',
    badge: 'MOST POPULAR',
    price: '2,999',
    period: 'MONTH',
    isPopular: true,
    theme: 'elite',
    icon: 'Award',
    features: [
      { text: 'All Standard features', included: true },
      { text: 'Access to recovery suite', included: true },
      { text: 'Group fitness classes', included: true },
      { text: 'Nutritional consultation', included: true }
    ]
  },
  {
    id: 3,
    name: 'Platinum',
    badge: '',
    price: '3,999',
    period: 'MONTH',
    isPopular: false,
    theme: 'platinum',
    icon: 'Gem',
    features: [
      { text: '24/7 VIP Priority access', included: true },
      { text: 'Personal coach allocation', included: true },
      { text: 'Lounge & Spa access', included: true },
      { text: 'Complimentary workout gear', included: true }
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
      setForm({ ...form, features: [...form.features, { text: newFeature.trim(), included: true }] });
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="plans-page">

        <PageHeader
        title="Subscription Tiers"
        subtitle="Manage pricing, exclusive benefits, and global access levels for the Elite Club community."
        actions={[
          {
            label: " Add New Plan",
            icon: <Plus size={16} />,
            onClick: () => {setModalMode('create') },
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

      <div className="plans-cards-grid">
        {plans.map((plan) => {
          let IconComp = Dumbbell;
          if (plan.icon === 'Award') IconComp = Award;
          if (plan.icon === 'Diamond' || plan.icon === 'Gem') IconComp = Gem;
          
          return (
            <div key={plan.id} className={`plan-card theme-${plan.theme || (plan.isPopular ? 'elite' : 'standard')}`}>
              
              {plan.badge && (
                <div className="plan-badge-top ">
                  {plan.badge}
                </div>
              )}

              <div className='icon-overlay'>
                <IconComp size={250} strokeWidth={1.5} />
              </div>

              <div className="plan-card-header-actions">
                <div className="plan-icon-wrapper">
                  <IconComp size={24} />
                </div>
                <div className="plan-top-actions">
                  <button className="plan-action-icon" onClick={() => openEdit(plan)}>
                    <Edit2 size={14} />
                  </button>
                  <button className="plan-action-icon" onClick={() => openDelete(plan)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <h3 className="plan-name">{plan.name}</h3>
              
              <div className="plan-price-wrapper">
                <span className="plan-currency">₹</span>
                <span className="plan-price">{plan.price}</span>
                <span className="plan-period">/ {plan.period}</span>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, idx) => {
                  const isIncluded = typeof feature === 'string' ? true : feature.included;
                  const text = typeof feature === 'string' ? feature : feature.text;
                  return (
                    <li key={idx} className={`feature-item ${!isIncluded ? 'disabled' : ''}`}>
                      <div className={`feature-check ${!isIncluded ? 'disabled' : ''}`}>
                        {isIncluded ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                      </div>
                      <span>{text}</span>
                    </li>
                  )
                })}
              </ul>

              <div className="plan-footer-actions">
                <button className="btn-primary" onClick={() => openEdit(plan)}>
                  MANAGE {plan.name.toUpperCase()}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="plans-middle-grid">
        
        <div className="plans-sidebar-col">
          <div className="plans-insight-card box-shadow">
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
              <p className="insight-total-label">Total Active Members</p>
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

        <div className="plans-table-card box-shadow">
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

      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="cp-overlay" onClick={() => setModalMode(null)}>
          <div className="cp-modal" onClick={e => e.stopPropagation()}>
            <div className="cp-header">
              <div className="cp-header-text">
                <h1 className="cp-title">{modalMode === 'create' ? 'Create New Plan' : 'Edit Plan'}</h1>
                <span className="cp-subtitle">TIER ARCHITECTURE & REVENUE DESIGN</span>
              </div>
              <button className="cp-close-btn" onClick={() => setModalMode(null)}>
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
                      <span className="cp-currency">$</span>
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

                  <div className="cp-empty-bundles">
                    <Archive size={20} className="cp-empty-icon" />
                    <span>NEW SERVICE BUNDLES APPEAR HERE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cp-footer">
              <button className="cp-btn-cancel" onClick={() => setModalMode(null)}>Cancel</button>
              <button className="cp-btn-primary" onClick={handleSave}>
                {modalMode === 'create' ? 'Create Plan' : 'Update Plan'} <ArrowRight size={16} />
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
