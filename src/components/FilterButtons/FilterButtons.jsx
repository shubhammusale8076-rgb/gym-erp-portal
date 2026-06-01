import React from "react";
import './FilterButton.css'

const FilterButtons = ({
  options = [],
  selected,
  onChange,
}) => {
  return (
    <div className={`filter-buttons-wrapper`}>
      {options.map((option) => (
        <button
          key={option}
          className={`role-filter-btn ${selected === (option.value || option) ? 'active' : ""}`}
          onClick={() => onChange(option.value || option)}
        >
          {option.label || option}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;