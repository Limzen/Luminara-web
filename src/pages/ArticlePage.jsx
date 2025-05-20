import React from 'react';
import { useParams } from 'react-router-dom';
import { articles } from '../data/dummyData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/articlepage.css';

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find(a => String(a.id) === String(id));

  // Dummy content for sections (replace with real data as needed)
  const mosqueInfo = {
    name: 'Al-Mashun Grand Mosque (Masjid Raya Al-Mashun)',
    location: 'Sisingamangaraja Street, Medan, North Sumatra, Indonesia',
    built: '1906–1909',
    style: 'Moorish, Middle Eastern, And Indian',
    open: 'Yes (Outside Prayer Hours, Dress Modestly)',
  };

  if (!article) {
    return (
      <div className="articlepage">
        <Navbar />
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', color: '#a36a2e' }}>Article Not Found</h1>
          <p style={{ color: '#555', marginTop: '1rem' }}>Sorry, the article you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="articlepage">
      <Navbar />
      <h1 className="articlepage-title">{article.title}</h1>

      {/* Full-width image */}
      <div className="articlepage-hero-image">
        <img src={article.image} alt={article.title} className="articlepage-main-image" />
      </div>
      {/* Centered content */}
      <div className="article-detail-container">
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0' }}>Al-Mashun Grand Mosque</h2>
        <p style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          Located In The Heart Of Medan, Al-Mashun Grand Mosque Is One Of The Most Iconic Religious And Historical Landmarks In North Sumatra. Built In 1906 And Completed In 1909, This Mosque Is Not Only A Place Of Worship But Also A Symbol Of Cultural Heritage And Architectural Brilliance That Continues To Attract Both Worshippers And Tourists From Around The World.
        </p>
        <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0' }}>Architectural Beauty</h3>
        <p style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          The Mosque's Unique Architecture Is A Fusion Of Middle Eastern, Indian, And Spanish Styles. Designed By Dutch Architect Theodor Van Erp, The Structure Stands Out With Its Grand Black Domes, Elegant Marble Floors, And Stained Glass Windows. The Building's Symmetrical Design And Intricate Ornaments Reflect The Grandeur Of The Deli Sultanate, Under Whose Commission The Mosque Was Constructed.
        </p>
        <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0' }}>Tourist Attraction</h3>
        <p style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          In Addition To Its Religious Functions, The Mosque Serves As A Popular Tourist Destination. Visitors Are Welcome To Explore The Mosque's Architecture, Learn About Its History, And Experience The Spiritual Atmosphere. Proper Dress And Respectful Behavior Are Required When Entering The Mosque, And Guided Tours Are Sometimes Available To Provide Deeper Insight Into Its Background.
        </p>
        <h3 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '1.5rem 0 0.5rem 0' }}>Quick Info:</h3>
        <ul style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7, paddingLeft: 20 }}>
          <li><b>Name:</b> {mosqueInfo.name}</li>
          <li><b>Location:</b> {mosqueInfo.location}</li>
          <li><b>Built:</b> {mosqueInfo.built}</li>
          <li><b>Architectural Style:</b> {mosqueInfo.style}</li>
          <li><b>Open To Tourists:</b> {mosqueInfo.open}</li>
        </ul>
        <p style={{ color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          Whether You Are Seeking A Deeper Spiritual Connection Or Simply Wish To Admire One Of Medan's Most Beautiful Landmarks, Al-Mashun Grand Mosque Is A Must-Visit Destination.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage; 