import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeInput, LuxeTextarea } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    Plus: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    ),
    X: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
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
    ArrowLeft: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    ),
    GripVertical: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="6" r="1" />
            <circle cx="15" cy="6" r="1" />
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="9" cy="18" r="1" />
            <circle cx="15" cy="18" r="1" />
        </svg>
    ),
};

// Stop Card Component
const StopCard = ({ stop, index, onRemove }) => (
    <div className="luxe-glass" style={{
        padding: 'var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-3)'
    }}>
        <div style={{ color: 'var(--gray-600)', cursor: 'grab' }}>
            <Icons.GripVertical />
        </div>
        <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--gold-400)',
            color: 'var(--navy-900)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 'var(--text-sm)'
        }}>
            {index + 1}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: 'var(--white)' }}>{stop.name}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>{stop.duration}</div>
        </div>
        <button
            onClick={() => onRemove(index)}
            style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-2)',
                color: '#ef4444',
                cursor: 'pointer',
                display: 'flex'
            }}
        >
            <Icons.X />
        </button>
    </div>
);

const CreateItineraryPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '1 Day',
    });
    const [stops, setStops] = useState([]);
    const [newStop, setNewStop] = useState({ name: '', duration: '1 hour' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addStop = () => {
        if (!newStop.name.trim()) return;
        setStops([...stops, { ...newStop, id: Date.now() }]);
        setNewStop({ name: '', duration: '1 hour' });
    };

    const removeStop = (index) => {
        setStops(stops.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || stops.length === 0) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/itinerary');
        }, 1500);
    };

    return (
        <div className="luxe-page">
            <LuxeNavbar />

            <section className="luxe-section" style={{ paddingTop: '140px' }}>
                <div className="luxe-container" style={{ maxWidth: '800px' }}>
                    {/* Back Link */}
                    <Link to="/itinerary" className="luxe-back-link">
                        <Icons.ArrowLeft /> Back to Itineraries
                    </Link>

                    <div className="luxe-detail-card">
                        <h1 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 700,
                            color: 'var(--white)',
                            marginBottom: 'var(--space-2)'
                        }}>
                            Create New Itinerary
                        </h1>
                        <p style={{ color: 'var(--gray-400)', marginBottom: 'var(--space-8)' }}>
                            Plan your spiritual journey by adding stops and customizing your route.
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* Basic Info */}
                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                <h3 style={{
                                    fontSize: 'var(--text-lg)',
                                    fontWeight: 600,
                                    color: 'var(--white)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    Basic Information
                                </h3>
                                <LuxeInput
                                    name="title"
                                    label="Itinerary Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                                <LuxeTextarea
                                    name="description"
                                    label="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                />
                                <div className="luxe-input">
                                    <label style={{
                                        display: 'block',
                                        fontSize: 'var(--text-sm)',
                                        color: 'var(--gray-400)',
                                        marginBottom: 'var(--space-2)'
                                    }}>
                                        Duration
                                    </label>
                                    <select
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            padding: 'var(--space-4) var(--space-5)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1.5px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: 'var(--radius-xl)',
                                            color: 'var(--white)',
                                            fontSize: 'var(--text-base)',
                                        }}
                                    >
                                        <option value="Half Day">Half Day</option>
                                        <option value="1 Day">1 Day</option>
                                        <option value="2 Days">2 Days</option>
                                        <option value="3+ Days">3+ Days</option>
                                    </select>
                                </div>
                            </div>

                            {/* Stops Section */}
                            <div style={{ marginBottom: 'var(--space-8)' }}>
                                <h3 style={{
                                    fontSize: 'var(--text-lg)',
                                    fontWeight: 600,
                                    color: 'var(--white)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    Stops ({stops.length})
                                </h3>

                                {/* Stop List */}
                                {stops.length > 0 ? (
                                    <div style={{ marginBottom: 'var(--space-4)' }}>
                                        {stops.map((stop, index) => (
                                            <StopCard
                                                key={stop.id}
                                                stop={stop}
                                                index={index}
                                                onRemove={removeStop}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="luxe-glass" style={{
                                        padding: 'var(--space-8)',
                                        textAlign: 'center',
                                        marginBottom: 'var(--space-4)'
                                    }}>
                                        <div style={{ width: '48px', height: '48px', margin: '0 auto var(--space-4)', color: 'var(--gray-600)' }}>
                                            <Icons.MapPin />
                                        </div>
                                        <p style={{ color: 'var(--gray-500)' }}>No stops added yet. Add your first stop below.</p>
                                    </div>
                                )}

                                {/* Add Stop Form */}
                                <div className="luxe-glass" style={{ padding: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                                        <div style={{ flex: 2, minWidth: '200px' }}>
                                            <input
                                                type="text"
                                                placeholder="Stop name (e.g., Masjid Raya)"
                                                value={newStop.name}
                                                onChange={(e) => setNewStop({ ...newStop, name: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: 'var(--space-3) var(--space-4)',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: 'var(--radius-lg)',
                                                    color: 'var(--white)',
                                                    fontSize: 'var(--text-sm)'
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: 1, minWidth: '120px' }}>
                                            <select
                                                value={newStop.duration}
                                                onChange={(e) => setNewStop({ ...newStop, duration: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: 'var(--space-3) var(--space-4)',
                                                    background: 'rgba(255, 255, 255, 0.05)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: 'var(--radius-lg)',
                                                    color: 'var(--white)',
                                                    fontSize: 'var(--text-sm)'
                                                }}
                                            >
                                                <option value="30 min">30 min</option>
                                                <option value="1 hour">1 hour</option>
                                                <option value="2 hours">2 hours</option>
                                                <option value="3 hours">3 hours</option>
                                                <option value="Half day">Half day</option>
                                            </select>
                                        </div>
                                        <LuxeButton
                                            type="button"
                                            variant="secondary"
                                            icon={<Icons.Plus />}
                                            onClick={addStop}
                                        >
                                            Add
                                        </LuxeButton>
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                <LuxeButton
                                    type="button"
                                    variant="secondary"
                                    onClick={() => navigate('/itinerary')}
                                >
                                    Cancel
                                </LuxeButton>
                                <LuxeButton
                                    type="submit"
                                    variant="primary"
                                    loading={loading}
                                    disabled={!formData.title || stops.length === 0}
                                    style={{ flex: 1 }}
                                >
                                    Create Itinerary
                                </LuxeButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <LuxeFooter />
        </div>
    );
};

export default CreateItineraryPage;