
import React from "react";

const StepSuccess = () => {
  return (
    <div className="step-success">

      <h1>🎉 Connected Successfully</h1>

      <p>
        Your payment system is now active.
      </p>

      <div className="actions">
        <button>Go to Dashboard</button>
        <button>View Logs</button>
      </div>

    </div>
  );
};

export default StepSuccess;