import api from './api';

export const directoryService = {
  // Get all directories
  getAllDirectories: async () => {
    try {
      const response = await api.get('/directories');
      return response.data;
    } catch (error) {
      console.error('Error fetching directories:', error);
      throw error;
    }
  },

  // Get directory by ID
  getDirectoryById: async (id) => {
    try {
      const response = await api.get(`/directories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching directory ${id}:`, error);
      throw error;
    }
  },

  // Search directories
  searchDirectories: async (query) => {
    try {
      const response = await api.get(`/directories/search?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching directories:', error);
      throw error;
    }
  },

  // Create directory (for admin use)
  createDirectory: async (directoryData) => {
    try {
      const response = await api.post('/directories', directoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating directory:', error);
      throw error;
    }
  },

  // Update directory (for admin use)
  updateDirectory: async (id, directoryData) => {
    try {
      const response = await api.put(`/directories/${id}`, directoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating directory ${id}:`, error);
      throw error;
    }
  },

  // Delete directory (for admin use)
  deleteDirectory: async (id) => {
    try {
      const response = await api.delete(`/directories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting directory ${id}:`, error);
      throw error;
    }
  },
}; 