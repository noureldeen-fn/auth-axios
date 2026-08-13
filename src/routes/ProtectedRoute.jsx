import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/common/LoadingSkeleton';

/**
 * Route guard checking for valid token and matching allowedRoles (RBAC: Admin vs User)
 *
 * @param {Array<string>} allowedRoles - Optional array of authorized roles (e.g. ['admin'])
 * @param {React.ReactNode} children - Child components or Outlet
 */
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // If auth state is still validating from localStorage, render loading skeleton
  if (loading) {
    return <PageLoader message="Verifying security credentials..." />;
  }

  // Not authenticated: Redirect to /login preserving target location in state
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // RBAC Role Check: Verify if user role is authorized
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role?.toLowerCase();
    const hasRole = allowedRoles.some((role) => role.toLowerCase() === userRole);

    if (!hasRole) {
      // Authenticated but unauthorized for this role
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
