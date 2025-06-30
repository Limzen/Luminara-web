import api from './api';

// Fetch all communities, with optional filters (e.g., { name: 'muslim', agama: 'islam' })
export const getAllCommunities = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const url = params ? `/comunities?${params}` : '/comunities';
    const response = await api.get(url);
    return response.data.data; // returns the array of communities
  } catch (error) {
    throw error;
  }
};

// Fetch a single community by ID
export const getCommunityById = async (id) => {
  try {
    const response = await api.get(`/comunities/${id}`);
    return response.data.data; // returns the community object
  } catch (error) {
    throw error;
  }
}; 