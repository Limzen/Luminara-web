import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeCardSkeleton } from '../components/luxe/LuxeComponents';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  MessageCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

// Community Card
const CommunityCard = ({ community, onClick }) => (
  <div className="luxe-dir-card" onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="luxe-dir-card__img">
      <img
        src={community.cover_image || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80'}
        alt={community.name}
        loading="lazy"
      />
      {community.is_active && (
        <span className="luxe-dir-card__category">Active</span>
      )}
    </div>
    <div className="luxe-dir-card__body">
      <h3 className="luxe-dir-card__title">{community.name}</h3>
      <div className="luxe-dir-card__meta">
        <div className="luxe-dir-card__location">
          <Icons.Users />
          <span>{community.members_count || 0} members</span>
        </div>
        <div className="luxe-dir-card__location">
          <Icons.MessageCircle />
          <span>{community.posts_count || 0} posts</span>
        </div>
      </div>
      <p className="luxe-dir-card__desc">{community.description}</p>
      <div className="luxe-dir-card__footer">
        <span className="luxe-dir-card__link">
          Join Group <Icons.ArrowRight />
        </span>
      </div>
    </div>
  </div>
);

const CommunityPage = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated data loading
    setTimeout(() => {
      setCommunities([
        { id: 1, name: 'Medan Spiritual Travelers', description: 'A community of spiritual seekers exploring sacred sites across Medan together.', members_count: 234, posts_count: 89, is_active: true },
        { id: 2, name: 'Islamic Heritage Enthusiasts', description: 'Discussing and sharing knowledge about Islamic heritage sites in North Sumatra.', members_count: 156, posts_count: 45, is_active: true },
        { id: 3, name: 'Multi-Faith Explorers', description: 'Embracing diversity through visits to various religious landmarks.', members_count: 89, posts_count: 32, is_active: false },
        { id: 4, name: 'Temple Photography Club', description: 'Capturing the beauty of temples and religious architecture in Medan.', members_count: 67, posts_count: 128, is_active: true },
      ]);
      setLoading(false);
    }, 1000);
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
          <span className="luxe-section-label">Connect</span>
          <h1 className="luxe-page-hero__title">Community</h1>
          <p className="luxe-page-hero__subtitle">
            Join fellow travelers, share experiences, and discover new adventures together
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="luxe-section" style={{ paddingTop: 0, marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="luxe-container">
          <div className="luxe-profile-stats" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="luxe-profile-stat">
              <span className="luxe-profile-stat__value">500+</span>
              <span className="luxe-profile-stat__label">Members</span>
            </div>
            <div className="luxe-profile-stat">
              <span className="luxe-profile-stat__value">12</span>
              <span className="luxe-profile-stat__label">Active Groups</span>
            </div>
            <div className="luxe-profile-stat">
              <span className="luxe-profile-stat__value">1.5K</span>
              <span className="luxe-profile-stat__label">Posts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="luxe-section">
        <div className="luxe-container">
          <div className="luxe-section-header" style={{ marginBottom: 'var(--space-8)' }}>
            <div>
              <h2 className="luxe-section-title" style={{ fontSize: 'var(--text-2xl)' }}>Browse Groups</h2>
              <p className="luxe-section-desc">Find your community of like-minded travelers</p>
            </div>
          </div>

          {loading && (
            <div className="luxe-grid luxe-grid--3">
              {[1, 2, 3, 4].map(i => <LuxeCardSkeleton key={i} />)}
            </div>
          )}

          {!loading && (
            <div className="luxe-grid luxe-grid--3">
              {communities.map(community => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onClick={() => navigate(`/communityname/${community.id}`)}
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

export default CommunityPage;