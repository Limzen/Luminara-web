import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeModal, LuxeInput, LuxeTextarea, LuxeRating } from '../components/luxe/LuxeComponents';
import { directoryService } from '../services/directoryService';
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
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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
  Heart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
};

// Sample reviews
const sampleReviews = [
  { id: 1, name: 'Sarah Jaya', avatar: '', date: '2 October 2024', rating: 5, title: 'Amazing Experience', text: 'The atmosphere was peaceful and the architecture was stunning. Highly recommend visiting during sunrise for the best experience.', verified: true },
  { id: 2, name: 'Haris Anwar', avatar: '', date: '28 September 2024', rating: 4, title: 'Beautiful Sacred Site', text: 'A wonderful place for spiritual reflection. The guide was knowledgeable and the site was well-maintained.', verified: true },
  { id: 3, name: 'Rafi Akbar', avatar: '', date: '15 September 2024', rating: 5, title: 'Must Visit in Medan', text: 'One of the most beautiful religious sites in Medan. The history and cultural significance is remarkable.', verified: false },
];

// Review Card Component
const ReviewCard = ({ review }) => (
  <div className="luxe-glass" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
    <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
      <img
        src={review.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=d4a855&color=0a0f1c&size=48`}
        alt={review.name}
        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ fontWeight: 600, color: 'var(--white)' }}>{review.name}</span>
          {review.verified && (
            <span style={{ color: 'var(--gold-400)', width: '16px', height: '16px' }}><Icons.Check /></span>
          )}
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>{review.date}</div>
      </div>
      <div className="luxe-rating">
        <Icons.Star />
        <span style={{ fontWeight: 600, color: 'var(--white)' }}>{review.rating}</span>
      </div>
    </div>
    <h4 style={{ fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-2)' }}>{review.title}</h4>
    <p style={{ color: 'var(--gray-400)', lineHeight: 1.6 }}>{review.text}</p>
  </div>
);

// Rating Bar Component
const RatingBar = ({ label, value, max = 5 }) => (
  <div style={{ marginBottom: 'var(--space-3)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-400)' }}>{label}</span>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gold-400)', fontWeight: 600 }}>{value.toFixed(1)}</span>
    </div>
    <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', height: '6px' }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        background: 'linear-gradient(90deg, var(--gold-400), var(--gold-500))',
        height: '6px',
        borderRadius: 'var(--radius-full)',
        transition: 'width 0.5s ease'
      }} />
    </div>
  </div>
);

const DirectoryDetailPage = () => {
  const { id } = useParams();
  const [directory, setDirectory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, text: '', name: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        setLoading(true);
        const response = await directoryService.getDirectoryById(id);
        if (response.status === 200 && response.data) {
          setDirectory(response.data);
        } else {
          throw new Error('Not found');
        }
      } catch (err) {
        setError('Failed to load destination details.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDirectory();
  }, [id]);

  // Loading State
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

  // Error State
  if (error || !directory) {
    return (
      <div className="luxe-page">
        <LuxeNavbar />
        <section className="luxe-section" style={{ paddingTop: '140px' }}>
          <div className="luxe-container">
            <div className="luxe-empty">
              <div className="luxe-empty__icon"><Icons.MapPin /></div>
              <h3 className="luxe-empty__title">{error || 'Destination not found'}</h3>
              <p className="luxe-empty__desc">The destination you're looking for doesn't exist or has been removed.</p>
              <LuxeButton variant="primary" to="/directory" style={{ marginTop: 'var(--space-4)' }}>
                Browse Destinations
              </LuxeButton>
            </div>
          </div>
        </section>
        <LuxeFooter />
      </div>
    );
  }

  const ratingSummary = {
    average: directory.overall_rating || 4.5,
    count: directory.rating?.total_reviews || 24,
    guide: directory.rating?.guide_rating || 4.2,
    transportation: directory.rating?.transportation_rating || 4.0,
    value: directory.rating?.value_for_money_rating || 4.5,
    safety: directory.rating?.safety_rating || 4.8,
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'reviews', label: `Reviews (${ratingSummary.count})` },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <div className="luxe-page">
      <LuxeNavbar />

      {/* Hero Image */}
      <div className="luxe-detail-hero">
        <img
          src={directory.main_image_url || 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80'}
          alt={directory.name}
          className="luxe-detail-hero__img"
        />
        <div className="luxe-detail-hero__overlay"></div>
      </div>

      {/* Content Card */}
      <section className="luxe-detail-content">
        <div className="luxe-container">
          {/* Back Button */}
          <Link
            to="/directory"
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
            <Icons.ArrowLeft /> Back to Directory
          </Link>

          <div className="luxe-detail-card">
            {/* Header */}
            <div className="luxe-detail-header">
              <div>
                <h1 className="luxe-detail-title">{directory.name}</h1>
                <div className="luxe-detail-meta">
                  <div className="luxe-detail-meta-item">
                    <Icons.MapPin />
                    <span>{directory.address || 'Medan, Indonesia'}</span>
                  </div>
                  <div className="luxe-detail-meta-item">
                    <Icons.Clock />
                    <span>{directory.opening_hours || 'Open Daily'}</span>
                  </div>
                  <div className="luxe-detail-meta-item">
                    <Icons.Star />
                    <span>{ratingSummary.average.toFixed(1)} ({ratingSummary.count} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="luxe-detail-actions">
                <LuxeButton
                  variant={saved ? 'primary' : 'secondary'}
                  icon={<Icons.Heart />}
                  onClick={() => setSaved(!saved)}
                >
                  {saved ? 'Saved' : 'Save'}
                </LuxeButton>
                <LuxeButton variant="ghost" icon={<Icons.Share />}>
                  Share
                </LuxeButton>
              </div>
            </div>

            {/* Tabs */}
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
              <div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>
                  About this Destination
                </h3>
                <p style={{ color: 'var(--gray-300)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                  {directory.description || 'This sacred site offers visitors a unique blend of spiritual significance and cultural heritage. The architecture and atmosphere provide an enriching experience for all who visit.'}
                </p>
                <p style={{ color: 'var(--gray-400)', lineHeight: 1.8 }}>
                  Located in the heart of Medan, this religious landmark stands as a testament to the city's rich spiritual heritage.
                  Visitors can explore the stunning architecture, learn about the history and significance of the site,
                  and experience the peaceful atmosphere that draws pilgrims and tourists alike.
                </p>

                {/* Rating Summary */}
                <div style={{ marginTop: 'var(--space-10)' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-6)' }}>
                    Ratings
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-8)' }}>
                    <div className="luxe-glass" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
                      <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, color: 'var(--gold-400)', marginBottom: 'var(--space-2)' }}>
                        {ratingSummary.average.toFixed(1)}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: 'var(--space-2)' }}>
                        {[1, 2, 3, 4, 5].map(i => (
                          <span key={i} style={{ color: i <= Math.round(ratingSummary.average) ? 'var(--gold-400)' : 'rgba(255,255,255,0.2)', width: '20px', height: '20px' }}>
                            <Icons.Star />
                          </span>
                        ))}
                      </div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>{ratingSummary.count} reviews</div>
                    </div>
                    <div>
                      <RatingBar label="Guide" value={ratingSummary.guide} />
                      <RatingBar label="Transportation" value={ratingSummary.transportation} />
                      <RatingBar label="Value for Money" value={ratingSummary.value} />
                      <RatingBar label="Safety" value={ratingSummary.safety} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--white)' }}>
                    Reviews
                  </h3>
                  <LuxeButton variant="primary" onClick={() => setShowReviewModal(true)}>
                    Write a Review
                  </LuxeButton>
                </div>
                {sampleReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-6)' }}>
                  Gallery
                </h3>
                <div className="luxe-grid luxe-grid--3">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="luxe-card luxe-card--hover" style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                      <img
                        src={directory.main_image_url || 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80'}
                        alt={`Gallery ${i}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Modal */}
      <LuxeModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Write a Review"
        size="md"
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <p style={{ color: 'var(--gray-400)', marginBottom: 'var(--space-4)' }}>
            Share your experience at <span style={{ color: 'var(--gold-400)', fontWeight: 600 }}>{directory.name}</span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <button
                key={i}
                onClick={() => setReviewForm(f => ({ ...f, rating: i }))}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: i <= reviewForm.rating ? 'var(--gold-400)' : 'rgba(255,255,255,0.2)',
                  fontSize: '32px',
                  transition: 'transform 0.2s ease'
                }}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <LuxeInput
          label="Your Name"
          value={reviewForm.name}
          onChange={(e) => setReviewForm(f => ({ ...f, name: e.target.value }))}
        />
        <LuxeTextarea
          label="Your Review"
          value={reviewForm.text}
          onChange={(e) => setReviewForm(f => ({ ...f, text: e.target.value }))}
          rows={4}
        />
        <LuxeButton
          variant="primary"
          fullWidth
          onClick={() => setShowReviewModal(false)}
          style={{ marginTop: 'var(--space-4)' }}
        >
          Submit Review
        </LuxeButton>
      </LuxeModal>

      <LuxeFooter />
    </div>
  );
};

export default DirectoryDetailPage;