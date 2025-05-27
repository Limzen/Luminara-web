import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { tours } from '../data/dummyData';

// Dummy reviews data
const reviews = [
  {
    id: 1,
    name: 'Sarah Jaya',
    avatar: '/images/user1.jpg',
    date: '2 October 2025',
    rating: 4,
    title: 'Good Tour, Really Well Organised',
    text: 'The tour was very well organised. One minus is that you get completely bombarded with information. You also have to stand up for too long at the private entrance to the Tower of London, which leads to a lack of time later. Lunch was the same, too stress, the quality was great but you couldnt enjoy it. Id like to ask the organisers: please',
    verified: true,
  },
  {
    id: 2,
    name: 'Haris Anwar',
    avatar: '/images/user2.jpg',
    date: '2 October 2012',
    rating: 4,
    title: 'Good Tour, Really Well Organised',
    text: 'The tour was very well organised. One minus is that you get completely bombarded with information. You also have to stand up for too long at the private entrance to the Tower of London, which leads to a lack of time later. Lunch was the same, too stress, the quality was great but you couldnt enjoy it. Id like to ask the organisers: please',
    verified: true,
  },
  {
    id: 3,
    name: 'Rafi Akbar',
    avatar: '/images/user3.jpg',
    date: '2 October 2012',
    rating: 4,
    title: 'Good Tour, Really Well Organised',
    text: 'The tour was very well organised. One minus is that you get completely bombarded with information. You also have to stand up for too long at the private entrance to the Tower of London, which leads to a lack of time later. Lunch was the same, too stress, the quality was great but you couldnt enjoy it. Id like to ask the organisers: please',
    verified: true,
  },
  {
    id: 4,
    name: 'Arlene McCoy',
    avatar: '/images/user4.jpg',
    date: '2 October 2012',
    rating: 4,
    title: 'Good Tour, Really Well Organised',
    text: 'The tour was very well organised. One minus is that you get completely bombarded with information. You also have to stand up for too long at the private entrance to the Tower of London, which leads to a lack of time later. Lunch was the same, too stress, the quality was great but you couldnt enjoy it. Id like to ask the organisers: please',
    verified: true,
  },
];

const ratingSummary = {
  average: 4.3,
  count: 854,
  guide: 4.8,
  transportation: 3.0,
  value: 4.5,
  safety: 4.0,
};

const sortOptions = [
  { label: 'Shortest by newest', value: 'newest' },
  { label: 'Highest rating', value: 'highest' },
];

