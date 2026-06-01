import { getToken, getUserId, getRole } from '../../utils/auth';
import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import './Plans.css';
import PageHeader from '../../components/PageHeader/PageHeader';
import AddPlan from './AddPlan';
import { createPlan, deletePlan, getAllPlans, getPlanComparison, getPlanInsight, updatePlan } from '../../apiservice/apiservice';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/toastSlice';

const COMPARISON_FEATURES = [
  { name: '24/7 Facility Access', std: true, elite: true, plat: true },
  { name: 'Pool & Sauna Access', std: false, elite: true, plat: true },
  { name: 'Personal Training Sess.', std: 'None', elite: '1/month', plat: '4/month' },
  { name: 'Guest Passes', std: '0', elite: '2/month', plat: 'Unlimited' },
  { name: 'Complimentary Towels', std: false, elite: true, plat: true },
  { name: 'Priority Class Booking', std: false, elite: '24h Early', plat: '48h Early' }
];

const dummyInsights = {
  plans: [
    { planName: "Standard", percentage: 24, members: 350 },
    { planName: "Elite", percentage: 58, members: 850 },
    { planName: "Platinum", percentage: 18, members: 264 },
  ],
  totalMembers: 1464
};

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [insights, setInsights] = useState(dummyInsights);
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | 'delete'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planComparison, setPlanComparison] = useState([]);
  const token = getToken();
  const dispatch = useDispatch();

  const fetchAllPlans = async () => {
    try {
      const response = await getAllPlans(token);
      setPlans(response);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };

  const fetchPlanInsight = async () => {
    try {
      const response = await getPlanInsight(token);
      console.log(response)
      // setInsights(response);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };

  const fetchPlanComparison = async () => {
    try {
      const response = await getPlanComparison(token);
      console.log(response)
      setPlanComparison(response);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchAllPlans();
    fetchPlanInsight();
    fetchPlanComparison();
  }, []);

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

  const handleSave = async (formData) => {


    try {
      const payload = {
        name: formData.name,
        price: Number(formData.price),
        durationInDays: formData.period === 'month' ? 30 : 30,
        badge: formData.badge || null,
        isPopular: formData.isPopular,
        discount: formData.discount || 0,
        active: true,

        // 🔥 convert [{text, included}] → [text]
        features: formData.features.map(f =>
          typeof f === 'string' ? f : f.text
        )
      };
      if (modalMode === "create") {
        const response = await createPlan(payload, token);
        dispatch(showToast({ message: response.message, type: "success" }));
      }
      else {
        const response = await updatePlan(payload, token, selectedPlan.id);
        dispatch(showToast({ message: response.message, type: "success" }));
      }
      await fetchAllPlans();
      setModalMode(null);
    } catch (error) {
      dispatch(showToast({ message: error.message || "Login failed", type: "error" }));

      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deletePlan(selectedPlan.id);
      dispatch(showToast({ message: response.message, type: "success" }));
      fetchAllPlans();
      setModalMode(null);
    } catch (error) {
      dispatch(showToast({ message: error.message || "Login failed", type: "error" }));

      console.error(error);
    }
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
            onClick: () => { if (window.confirm('Are you sure you want to archive all plans?')) setPlans([]); },
            className: "btn-primary"
          }
        ]}
      />

      <div className="plans-cards-grid">
        {plans.map((plan) => {
          let IconComp = Dumbbell;
          if (plan.theme === 'elite') IconComp = Award;
          if (plan.theme === 'platinum') IconComp = Gem;

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

              {insights?.plans?.map((plan, index) => {

                // 🎨 dynamic color mapping
                const colorClass =
                  plan.planName === 'Elite'
                    ? 'purple'
                    : plan.planName === 'Standard'
                      ? 'lavender'
                      : 'dark';

                const highlight = plan.planName === 'Elite';

                return (
                  <div key={index} className="insight-bar-row">

                    <div className="insight-label-row">
                      <span className={highlight ? 'text-purple-bold' : ''}>
                        {plan.planName}
                      </span>

                      <span className={highlight ? 'text-purple-bold' : ''}>
                        {plan.percentage}%
                      </span>
                    </div>

                    <div className="insight-progress-bg">
                      <div
                        className={`insight-progress-fill ${colorClass}`}
                        style={{ width: `${plan.percentage}%` }}
                      ></div>
                    </div>

                  </div>
                );
              })}

            </div>

            <div className="insight-total-box">
              <p className="insight-total-label">Total Active Members</p>
              <h2 className="insight-total-val">
                {insights?.totalMembers?.toLocaleString()}
              </h2>
            </div>

            {/* <div className="insight-total-box">
              <p className="insight-total-label">Total Active Members</p>
              <h2 className="insight-total-val">1,482</h2>
            </div> */}
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

                  {planComparison?.plans?.map((plan) => (

                    <th
                      key={plan.id}
                      className={plan.popular ? 'th-elite' : ''}
                    >
                      <div className="plan-header-cell">

                        <span>{plan.name?.toUpperCase()}</span>

                        {plan.badge && (
                          <div className="plan-badge">
                            {plan.badge}
                          </div>
                        )}

                      </div>
                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {planComparison?.features?.map((feature, index) => (

                  <tr key={index}>

                    <td className="td-feature">
                      {feature.name}
                    </td>

                    {planComparison?.plans?.map((plan) => {

                      const value = feature.values?.[plan.name];

                      return (

                        <td key={plan.id}>

                          {typeof value === 'boolean' ? (

                            value ? (

                              <Check
                                size={16}
                                strokeWidth={2.5}
                                className="table-check"
                              />

                            ) : (

                              <span className="table-dash">
                                —
                              </span>
                            )

                          ) : value !== null &&
                            value !== undefined ? (

                            <span
                              className={`table-text-val ${plan.popular ? 'active' : ''
                                }`}
                            >
                              {value}
                            </span>

                          ) : (

                            <span className="table-dash">
                              —
                            </span>
                          )}

                        </td>
                      );
                    })}

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
              <AlertTriangle size={20} className="delete-icon" />
              <h3>Delete Plan</h3>
            </div>
            <p>
              Are you sure you want to delete <strong className='plan-name'>{selectedPlan.name}</strong> plan?
            </p>
            <div className="delete-modal-actions">
              <button className="btn-secondary" onClick={() => setModalMode(null)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleDelete}>
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
