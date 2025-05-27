import React, { useState } from 'react';
import Button from '../components/Button.jsx';
import Navbar from '../components/Navbar.jsx';
import InputField from '../components/InputField.jsx';
import DateTimeField from '../components/DateTimeField.jsx';
import TextareaField from '../components/TextareaField.jsx';
import '../styles/page/CreateItineraryPage.css';
import {useNavigate} from "react-router-dom";

const CreateItineraryPage = () => {
    const navigate = useNavigate();
    const [itineraryName, setItineraryName] = useState('');
    const [destinations, setDestinations] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [budget, setBudget] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        const newItinerary = {
            itineraryName,
            destinations,
            createdOn: new Date().toISOString().split('T')[0],
            startDate,
            startTime,
            budget,
            notes,
        };

        const existingItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
        localStorage.setItem('itineraries', JSON.stringify([...existingItineraries, newItinerary]));

        navigate('/itinerary');
    };

    return (
        <div className="page-container">
            <Navbar />
            <div className="content-container">
                <h1>Plan Your Spiritual Journey</h1>
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
                <Button text="Create Itinerary" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default CreateItineraryPage;