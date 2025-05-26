import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tours } from '../data/dummyData';
import DirectoryCard from '../components/DirectoryCard';
import CustomDropdown from '../components/CustomDropdown';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

// Helper to map tour name to worship type (for demo)
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
  const navigate = useNavigate();

  const filteredTours = tours.filter((tour) => {
    if (worshipType !== 'all' && getWorshipType(tour.name) !== worshipType) return false;
    // Distance and popularity filtering can be implemented when data is available
    if (search && !(
      tour.name.toLowerCase().includes(search.toLowerCase()) ||
      tour.description.toLowerCase().includes(search.toLowerCase())
    )) return false;
    return true;
  });

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
          />
          <button className="searchButton">Search</button>
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
      {/* Directory Cards Grid */}
      <div className="cardsGrid">
        {filteredTours.map((tour) => (
          <DirectoryCard
            key={tour.id}
            image={tour.image}
            name={tour.name}
            rating={tour.rating}
            time={tour.time}
            location={tour.location}
            description={tour.description}
            onExploreDetail={() => navigate(`/directory/${tour.id}`)}
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
      {/* Pagination */}
      <div className="pagination">
        <button className="pageBtn" disabled>{'<'}</button>
        <button className="pageBtn active">1</button>
        <button className="pageBtn">2</button>
        <button className="pageBtn">{'>'}</button>
      </div>
      <Footer />
    </div>
  );
};

export default DirectoryPage; 