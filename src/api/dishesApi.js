import axiosClient from './axiosClient';
import { MOCK_DISHES, MOCK_DASHBOARD_STATS, MOCK_RECENT_ORDERS } from './mockData';

/**
 * Dishes & Products API Service (CRUD Enabled)
 */
export const dishesApi = {
  /**
   * READ: Fetch all dishes with optional search and category filters
   */
  createDish: async (dishData) => {
    try {
      const response = await axiosClient.post('/menu', dishData);
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        const newDish = { id: `dish_${Date.now()}`, ...dishData };
        MOCK_DISHES.unshift(newDish); // إضافة الطبق في أول القائمة
        return { data: newDish, message: 'Dish created (Demo Mode)' };
      }
      throw err;
    }
  },

  updateDish: async (id, dishData) => {
    try {
      const response = await axiosClient.put(`/menu/${id}`, dishData);
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        const index = MOCK_DISHES.findIndex((d) => (d.id || d._id) === id);
        if (index !== -1) {
          MOCK_DISHES[index] = { ...MOCK_DISHES[index], ...dishData };
        }
        return { data: { id, ...dishData }, message: 'Dish updated (Demo Mode)' };
      }
      throw err;
    }
  },

  deleteDish: async (id) => {
    try {
      const response = await axiosClient.delete(`/menu/${id}`);
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        const index = MOCK_DISHES.findIndex((d) => (d.id || d._id) === id);
        if (index !== -1) {
          MOCK_DISHES.splice(index, 1); // حذف الطبق من القائمة
        }
        return { success: true, message: 'Dish deleted (Demo Mode)' };
      }
      throw err;
    }
  },
  getDishes: async ({ search = '', category = 'All' } = {}) => {
    try {
      const params = {};
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;

      const response = await axiosClient.get('/menu', { params });
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        console.info('[Dishes API] Backend not reachable. Returning filtered mock dishes data...');
        await new Promise((resolve) => setTimeout(resolve, 300));
        
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
   * READ: Fetch single dish by ID
   */
  getDishById: async (id) => {
    try {
      const response = await axiosClient.get(`/menu/${id}`);
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        const dish = MOCK_DISHES.find((d) => d.id === id);
        if (dish) return { data: dish };
      }
      throw err;
    }
  },

  /**
   * READ: Fetch top featured dishes for landing page
   */
  getFeaturedDishes: async () => {
    try {
      const response = await axiosClient.get('/menu');
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
        console.info('[Dishes API] Backend not reachable. Returning featured mock dishes...');
        await new Promise((resolve) => setTimeout(resolve, 300));
        const featured = MOCK_DISHES.filter((d) => d.isFeatured);
        return { data: featured, count: featured.length };
      }
      throw err;
    }
  },

  /**
   * CREATE: Add a new dish (Admin)
   */
  // createDish: async (dishData) => {
  //   try {
  //     const response = await axiosClient.post('/menu', dishData);
  //     return response.data;
  //   } catch (err) {
  //     const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
  //     if (isNetworkError) {
  //       const newDish = { id: `dish_${Date.now()}`, ...dishData };
  //       return { data: newDish, message: 'Dish created (Demo Mode)' };
  //     }
  //     throw err;
  //   }
  // },

  /**
   * UPDATE: Edit existing dish (Admin)
   */
  // updateDish: async (id, dishData) => {
  //   try {
  //     const response = await axiosClient.put(`/menu/${id}`, dishData);
  //     return response.data;
  //   } catch (err) {
  //     const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
  //     if (isNetworkError) {
  //       return { data: { id, ...dishData }, message: 'Dish updated (Demo Mode)' };
  //     }
  //     throw err;
  //   }
  // },

  /**
   * DELETE: Remove a dish (Admin)
   */
  // deleteDish: async (id) => {
  //   try {
  //     const response = await axiosClient.delete(`/menu/${id}`);
  //     return response.data;
  //   } catch (err) {
  //     const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
  //     if (isNetworkError) {
  //       return { success: true, message: 'Dish deleted (Demo Mode)' };
  //     }
  //     throw err;
  //   }
  // },

  /**
   * READ: Dashboard statistics for admin overview
   */
  getDashboardStats: async () => {
    try {
      const response = await axiosClient.get('/admin');
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      if (isNetworkError) {
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