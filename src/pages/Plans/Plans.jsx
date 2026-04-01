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
import AddPlan from './AddPlan';

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

  const openCreate = () => {
    setSelectedPlan(null);
    setModalMode('create');
  };

  const openEdit = (plan) => {
    setSelectedPlan(plan);
    setModalMode('edit');
  };

  const openDelete = (plan) => {
    setSelectedPlan(plan);
    setModalMode('delete');
  };

  const handleSave = (formData) => {
    if (modalMode === 'create') {
      const newPlan = { ...formData, id: Date.now() };
      setPlans([...plans, newPlan]);
    } else {
      setPlans(plans.map(p => p.id === selectedPlan.id ? { ...p, ...formData } : p));
    }
    setModalMode(null);
  };

  const handleDelete = () => {
    setPlans(plans.filter(p => p.id !== selectedPlan.id));
    setModalMode(null);
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
            onClick: openCreate,
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
      <AddPlan
        onClose={() => setModalMode(null)}
        onSave={handleSave}
        initialData={modalMode === 'edit' ? selectedPlan : null}
      />
    )}

    {modalMode === 'delete' && selectedPlan && (
      <div className="delete-modal-overlay" onClick={() => setModalMode(null)}>
        <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
          <div className="delete-modal-header">
            <AlertTriangle size={28} className="delete-icon" />
            <h3>Delete Plan</h3>
          </div>
          <p>
            Are you sure you want to delete <strong>{selectedPlan.name}</strong> plan?
          </p>
          <div className="delete-modal-actions">
            <button className="btn-secondary" onClick={() => setModalMode(null)}>
              Cancel
            </button>
            <button className="btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Plans;
