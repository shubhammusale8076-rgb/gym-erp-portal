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
          className={`role-filter-btn ${selected === option ? 'active' : "" }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;