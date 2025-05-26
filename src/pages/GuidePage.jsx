import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../styles/GuidePage.css';

const guides = Array(6).fill({
  image: '/images/masjid-almashun.jpg',
  title: 'Al-Mashun Grand Mosque',
  description: `Al Mashun Grand Mosque Is One Of Medan's Most Iconic Religious Landmarks. Built Between 1906 And 1909 The Mosque Showcases A Stunning Blend Of Middle Eastern.`
});

const GuidePage = () => {
  const navigate = useNavigate();
  return (
    <div className="guide-page">
      <Navbar />
      <div className="guide-header-image">
        <img src="/images/guide-header.png" alt="Guide Header" />
      </div>
      <div className="guide-cards-container">
        {guides.map((guide, idx) => (
          <div className="guide-card" key={idx}>
            <img className="guide-card-img" src={guide.image} alt={guide.title} />
            <h2 className="guide-card-title">{guide.title}</h2>
            <p className="guide-card-desc">{guide.description}</p>
            <button className="guide-card-btn" onClick={() => navigate(`/guide/${idx+1}`)}>See Details →</button>
          </div>
        ))}
      </div>
      <div className="guide-pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
      </div>
      <Footer />
    </div>
  );
};

export default GuidePage; 