import React from 'react';
import '../styles/components/DateTimeField.css';

const DateTimeField = ({ label, valueDate, valueTime, onChangeDate, onChangeTime }) => {
    return (
        <div className="date-time-group">
            <label>{label}</label>
            <div className="date-time-inputs">
                <input
                    type="date"
                    value={valueDate}
                    onChange={onChangeDate}
                />
                <input
                    type="time"
                    value={valueTime}
                    onChange={onChangeTime}
                />
            </div>
        </div>
    );
};

export default DateTimeField;