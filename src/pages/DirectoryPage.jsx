import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuxeNavbar, LuxeFooter, LuxeButton, LuxeCardSkeleton } from '../components/luxe/LuxeComponents';
import { directoryService } from '../services/directoryService';
import '../styles/luxe-pages.css';

// Filter options
const categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Masjid', value: 'masjid' },
  { label: 'Vihara', value: 'vihara' },
  { label: 'Church', value: 'church' },
  { label: 'Temple', value: 'temple' },
];

const sortOptions = [
  { label: 'Most Popular', value: 'most' },
  { label: 'Least Popular', value: 'least' },
  { label: 'Newest', value: 'newest' },
];

// Icons
const Icons = {
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

// Worship type detection
const getWorshipType = (name) => {
  if (/masjid/i.test(name)) return 'masjid';
  if (/vihara/i.test(name)) return 'vihara';
  if (/gereja|church/i.test(name)) return 'church';
  if (/temple|kuil/i.test(name)) return 'temple';
  return 'other';
};

// Directory Card Component
const DirectoryCard = ({ directory, onClick }) => (
  <div className="luxe-dir-card" onClick={onClick}>
    <div className="luxe-dir-card__img">
      <img
        src={directory.main_image_url || 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&q=80'}
        alt={directory.name}
        loading="lazy"
      />
      <span className="luxe-dir-card__category">
        {getWorshipType(directory.name)}
      </span>
    </div>
    <div className="luxe-dir-card__body">
      <h3 className="luxe-dir-card__title">{directory.name}</h3>
      <div className="luxe-dir-card__meta">
        <div className="luxe-dir-card__rating">
          <Icons.Star />
          <span>{(directory.overall_rating || 0).toFixed(1)}</span>
        </div>
        <div className="luxe-dir-card__location">
          <Icons.MapPin />
          <span>{directory.address?.split(',')[0] || 'Medan'}</span>
        </div>
      </div>
      <p className="luxe-dir-card__desc">{directory.description}</p>
      <div className="luxe-dir-card__footer">
        <div className="luxe-dir-card__hours">
          <Icons.Clock />
          <span>{directory.opening_hours || 'Open Daily'}</span>
        </div>
        <span className="luxe-dir-card__link">
          Explore <Icons.ArrowRight />
        </span>
      </div>
    </div>
  </div>
);

const DirectoryPage = () => {
  const [directories, setDirectories] = useState([]);
  const [filteredDirectories, setFilteredDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('most');
  const navigate = useNavigate();

  // Fetch directories
  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await directoryService.getAllDirectories();
        if (response.status === 200 && response.data) {
          setDirectories(response.data);
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (err) {
        console.error('Error fetching directories:', err);
        setError('Failed to load destinations. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDirectories();
  }, []);

  // Filter and sort
  useEffect(() => {
    let filtered = [...directories];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchLower) ||
        d.description?.toLowerCase().includes(searchLower) ||
        d.address?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(d => getWorshipType(d.name) === category);
    }

    // Sort
    if (sort === 'most') {
      filtered.sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0));
    } else if (sort === 'least') {
      filtered.sort((a, b) => (a.overall_rating || 0) - (b.overall_rating || 0));
    }

    setFilteredDirectories(filtered);
  }, [directories, search, category, sort]);

  // Search handler
  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      setLoading(true);
      const response = await directoryService.searchDirectories(search);
      if (response.status === 200 && response.data) {
        setDirectories(response.data.results || []);
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="luxe-page">
      <LuxeNavbar />

      {/* Hero Section */}
      <section className="luxe-page-hero">
        <div className="luxe-page-hero__bg">
          <img src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1600&q=80" alt="" />
          <div className="luxe-page-hero__overlay"></div>
        </div>
        <div className="luxe-container luxe-page-hero__content">
          <span className="luxe-section-label">Explore</span>
          <h1 className="luxe-page-hero__title">Sacred Destinations</h1>
          <p className="luxe-page-hero__subtitle">
            Discover religious landmarks and spiritual sites across Medan
          </p>

          {/* Search Bar */}
          <div className="luxe-search">
            <input
              type="text"
              className="luxe-search__input"
              placeholder="Search destinations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <LuxeButton
              variant="primary"
              size="md"
              className="luxe-search__btn"
              onClick={handleSearch}
              icon={<Icons.Search />}
            >
              Search
            </LuxeButton>
          </div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="luxe-section">
        <div className="luxe-container">
          {/* Filter Buttons */}
          <div className="luxe-directory-filters">
            {categoryOptions.map(opt => (
              <button
                key={opt.value}
                className={`luxe-filter-btn ${category === opt.value ? 'active' : ''}`}
                onClick={() => setCategory(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="luxe-grid luxe-grid--3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <LuxeCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="luxe-empty">
              <div className="luxe-empty__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="luxe-empty__title">Something went wrong</h3>
              <p className="luxe-empty__desc">{error}</p>
              <LuxeButton
                variant="secondary"
                onClick={() => window.location.reload()}
                style={{ marginTop: '1rem' }}
              >
                Try Again
              </LuxeButton>
            </div>
          )}

          {/* Results Grid */}
          {!loading && !error && (
            <>
              <div className="luxe-grid luxe-grid--3">
                {filteredDirectories.map(directory => (
                  <DirectoryCard
                    key={directory.id}
                    directory={directory}
                    onClick={() => navigate(`/directory/${directory.id}`)}
                  />
                ))}
              </div>

              {/* No Results */}
              {filteredDirectories.length === 0 && (
                <div className="luxe-empty">
                  <div className="luxe-empty__icon">
                    <Icons.MapPin />
                  </div>
                  <h3 className="luxe-empty__title">No destinations found</h3>
                  <p className="luxe-empty__desc">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <LuxeFooter />
    </div>
  );
};

export default DirectoryPage;