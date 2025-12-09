import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeInput } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
    User: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Mail: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    Settings: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    LogOut: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),
    Edit: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    ),
    MapPin: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Heart: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
};

const ProfilePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock user data
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://ui-avatars.com/api/?name=User&background=d4a855&color=0a0f1c&size=200',
        joinDate: 'December 2024',
        savedPlaces: 12,
        itineraries: 5,
        reviews: 8
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'saved', label: 'Saved Places' },
        { id: 'itineraries', label: 'My Itineraries' },
        { id: 'settings', label: 'Settings' },
    ];

    return (
        <div className="luxe-page">
            <LuxeNavbar />

            {/* Profile Header */}
            <section className="luxe-section" style={{ paddingTop: '140px', paddingBottom: 'var(--space-8)' }}>
                <div className="luxe-container">
                    <div className="luxe-profile-header">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="luxe-profile-avatar"
                            onError={(e) => {
                                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=d4a855&color=0a0f1c&size=120';
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <h1 className="luxe-profile-name">{user.name}</h1>
                            <p className="luxe-profile-email">{user.email}</p>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)', marginTop: 'var(--space-2)' }}>
                                Member since {user.joinDate}
                            </p>
                        </div>
                        <div className="luxe-hide-mobile">
                            <LuxeButton variant="secondary" icon={<Icons.Edit />}>
                                Edit Profile
                            </LuxeButton>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="luxe-profile-stats" style={{ marginTop: 'var(--space-8)' }}>
                        <div className="luxe-profile-stat">
                            <span className="luxe-profile-stat__value">{user.savedPlaces}</span>
                            <span className="luxe-profile-stat__label">Saved Places</span>
                        </div>
                        <div className="luxe-profile-stat">
                            <span className="luxe-profile-stat__value">{user.itineraries}</span>
                            <span className="luxe-profile-stat__label">Itineraries</span>
                        </div>
                        <div className="luxe-profile-stat">
                            <span className="luxe-profile-stat__value">{user.reviews}</span>
                            <span className="luxe-profile-stat__label">Reviews</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="luxe-section" style={{ paddingTop: 0 }}>
                <div className="luxe-container">
                    <div className="luxe-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`luxe-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="luxe-tab-content active">
                            <div className="luxe-grid luxe-grid--2" style={{ gap: 'var(--space-8)' }}>
                                <div className="luxe-glass" style={{ padding: 'var(--space-6)' }}>
                                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>
                                        Recent Activity
                                    </h3>
                                    <p style={{ color: 'var(--gray-400)' }}>No recent activity to show.</p>
                                </div>
                                <div className="luxe-glass" style={{ padding: 'var(--space-6)' }}>
                                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>
                                        Quick Actions
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                        <LuxeButton variant="ghost" onClick={() => navigate('/itinerary/create')}>
                                            <Icons.Calendar />
                                            Create Itinerary
                                        </LuxeButton>
                                        <LuxeButton variant="ghost" onClick={() => navigate('/directory')}>
                                            <Icons.MapPin />
                                            Explore Destinations
                                        </LuxeButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'saved' && (
                        <div className="luxe-tab-content active">
                            <div className="luxe-empty">
                                <div className="luxe-empty__icon"><Icons.Heart /></div>
                                <h3 className="luxe-empty__title">No saved places yet</h3>
                                <p className="luxe-empty__desc">Start exploring and save your favorite destinations!</p>
                                <LuxeButton variant="primary" onClick={() => navigate('/directory')} style={{ marginTop: 'var(--space-4)' }}>
                                    Explore Destinations
                                </LuxeButton>
                            </div>
                        </div>
                    )}

                    {activeTab === 'itineraries' && (
                        <div className="luxe-tab-content active">
                            <div className="luxe-empty">
                                <div className="luxe-empty__icon"><Icons.Calendar /></div>
                                <h3 className="luxe-empty__title">No itineraries yet</h3>
                                <p className="luxe-empty__desc">Create your first spiritual journey!</p>
                                <LuxeButton variant="primary" onClick={() => navigate('/itinerary/create')} style={{ marginTop: 'var(--space-4)' }}>
                                    Create Itinerary
                                </LuxeButton>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="luxe-tab-content active">
                            <div className="luxe-glass" style={{ padding: 'var(--space-6)', maxWidth: '560px' }}>
                                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-6)' }}>
                                    Account Settings
                                </h3>
                                <LuxeInput label="Full Name" value={user.name} />
                                <LuxeInput label="Email" type="email" value={user.email} />
                                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                                    <LuxeButton variant="primary">Save Changes</LuxeButton>
                                    <LuxeButton variant="danger" icon={<Icons.LogOut />}>
                                        Sign Out
                                    </LuxeButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <LuxeFooter />
        </div>
    );
};

export default ProfilePage;