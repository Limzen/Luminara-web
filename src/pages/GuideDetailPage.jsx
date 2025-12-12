import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeRating } from '../components/luxe/LuxeComponents';
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
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  MessageCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

const GuideDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setGuide({
        id,
        name: 'Ahmad Rahman',
        bio: 'Experienced local guide specializing in Islamic heritage sites with over 10 years of experience guiding tourists and pilgrims through Medan\'s most sacred destinations.',
        location: 'Medan, Indonesia',
        rating: 4.9,
        reviews_count: 127,
        tours_completed: 450,
        languages: ['Indonesian', 'English', 'Arabic'],
        specialties: ['Islamic Heritage', 'Historical Sites', 'Cultural Tours'],
        verified: true,
        profile_image: `https://ui-avatars.com/api/?name=Ahmad%20Rahman&background=d4a855&color=0a0f1c&size=200`
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

  if (!guide) {
    return (
      <div className="luxe-page">
        <LuxeNavbar />
        <section className="luxe-section" style={{ paddingTop: '140px' }}>
          <div className="luxe-container">
            <div className="luxe-empty">
              <h3 className="luxe-empty__title">Guide not found</h3>
              <Link to="/guide">
                <LuxeButton variant="primary">Browse Guides</LuxeButton>
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
          <Link to="/guide" className="luxe-back-link">
            <Icons.ArrowLeft /> Back to Guides
          </Link>

          <div className="luxe-detail-card">
            {/* Profile Header */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              paddingBottom: 'var(--space-8)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              marginBottom: 'var(--space-8)'
            }}>
              <img
                src={guide.profile_image}
                alt={guide.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(guide.name)}&background=d4a855&color=0a0f1c&size=150`;
                }}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid var(--gold-400)',
                  marginBottom: 'var(--space-6)'
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-3xl)',
                  fontWeight: 700,
                  color: 'var(--white)'
                }}>
                  {guide.name}
                </h1>
                {guide.verified && (
                  <span style={{
                    background: 'var(--gold-400)',
                    color: 'var(--navy-900)',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icons.Check />
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--gray-400)', marginBottom: 'var(--space-4)' }}>
                <Icons.MapPin />
                <span>{guide.location}</span>
              </div>

              {/* Stats */}
              <div className="luxe-profile-stats" style={{ marginTop: 'var(--space-4)' }}>
                <div className="luxe-profile-stat">
                  <span className="luxe-profile-stat__value">{guide.rating}</span>
                  <span className="luxe-profile-stat__label">Rating</span>
                </div>
                <div className="luxe-profile-stat">
                  <span className="luxe-profile-stat__value">{guide.reviews_count}</span>
                  <span className="luxe-profile-stat__label">Reviews</span>
                </div>
                <div className="luxe-profile-stat">
                  <span className="luxe-profile-stat__value">{guide.tours_completed}</span>
                  <span className="luxe-profile-stat__label">Tours</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: 'var(--white)',
                marginBottom: 'var(--space-4)'
              }}>
                About
              </h3>
              <p style={{ color: 'var(--gray-300)', lineHeight: 1.8 }}>
                {guide.bio}
              </p>
            </div>

            {/* Languages & Specialties */}
            <div className="luxe-grid luxe-grid--2" style={{ gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <div className="luxe-glass" style={{ padding: 'var(--space-5)' }}>
                <h4 style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--gold-400)',
                  marginBottom: 'var(--space-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Languages
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {guide.languages.map(lang => (
                    <span key={lang} className="luxe-badge luxe-badge--default">{lang}</span>
                  ))}
                </div>
              </div>
              <div className="luxe-glass" style={{ padding: 'var(--space-5)' }}>
                <h4 style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--gold-400)',
                  marginBottom: 'var(--space-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Specialties
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {guide.specialties.map(spec => (
                    <span key={spec} className="luxe-badge luxe-badge--gold">{spec}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <LuxeButton variant="primary" icon={<Icons.MessageCircle />} style={{ flex: 1 }}>
                Contact Guide
              </LuxeButton>
              <LuxeButton variant="secondary">
                Book a Tour
              </LuxeButton>
            </div>
          </div>
        </div>
      </section>

      <LuxeFooter />
    </div>
  );
};

export default GuideDetailPage;