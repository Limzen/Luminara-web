import api from './api';

export const guideService = {
  // Get all guides
  getAllGuides: async () => {
    try {
      const response = await api.get('/guides');
      return response.data;
    } catch (error) {
      console.error('Error fetching guides:', error);
      throw error;
    }
  },

  // Get guide by ID
  getGuideById: async (id) => {
    try {
      const response = await api.get(`/guides/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching guide ${id}:`, error);
      throw error;
    }
  },

  // Search guides
  searchGuides: async (query) => {
    try {
      const response = await api.get(`/guides/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching guides:', error);
      throw error;
    }
  },

  // Create guide (for admin use)
  createGuide: async (guideData) => {
    try {
      const response = await api.post('/guides', guideData);
      return response.data;
    } catch (error) {
      console.error('Error creating guide:', error);
      throw error;
    }
  },

  // Update guide (for admin use)
  updateGuide: async (id, guideData) => {
    try {
      const response = await api.put(`/guides/${id}`, guideData);
      return response.data;
    } catch (error) {
      console.error(`Error updating guide ${id}:`, error);
      throw error;
    }
  },

  // Delete guide (for admin use)
  deleteGuide: async (id) => {
    try {
      const response = await api.delete(`/guides/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting guide ${id}:`, error);
      throw error;
    }
  },
}; 