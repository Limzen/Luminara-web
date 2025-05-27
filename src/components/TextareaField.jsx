import React from 'react';
import '../styles/components/TextareaField.css';

const TextareaField = ({ label, value, onChange, placeholder }) => {
    return (
        <div className="textarea-group">
            <label>{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            ></textarea>
        </div>
    );
};

export default TextareaField;