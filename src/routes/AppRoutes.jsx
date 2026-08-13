import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { PageLoader } from '../components/common/LoadingSkeleton';

// Eagerly loaded public pages
import LandingPage from '../pages/Landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import UnauthorizedPage from '../pages/auth/UnauthorizedPage';

// Lazy-loaded Dashboard components for code-splitting
const DashboardLayout = lazy(() => import('../components/dashboard/DashboardLayout'));
const DashboardOverview = lazy(() => import('../pages/admin/DashboardOverview'));
const DishesListing = lazy(() => import('../pages/admin/DishesListing'));

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Admin Dashboard Routes with Lazy Loading & Suspense */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Suspense fallback={<PageLoader message="Loading Admin Dashboard..." />}>
              <DashboardLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<PageLoader message="Loading Overview Metrics..." />}>
              <DashboardOverview />
            </Suspense>
          }
        />
        <Route
          path="dishes"
          element={
            <Suspense fallback={<PageLoader message="Loading Menu Catalog..." />}>
              <DishesListing />
            </Suspense>
          }
        />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
