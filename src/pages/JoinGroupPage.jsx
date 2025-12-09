import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton } from '../components/luxe/LuxeComponents';
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
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

const JoinGroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const group = {
    id,
    name: 'Medan Spiritual Travelers',
    description: 'A community of spiritual seekers exploring sacred sites across Medan together.',
    members_count: 234,
    rules: [
      'Be respectful to all members',
      'No spam or self-promotion',
      'Keep discussions on topic',
      'Share authentic experiences only'
    ]
  };

  const handleJoin = () => {
    // Simulate join action
    setTimeout(() => {
      navigate(`/communityname/${id}`);
    }, 500);
  };

  return (
    <div className="luxe-page">
      <LuxeNavbar />

      <section className="luxe-section" style={{ paddingTop: '140px' }}>
        <div className="luxe-container" style={{ maxWidth: '600px' }}>
          {/* Back Link */}
          <Link
            to="/community"
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
            <Icons.ArrowLeft /> Back to Communities
          </Link>

          <div className="luxe-detail-card" style={{ textAlign: 'center' }}>
            {/* Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto var(--space-6)',
              background: 'linear-gradient(135deg, var(--gold-400), var(--gold-500))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ width: '40px', height: '40px', color: 'var(--navy-900)' }}>
                <Icons.Users />
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: 'var(--white)',
              marginBottom: 'var(--space-2)'
            }}>
              Join {group.name}
            </h1>
            <p style={{ color: 'var(--gray-400)', marginBottom: 'var(--space-2)' }}>
              {group.members_count} members • Active Community
            </p>
            <p style={{ color: 'var(--gray-300)', lineHeight: 1.7, marginBottom: 'var(--space-8)' }}>
              {group.description}
            </p>

            {/* Rules */}
            <div className="luxe-glass" style={{
              padding: 'var(--space-5)',
              marginBottom: 'var(--space-8)',
              textAlign: 'left'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-4)',
                color: 'var(--gold-400)'
              }}>
                <Icons.Shield />
                <span style={{ fontWeight: 600 }}>Community Guidelines</span>
              </div>
              <ul style={{
                listStyle: 'none',
                color: 'var(--gray-300)',
                fontSize: 'var(--text-sm)'
              }}>
                {group.rules.map((rule, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <span style={{ color: 'var(--gold-400)', width: '16px', height: '16px' }}>
                      <Icons.Check />
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Join Button */}
            <LuxeButton variant="primary" fullWidth onClick={handleJoin}>
              Join Community
            </LuxeButton>

            <p style={{
              marginTop: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              color: 'var(--gray-500)'
            }}>
              By joining, you agree to follow the community guidelines
            </p>
          </div>
        </div>
      </section>

      <LuxeFooter />
    </div>
  );
};

export default JoinGroupPage;
