import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import ItineraryCard from "../components/ItineraryCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import '../styles/page/ItineraryPage.css';

const ItineraryPage = () => {
    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState(() => {
        const savedItineraries = localStorage.getItem('itineraries');
        return savedItineraries ? JSON.parse(savedItineraries) : [
            { itineraryName: "Nama itinerary", destinations: "Destination:", createdOn: "14/05/2025" },
            { itineraryName: "Nama itinerary", destinations: "Destination:", createdOn: "14/05/2025" },
            { itineraryName: "Nama itinerary", destinations: "Destination:", createdOn: "14/05/2025" }
        ];
    });

    useEffect(() => {
        localStorage.setItem('itineraries', JSON.stringify(itineraries));
    }, [itineraries]);

    const handleCreateClick = () => {
        navigate('/itinerary/create');
    };

    const groupItinerariesByTime = () => {
        const today = new Date('2025-05-27');
        const groups = {
            today: [],
            yesterday: [],
            sevenDaysAgo: [],
        };

        itineraries.forEach((itinerary) => {
            const createdDate = new Date(itinerary.createdOn);
            const diffTime = today - createdDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 1) {
                groups.today.push(itinerary);
            } else if (diffDays <= 2) {
                groups.yesterday.push(itinerary);
            } else if (diffDays <= 7) {
                groups.sevenDaysAgo.push(itinerary);
            }
        });

        return groups;
    };

    const groupedItineraries = groupItinerariesByTime();

    if (itineraries.length === 0) {
        return (
            <div className="page-container">
                <Navbar />
                <div className="content-container">
                    <h1>Plan Your Trip With Luminara</h1>
                    <p>
                        Create an itinerary to organize your destinations, travel dates, and activities.
                    </p>
                    <Button
                        text="+ create itinerary"
                        onClick={handleCreateClick}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <Navbar />
            <div className="content-container">
                <SearchBar
                    onSearch={(value) => console.log('Search:', value)}
                    onSortChange={(value) => console.log('Sort by:', value)}
                    onCreateClick={handleCreateClick}
                />

                <div className="itinerary-grid">
                    {groupedItineraries.today.length > 0 && (
                        <div className="itinerary-section">
                            <h2>Today</h2>
                            <div className="cards-container">
                                {groupedItineraries.today.map((itinerary, index) => (
                                    <ItineraryCard
                                        key={index}
                                        name={itinerary.itineraryName}
                                        destination={itinerary.destinations}
                                        createdOn={itinerary.createdOn}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {groupedItineraries.yesterday.length > 0 && (
                        <div className="itinerary-section">
                            <h2>Yesterday</h2>
                            <div className="cards-container">
                                {groupedItineraries.yesterday.map((itinerary, index) => (
                                    <ItineraryCard
                                        key={index}
                                        name={itinerary.itineraryName}
                                        destination={itinerary.destinations}
                                        createdOn={itinerary.createdOn}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {groupedItineraries.sevenDaysAgo.length > 0 && (
                        <div className="itinerary-section">
                            <h2>7 Days Ago</h2>
                            <div className="cards-container">
                                {groupedItineraries.sevenDaysAgo.map((itinerary, index) => (
                                    <ItineraryCard
                                        key={index}
                                        name={itinerary.itineraryName}
                                        destination={itinerary.destinations}
                                        createdOn={itinerary.createdOn}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItineraryPage;