import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/GuideDetailPage.css';

const GuideDetailPage = () => (
  <div className="guide-detail-page">
    <Navbar />
    <div className="guide-detail-content">
      <h1 className="guide-detail-title">History & Ethics</h1>
      <div className="guide-detail-image-wrapper">
        <img src="/images/masjid-almashun.jpg" alt="Al-Mashun Grand Mosque" className="guide-detail-image" />
      </div>
      <section className="guide-detail-section">
        <h2>Historical Background Of Al-Mashun Grand Mosque</h2>
        <p>
          Al-Mashun Grand Mosque, Also Known As Masjid Raya Al-Mashun, Is One Of The Oldest And Most Historically Significant Mosques In Indonesia. Construction Began In 1906 Under The Reign Of Sultan Ma'mun Al Rashid Perkasa Alam, The Sultan Of Deli, And Was Completed In 1909. Originally, The Mosque Was Part Of The Royal Palace Complex And Was Built To Reflect The Grandeur And Devotion Of The Sultanate.<br /><br />
          The Mosque Was Designed By A Dutch Architect, Theodor Van Erp, And Showcases A Unique Blend Of Moorish, Middle Eastern, And Indian Architectural Styles. High-Quality Materials Were Imported From Abroad—Such As Italian Marble, French Stained Glass, And German Ceramic Tiles—Demonstrating The Sultan's Commitment To Excellence.
        </p>
      </section>
      <section className="guide-detail-section">
        <h2>Etiquette When Visiting Al-Mashun Grand Mosque</h2>
        <ol className="guide-detail-list">
          <li><b>Dress Modestly</b><br />Both Men And Women Should Wear Modest Clothing. Women Are Encouraged To Wear A Headscarf, And Attire Should Cover Shoulders, Arms, And Legs.</li>
          <li><b>Remove Shoes</b><br />Shoes Must Be Removed Before Entering The Prayer Hall. Designated Areas Are Provided To Store Footwear.</li>
          <li><b>Silence And Respect</b><br />Maintain A Quiet And Respectful Demeanor. The Mosque Is An Active Place Of Worship, So Avoid Loud Conversations Or Phone Use.</li>
          <li><b>Follow Local Customs</b><br />Respect Any Specific Guidance Provided By Mosque Staff Or Signage. During Religious Events Or Prayer Times, Certain Areas May Be Restricted To Worshippers Only.</li>
          <li><b>Avoid Physical Contact</b><br />Physical Interaction Between Male And Female Visitors (Such As Handshakes Or Hugs) Should Be Avoided Inside The Mosque.</li>
        </ol>
      </section>
    </div>
    <Footer />
  </div>
);

export default GuideDetailPage; 