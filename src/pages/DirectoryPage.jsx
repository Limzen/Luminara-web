import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DirectoryCard from '../components/DirectoryCard';
import CustomDropdown from '../components/CustomDropdown';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { directoryService } from '../services/directoryService';
import '../styles/DirectoryPage.css';

const worshipTypeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Masjid', value: 'masjid' },
  { label: 'Vihara', value: 'vihara' },
  { label: 'Church', value: 'church' },
  { label: 'Temple', value: 'temple' },
];
const distanceOptions = [
  { label: 'All', value: 'all' },
  { label: '2KM', value: '2' },
  { label: '5KM', value: '5' },
  { label: '10KM', value: '10' },
  { label: '20KM', value: '20' },
];
const popularityOptions = [
  { label: 'All', value: 'all' },
  { label: 'Most Popular', value: 'most' },
  { label: 'Least Popular', value: 'least' },
  { label: 'All-time Popular', value: 'alltime' },
];

// Helper to map directory name to worship type (for demo)
const getWorshipType = (name) => {
  if (/masjid/i.test(name)) return 'masjid';
  if (/vihara/i.test(name)) return 'vihara';
  if (/gereja/i.test(name) || /church/i.test(name)) return 'church';
  if (/temple|kuil/i.test(name)) return 'temple';
  return 'other';
};

const DirectoryPage = () => {
  const [worshipType, setWorshipType] = useState('all');
  const [distance, setDistance] = useState('all');
  const [popularity, setPopularity] = useState('all');
  const [search, setSearch] = useState('');
  const [directories, setDirectories] = useState([]);
  const [filteredDirectories, setFilteredDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch directories from API
  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await directoryService.getAllDirectories();
        if (response.status === 200 && response.data) {
          setDirectories(response.data);
        } else {
          throw new Error('Failed to fetch directories');
        }
      } catch (err) {
        console.error('Error fetching directories:', err);
        setError('Failed to load directories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, []);

  // Filter directories based on search and filters
  useEffect(() => {
    let filtered = directories;

    // Apply search filter
    if (search) {
      filtered = filtered.filter((directory) =>
        directory.name.toLowerCase().includes(search.toLowerCase()) ||
        directory.description.toLowerCase().includes(search.toLowerCase()) ||
        directory.address.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply worship type filter
    if (worshipType !== 'all') {
      filtered = filtered.filter((directory) => 
        getWorshipType(directory.name) === worshipType
      );
    }

    // Apply popularity filter (sort by rating)
    if (popularity === 'most') {
      filtered = [...filtered].sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0));
    } else if (popularity === 'least') {
      filtered = [...filtered].sort((a, b) => (a.overall_rating || 0) - (b.overall_rating || 0));
    }

    setFilteredDirectories(filtered);
  }, [directories, search, worshipType, distance, popularity]);

  // Handle search submission
  const handleSearch = async () => {
    if (!search.trim()) {
      // If search is empty, fetch all directories
      try {
        setLoading(true);
        setError(null);
        const response = await directoryService.getAllDirectories();
        if (response.status === 200 && response.data) {
          setDirectories(response.data);
        }
      } catch (err) {
        setError('Failed to load directories. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      // Perform search
      try {
        setLoading(true);
        setError(null);
        const response = await directoryService.searchDirectories(search);
        if (response.status === 200 && response.data) {
          setDirectories(response.data.results || []);
        }
      } catch (err) {
        setError('Search failed. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="directoryPage">
      <Navbar />
      {/* Search and Filters */}
      <div className="searchFilterWrapper">
        <div className="searchBarRow">
          <input
            type="text"
            placeholder="Explore Religious Destinations"
            className="searchInput"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="searchButton" onClick={handleSearch}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <div className="filterBar">
          <button className="categoryButton">All Categories</button>
          <CustomDropdown
            label="Worship Type"
            options={worshipTypeOptions}
            value={worshipType}
            onChange={setWorshipType}
          />
          <CustomDropdown
            label="Distance"
            options={distanceOptions}
            value={distance}
            onChange={setDistance}
          />
          <CustomDropdown
            label="Popularity"
            options={popularityOptions}
            value={popularity}
            onChange={setPopularity}
          />
        </div>
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
          Loading directories...
        </div>
      )}

      {/* Directory Cards Grid */}
      {!loading && !error && (
        <>
          <div className="cardsGrid">
            {filteredDirectories.map((directory) => (
              <DirectoryCard
                key={directory.id}
                image={directory.main_image_url || '/images/masjid-almashun.jpg'}
                name={directory.name}
                rating={directory.overall_rating || 0}
                time={directory.opening_hours || 'N/A'}
                location={directory.address}
                description={directory.description}
                onExploreDetail={() => navigate(`/directory/${directory.id}`)}
                cardClass="directoryCard"
                imageClass="cardImage"
                contentClass="cardContent"
                titleRowClass="cardTitleRow"
                titleClass="cardTitle"
                ratingClass="cardRating"
                infoRowClass="cardInfoRow"
                infoIconClass="cardInfoIcon"
                descClass="cardDesc"
                exploreBtnClass="cardExploreBtn"
              />
            ))}
          </div>

          {/* No results message */}
          {filteredDirectories.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: '#666'
            }}>
              No directories found matching your criteria.
            </div>
          )}

          {/* Pagination */}
          {filteredDirectories.length > 0 && (
            <div className="pagination">
              <button className="pageBtn" disabled>{'<'}</button>
              <button className="pageBtn active">1</button>
              <button className="pageBtn">2</button>
              <button className="pageBtn">{'>'}</button>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default DirectoryPage; 