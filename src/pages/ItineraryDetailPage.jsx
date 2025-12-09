import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    MapPin: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Clock: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    Calendar: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    ArrowLeft: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    ),
    Share: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
    ),
    Download: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    ),
};

// Stop Component
const ItineraryStop = ({ stop, index, isLast }) => (
    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--gold-400), var(--gold-500))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--navy-900)',
                fontWeight: 700,
                fontSize: 'var(--text-sm)'
            }}>
                {index + 1}
            </div>
            {!isLast && (
                <div style={{
                    width: '2px',
                    flex: 1,
                    minHeight: '40px',
                    background: 'linear-gradient(180deg, var(--gold-400), transparent)'
                }} />
            )}
        </div>

        {/* Content */}
        <div className="luxe-glass" style={{
            flex: 1,
            padding: 'var(--space-5)',
            marginBottom: isLast ? 0 : 'var(--space-4)'
        }}>
            <h4 style={{
                fontWeight: 600,
                color: 'var(--white)',
                marginBottom: 'var(--space-2)'
            }}>
                {stop.name}
            </h4>
            <div style={{
                display: 'flex',
                gap: 'var(--space-4)',
                fontSize: 'var(--text-sm)',
                color: 'var(--gray-400)'
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <Icons.Clock /> {stop.duration}
                </span>
                {stop.location && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                        <Icons.MapPin /> {stop.location}
                    </span>
                )}
            </div>
            {stop.description && (
                <p style={{ color: 'var(--gray-400)', marginTop: 'var(--space-3)', lineHeight: 1.6 }}>
                    {stop.description}
                </p>
            )}
        </div>
    </div>
);

const ItineraryDetailPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [itinerary, setItinerary] = useState(null);

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setItinerary({
                id,
                title: 'Spiritual Morning Tour',
                description: 'Experience the tranquility of morning prayers at sacred sites around Medan. This guided tour takes you through the most significant religious landmarks.',
                duration: '1 Day',
                estimated_time: '6 hours',
                created_by: 'Luminara Team',
                stops: [
                    { id: 1, name: 'Masjid Raya Al Mashun', duration: '1.5 hours', location: 'Jl. Sisingamangaraja', description: 'Start your journey at the grand mosque, known for its stunning Moroccan architecture.' },
                    { id: 2, name: 'Vihara Maitreya', duration: '1 hour', location: 'Jl. Yos Sudarso', description: 'Visit the largest Buddhist temple in Sumatra with its impressive Maitreya statue.' },
                    { id: 3, name: 'Gereja HKBP', duration: '45 min', location: 'Jl. Diponegoro', description: 'Explore the historic Protestant church with its colonial-era architecture.' },
                    { id: 4, name: 'Kuil Shri Mariamman', duration: '1 hour', location: 'Jl. Zainul Arifin', description: 'End your tour at this colorful Hindu temple, a cultural gem in Medan.' },
                ]
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return (
            <div className="luxe-page">
                <LuxeNavbar />
                <div className="luxe-loading-page">
                    <div className="luxe-spinner"></div>
                </div>
                <LuxeFooter />
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="luxe-page">
                <LuxeNavbar />
                <section className="luxe-section" style={{ paddingTop: '140px' }}>
                    <div className="luxe-container">
                        <div className="luxe-empty">
                            <h3 className="luxe-empty__title">Itinerary not found</h3>
                            <Link to="/itinerary">
                                <LuxeButton variant="primary">Browse Itineraries</LuxeButton>
                            </Link>
                        </div>
                    </div>
                </section>
                <LuxeFooter />
            </div>
        );
    }

    return (
        <div className="luxe-page">
            <LuxeNavbar />

            <section className="luxe-section" style={{ paddingTop: '140px' }}>
                <div className="luxe-container" style={{ maxWidth: '900px' }}>
                    {/* Back Link */}
                    <Link
                        to="/itinerary"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--gray-400)',
                            marginBottom: 'var(--space-6)',
                            textDecoration: 'none',
                            fontSize: 'var(--text-sm)'
                        }}
                    >
                        <Icons.ArrowLeft /> Back to Itineraries
                    </Link>

                    <div className="luxe-detail-card">
                        {/* Header */}
                        <div style={{ marginBottom: 'var(--space-8)' }}>
                            <span className="luxe-section-label">Itinerary</span>
                            <h1 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'var(--text-3xl)',
                                fontWeight: 700,
                                color: 'var(--white)',
                                marginBottom: 'var(--space-4)'
                            }}>
                                {itinerary.title}
                            </h1>
                            <p style={{ color: 'var(--gray-300)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
                                {itinerary.description}
                            </p>

                            {/* Meta */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 'var(--space-6)',
                                paddingBottom: 'var(--space-6)',
                                borderBottom: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div className="luxe-detail-meta-item">
                                    <Icons.Calendar />
                                    <span>{itinerary.duration}</span>
                                </div>
                                <div className="luxe-detail-meta-item">
                                    <Icons.Clock />
                                    <span>{itinerary.estimated_time}</span>
                                </div>
                                <div className="luxe-detail-meta-item">
                                    <Icons.MapPin />
                                    <span>{itinerary.stops.length} stops</span>
                                </div>
                            </div>
                        </div>

                        {/* Stops Timeline */}
                        <div style={{ marginBottom: 'var(--space-8)' }}>
                            <h3 style={{
                                fontSize: 'var(--text-xl)',
                                fontWeight: 600,
                                color: 'var(--white)',
                                marginBottom: 'var(--space-6)'
                            }}>
                                Itinerary Stops
                            </h3>
                            {itinerary.stops.map((stop, index) => (
                                <ItineraryStop
                                    key={stop.id}
                                    stop={stop}
                                    index={index}
                                    isLast={index === itinerary.stops.length - 1}
                                />
                            ))}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                            <LuxeButton variant="primary" style={{ flex: 1 }}>
                                Start Tour
                            </LuxeButton>
                            <LuxeButton variant="secondary" icon={<Icons.Download />}>
                                Download PDF
                            </LuxeButton>
                            <LuxeButton variant="ghost" icon={<Icons.Share />}>
                                Share
                            </LuxeButton>
                        </div>
                    </div>
                </div>
            </section>

            <LuxeFooter />
        </div>
    );
};

export default ItineraryDetailPage;