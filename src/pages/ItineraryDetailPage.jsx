import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import '../styles/page/ItineraryDetailPage.css';
import { itineraryService } from '../services/itineraryService';

const ItineraryDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItineraryDetail = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await itineraryService.getItineraryById(id);

                if (response && response.data) {
                    const fullDetails = {
                        ...response.data,
                        address: "Jl. Sisingamangaraja No.81, Medan Kota District, Medan City",
                        time: "15:45 WIB",
                        budget: "Rp 350,000",
                    };
                    setItinerary(fullDetails);
                } else {
                    throw new Error("Itinerary not found.");
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch itinerary details.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraryDetail();
    }, [id]);

    if (loading) {
        return <div className="loading-container">Loading Details...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    if (!itinerary) {
        return (
            <div className="detail-page-container">
                <Navbar />
                <main className="content-wrapper"><h2>Itinerary not found.</h2></main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="detail-page-container">
            <Navbar />
            <div className="detail-header">
                <div className="header-content">
                    <Button text="← Back to Itineraries" onClick={() => navigate(-1)} className="back-button" />
                    <h1>{itinerary.name}</h1>
                    <p className="header-subtitle">{itinerary.destinations}</p>
                </div>
            </div>
            <main className="detail-main-content">
                <div className="detail-layout">
                    {/* Kolom Kiri - Konten Utama */}
                    <div className="detail-primary-column">
                        <div className="banner-image">
                            <img src={itinerary.image_url || "/images/masjid-almashun.jpg"} alt={itinerary.name} />
                        </div>
                        <section className="content-section">
                            <h3>Notes</h3>
                            <div className="notes-content">
                                <p>{itinerary.description || "No special notes provided for this itinerary."}</p>
                            </div>
                        </section>
                    </div>

                    {/* Kolom Kanan - Sidebar Info */}
                    <aside className="detail-secondary-column">
                        <div className="info-card">
                            <h4>Trip Details</h4>
                            <div className="info-item">
                                <span className="info-label">📍 Address</span>
                                <span className="info-value">{itinerary.address}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">📅 Date</span>
                                <span className="info-value">{new Date(itinerary.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">🕒 Time</span>
                                <span className="info-value">{itinerary.time}</span>
                            </div>
                            <div className="info-item budget">
                                <span className="info-label">💰 Budget</span>
                                <span className="info-value budget-value">{itinerary.budget}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ItineraryDetailPage;