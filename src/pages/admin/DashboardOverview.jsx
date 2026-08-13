import React, { useState, useEffect, useCallback } from 'react';
import {
  Utensils,
  ShoppingBag,
  DollarSign,
  Users,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import dishesApi from '../../api/dishesApi';
import StatCard from '../../components/dashboard/StatCard';
import { StatCardSkeleton } from '../../components/common/LoadingSkeleton';
import ErrorAlert from '../../components/common/ErrorAlert';

export const DashboardOverview = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOverviewData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dishesApi.getDashboardStats();
      setData(response);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
      setError(err.message || 'Failed to fetch dashboard statistics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverviewData();
  }, [fetchOverviewData]);

  const stats = data?.stats || {
    totalDishes: 24,
    pendingOrders: 8,
    todayRevenue: 3845.5,
    activeUsers: 1420,
  };

  const recentOrders = data?.recentOrders || [];

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Kitchen & Restaurant Metrics</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold">
              Executive Overview
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm max-w-xl">
              Monitor your culinary lineup, track table turnover, and manage live menu offerings from a single command center.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <Link
              to="/admin/dishes"
              className="inline-flex items-center space-x-2 px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-glow transition-all duration-200 hover:-translate-y-0.5"
            >
              <Utensils className="w-4 h-4" />
              <span>Manage Dishes</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Error Alert with Retry */}
      {error && (
        <ErrorAlert
          title="Dashboard Sync Error"
          message={error}
          onRetry={fetchOverviewData}
        />
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Menu Dishes"
              value={stats.totalDishes}
              subtitle="21 active on menu"
              change="+3 new this month"
              isPositive={true}
              icon={Utensils}
              iconBgColor="bg-amber-50 text-amber-600"
            />

            <StatCard
              title="Pending Orders"
              value={stats.pendingOrders}
              subtitle="Kitchen queue active"
              change="-2 vs last hour"
              isPositive={true}
              icon={ShoppingBag}
              iconBgColor="bg-blue-50 text-blue-600"
            />

            <StatCard
              title="Today's Revenue"
              prefix="$"
              value={Number(stats.todayRevenue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              subtitle="Target: $4,500.00"
              change="+14.2% vs yesterday"
              isPositive={true}
              icon={DollarSign}
              iconBgColor="bg-emerald-50 text-emerald-600"
            />

            <StatCard
              title="Active Customers"
              value={stats.activeUsers.toLocaleString()}
              subtitle="Tasting club members"
              change="+8.4% weekly"
              isPositive={true}
              icon={Users}
              iconBgColor="bg-purple-50 text-purple-600"
            />
          </>
        )}
      </div>

      {/* Two Column Layout: Recent Orders & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Kitchen Activity */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">Live Kitchen Orders</h2>
              <p className="text-xs text-stone-500">Real-time status of current dining tables</p>
            </div>

            <span className="text-xs font-semibold text-brand-600 px-3 py-1 bg-brand-50 rounded-full border border-brand-200">
              Live Stream
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-100 text-xs uppercase text-stone-400 font-semibold">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Guest & Table</th>
                  <th className="pb-3">Ordered Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 font-semibold text-stone-800 text-xs">
                      {order.id}
                    </td>
                    <td className="py-3.5">
                      <p className="font-medium text-stone-900 text-xs sm:text-sm">{order.customer}</p>
                      <p className="text-[11px] text-stone-400">{order.table}</p>
                    </td>
                    <td className="py-3.5 text-xs text-stone-600 max-w-xs truncate">
                      {order.items}
                    </td>
                    <td className="py-3.5 font-bold text-stone-900 text-xs">
                      ${Number(order.total).toFixed(2)}
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-block px-2.5 py-1 text-[10px] font-semibold rounded-full ${
                          order.status === 'Preparing'
                            ? 'bg-amber-100 text-amber-800'
                            : order.status === 'Ready'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Operations & Fast Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-soft space-y-5">
            <h2 className="font-serif text-lg font-bold text-stone-900">Student 2 Integration Zone</h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Student 1 has established the foundational architecture, authentication, RBAC, and product views. The modules below are prepared for Student 2:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Dish CRUD Operations</p>
                    <p className="text-[10px] text-stone-500">Create, Update, Delete Dishes</p>
                  </div>
                </div>
                <span className="text-[10px] bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full font-semibold">
                  Ready
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">Orders Management</p>
                    <p className="text-[10px] text-stone-500">Live order status updates</p>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                  Ready
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-800">User Registration & Cart</p>
                    <p className="text-[10px] text-stone-500">Customer checkout workflow</p>
                  </div>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-semibold">
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
