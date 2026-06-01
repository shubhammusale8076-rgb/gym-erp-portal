
import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({
  label,
  checked = false,
  onChange,
  disabled = false
}) => {
  return (
    <label className={`ts-wrapper ${disabled ? "ts-disabled" : ""}`}>
      
      <div
        className={`ts-switch ${checked ? "ts-on" : ""}`}
        onClick={() => !disabled && onChange(!checked)}
      >
        <div className="ts-thumb" />
      </div>

      {label && <span className="ts-label">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;