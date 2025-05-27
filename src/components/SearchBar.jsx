import React from 'react';
import Button from './Button.jsx';
import '../styles/components/SearchBar.css';

const SearchBar = ({ onSearch, onSortChange, onCreateClick }) => {
    const handleSearchChange = (e) => {
        if (onSearch) onSearch(e.target.value);
    };

    const handleSortChange = (e) => {
        if (onSortChange) onSortChange(e.target.value);
    };

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    placeholder="Search your itinerary here"
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <span className="search-icon"></span>
            </div>
            <select onChange={handleSortChange} className="sort-select">
                <option value="">Sort by</option>
                <option value="date">Date</option>
            </select>
            <Button text="+ Create Itinerary" onClick={onCreateClick} className="create-button" />
        </div>
    );
};

export default SearchBar;