import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on initial load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse auth data from localStorage:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }

    // Global listener for 401 unauthorized events dispatched by axiosClient interceptor
    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  /**
   * Login handler optimized with useCallback
   */
  const login = useCallback(async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      // Response expected: { user, token }
      const receivedUser = response.user || response.data?.user || response;
      const receivedToken = response.token || response.data?.token;

      if (receivedToken) {
        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);
      }

      if (receivedUser) {
        localStorage.setItem('user', JSON.stringify(receivedUser));
        setUser(receivedUser);
      }

      return { user: receivedUser, token: receivedToken };
    } catch (error) {
      // Re-throw error so login form can catch and display specific error feedback
      throw error;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await authApi.register(userData);
      const receivedUser = response.user || response.data?.user || response.data?.data?.user;
      const receivedToken = response.token || response.data?.token || response.data?.data?.token;

      if (receivedToken) {
        localStorage.setItem('token', receivedToken);
        setToken(receivedToken);
      }

      if (receivedUser) {
        localStorage.setItem('user', JSON.stringify(receivedUser));
        setUser(receivedUser);
      }

      return { user: receivedUser, token: receivedToken };
    } catch (error) {
      throw error;
    }
  }, []);

  /**
   * Logout handler optimized with useCallback
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.warn('Logout notification error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
    }
  }, []);

  /**
   * Helper to check if current user is an Admin
   */
  const isAdmin = useMemo(() => {
    return user?.role?.toLowerCase() === 'admin';
  }, [user]);

  /**
   * Context value memoized with useMemo to prevent unnecessary re-renders
   */
const contextValue = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token && !!user,
    isAdmin,
    loading,
    login,
    register, 
    logout,
  }), [user, token, isAdmin, loading, login, register, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to consume AuthContext safely
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
