import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { communityData } from '../data/dummyData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/communityname.css';

const CommunityNamePage = () => {
  const { id } = useParams();
  const community = communityData.find(c => String(c.id) === String(id));

  if (!community) {
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

      <h1 className="communitypage-title">{community.title}</h1>

      {/* Full-width image */}
      <div className="communitypage-hero-image">
        <img src={community.image} alt={community.title} className="communitypage-main-image" />
      </div>
      {/* Centered content */}        
      <div className="community-detail-container">
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0' }}>Al-Mashun Grand Mosque: A Jewel of Medan’s Spiritual Heritage</h2>
        <p style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          Nestled in the heart of Medan, Al-Mashun Grand Mosque stands as a beacon of religious harmony and architectural beauty. Built in 1906 under the order of Sultan Ma'mun Al Rashid, this majestic mosque has become one of the most iconic symbols of Islamic culture in North Sumatra. The mosque features a unique blend of Moorish, Middle Eastern, and Indian architectural styles, with stunning black domes, intricate carvings, and imported materials from Europe and the Middle East. Its grandeur is a true reflection of the cultural richness and royal legacy of the Deli Sultanate.
        </p>

        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0' }}>A Center for Worship and Community Life</h2>
        <p style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          Beyond its architectural charm, Al-Mashun Grand Mosque is an active place of worship for Muslims in Medan. It hosts daily prayers, Friday sermons, and community religious events, especially during the holy month of Ramadan. Thousands gather here in spiritual unity, making it a vibrant center for Islamic devotion. Visitors are welcomed warmly, and with respect to mosque etiquette, tourists are encouraged to dress modestly, maintain silence, and explore the historical elements through guided tours or informational panels available inside.
        </p>

        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0' }}>Promoting Religious Tourism with Technology</h2>
        <p style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          Visiting Al-Mashun Grand Mosque is not only a chance to witness architectural splendor but also an opportunity to engage with local culture and spirituality in a respectful way. <span>As part of Luminara’s mission to enhance religious tourism through innovation, we are working on a digital platform that will provide:</span>
          <span>
            <li>Online reservation features for group visits</li>
            <li>Virtual and audio-guided tours</li>
            <li>Multilingual historical information</li>
            <li>Interactive maps and prayer schedules</li>
          </span>
          These features aim to elevate visitors’ experiences while preserving the sacredness and historical integrity of the mosque.
        </p>

        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', margin: '1.5rem 0 0.5rem 0' }}>Join Us in Celebrating Cultural Harmony</h2>
        <p style={{ marginBottom: '1.5rem', color: '#222', fontSize: '1.08rem', lineHeight: 1.7 }}>
          Through the Luminara initiative, we invite travelers, local communities, and stakeholders to support the sustainable development of religious tourism in Medan. Al-Mashun Grand Mosque is not just a destination—it is a bridge between faith, history, and culture. Through the Luminara initiative, we invite travelers, local communities, and stakeholders to support the sustainable development of religious tourism in Medan. Al-Mashun Grand Mosque is not just a destination—it is a bridge between faith, history, and culture.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityNamePage;
