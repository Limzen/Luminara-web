import React, { useState, useRef, useEffect } from 'react';

/**
 * CustomDropdown
 * Props:
 * - label: string (e.g. 'Worship Type')
 * - options: array of { label: string, value: any }
 * - value: selected value
 * - onChange: function(newValue)
 * - className: optional extra className
 */
const CustomDropdown = ({ label, options, value, onChange, className = '' }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || label;

  return (
    <div ref={dropdownRef} className={`customDropdown ${className}`}>
      <button
        type="button"
        className={`dropdownButton${open ? ' open' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <span className={`dropdownArrow${open ? ' open' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      {open && (
        <div className="dropdownList">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`dropdownOption${value === opt.value ? ' selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown; 