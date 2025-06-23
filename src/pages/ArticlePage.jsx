import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { articleService } from '../services/articleService';
import '../styles/GuideDetailPage.css';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch article from API
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await articleService.getArticleById(id);
        if (response.status === 200 && response.data) {
          setArticle(response.data);
        } else {
          throw new Error('Failed to fetch article');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="guide-detail-page">
        <Navbar />
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#666'
        }}>
          Loading article...
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="guide-detail-page">
        <Navbar />
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#e74c3c',
          backgroundColor: '#fdf2f2',
          margin: '1rem',
          borderRadius: '8px'
        }}>
          {error}
        </div>
        <Footer />
      </div>
    );
  }

  // Article not found
  if (!article) {
    return (
      <div className="guide-detail-page">
        <Navbar />
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem'
        }}>
          <h2>Article not found</h2>
          <p>The article you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="guide-detail-page">
      <Navbar />
      <div className="guide-detail-content">
        <h1 className="guide-detail-title">{article.name}</h1>
        
        <div className="guide-detail-image-wrapper">
          <img 
            src={article.image_url || '/images/masjid-almashun.jpg'} 
            alt={article.name} 
            className="guide-detail-image" 
          />
        </div>
        
        {/* Short description */}
        {article.short_desc && (
          <section className="guide-detail-section">
            <h2>Overview</h2>
            <p>{article.short_desc}</p>
          </section>
        )}

        {/* Full description with markdown support */}
        {article.full_desc && (
          <section className="guide-detail-section">
            <h2>Detailed Information</h2>
            <div>
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 style={{ fontWeight: 700, fontSize: '1.8rem', margin: '1.5rem 0 0.5rem 0', color: '#a36a2e' }}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0', color: '#a36a2e' }}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0', color: '#a36a2e' }}>
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p style={{ marginBottom: '1rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7, paddingLeft: 20 }}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7, paddingLeft: 20 }}>
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li style={{ marginBottom: '0.5rem' }}>
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong style={{ fontWeight: 700, color: '#a36a2e' }}>
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em style={{ fontStyle: 'italic', color: '#666' }}>
                      {children}
                    </em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote style={{ 
                      borderLeft: '4px solid #a36a2e', 
                      paddingLeft: '1rem', 
                      margin: '1.5rem 0', 
                      fontStyle: 'italic',
                      color: '#666',
                      backgroundColor: '#f9f6f2',
                      padding: '1rem',
                      borderRadius: '4px'
                    }}>
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code style={{ 
                      backgroundColor: '#f4f4f4', 
                      padding: '0.2rem 0.4rem', 
                      borderRadius: '3px',
                      fontFamily: 'monospace',
                      fontSize: '0.9em'
                    }}>
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre style={{ 
                      backgroundColor: '#f4f4f4', 
                      padding: '1rem', 
                      borderRadius: '8px',
                      overflow: 'auto',
                      margin: '1rem 0'
                    }}>
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      style={{ 
                        color: '#a36a2e', 
                        textDecoration: 'underline',
                        fontWeight: 500
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {article.full_desc}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Default content if no full_desc is provided */}
        {!article.full_desc && (
          <>
            <section className="guide-detail-section">
              <h2>Historical Background</h2>
              <p>
                This religious site holds significant cultural and spiritual importance in the region. 
                Visitors can experience the rich heritage and architectural beauty that reflects the 
                diverse religious traditions of the area.
              </p>
            </section>
            <section className="guide-detail-section">
              <h2>Architectural Beauty</h2>
              <p>
                The site showcases unique architectural elements that blend various cultural influences, 
                creating a stunning visual experience for visitors. The design reflects the historical 
                and cultural significance of the location.
              </p>
            </section>
            <section className="guide-detail-section">
              <h2>Tourist Attraction</h2>
              <p>
                In addition to its religious functions, this site serves as a popular tourist destination. 
                Visitors are welcome to explore the architecture, learn about its history, and experience 
                the spiritual atmosphere. Proper dress and respectful behavior are required when visiting.
              </p>
            </section>
          </>
        )}

        {/* Quick Info section */}
        <section className="guide-detail-section">
          <h2>Quick Information</h2>
          <ul className="guide-detail-list">
            <li><b>Name:</b> {article.name}</li>
            <li><b>Type:</b> Religious Site</li>
            <li><b>Description:</b> {article.short_desc || 'A significant religious and cultural landmark'}</li>
            {article.full_desc && <li><b>Full Description:</b> Available above</li>}
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage; 