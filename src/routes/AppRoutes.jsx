import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { PageLoader } from "../components/common/LoadingSkeleton";

// Eagerly loaded public pages
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import Register from "../pages/auth/Register";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";
import NotFound from "../pages/NotFound";

// Lazy-loaded Dashboard components for code-splitting
const DashboardLayout = lazy(
  () => import("../components/dashboard/DashboardLayout"),
);
const DashboardOverview = lazy(
  () => import("../pages/admin/DashboardOverview"),
);
const DishesListing = lazy(() => import("../pages/admin/DishesListing"));
const OrdersManagement = lazy(() => import("../pages/admin/OrdersManagement"));
const CustomersStaff = lazy(() => import("../pages/admin/CustomersStaff"));

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Admin Dashboard Routes with Lazy Loading & Suspense */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Suspense
              fallback={<PageLoader message="Loading Admin Dashboard..." />}
            >
              <DashboardLayout />
            </Suspense>
          </ProtectedRoute>
        }
      >
        <Route
          path="users"
          element={
            <Suspense fallback={<PageLoader message="Loading Directory..." />}>
              <CustomersStaff />
            </Suspense>
          }
        />
        <Route
          index
          element={
            <Suspense
              fallback={<PageLoader message="Loading Overview Metrics..." />}
            >
              <DashboardOverview />
            </Suspense>
          }
        />
        <Route
          path="dishes"
          element={
            <Suspense
              fallback={<PageLoader message="Loading Menu Catalog..." />}
            >
              <DishesListing />
            </Suspense>
          }
        />
        <Route
          path="orders"
          element={
            <Suspense
              fallback={<PageLoader message="Loading Orders Feed..." />}
            >
              <OrdersManagement />
            </Suspense>
          }
        />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
