import React from "react";
import server from '../../../assets/server.png'

const StepForm = ({ data, updateData }) => {
  return (
    <div className="step-form">

      <h2>Secure the Connection</h2>
      <p>Input your API credentials to finalize the link between Aura Premium and your external service.</p>

      <div className="form-wrapper">
        <div className="form-box">
          <input
            placeholder="Publishable Key"
            value={data.key || ""}
            onChange={(e) =>
              updateData({ key: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Secret Key"
            value={data.secret || ""}
            onChange={(e) =>
              updateData({ secret: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Webhook Secret"
            value={data.webhook || ""}
            onChange={(e) =>
              updateData({ webhook: e.target.value })
            }
          />
        </div>
        <div className="right-img-box">
          <img src={server} alt="secure image" className="secure-img"/>
          <div className="img-overlay">
            <h2>Encryption as an Art Form</h2>
            <p>Your credentials are never stored in plain text. We utilize AES-256 hardware encryption modules to ensure your gym's data ecosystem remains an impenetrable vault.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StepForm;