import api from './api';

export const itineraryService = {
    getAllItineraries: async () => {
        try {
            const response = await api.get('/itineraries');
            return response.data;
        } catch (error) {
            console.error('Error fetching all itineraries:', error);
            throw error;
        }
    },

    getItineraryById: async (id) => {
        try {
            const response = await api.get(`/itineraries/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching itinerary with id ${id}:`, error);
            throw error;
        }
    },

    createItinerary: async (itineraryData) => {
        try {
            const response = await api.post('/itineraries', itineraryData);
            return response.data;
        } catch (error) {
            console.error('Error creating itinerary:', error);
            throw error;
        }
    },

    updateItinerary: async (id, itineraryData) => {
        try {
            const response = await api.put(`/itineraries/${id}`, itineraryData);
            return response.data;
        } catch (error) {
            console.error(`Error updating itinerary with id ${id}:`, error);
            throw error;
        }
    },

    deleteItinerary: async (id) => {
        try {
            const response = await api.delete(`/itineraries/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting itinerary with id ${id}:`, error);
            throw error;
        }
    },
};