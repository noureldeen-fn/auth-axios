import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, RefreshCw, Filter, Clock } from 'lucide-react';
import ordersApi from '../../api/ordersApi';
import { ErrorAlert } from '../../components/common/ErrorAlert';

const STATUS_CONFIG = {
  pending: { label: 'Pending', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  preparing: { label: 'Preparing', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  completed: { label: 'Completed', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  cancelled: { label: 'Cancelled', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ordersApi.getAllOrders();
      const items = response?.data || (Array.isArray(response) ? response : []);
      setOrders(items);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err.response?.data?.message || err.message || 'Unable to fetch orders.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await ordersApi.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          (order.id || order._id) === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    } finally {
      setUpdatingId(null);
    }
  };

  // استخراج اسم العميل بجميع الاحتمالات الممكنة من الباك إند
  const getCustomerName = (order) => {
    if (typeof order.user === 'object' && order.user?.name) return order.user.name;
    if (typeof order.userId === 'object' && order.userId?.name) return order.userId.name;
    if (order.customerName) return order.customerName;
    if (typeof order.user === 'object' && order.user?.email) return order.user.email.split('@')[0];
    if (typeof order.userId === 'object' && order.userId?.email) return order.userId.email.split('@')[0];
    if (typeof order.userId === 'string' && order.userId) return `User #${order.userId.slice(-4)}`;
    return 'Guest Customers ';
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
            Orders Management
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Review live kitchen orders and update customer fulfillment status.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-50 shadow-sm cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && <ErrorAlert title="Connection Error" message={error} onRetry={fetchOrders} />}

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-stone-400 mr-1" />
        {['all', 'pending', 'preparing', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
              statusFilter === tab
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table Container (White Modern Card) */}
      <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-soft">
        {loading ? (
          <div className="p-16 text-center text-stone-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-orange-500" />
            Loading live orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-16 text-center space-y-2">
            <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto stroke-1" />
            <p className="text-stone-500 text-sm font-medium">No orders found matching the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50/75 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Customer / Time</th>
                  <th className="py-4 px-6">Ordered Items</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map((order) => {
                  const orderId = order.id || order._id;
                  const currentStatus = order.status || 'pending';
                  const statusBadge = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.pending;
                  const customerName = getCustomerName(order);

                  return (
                    <tr key={orderId} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs text-orange-600 font-bold">
                        #{String(orderId).slice(-6)}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-stone-900 text-xs">
                          {customerName}
                        </p>
                        <p className="text-[10px] text-stone-400 flex items-center mt-0.5">
                          <Clock className="w-3 h-3 mr-1" />
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Just now'}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {order.items?.map((item, idx) => (
                            <p key={idx} className="text-xs text-stone-700">
                              <span className="font-bold text-stone-900">{item.quantity}x</span> {item.name || `Dish #${item.menuItemId}`}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-serif font-bold text-stone-900 text-sm">
                        ${Number(order.total || 0).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusBadge.bg}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          disabled={updatingId === orderId}
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(orderId, e.target.value)}
                          className="text-xs bg-stone-50 border border-stone-200 text-stone-800 rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer disabled:opacity-50"
                        >
                          <option value="pending">Pending</option>
                          <option value="preparing">Preparing</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;