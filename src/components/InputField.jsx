
import React from 'react';
import '../styles/components/InputField.css';

const InputField = ({ label, type = 'text', placeholder, value, onChange }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;