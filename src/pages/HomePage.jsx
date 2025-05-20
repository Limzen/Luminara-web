import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TourCard from '../components/TourCard';
import ArticleCard from '../components/ArticleCard';
import { tours, articles, about } from '../data/dummyData';
import '../styles/homepage.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import redMarkerIcon from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const CARDS_VISIBLE_DESKTOP = 3;
const CARDS_VISIBLE_MOBILE = 1;
const CARD_GAP = 32; // 2rem gap in px
const CARD_WIDTH_DESKTOP = 360; // px
const CARD_WIDTH_MOBILE = 280; // px

const redIcon = new L.Icon({
  iconUrl: redMarkerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  iconRetinaUrl: redMarkerIcon,
});

function useCarousel(itemsLength) {
  const [index, setIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(CARDS_VISIBLE_DESKTOP);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_DESKTOP);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setCardsVisible(CARDS_VISIBLE_MOBILE);
        setCardWidth(CARD_WIDTH_MOBILE);
      } else {
        setCardsVisible(CARDS_VISIBLE_DESKTOP);
        setCardWidth(CARD_WIDTH_DESKTOP);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canGoLeft = index > 0;
  const canGoRight = index < itemsLength - cardsVisible;

  const goLeft = () => {
    if (canGoLeft) setIndex(index - 1);
  };
  const goRight = () => {
    if (canGoRight) setIndex(index + 1);
  };

  return { index, cardsVisible, cardWidth, goLeft, goRight, canGoLeft, canGoRight };
}

const Carousel = ({ items, renderItem, carousel }) => {
  // Set viewport width to exactly fit the visible cards and gaps
  const viewportWidth = carousel.cardsVisible * carousel.cardWidth + (carousel.cardsVisible - 1) * CARD_GAP;
  // Calculate the translateX to center the visible cards
  const translateX = -(carousel.index * (carousel.cardWidth + CARD_GAP));

  return (
    <div className="carousel-wrapper">
      <button className="scroll-btn left" onClick={carousel.goLeft} disabled={!carousel.canGoLeft}>&lt;</button>
      <div
        className="carousel-viewport"
        style={{ width: viewportWidth, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div
          className="carousel-list"
          style={{
            width: items.length * carousel.cardWidth + (items.length - 1) * CARD_GAP,
            display: 'flex',
            gap: `${CARD_GAP}px`,
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)',
          }}
        >
          {items.map(renderItem)}
        </div>
      </div>
      <button className="scroll-btn right" onClick={carousel.goRight} disabled={!carousel.canGoRight}>&gt;</button>
    </div>
  );
};

const HomePage = () => {
  // Carousel logic for tours
  const tourCarousel = useCarousel(tours.length);
  // Carousel logic for articles
  const articleCarousel = useCarousel(articles.length);

  return (
    <div className="homepage">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h2 className="hero-subtitle">"Tracing The Path Of Spirituality In Medan City"</h2>
          <h1 className="hero-title">RELIGIOUS TOURISM IN MEDAN</h1>
          <p className="hero-desc">"Discover The Beauty Of History, Culture, And Spiritual Values Through Medan's Most Remarkable Religious Destinations."</p>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="popular-tours-section">
        <div className="section-header">
          <h2>Find Popular Tours</h2>
          <a href="#" className="see-all-link">See All..</a>
        </div>
        <Carousel
          items={tours}
          renderItem={(tour) => <TourCard key={tour.id} tour={tour} />}
          carousel={tourCarousel}
        />
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>{about.title}</h2>
          <p>{about.description}</p>
        </div>
        <div className="about-logo">
          <img src={about.logo} alt="Luminara Logo" />
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section">
        <h2>Artikel</h2>
        <Carousel
          items={articles}
          renderItem={(article) => <ArticleCard key={article.id} article={article} />}
          carousel={articleCarousel}
        />
      </section>

      {/* Tour Map Section */}
      <section className="tour-map-section">
        <h2>Tour Map</h2>
        <p className="tour-map-desc">Discover Top Religious Tourism Spots In Medan With Our Interactive Tour Map.</p>
        <div style={{ padding: '0 2vw' }}>
          <div className="tour-map-placeholder" style={{ height: 500, width: '100%', borderRadius: 16, overflow: 'hidden' }}>
            <MapContainer center={[3.5952, 98.6722]} zoom={12} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={[3.5952, 98.6722]} icon={redIcon}>
                <Popup>
                  Medan City
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>LUMINARA</h3>
            <p style={{ color: '#fff', fontWeight: 'normal', fontSize: '1rem' }}>Luminara is a passionate and creative team of university students committed to developing digital solutions for the tourism sector. We believe that technology can bridge culture, spirituality, and meaningful travel experiences.</p>
          </div>
          <div className="footer-links">
            <h4>HOME</h4>
            <ul>
              <li>Direktori</li>
              <li>Itinerary</li>
              <li>Guide</li>
              <li>Chatbot</li>
            </ul>
          </div>
          <div className="footer-user-links">
            <h4>FOR USERS</h4>
            <ul>
              <li>Community</li>
              <li>Account</li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>SOCIAL MEDIA</h4>
            <ul>
              <li>1234567890</li>
              <li>luminaraagg@gmail.com</li>
              <li>Lorem Ipsum Has Been Ipsum</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Lorem Ipsum Has Been The Industry's Standard Dummy</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 