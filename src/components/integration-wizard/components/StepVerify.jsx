import React, { useState } from "react";

const StepVerify = ({ data, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const testConnection = async () => {
    setLoading(true);

    setTimeout(() => {
      setStatus("success");
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="step-verify">

      <h2>Verify Connection</h2>

      <button onClick={testConnection}>
        {loading ? "Testing..." : "Test Connection"}
      </button>

      {status === "success" && (
        <p style={{ color: "green" }}>
          ✅ Connection successful
        </p>
      )}

    </div>
  );
};

export default StepVerify;