import React from "react";
import { Filter } from "lucide-react";

const PageHeader = ({
  title,
  subtitle,
  showFilter = false,
  onFilterClick,
  actions = []
}) => {
  return (
    <header className="page-header">
      <div>
        <h1 className="heading-4">{title}</h1>
        {subtitle && <p className="heading-7">{subtitle}</p>}
      </div>

      <div className="header-actions">
        {showFilter && (
          <button className="btn-filter" onClick={onFilterClick}>
            <Filter size={16} /> Filter Results
          </button>
        )}

        {/* Custom Actions */}
        {actions.map((action, index) => (
          <button
            key={index}
            className={action.className || "btn-primary"}
            onClick={action.onClick}
          >
            {action.icon && action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default PageHeader;