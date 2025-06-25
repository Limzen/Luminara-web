import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import ItineraryCard from '../components/ItineraryCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import '../styles/page/ItineraryPage.css';
import Footer from '../components/Footer.jsx';
import { itineraryService } from '../services/itineraryService';

const ItineraryPage = () => {
    const navigate = useNavigate();

    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State baru untuk search dan sort
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                setLoading(true);
                const response = await itineraryService.getAllItineraries();
                if (response && Array.isArray(response.data)) {
                    setItineraries(response.data);
                } else {
                    setItineraries([]);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to fetch itineraries.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, []);

    // Logika untuk memfilter dan mengurutkan data
    const filteredAndSortedItineraries = useMemo(() => {
        let processedItineraries = [...itineraries];

        // 1. Proses Filtering (Pencarian)
        if (searchQuery) {
            processedItineraries = processedItineraries.filter(itinerary =>
                itinerary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                itinerary.destinations.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Proses Sorting (Pengurutan)
        if (sortOrder === 'date') {
            processedItineraries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        return processedItineraries;
    }, [itineraries, searchQuery, sortOrder]);


    const handleCreateClick = () => {
        navigate('/itinerary/create');
    };

    const handleDelete = async (idToDelete) => {
        if (window.confirm("Are you sure you want to delete this itinerary?")) {
            try {
                await itineraryService.deleteItinerary(idToDelete);
                setItineraries(prevItineraries =>
                    prevItineraries.filter(itinerary => itinerary.id !== idToDelete)
                );
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to delete itinerary.';
                alert(`Error: ${errorMessage}`);
            }
        }
    };

    const handleSeeMore = (id) => {
        navigate(`/itinerary/${id}`);
    };

    const groupItinerariesByTime = (dataToGroup) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const groups = { today: [], yesterday: [], sevenDaysAgo: [] };
        if (!Array.isArray(dataToGroup)) return groups;

        dataToGroup.forEach((itinerary) => {
            const createdDate = new Date(itinerary.created_at);
            createdDate.setHours(0, 0, 0, 0);
            const diffTime = today.getTime() - createdDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) groups.today.push(itinerary);
            else if (diffDays === 1) groups.yesterday.push(itinerary);
            else if (diffDays > 1 && diffDays <= 7) groups.sevenDaysAgo.push(itinerary);
        });
        return groups;
    };

    if (loading) {
        return <div className="loading-container">Loading Itineraries...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    // Menggunakan data yang sudah difilter dan diurutkan untuk pengelompokan
    const groupedItineraries = groupItinerariesByTime(filteredAndSortedItineraries);
    const hasItineraries = filteredAndSortedItineraries.length > 0;

    if (!hasItineraries && searchQuery) {
        return (
            <div className="page-container">
                <Navbar />
                <div className="content-area-with-data">
                    <div className="content-wrapper">
                        <SearchBar
                            onSearch={setSearchQuery}
                            onSortChange={setSortOrder}
                            onCreateClick={handleCreateClick}
                        />
                        <div className="no-results-container">
                            <h2>No Results Found</h2>
                            <p>We couldn't find any itineraries matching "{searchQuery}".</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (itineraries.length === 0) {
        return (
            <div className="page-container">
                <Navbar />
                <div className="empty-state-content">
                    <h1>Plan Your Spiritual Journey</h1>
                    <p>Create an itinerary to organize your destinations, travel dates, and activities.</p>
                    <Button text="+ Create Itinerary" onClick={handleCreateClick} />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="page-container">
            <Navbar />
            <div className="content-area-with-data">
                <div className="content-wrapper">
                    <SearchBar
                        onSearch={setSearchQuery}
                        onSortChange={setSortOrder}
                        onCreateClick={handleCreateClick}
                    />
                    <div className="itinerary-grid">
                        {Object.keys(groupedItineraries).map(groupKey => (
                            groupedItineraries[groupKey].length > 0 && (
                                <div className="itinerary-section" key={groupKey}>
                                    <h2>{groupKey.charAt(0).toUpperCase() + groupKey.slice(1).replace('Ago', ' Days Ago')}</h2>
                                    <div className="cards-container">
                                        {groupedItineraries[groupKey].map((itinerary) => (
                                            <ItineraryCard
                                                key={itinerary.id}
                                                id={itinerary.id}
                                                name={itinerary.name}
                                                destination={itinerary.destinations}
                                                createdOn={new Date(itinerary.created_at).toLocaleDateString()}
                                                onSeeMoreClick={() => handleSeeMore(itinerary.id)}
                                                onDelete={() => handleDelete(itinerary.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default ItineraryPage;