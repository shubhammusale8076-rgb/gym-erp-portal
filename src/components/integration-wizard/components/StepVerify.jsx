import React, { useState, useEffect } from "react";
import { RefreshCw, Key, Webhook, Database, Info, Lightbulb, Headphones, CheckCircle2, Loader2 } from "lucide-react";

const StepVerify = ({ data, onSuccess }) => {
  const [timeLeft, setTimeLeft] = useState(14);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="verify-config-container">
      <div className="verify-left-panel">
        <h2 className="guide-title">Verifying Connection</h2>
        <p className="guide-description">
          We are currently orchestrating the final handshake between your Digital Curator environment and the external API provider. Please keep this window open.
        </p>

        <div className="verify-main-card">
          <div className="verify-loader-ring">
            <div className="ring-outer"></div>
            <div className="ring-inner">
               <RefreshCw className="spin-icon" size={28} />
            </div>
          </div>
          <div className="verify-phase-info">
             <span className="phase-label">CURRENT PHASE</span>
             <h3 className="phase-title">Synchronizing Handshake</h3>
             <p className="phase-time">Expected time remaining: {timeLeft}s</p>
          </div>
        </div>

        <div className="verify-status-grid">
           <div className="status-card success">
              <div className="status-icon"><Key size={18} /></div>
              <div className="status-content">
                 <h4>API Key Valid</h4>
                 <p>Authentication successfully verified.</p>
              </div>
              <div className="status-check"><CheckCircle2 size={18} /></div>
           </div>
           <div className="status-card success">
              <div className="status-icon"><Webhook size={18} /></div>
              <div className="status-content">
                 <h4>Webhook Connected</h4>
                 <p>Real-time event stream is active.</p>
              </div>
              <div className="status-check"><CheckCircle2 size={18} /></div>
           </div>
           <div className="status-card active">
              <div className="status-icon"><Database size={18} /></div>
              <div className="status-content">
                 <h4>Data Sync Active</h4>
                 <p>Pushing initial member catalog...</p>
              </div>
              <div className="status-loader"><Loader2 className="spin" size={18} /></div>
           </div>
           <div className="status-card info-card">
              <Info size={16} className="info-icon" />
              <p>The system is performing a final integrity check on 1,240 records.</p>
           </div>
        </div>
      </div>
      
      <div className="verify-right-panel">
         <div className="troubleshooting-card">
            <div className="trouble-header">
               <Lightbulb size={20} className="header-icon" />
               <h3>Troubleshooting</h3>
            </div>
            <p className="trouble-desc">Experiencing delays? Here are the common resolution paths for API verification.</p>
            
            <div className="trouble-item">
               <h4>Timeout Issues</h4>
               <p>Ensure your firewall allows outbound requests to <code>api.digital-curator.io</code> on port 443.</p>
            </div>
            
            <div className="trouble-item">
               <h4>Scope Mismatch</h4>
               <p>Your API Key must have <code>read:members</code> and <code>write:logs</code> permissions enabled in the provider dashboard.</p>
            </div>
            
            <div className="support-box">
               <Headphones size={20} className="support-icon" />
               <div className="support-content">
                  <h5>NEED ELITE SUPPORT?</h5>
                  <p>Our engineers are available 24/7 for white-glove onboarding assistance.</p>
                  <a href="#">Chat Now</a>
               </div>
            </div>
            
            <div className="verified-infra">
               <div className="infra-overlay">
                  <span className="infra-text">VERIFIED INFRASTRUCTURE</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StepVerify;