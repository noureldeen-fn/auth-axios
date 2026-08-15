import React, { useState, useEffect, useCallback } from 'react';
import { 
  Utensils, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import dishesApi from '../../api/dishesApi';
import ordersApi from '../../api/ordersApi';
import { ErrorAlert } from '../../components/common/ErrorAlert';

const STATUS_BADGES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  preparing: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalDishes: 0,
    pendingOrders: 0,
    todayRevenue: 0,
    activeCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [menuRes, ordersRes] = await Promise.allSettled([
        dishesApi.getDishes(),
        ordersApi.getAllOrders(),
      ]);

      const dishesList = menuRes.status === 'fulfilled' 
        ? (menuRes.value?.data || (Array.isArray(menuRes.value) ? menuRes.value : [])) 
        : [];

      const ordersList = ordersRes.status === 'fulfilled' 
        ? (ordersRes.value?.data || (Array.isArray(ordersRes.value) ? ordersRes.value : [])) 
        : [];

      const totalRev = ordersList
        .filter((o) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + Number(o.total || 0), 0);

      const pendingCount = ordersList.filter((o) => o.status === 'pending').length;

      setStats({
        totalDishes: dishesList.length,
        pendingOrders: pendingCount,
        todayRevenue: totalRev,
        activeCustomers: new Set(ordersList.map((o) => o.userId)).size || ordersList.length,
      });

      setRecentOrders(ordersList.slice(0, 5));
    } catch (err) {
      console.error('Failed to load overview data:', err);
      setError(err.response?.data?.message || err.message || 'Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold">
            <span>✨ Real-Time Kitchen & Restaurant Metrics</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Executive Overview
          </h1>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            Monitor your culinary lineup, track table turnover, and manage live menu offerings from a single command center.
          </p>
        </div>

        <Link
          to="/admin/dishes"
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-600/25 transition-all duration-200 shrink-0"
        >
          <Utensils className="w-4 h-4" />
          <span>Manage Dishes</span>
        </Link>
      </div>

      {error && <ErrorAlert title="Data Error" message={error} onRetry={loadDashboardData} />}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Dishes */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Menu Dishes</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-4">
            {loading ? '...' : stats.totalDishes}
          </p>
          <p className="text-xs text-stone-500 mt-2 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 mr-1" />
            <span className="text-emerald-600 font-semibold mr-1">Active</span> on public menu
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Pending Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-4">
            {loading ? '...' : stats.pendingOrders}
          </p>
          <p className="text-xs text-stone-500 mt-2 flex items-center">
            <Clock className="w-3.5 h-3.5 text-blue-600 mr-1" />
            Kitchen queue active
          </p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Total Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-4">
            {loading ? '...' : `$${stats.todayRevenue.toFixed(2)}`}
          </p>
          <p className="text-xs text-stone-500 mt-2 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 mr-1" />
            Calculated from completed orders
          </p>
        </div>

        {/* Active Customers */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Active Customers</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-4">
            {loading ? '...' : stats.activeCustomers}
          </p>
          <p className="text-xs text-stone-500 mt-2 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-600 mr-1" />
            Total ordering Customers 
          </p>
        </div>
      </div>

      {/* Main Grid: Live Kitchen Orders & Integration Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Kitchen Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/80 p-6 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-900">Live Kitchen Orders</h2>
              <p className="text-xs text-stone-500">Real-time status of current dining orders</p>
            </div>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
              <span>Live Stream</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-stone-400 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Guest & Time</th>
                  <th className="pb-3">Ordered Items</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-stone-400">
                      Loading orders feed...
                    </td>
                  </tr>
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-stone-400">
                      No kitchen orders available right now.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => {
                    const orderId = order.id || order._id;
                    const status = order.status || 'pending';
                    const badgeStyle = STATUS_BADGES[status] || STATUS_BADGES.pending;

                    return (
                      <tr key={orderId} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3.5 font-mono text-stone-700 font-bold">
                          #{String(orderId).slice(-6)}
                        </td>
                        <td className="py-3.5">
                          <p className="font-semibold text-stone-900">{order.userId?.name || order.user?.name || 'Customer'}</p>
                          <p className="text-[10px] text-stone-400">
                            {order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                          </p>
                        </td>
                        <td className="py-3.5">
                          <span className="text-stone-700">
                            {order.items?.map((i) => `${i.quantity}x ${i.name || 'Item'}`).join(', ') || 'No details'}
                          </span>
                        </td>
                        <td className="py-3.5 font-bold font-serif text-stone-900">
                          ${Number(order.total || 0).toFixed(2)}
                        </td>
                        <td className="py-3.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeStyle}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Summary / Status Sidebar */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-soft flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg">Quick Actions</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Navigate directly to complete full fulfillment operations or modify menu pricing and availability.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                to="/admin/orders"
                className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 transition text-stone-800 text-xs font-semibold"
              >
                <span>Full Orders Management</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </Link>
              <Link
                to="/admin/dishes"
                className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 transition text-stone-800 text-xs font-semibold"
              >
                <span>Add / Edit Dishes</span>
                <ArrowUpRight className="w-4 h-4 text-stone-400" />
              </Link>
            </div>
          </div>

          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Live Metrics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;