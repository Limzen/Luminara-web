import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeCardSkeleton } from '../components/luxe/LuxeComponents';
import { guideService } from '../services/guideService';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Award: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
};

// Guide Card
const GuideCard = ({ guide, onClick }) => (
  <div className="luxe-dir-card" onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="luxe-dir-card__img">
      <img
        src={guide.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(guide.name || 'Guide')}&background=d4a855&color=0a0f1c&size=200`}
        alt={guide.name}
        loading="lazy"
        style={{ aspectRatio: '1/1', objectFit: 'cover' }}
      />
      {guide.verified && (
        <span className="luxe-dir-card__category">Verified</span>
      )}
    </div>
    <div className="luxe-dir-card__body">
      <h3 className="luxe-dir-card__title">{guide.name}</h3>
      <div className="luxe-dir-card__meta">
        <div className="luxe-dir-card__rating">
          <Icons.Star />
          <span>{(guide.rating || 4.5).toFixed(1)}</span>
        </div>
        <div className="luxe-dir-card__location">
          <Icons.MapPin />
          <span>{guide.location || 'Medan'}</span>
        </div>
      </div>
      <p className="luxe-dir-card__desc">{guide.bio || guide.description}</p>
      <div className="luxe-dir-card__footer">
        <div className="luxe-dir-card__hours">
          <Icons.Users />
          <span>{guide.tours_count || 0} tours</span>
        </div>
        <span className="luxe-dir-card__link">
          View Profile <Icons.ArrowRight />
        </span>
      </div>
    </div>
  </div>
);

const GuidePage = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        // Try to fetch from API, fallback to dummy data
        try {
          const response = await guideService?.getAllGuides?.();
          if (response?.status === 200 && response?.data) {
            setGuides(response.data);
          } else {
            throw new Error('No data');
          }
        } catch {
          // Fallback dummy data
          setGuides([
            { id: 1, name: 'Ahmad Rahman', rating: 4.9, location: 'Medan', bio: 'Expert guide specializing in Islamic heritage sites with 10+ years experience.', tours_count: 45, verified: true },
            { id: 2, name: 'Sarah Chen', rating: 4.8, location: 'Medan', bio: 'Multilingual guide offering tours to Buddhist temples and cultural sites.', tours_count: 32, verified: true },
            { id: 3, name: 'Michael Sirait', rating: 4.7, location: 'Medan', bio: 'Professional guide for Christian historical sites and churches.', tours_count: 28, verified: true },
          ]);
        }
      } catch (err) {
        setError('Failed to load guides.');
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
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
          <span className="luxe-section-label">Local Experts</span>
          <h1 className="luxe-page-hero__title">Our Guides</h1>
          <p className="luxe-page-hero__subtitle">
            Connect with experienced local guides for personalized spiritual journeys
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="luxe-section" style={{ paddingTop: 0, marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="luxe-container">
          <div className="luxe-profile-stats" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="luxe-profile-stat">
              <span className="luxe-profile-stat__value">50+</span>
              <span className="luxe-profile-stat__label">Verified Guides</span>
            </div>
            <div className="luxe-profile-stat">
              <span className="luxe-profile-stat__value">1.2K</span>
              <span className="luxe-profile-stat__label">Tours Completed</span>
            </div>
            <div className="luxe-profile-stat">
              <span className="luxe-profile-stat__value">4.9</span>
              <span className="luxe-profile-stat__label">Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="luxe-section">
        <div className="luxe-container">
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
            <div className="luxe-grid luxe-grid--3">
              {guides.map(guide => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  onClick={() => navigate(`/guide/${guide.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <LuxeFooter />
    </div>
  );
};

export default GuidePage;