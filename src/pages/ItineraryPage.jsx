import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeCardSkeleton } from '../components/luxe/LuxeComponents';
import { itineraryService } from '../services/itineraryService';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    Calendar: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Clock: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    MapPin: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    ArrowRight: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    Plus: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    ),
};

// Itinerary Card
const ItineraryCard = ({ itinerary, onClick }) => (
    <div className="luxe-dir-card" onClick={onClick} style={{ cursor: 'pointer' }}>
        <div className="luxe-dir-card__img">
            <img
                src={itinerary.cover_image || 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80'}
                alt={itinerary.title}
                loading="lazy"
            />
            <span className="luxe-dir-card__category">{itinerary.duration || '1 Day'}</span>
        </div>
        <div className="luxe-dir-card__body">
            <h3 className="luxe-dir-card__title">{itinerary.title}</h3>
            <div className="luxe-dir-card__meta">
                <div className="luxe-dir-card__location">
                    <Icons.MapPin />
                    <span>{itinerary.stops_count || 3} stops</span>
                </div>
                <div className="luxe-dir-card__location">
                    <Icons.Clock />
                    <span>{itinerary.estimated_time || '6 hours'}</span>
                </div>
            </div>
            <p className="luxe-dir-card__desc">{itinerary.description}</p>
            <div className="luxe-dir-card__footer">
                <div className="luxe-dir-card__hours">
                    <Icons.Calendar />
                    <span>{itinerary.created_by || 'Luminara'}</span>
                </div>
                <span className="luxe-dir-card__link">
                    View <Icons.ArrowRight />
                </span>
            </div>
        </div>
    </div>
);

const ItineraryPage = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                setLoading(true);
                try {
                    const response = await itineraryService?.getAllItineraries?.();
                    if (response?.status === 200 && response?.data) {
                        setItineraries(response.data);
                    } else {
                        throw new Error('No data');
                    }
                } catch {
                    // Fallback dummy data
                    setItineraries([
                        { id: 1, title: 'Spiritual Morning Tour', description: 'Experience the tranquility of morning prayers at sacred sites around Medan.', duration: '1 Day', stops_count: 4, estimated_time: '5 hours', created_by: 'Luminara Team' },
                        { id: 2, title: 'Multi-Faith Journey', description: 'Visit mosques, temples, and churches in one enriching cultural experience.', duration: '1 Day', stops_count: 5, estimated_time: '7 hours', created_by: 'Luminara Team' },
                        { id: 3, title: 'Historic Religious Sites', description: 'Explore the oldest and most significant religious landmarks in Medan.', duration: '2 Days', stops_count: 8, estimated_time: '12 hours', created_by: 'Local Guide' },
                    ]);
                }
            } catch (err) {
                setError('Failed to load itineraries.');
            } finally {
                setLoading(false);
            }
        };
        fetchItineraries();
    }, []);

    return (
        <div className="luxe-page">
            <LuxeNavbar />

            {/* Hero */}
            <section className="luxe-page-hero">
                <div className="luxe-page-hero__bg">
                    <div className="luxe-page-hero__overlay" style={{ background: 'linear-gradient(180deg, var(--navy-900) 0%, var(--navy-800) 100%)' }}></div>
                </div>
                <div className="luxe-container luxe-page-hero__content">
                    <span className="luxe-section-label">Plan Your Journey</span>
                    <h1 className="luxe-page-hero__title">Itineraries</h1>
                    <p className="luxe-page-hero__subtitle">
                        Discover curated spiritual journeys or create your own custom itinerary
                    </p>
                    <div style={{ marginTop: 'var(--space-8)' }}>
                        <LuxeButton
                            variant="primary"
                            icon={<Icons.Plus />}
                            onClick={() => navigate('/itinerary/create')}
                        >
                            Create Itinerary
                        </LuxeButton>
                    </div>
                </div>
            </section>

            {/* Itineraries Grid */}
            <section className="luxe-section">
                <div className="luxe-container">
                    <div className="luxe-section-header" style={{ marginBottom: 'var(--space-8)' }}>
                        <div>
                            <h2 className="luxe-section-title" style={{ fontSize: 'var(--text-2xl)' }}>Popular Itineraries</h2>
                            <p className="luxe-section-desc">Hand-picked journeys by our team and community</p>
                        </div>
                    </div>

                    {loading && (
                        <div className="luxe-grid luxe-grid--3">
                            {[1, 2, 3].map(i => <LuxeCardSkeleton key={i} />)}
                        </div>
                    )}

                    {error && (
                        <div className="luxe-empty">
                            <h3 className="luxe-empty__title">Failed to load</h3>
                            <p className="luxe-empty__desc">{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <div className="luxe-grid luxe-grid--3">
                                {itineraries.map(itinerary => (
                                    <ItineraryCard
                                        key={itinerary.id}
                                        itinerary={itinerary}
                                        onClick={() => navigate(`/itinerary/${itinerary.id}`)}
                                    />
                                ))}
                            </div>

                            {itineraries.length === 0 && (
                                <div className="luxe-empty">
                                    <div className="luxe-empty__icon"><Icons.Calendar /></div>
                                    <h3 className="luxe-empty__title">No itineraries yet</h3>
                                    <p className="luxe-empty__desc">Be the first to create an itinerary!</p>
                                    <LuxeButton variant="primary" onClick={() => navigate('/itinerary/create')} style={{ marginTop: 'var(--space-4)' }}>
                                        Create Itinerary
                                    </LuxeButton>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            <LuxeFooter />
        </div>
    );
};

export default ItineraryPage;