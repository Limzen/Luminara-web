import React from 'react';
import Button from './Button.jsx';
import '../styles/components/ItineraryCard.css';

const ItineraryCard = ({ imageSrc = "/images/masjid-almashun.jpg", id, name, destination, createdOn, onSeeMoreClick }) => {
    return (
        <div className="itinerary-card">
            <div className="itinerary-image">
                <img src={imageSrc} alt="Itinerary" />
            </div>
            <div className="itinerary-details">
                <h3>{name}</h3>
                <p><strong>Destination:</strong> {destination}</p>
                <p><strong>Created on:</strong> {createdOn}</p>
                <Button text="See more" onClick={() => onSeeMoreClick(id)} />
            </div>
        </div>
    );
};

export default ItineraryCard;