const DirectoryDetailPage = () => {
  const { id } = useParams();
  const tour = tours.find(t => String(t.id) === String(id));
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, text: '', firstName: '', lastName: '' });
  const [sort, setSort] = useState('newest');

  if (!tour) return <div><Navbar /><div style={{padding: '2rem'}}>Not found</div><Footer /></div>;

  return (
    <div className="directoryPage">
      <Navbar />
      <div className="detail-container" style={{maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem 0 1rem'}}>
        <div className="detail-main" style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem'}}>
          <img src={tour.image} alt={tour.name} className="detail-image" style={{width: 400, height: 250, objectFit: 'cover', borderRadius: '1rem'}} />
          <div className="detail-info" style={{flex: 1, minWidth: 300}}>
            <h1 className="detail-title" style={{fontSize: '2rem', fontWeight: 600, marginBottom: 8, color: '#222'}}>{tour.name}</h1>
            <div className="detail-meta" style={{display: 'flex', gap: 24, color: '#888', fontSize: 15, marginBottom: 8}}>
              <span><i className="fa fa-map-marker" />Jl. Sakura III, Taman Sakura Indah, Medan Tuntungan</span>
              <span><i className="fa fa-clock-o" />{tour.time}</span>
            </div>
            <div className="detail-desc" style={{marginBottom: 16, color: '#444'}}>
              {tour.description} <br />
              <span style={{color: '#888', fontSize: 14}}>
                Graha Maria Annai Velangkanni is a Catholic church and pilgrimage site in Medan, dedicated to Our Lady of Good Health, originally venerated in Velankanni, India. Built in Indo-Mughal architectural style, it stands out with its colorful, multi-tiered structure and intricate details. Open to all visitors, the site blends cultural and spiritual elements, making it a unique destination for both worship and admiration.
              </span>
            </div>
            <div className="detail-ratings" style={{display: 'flex', gap: 32, alignItems: 'flex-start'}}>
              <div className="detail-rating-summary" style={{minWidth: 180}}>
                <div style={{fontSize: 32, fontWeight: 600, color: '#A67C52'}}>{ratingSummary.average.toLocaleString('en-US', {minimumFractionDigits: 1})}</div>
                <span style={{color: '#888', fontWeight: 500, fontSize: 18}}>{ratingSummary.count} Reviews</span>
                <div style={{margin: '8px 0'}}>
                  {[1,2,3,4,5].map(i => (
                    <span key={i} style={{color: i <= Math.round(ratingSummary.average) ? '#E2A300' : '#e5dbce', fontSize: 28}}>&#9733;</span>
                  ))}
                </div>
              </div>
              <div className="detail-rating-bars" style={{flex: 1, minWidth: 180}}>
                {[['Guide', ratingSummary.guide], ['Transportation', ratingSummary.transportation], ['Value for money', ratingSummary.value], ['Safety', ratingSummary.safety]].map(([label, value]) => (
                  <div key={label} style={{marginBottom: 8}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 15, color: '#888'}}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div style={{background: '#e5dbce', borderRadius: 8, height: 8, marginTop: 2}}>
                      <div style={{width: `${(value/5)*100}%`, background: '#A67C52', height: 8, borderRadius: 8}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="write-review-btn" style={{marginTop: 24, background: '#A67C52', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer'}} onClick={() => setShowReviewModal(true)}>Write a review</button>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="detail-reviews" style={{marginTop: 48}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
            <div style={{fontWeight: 600, fontSize: 18}}>Reviews</div>
            <div>
              <select
                className="review-sort-select"
                style={{background: '#F3ECE4', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 500, color: '#222', fontSize: 15, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)', cursor: 'pointer'}}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="review-list">
            {reviews.map(r => (
              <div key={r.id} className="review-item" style={{display: 'flex', gap: 24, alignItems: 'flex-start', borderBottom: '1px solid #e5dbce', padding: '24px 0'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90}}>
                  <img src={r.avatar} alt={r.name} style={{width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginBottom: 8}} />
                  <div style={{color: '#A67C52', fontWeight: 600, fontSize: 15}}>{r.rating} <span style={{color: '#E2A300', fontSize: 18}}>&#9733;</span></div>
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2}}>
                    <span style={{fontWeight: 600, color: '#222'}}>{r.name}</span>
                    {r.verified && <span style={{color: '#4CAF50', fontSize: 16}} title="Verified">&#10003;</span>}
                  </div>
                  <div style={{color: '#888', fontSize: 14, marginBottom: 2}}>{r.date}</div>
                  <div style={{fontWeight: 600, fontSize: 16, marginBottom: 4}}>{r.title}</div>
                  <div style={{color: '#444', fontSize: 15}}>{r.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Review Modal */}
      {showReviewModal && (
        <div className="review-modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="review-modal" style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18)',
            padding: '2.5rem 3rem 2.5rem 2.5rem',
            width: 480,
            maxWidth: '95vw',
            position: 'relative'
          }}>
            <button onClick={() => setShowReviewModal(false)} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer'}}>&times;</button>
            <div style={{textAlign: 'center', marginBottom: 18}}>
              <div style={{fontWeight: 600, fontSize: 22, color: '#222', marginBottom: 2}}>Leave Your Impression for</div>
              <div style={{fontWeight: 700, fontSize: 22, color: '#A67C52', marginBottom: 8}}>{tour.name}</div>
              <div style={{color: '#444', fontSize: 16, marginBottom: 18}}>Tell us what you think.</div>
              <div style={{marginBottom: 18}}>
                {[1,2,3,4,5].map(i => (
                  <span
                    key={i}
                    style={{fontSize: 38, color: i <= reviewForm.rating ? '#E2A300' : '#e5dbce', cursor: 'pointer', margin: '0 4px'}}
                    onClick={() => setReviewForm(f => ({ ...f, rating: i }))}
                  >&#9733;</span>
                ))}
              </div>
            </div>
            <form onSubmit={e => { e.preventDefault(); setShowReviewModal(false); }}>
              <textarea
                className="review-modal-textarea"
                style={{width: '100%', minHeight: 90, borderRadius: 8, border: 'none', background: '#F3ECE4', padding: '1rem', fontSize: 16, marginBottom: 18, resize: 'vertical', color: '#222'}}
                placeholder="Write a review...."
                value={reviewForm.text}
                onChange={e => setReviewForm(f => ({ ...f, text: e.target.value }))}
                required
              />
              <div style={{display: 'flex', gap: 12, marginBottom: 18}}>
                <input
                  type="text"
                  className="review-modal-input"
                  style={{flex: 1, borderRadius: 8, border: 'none', background: '#F3ECE4', padding: '0.75rem 1rem', fontSize: 16, color: '#222'}}
                  placeholder="Enter your first name"
                  value={reviewForm.firstName}
                  onChange={e => setReviewForm(f => ({ ...f, firstName: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  className="review-modal-input"
                  style={{flex: 1, borderRadius: 8, border: 'none', background: '#F3ECE4', padding: '0.75rem 1rem', fontSize: 16, color: '#222'}}
                  placeholder="Enter your last name"
                  value={reviewForm.lastName}
                  onChange={e => setReviewForm(f => ({ ...f, lastName: e.target.value }))}
                  required
                />
              </div>
              <button
                type="submit"
                className="review-modal-submit"
                style={{width: '100%', background: '#A67C52', color: '#fff', border: 'none', borderRadius: 24, padding: '0.9rem 0', fontWeight: 600, fontSize: 18, marginBottom: 18, cursor: 'pointer'}}
              >
                Submit Review
              </button>
              <div style={{color: '#888', fontSize: 14, textAlign: 'left', marginTop: 8}}>
                All reviews on Cool Co. Reviews are verified within 48 hours before posting to ensure authenticity and accuracy.
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DirectoryDetailPage; 