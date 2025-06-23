import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFD600" stroke="#FFD600" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/directory/${tour.id}`);
  };

  return (
    <div className="tour-card new-tour-card">
      <img src={tour.image} alt={tour.name} className="tour-card-image new-tour-card-image" />
      <div className="tour-card-content new-tour-card-content">
        <div className="tour-card-title-row">
          <span className="tour-card-title">{tour.name}</span>
          <span className="tour-card-rating"><StarIcon /> {tour.rating}</span>
        </div>
        <div className="tour-card-info-row">
          <span className="tour-card-info"><ClockIcon /> {tour.time}</span>
          <span className="tour-card-info"><LocationIcon /> <span className="tour-card-location">{tour.location}</span></span>
        </div>
        <div className="tour-card-desc">
          {tour.description}
        </div>
        <button onClick={handleExplore} className="tour-card-link" style={{ textDecoration: 'none' }}>Explore Detail</button>
      </div>
    </div>
  );
};

export default TourCard; 