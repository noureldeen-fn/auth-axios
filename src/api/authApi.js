import axiosClient from './axiosClient';
import { MOCK_USERS } from './mockData';

/**
 * Authentication API Service
 */
export const authApi = {
  /**
   * Login user with email & password
   * @param {Object} credentials - { email, password }
   * @returns {Promise<{ user: Object, token: string }>}
   * 
   */
  login: async (credentials) => {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      // In development or when backend is unreachable, provide fallback simulation for demo accounts
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      
      if (isNetworkError) {
        console.info('[Auth API] Backend not reachable. Checking mock user credentials for offline demo...');
        const userFound = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
        );

        if (userFound && userFound.password === credentials.password) {
          const { password: _, ...userWithoutPassword } = userFound;
          const mockToken = `mock_jwt_token_${userFound.role}_${Date.now()}`;
          return {
            user: userWithoutPassword,
            token: mockToken,
            message: 'Logged in successfully (Demo Mode)',
          };
        } else if (userFound && userFound.password !== credentials.password) {
          const customErr = new Error('Invalid email or password. Please check your credentials.');
          customErr.response = { status: 400, data: { message: 'Invalid email or password.' } };
          throw customErr;
        } else {
          const customErr = new Error('No user found with this email. Try our demo accounts below.');
          customErr.response = { status: 404, data: { message: 'User not found.' } };
          throw customErr;
        }
      }

      // Re-throw error so calling components / forms can catch and display proper alerts
      throw err;
    }
  },

  /**
   * Fetch current authenticated profile
   */
  getProfile: async () => {
    try {
      const response = await axiosClient.get('/auth/me');
      return response.data;
    } catch (err) {
      throw err;
    }
  },
register: async (userData) => {
    try {
      const response = await axiosClient.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.message?.includes('Network Error');
      
      if (isNetworkError) {
        const mockUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: 'customer'
        };
        const mockToken = `mock_jwt_token_customer_${Date.now()}`;
        return {
          user: mockUser,
          token: mockToken,
          message: 'Account created successfully (Demo Mode)',
        };
      }
      throw err;
    }
  },
  /**
   * Logout user
   */
  logout: async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (err) {
      console.warn('Backend logout call skipped/failed:', err.message);
    }
  },
};

export default authApi;
