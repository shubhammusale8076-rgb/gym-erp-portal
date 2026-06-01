import React from "react";
import { Check, MonitorPlay, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StepSuccess = ({ provider = "Stripe" }) => {
  const navigate = useNavigate();
  const providerName = provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : "Integration";

  return (
    <div className="step-success-container card">
      
      <div className="success-check-circle">
        <Check size={36} strokeWidth={3} />
      </div>

      <h2 className="success-title">{providerName} Connected Successfully</h2>
      
      <p className="success-description">
        Your gym's financial ecosystem is now seamlessly synchronized. You can now manage elite memberships and automate luxury experiences.
      </p>

      <div className="success-features-grid">
        <div className="feature-card">
          <div className="feature-icon">
             <MonitorPlay size={20} />
          </div>
          <div className="feature-content">
            <h4>Create Subscription Plans</h4>
            <p>Design tiered membership packages with custom billing cycles and premium perks.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
             <CreditCard size={20} />
          </div>
          <div className="feature-content">
            <h4>Start Billing Members</h4>
            <p>Enable automated recurring payments and professional digital invoicing.</p>
          </div>
        </div>
      </div>

      <div className="success-actions">
        <button className="btn-primary" onClick={()=>navigate('/settings/integrations')}>Manage Integrations</button>
        <button className="btn-logs" onClick={()=>navigate('/setting/events')}>View Events Page</button>
      </div>
    </div>
  );
};

export default StepSuccess;