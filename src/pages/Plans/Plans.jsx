import React from 'react';
import { Check, Plus, Star } from 'lucide-react';

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Perfect for beginners just starting out.',
    features: [
      'Access to gym equipment',
      'Locker room access',
      '1 Intro session with trainer',
      'Free Wi-Fi'
    ],
    isPopular: false,
    color: 'var(--text-secondary)'
  },
  {
    id: 2,
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'Our most popular plan for dedicated lifters.',
    features: [
      'Everything in Basic',
      'Access to all group classes',
      'Guest passes (2/month)',
      '10% off supplements',
      'Advanced app features'
    ],
    isPopular: true,
    color: 'var(--primary)'
  },
  {
    id: 3,
    name: 'VIP',
    price: '$99',
    period: '/month',
    description: 'The ultimate experience with coaching.',
    features: [
      'Everything in Pro',
      'Unlimited group classes',
      '4 Personal training sessions',
      'Free monthly massage',
      'Priority locker selection',
      'Smoothie bar credit'
    ],
    isPopular: false,
    color: 'var(--accent)'
  }
];

const PlanCard = ({ plan }) => {
  return (
    <div 
      className={`glass-card p-8 flex flex-col ${plan.isPopular ? 'scale-105 z-10' : ''}`}
      style={plan.isPopular ? { borderColor: plan.color, boxShadow: `0 0 20px rgba(16, 185, 129, 0.15)` } : {}}
    >
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="badge badge-success flex items-center gap-1 px-3 py-1 shadow-lg bg-bg-dark border border-primary text-primary font-bold">
            <Star size={12} fill="currentColor" /> Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="heading-3 mb-2" style={{ color: plan.name === 'VIP' ? 'var(--accent)' : 'inherit' }}>{plan.name}</h3>
        <div className="flex justify-center items-end gap-1 mb-2">
          <span className="heading-1" style={{ color: plan.isPopular ? plan.color : 'inherit' }}>{plan.price}</span>
          <span className="text-text-muted mb-2">{plan.period}</span>
        </div>
        <p className="subtitle text-sm">{plan.description}</p>
      </div>

      <div className="flex-1">
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 text-primary">
                <Check size={18} />
              </div>
              <span className="text-text-primary text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className={`btn w-full ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}>
        Edit Plan
      </button>
    </div>
  );
};

const Plans = () => {
  return (
    <div className="plans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="heading-1">Subscription Plans</h1>
          <p className="subtitle mt-1">Manage pricing tiers and included features.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Create New Plan
        </button>
      </div>

      <div className="glass-panel p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 mb-4" style={{ position: 'relative' }}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
      
      <div className="mt-8 glass-panel p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="heading-3 mb-1">Promotional Codes</h3>
            <p className="subtitle text-sm">Active discount codes for new members.</p>
          </div>
          <button className="btn btn-secondary">Manage Codes</button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
