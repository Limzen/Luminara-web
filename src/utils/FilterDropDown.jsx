import React from "react";

const FilterDropdown = ({
  selectedValue,
  options,
  isOpen,
  onToggle,
  onSelect,
  defaultLabel,
}) => {
  return (
    <div className="filter-dropdown">
      <button
        className={`filter-btn ${
          selectedValue === defaultLabel ? "active" : ""
        }`}
        onClick={onToggle}
      >
        {selectedValue}
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => onSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
