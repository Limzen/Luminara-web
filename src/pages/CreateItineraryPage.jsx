import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import InputField from '../components/InputField.jsx';
import DateTimeField from '../components/DateTimeField.jsx';
import TextareaField from '../components/TextareaField.jsx';
import '../styles/page/CreateItineraryPage.css';
import { itineraryService } from '../services/itineraryService';

const CreateItineraryPage = () => {
    const navigate = useNavigate();

    const [itineraryName, setItineraryName] = useState('');
    const [destinations, setDestinations] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [budget, setBudget] = useState('');
    const [notes, setNotes] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!itineraryName || !destinations) {
            alert('Itinerary Name and Destinations are required.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const itineraryData = {
            user_id: 2,
            name: itineraryName,
            destinations: destinations,
            start_date: startDate || null,
            description: notes,
            image_url: "https://placehold.co/600x400/d1bfa7/4A2E2A?text=New+Trip"
        };

        try {
            const result = await itineraryService.createItinerary(itineraryData);
            console.log('Itinerary created:', result);
            navigate('/itinerary');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to create itinerary. Please try again.';
            setError(errorMessage);
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="content-container">
                <h1>Plan Your Spiritual Journey</h1>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                <InputField
                    label="Itinerary Name"
                    placeholder="Example: Medan Religious Trip - 3 Days"
                    value={itineraryName}
                    onChange={(e) => setItineraryName(e.target.value)}
                />
                <InputField
                    label="Destinations / Places To Visit"
                    placeholder="Type Your Destinations"
                    value={destinations}
                    onChange={(e) => setDestinations(e.target.value)}
                />
                <DateTimeField
                    label="Travel Dates"
                    valueDate={startDate}
                    valueTime={startTime}
                    onChangeDate={(e) => setStartDate(e.target.value)}
                    onChangeTime={(e) => setStartTime(e.target.value)}
                />
                <InputField
                    label="Estimated Budget"
                    type="number"
                    placeholder="Type Your Budget (Numbers Only)"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />
                <TextareaField
                    label="Special Notes"
                    placeholder="Add Your Notes Here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <Button
                    text={isLoading ? 'Creating...' : 'Create Itinerary'}
                    onClick={handleSubmit}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

export default CreateItineraryPage;