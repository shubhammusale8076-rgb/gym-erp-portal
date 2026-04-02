import React from 'react';
import { ChevronRight } from 'lucide-react';
import './KpiCard.css';

const KpiCard = ({ title, value, theme = 'teal', Icon = ChevronRight }) => {
  return (
    <div className={`kpi-card kpi-theme-${theme}`}>
      <div className="kpi-card-content">
        <div className="kpi-card-header">
          <p className="kpi-card-title">{title}</p>
          <button className="kpi-card-action">
            <Icon size={20} className="kpi-action-icon" />
          </button>
        </div>
        <h3 className="kpi-card-value">{value}</h3>
      </div>
      
      {/* Wave Background Graphic */}
      <div className="kpi-wave-container">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="kpi-wave-svg">
          <path 
            fill="currentColor" 
            fillOpacity="0.15" 
            d="M 25,100 C 45,100 55,55 70,55 C 80,55 85,65 100,45 L 100,100 Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default KpiCard;
