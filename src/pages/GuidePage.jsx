import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { guideService } from '../services/guideService';
import '../styles/GuidePage.css';

const GuidePage = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch guides from API
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await guideService.getAllGuides();
        if (response.status === 200 && response.data) {
          setGuides(response.data);
        } else {
          throw new Error('Failed to fetch guides');
        }
      } catch (err) {
        console.error('Error fetching guides:', err);
        setError('Failed to load guides. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="guide-page">
      <Navbar />
      <div className="guide-header-image">
        <img src="/images/guide_header.png" alt="Guide Header" />
      </div>

      {/* Error Message */}
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: '#e74c3c',
          backgroundColor: '#fdf2f2',
          margin: '1rem',
          borderRadius: '8px'
        }}>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: '#666'
        }}>
          Loading guides...
        </div>
      )}

      {/* Guides Container */}
      {!loading && !error && (
        <>
          <div className="guide-cards-container">
            {guides.map((guide) => (
              <div className="guide-card" key={guide.id}>
                <img 
                  className="guide-card-img" 
                  src={guide.image_url || '/images/masjid-almashun.jpg'} 
                  alt={guide.name} 
                />
                <h2 className="guide-card-title">{guide.name}</h2>
                <p className="guide-card-desc">{guide.short_desc}</p>
                <button 
                  className="guide-card-btn" 
                  onClick={() => navigate(`/guide/${guide.id}`)}
                >
                  See Details →
                </button>
              </div>
            ))}
          </div>

          {/* No guides message */}
          {guides.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#666'
            }}>
              No guides available at the moment.
            </div>
          )}

          {/* Pagination */}
          {guides.length > 0 && (
            <div className="guide-pagination">
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default GuidePage; 