import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { guideService } from '../services/guideService';
import '../styles/GuideDetailPage.css';

const GuideDetailPage = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch guide from API
  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await guideService.getGuideById(id);
        if (response.status === 200 && response.data) {
          setGuide(response.data);
        } else {
          throw new Error('Failed to fetch guide');
        }
      } catch (err) {
        console.error('Error fetching guide:', err);
        setError('Failed to load guide. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGuide();
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
          Loading guide details...
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

  // Guide not found
  if (!guide) {
    return (
      <div className="guide-detail-page">
        <Navbar />
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem'
        }}>
          <h2>Guide not found</h2>
          <p>The guide you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="guide-detail-page">
      <Navbar />
      <div className="guide-detail-content">
        <h1 className="guide-detail-title">{guide.name}</h1>
        <div className="guide-detail-image-wrapper">
          <img 
            src={guide.image_url || '/images/masjid-almashun.jpg'} 
            alt={guide.name} 
            className="guide-detail-image" 
          />
        </div>
        
        {/* Short description */}
        {guide.short_desc && (
          <section className="guide-detail-section">
            <h2>Overview</h2>
            <p>{guide.short_desc}</p>
          </section>
        )}

        {/* Full description with markdown support */}
        {guide.full_desc && (
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
                {guide.full_desc}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {/* Default content if no full_desc is provided */}
        {!guide.full_desc && (
          <>
            <section className="guide-detail-section">
              <h2>Historical Background</h2>
              <p>
                This religious site holds significant historical and cultural importance in the region. 
                The architecture and design reflect the rich heritage and spiritual traditions that have 
                been preserved and celebrated throughout the years. Visitors can experience the deep 
                connection between faith, culture, and community that this site represents.
              </p>
            </section>
            <section className="guide-detail-section">
              <h2>Etiquette When Visiting</h2>
              <ol className="guide-detail-list">
                <li><b>Dress Modestly</b><br />Both men and women should wear modest clothing. Women are encouraged to wear appropriate head coverings, and attire should cover shoulders, arms, and legs.</li>
                <li><b>Remove Shoes</b><br />Shoes must be removed before entering the main areas. Designated areas are provided to store footwear.</li>
                <li><b>Silence and Respect</b><br />Maintain a quiet and respectful demeanor. This is an active place of worship, so avoid loud conversations or phone use.</li>
                <li><b>Follow Local Customs</b><br />Respect any specific guidance provided by staff or signage. During religious events or prayer times, certain areas may be restricted to worshippers only.</li>
                <li><b>Avoid Physical Contact</b><br />Physical interaction between male and female visitors (such as handshakes or hugs) should be avoided inside the sacred areas.</li>
              </ol>
            </section>
          </>
        )}

        {/* Quick Info section */}
        <section className="guide-detail-section">
          <h2>Quick Information</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><b>Name:</b> {guide.name}</li>
            <li style={{ marginBottom: '0.5rem' }}><b>Type:</b> Religious Guide</li>
            <li style={{ marginBottom: '0.5rem' }}><b>Description:</b> {guide.short_desc || 'A comprehensive guide to this religious site'}</li>
            {guide.full_desc && <li style={{ marginBottom: '0.5rem' }}><b>Full Guide:</b> Available above</li>}
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default GuideDetailPage; 