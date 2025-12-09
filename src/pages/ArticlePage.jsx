import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { LuxeNavbar, LuxeFooter, LuxeButton } from '../components/luxe/LuxeComponents';
import { articleService } from '../services/articleService';
import '../styles/luxe-pages.css';

// Icons
const Icons = {
  ArrowLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
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
  Bookmark: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

// Custom markdown components for dark theme
const markdownComponents = {
  h1: ({ children }) => (
    <h1 style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-3xl)',
      margin: 'var(--space-8) 0 var(--space-4) 0',
      color: 'var(--gold-400)'
    }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      margin: 'var(--space-8) 0 var(--space-4) 0',
      color: 'var(--gold-400)'
    }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-xl)',
      margin: 'var(--space-6) 0 var(--space-3) 0',
      color: 'var(--white)'
    }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{
      marginBottom: 'var(--space-4)',
      color: 'var(--gray-300)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.8
    }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul style={{
      marginBottom: 'var(--space-6)',
      color: 'var(--gray-300)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.8,
      paddingLeft: 'var(--space-6)'
    }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{
      marginBottom: 'var(--space-6)',
      color: 'var(--gray-300)',
      fontSize: 'var(--text-base)',
      lineHeight: 1.8,
      paddingLeft: 'var(--space-6)'
    }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: 'var(--space-2)' }}>
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 700, color: 'var(--gold-400)' }}>
      {children}
    </strong>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: '4px solid var(--gold-400)',
      paddingLeft: 'var(--space-4)',
      margin: 'var(--space-6) 0',
      fontStyle: 'italic',
      color: 'var(--gray-400)',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      padding: 'var(--space-4) var(--space-5)',
      borderRadius: 'var(--radius-lg)'
    }}>
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      style={{
        color: 'var(--gold-400)',
        textDecoration: 'underline',
        fontWeight: 500
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '0.2rem 0.4rem',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'monospace',
      fontSize: '0.9em',
      color: 'var(--gold-300)'
    }}>
      {children}
    </code>
  ),
};

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await articleService.getArticleById(id);
        if (response.status === 200 && response.data) {
          setArticle(response.data);
        } else {
          throw new Error('Not found');
        }
      } catch (err) {
        setError('Failed to load article.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArticle();
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
  if (error || !article) {
    return (
      <div className="luxe-page">
        <LuxeNavbar />
        <section className="luxe-section" style={{ paddingTop: '140px' }}>
          <div className="luxe-container">
            <div className="luxe-empty">
              <h3 className="luxe-empty__title">{error || 'Article not found'}</h3>
              <p className="luxe-empty__desc">The article you're looking for doesn't exist.</p>
              <Link to="/">
                <LuxeButton variant="primary" style={{ marginTop: 'var(--space-4)' }}>
                  Back to Home
                </LuxeButton>
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

      {/* Hero Image */}
      <div className="luxe-detail-hero">
        <img
          src={article.image_url || 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80'}
          alt={article.name}
          className="luxe-detail-hero__img"
        />
        <div className="luxe-detail-hero__overlay"></div>
      </div>

      {/* Article Content */}
      <section className="luxe-detail-content">
        <div className="luxe-container" style={{ maxWidth: '900px' }}>
          {/* Back Button */}
          <Link
            to="/"
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
            <Icons.ArrowLeft /> Back to Home
          </Link>

          <article className="luxe-detail-card">
            {/* Article Header */}
            <header style={{ marginBottom: 'var(--space-8)' }}>
              <span className="luxe-section-label">Article</span>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-4xl)',
                fontWeight: 700,
                color: 'var(--white)',
                lineHeight: 1.2,
                marginBottom: 'var(--space-6)'
              }}>
                {article.name}
              </h1>

              {/* Meta Info */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'var(--space-6)',
                paddingBottom: 'var(--space-6)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div className="luxe-detail-meta-item">
                  <Icons.Calendar />
                  <span>Published {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="luxe-detail-meta-item">
                  <Icons.Clock />
                  <span>5 min read</span>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-3)' }}>
                  <LuxeButton
                    variant={saved ? 'primary' : 'ghost'}
                    size="sm"
                    icon={<Icons.Bookmark />}
                    onClick={() => setSaved(!saved)}
                  >
                    {saved ? 'Saved' : 'Save'}
                  </LuxeButton>
                  <LuxeButton variant="ghost" size="sm" icon={<Icons.Share />}>
                    Share
                  </LuxeButton>
                </div>
              </div>
            </header>

            {/* Short Description */}
            {article.short_desc && (
              <p style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--gray-300)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-8)',
                fontStyle: 'italic'
              }}>
                {article.short_desc}
              </p>
            )}

            {/* Full Content */}
            <div className="article-content">
              {article.full_desc ? (
                <ReactMarkdown components={markdownComponents}>
                  {article.full_desc}
                </ReactMarkdown>
              ) : (
                <>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: 'var(--gold-400)',
                    marginBottom: 'var(--space-4)'
                  }}>
                    Historical Background
                  </h2>
                  <p style={{ color: 'var(--gray-300)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                    This religious site holds significant cultural and spiritual importance in the region.
                    Visitors can experience the rich heritage and architectural beauty that reflects the
                    diverse religious traditions of the area.
                  </p>

                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: 'var(--gold-400)',
                    marginBottom: 'var(--space-4)'
                  }}>
                    Architectural Beauty
                  </h2>
                  <p style={{ color: 'var(--gray-300)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
                    The site showcases unique architectural elements that blend various cultural influences,
                    creating a stunning visual experience for visitors. The design reflects the historical
                    and cultural significance of the location.
                  </p>

                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: 'var(--gold-400)',
                    marginBottom: 'var(--space-4)'
                  }}>
                    Tourist Attraction
                  </h2>
                  <p style={{ color: 'var(--gray-300)', lineHeight: 1.8 }}>
                    In addition to its religious functions, this site serves as a popular tourist destination.
                    Visitors are welcome to explore the architecture, learn about its history, and experience
                    the spiritual atmosphere. Proper dress and respectful behavior are required when visiting.
                  </p>
                </>
              )}
            </div>

            {/* Quick Info Box */}
            <div className="luxe-glass" style={{
              padding: 'var(--space-6)',
              marginTop: 'var(--space-10)',
              borderLeft: '4px solid var(--gold-400)'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: 'var(--white)',
                marginBottom: 'var(--space-4)'
              }}>
                Quick Information
              </h3>
              <ul style={{ listStyle: 'none', color: 'var(--gray-400)' }}>
                <li style={{ marginBottom: 'var(--space-2)' }}>
                  <strong style={{ color: 'var(--gray-300)' }}>Name:</strong> {article.name}
                </li>
                <li style={{ marginBottom: 'var(--space-2)' }}>
                  <strong style={{ color: 'var(--gray-300)' }}>Type:</strong> Religious Site
                </li>
                <li>
                  <strong style={{ color: 'var(--gray-300)' }}>Description:</strong> {article.short_desc || 'A significant religious and cultural landmark'}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <LuxeFooter />
    </div>
  );
};

export default ArticlePage;