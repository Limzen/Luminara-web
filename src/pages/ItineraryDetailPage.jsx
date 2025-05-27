import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import '../styles/page/ItineraryDetailPage.css';

const ItineraryDetailPage = () => {
    const { id } = useParams();
    // Fetch itinerary data using the id (e.g., from localStorage or an API)
    const itinerary = {
        title: "Medan Religious Trip – 3 Days",
        imageSrc: "/images/masjid-almashun.jpg",
        location: "Graha Bunda Maria Annai Velangkanni",
        address: "Jl. Sisingamangaraja No.81, Medan Kota District, Medan City, North Sumatra 20119",
        date: "12 May 2025",
        time: "15:45 WIB",
        budget: "Rp 350,000",
    };

    return (
        <div className="itinerary-detail-page">
            <Navbar />
            <div className="content-container">
                <Button text="← Previous Page" onClick={() => window.history.back()} className="back-button" />
                <div className="banner-image">
                    <img src={itinerary.imageSrc} alt="Banner" />
                    <h1>{itinerary.title}</h1>
                </div>
                <div className="itinerary-details">
                    <h2>{itinerary.location}</h2>
                    <p className="address">{itinerary.address}</p>
                    <div className="detail-row">
                        <span><strong>Date:</strong> {itinerary.date}</span>
                        <span><strong>Time:</strong> {itinerary.time}</span>
                    </div>
                </div>
                <div className="section travel-budgeting">
                    <h3 className="section-header">Travel Budgeting</h3>
                    <div className="budget-content">
                        <p>{itinerary.budget}</p>
                    </div>
                </div>
                <div className="section notes">
                    <h3 className="section-header">Notes</h3>
                    <div className="notes-content">
                        <textarea placeholder="Add your notes here..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryDetailPage;