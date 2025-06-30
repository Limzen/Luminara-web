import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCommunityById } from '../services/communityService';
import '../styles/communityname.css';
import ReactMarkdown from 'react-markdown';

const CommunityNamePage = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCommunityById(id)
      .then(setCommunity)
      .catch(() => setError('Community not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="communitypage">
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', color: '#a36a2e' }}>Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="communitypage">
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', color: '#a36a2e' }}>Community Not Found</h1>
          <p style={{ color: '#555', marginTop: '1rem' }}>Sorry, the community you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="communitypage">
      <Navbar />
      {/* Join Group Button */}
      <div style={{ textAlign: 'right', padding: '1rem 1.5rem', marginTop: '20px' }}>
        <Link to={`/joingroup/${id}`} className="join-group-button">
          Join Group &#8250;
        </Link>
      </div>

      <h1 className="communitypage-title">{community.name}</h1>

      {/* Full-width image */}
      <div className="communitypage-hero-image">
        <img src={community.logo_url} alt={community.name} className="communitypage-main-image" />
      </div>
      {/* Centered content */}
      <div className="community-detail-container">
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0' }}>{community.lokasi_kegiatan}</h2>
        <div style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          <ReactMarkdown>{community.description}</ReactMarkdown>
        </div>
        <p><b>Agama:</b> {community.agama}</p>
        <p><b>Jenis Kegiatan:</b> {community.jenis_kegiatan}</p>
        <p><b>Email:</b> {community.email_address}</p>
        <p><b>Phone:</b> {community.phone_number}</p>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityNamePage;
