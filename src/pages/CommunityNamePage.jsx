import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  MessageCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

// Sample posts
const samplePosts = [
  {
    id: 1,
    author: { name: 'Ahmad Rahman', avatar: '' },
    content: 'Hari ini mengunjungi Masjid Raya Al Mashun. Subhanallah, arsitekturnya sangat menakjubkan! 🕌',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    author: { name: 'Sarah Chen', avatar: '' },
    content: 'Ada yang mau join tour ke Vihara Maitreya weekend ini? Planning untuk pergi pagi jam 8. 🙏',
    timestamp: '5 hours ago',
    likes: 15,
    comments: 12,
  },
  {
    id: 3,
    author: { name: 'Michael Sirait', avatar: '' },
    content: 'Sharing foto-foto dari kunjungan ke Gereja HKBP kemarin. Arsitektur kolonialnya masih sangat terawat.',
    timestamp: '1 day ago',
    likes: 42,
    comments: 6,
  },
];

// Post Card
const PostCard = ({ post }) => (
  <div className="luxe-glass" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-4)' }}>
    <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
      <img
        src={post.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=d4a855&color=0a0f1c&size=40`}
        alt={post.author.name}
        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
      />
      <div>
        <div style={{ fontWeight: 600, color: 'var(--white)' }}>{post.author.name}</div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>{post.timestamp}</div>
      </div>
    </div>
    <p style={{ color: 'var(--gray-300)', lineHeight: 1.7, marginBottom: 'var(--space-4)' }}>
      {post.content}
    </p>
    <div style={{ display: 'flex', gap: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>
      <span>❤️ {post.likes} likes</span>
      <span>💬 {post.comments} comments</span>
    </div>
  </div>
);

const CommunityNamePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [community, setCommunity] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    setTimeout(() => {
      setCommunity({
        id,
        name: 'Medan Spiritual Travelers',
        description: 'A community of spiritual seekers exploring sacred sites across Medan together. Share experiences, plan trips, and connect with fellow travelers.',
        members_count: 234,
        posts_count: 89,
        is_member: true,
        cover_image: '/images/community-cover.jpg'
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

  if (!community) {
    return (
      <div className="luxe-page">
        <LuxeNavbar />
        <section className="luxe-section" style={{ paddingTop: '140px' }}>
          <div className="luxe-container">
            <div className="luxe-empty">
              <h3 className="luxe-empty__title">Community not found</h3>
              <Link to="/community">
                <LuxeButton variant="primary">Browse Communities</LuxeButton>
              </Link>
            </div>
          </div>
        </section>
        <LuxeFooter />
      </div>
    );
  }

  const tabs = [
    { id: 'posts', label: 'Posts' },
    { id: 'members', label: 'Members' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="luxe-page">
      <LuxeNavbar />

      {/* Cover */}
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, var(--navy-800), var(--navy-700))',
        marginTop: '80px'
      }} />

      <section className="luxe-section" style={{ paddingTop: 0, marginTop: '-60px' }}>
        <div className="luxe-container" style={{ maxWidth: '900px' }}>
          {/* Back Link */}
          <Link to="/community" className="luxe-back-link">
            <Icons.ArrowLeft /> Back to Communities
          </Link>

          <div className="luxe-detail-card">
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-6)',
              paddingBottom: 'var(--space-6)',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 700,
                  color: 'var(--white)',
                  marginBottom: 'var(--space-2)'
                }}>
                  {community.name}
                </h1>
                <div style={{ display: 'flex', gap: 'var(--space-4)', color: 'var(--gray-400)', fontSize: 'var(--text-sm)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <Icons.Users /> {community.members_count} members
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <Icons.MessageCircle /> {community.posts_count} posts
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {community.is_member ? (
                  <>
                    <LuxeButton variant="secondary" size="sm">Leave Group</LuxeButton>
                    <LuxeButton variant="ghost" size="sm" icon={<Icons.Settings />} />
                  </>
                ) : (
                  <LuxeButton variant="primary">Join Group</LuxeButton>
                )}
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
            {activeTab === 'posts' && (
              <div>
                {/* New Post */}
                {community.is_member && (
                  <div className="luxe-glass" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    <textarea
                      placeholder="Share something with the community..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-3)',
                        color: 'var(--white)',
                        resize: 'vertical',
                        marginBottom: 'var(--space-3)'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <LuxeButton variant="primary" size="sm" icon={<Icons.Send />}>
                        Post
                      </LuxeButton>
                    </div>
                  </div>
                )}

                {/* Posts */}
                {samplePosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {activeTab === 'members' && (
              <div className="luxe-grid luxe-grid--3" style={{ gap: 'var(--space-4)' }}>
                {['Ahmad Rahman', 'Sarah Chen', 'Michael Sirait', 'Dewi Lestari', 'Budi Santoso', 'Lisa Wong'].map((name, i) => (
                  <div key={i} className="luxe-glass" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=d4a855&color=0a0f1c&size=60`}
                      alt={name}
                      style={{ width: '60px', height: '60px', borderRadius: '50%', margin: '0 auto var(--space-3)' }}
                    />
                    <div style={{ fontWeight: 600, color: 'var(--white)' }}>{name}</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)' }}>Member</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--white)', marginBottom: 'var(--space-4)' }}>
                  About this Community
                </h3>
                <p style={{ color: 'var(--gray-300)', lineHeight: 1.8 }}>
                  {community.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <LuxeFooter />
    </div>
  );
};

export default CommunityNamePage;
