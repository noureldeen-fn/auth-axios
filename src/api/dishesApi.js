import axiosClient from './axiosClient';
import { MOCK_DISHES, MOCK_DASHBOARD_STATS, MOCK_RECENT_ORDERS } from './mockData';

/**
 * Dishes & Products API Service
 */
export const dishesApi = {
  /**
   * Fetch all dishes with optional search and category filters
   */
  getDishes: async ({ search = '', category = 'All' } = {}) => {
    try {
      const params = {};
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;

      const response = await axiosClient.get('/dishes', { params });
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        console.info('[Dishes API] Backend not reachable. Returning filtered mock dishes data...');
        // Simulate small network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        let filtered = [...MOCK_DISHES];
        if (category && category !== 'All') {
          filtered = filtered.filter((d) => d.category.toLowerCase() === category.toLowerCase());
        }
        if (search) {
          const query = search.toLowerCase();
          filtered = filtered.filter(
            (d) =>
              d.name.toLowerCase().includes(query) ||
              d.description.toLowerCase().includes(query) ||
              d.category.toLowerCase().includes(query)
          );
        }
        return { data: filtered, count: filtered.length };
      }
      throw err;
    }
  },

  /**
   * Fetch top featured dishes for landing page
   */
  getFeaturedDishes: async () => {
    try {
      const response = await axiosClient.get('/dishes/featured');
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        console.info('[Dishes API] Backend not reachable. Returning featured mock dishes...');
        await new Promise((resolve) => setTimeout(resolve, 600));
        const featured = MOCK_DISHES.filter((d) => d.isFeatured);
        return { data: featured, count: featured.length };
      }
      throw err;
    }
  },

  /**
   * Fetch dashboard statistics for admin overview
   */
  getDashboardStats: async () => {
    try {
      const response = await axiosClient.get('/admin/stats');
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        console.info('[Dishes API] Backend not reachable. Returning mock dashboard metrics...');
        await new Promise((resolve) => setTimeout(resolve, 400));
        return {
          stats: MOCK_DASHBOARD_STATS,
          recentOrders: MOCK_RECENT_ORDERS,
        };
      }
      throw err;
    }
  },
};

export default dishesApi;
