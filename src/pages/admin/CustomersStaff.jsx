import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  UserCheck,
  ShoppingBag,
  DollarSign,
  Search,
  RefreshCw,
  ShieldCheck,
  ChefHat,
  Star,
  Clock,
} from "lucide-react";
import ordersApi from "../../api/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { ErrorAlert } from "../../components/common/ErrorAlert";

const INITIAL_STAFF = [
  {
    id: "st_1",
    name: "Chef Alessandro Rossi",
    role: "Head Chef & Admin",
    email: "admin@savorybistro.com",
    badge: "Kitchen",
  },
  {
    id: "st_2",
    name: "TechMasters",
    role: "CEO",
    email: "admin@techmaster.com",
    badge: "Admin",
  },

  {
    id: "st_3",
    name: "Sarah Nour",
    role: "Front Desk / Cashier",
    email: "sarah@savory.com",
    badge: "Service",
  },
];

export const CustomersStaff = () => {
  const { user: currentAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("customers");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);

  const fetchDirectoryData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ordersApi.getAllOrders();
      const orders =
        response?.data || (Array.isArray(response) ? response : []);

      const customerMap = {};

      orders.forEach((order) => {
        const userId =
          typeof order.userId === "object"
            ? order.userId?._id || order.userId?.id
            : order.userId || "guest";
        const userName =
          order.userId?.name ||
          order.user?.name ||
          (userId === currentAdmin?._id
            ? currentAdmin?.name
            : `User #${String(userId).slice(-4)}`);
        const userEmail =
          order.userId?.email ||
          order.user?.email ||
          `${userName.toLowerCase().replace(/\s+/g, "")}@.com`;

        if (!customerMap[userId]) {
          customerMap[userId] = {
            id: userId,
            name: userName,
            email: userEmail,
            totalOrders: 0,
            totalSpent: 0,
            lastOrderDate: order.createdAt,
            ordersList: [],
            favoriteItems: [],
          };
        }

        customerMap[userId].totalOrders += 1;
        customerMap[userId].totalSpent += Number(order.total || 0);
        customerMap[userId].ordersList.push(order);

        order.items?.forEach((it) => {
          if (it.name && !customerMap[userId].favoriteItems.includes(it.name)) {
            customerMap[userId].favoriteItems.push(it.name);
          }
        });

        if (
          new Date(order.createdAt) >
          new Date(customerMap[userId].lastOrderDate)
        ) {
          customerMap[userId].lastOrderDate = order.createdAt;
        }
      });

      setCustomers(Object.values(customerMap));
    } catch (err) {
      console.error("Failed to load directory:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load customer list.",
      );
    } finally {
      setLoading(false);
    }
  }, [currentAdmin]);

  useEffect(() => {
    fetchDirectoryData();
  }, [fetchDirectoryData]);

  const totalSpentAll = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const newCustomersCount = customers.filter((c) => c.totalOrders === 1).length;
  const vipCustomersCount = customers.filter(
    (c) => c.totalOrders > 2 || c.totalSpent > 250,
  ).length;

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredStaff = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight">
            Customers & Staff Directory
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Track ordering Customers , repeat VIP customers, and restaurant
            staff profiles.
          </p>
        </div>
        <button
          onClick={fetchDirectoryData}
          disabled={loading}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-semibold transition disabled:opacity-50 shadow-sm cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Directory</span>
        </button>
      </div>

      {error && (
        <ErrorAlert
          title="Connection Error"
          message={error}
          onRetry={fetchDirectoryData}
        />
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Total Customers
            </span>
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-3">
            {customers.length}
          </p>
          <p className="text-xs text-stone-500 mt-1">
            Registered purchasing accounts
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              New Customers
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-3">
            {newCustomersCount}
          </p>
          <p className="text-xs text-blue-600 font-medium mt-1">
            First-time ordering guests
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              VIP / Repeat Guests
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-3">
            {vipCustomersCount}
          </p>
          <p className="text-xs text-amber-700 font-medium mt-1">
            High frequency Customers
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Total Spent
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-stone-900 font-serif mt-3">
            ${totalSpentAll.toFixed(2)}
          </p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            Total customer lifetime value
          </p>
        </div>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Toggle Tabs */}
        <div className="flex items-center space-x-2 bg-stone-100 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "customers"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab("staff")}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === "staff"
                ? "bg-white text-stone-900 shadow-sm"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Kitchen & Staff ({staffList.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm"
          />
        </div>
      </div>

      {/* Main Table: Customers Tab */}
      {activeTab === "customers" && (
        <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-soft">
          {loading ? (
            <div className="p-16 text-center text-stone-400 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-orange-500" />
              Loading customer profiles...
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="p-16 text-center space-y-2">
              <Users className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-stone-500 text-sm">No customers found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50/75 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Status / Badge</th>
                    <th className="py-4 px-6">Orders Count</th>
                    <th className="py-4 px-6">Favorite / Ordered Dishes</th>
                    <th className="py-4 px-6">Total Spent</th>
                    <th className="py-4 px-6">Last Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredCustomers.map((cust) => {
                    const isVip = cust.totalOrders > 2 || cust.totalSpent > 250;
                    const isNew = cust.totalOrders === 1;

                    return (
                      <tr
                        key={cust.id}
                        className="hover:bg-stone-50/60 transition-colors"
                      >
                        {/* Name & Avatar */}
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs shrink-0">
                              {cust.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-stone-900 text-xs">
                                {cust.name}
                              </p>
                              <p className="text-[11px] text-stone-400 font-mono">
                                ID: #{String(cust.id).slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Customer Badge */}
                        <td className="py-4 px-6">
                          {isVip ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span>VIP</span>
                            </span>
                          ) : isNew ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              New Customer
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                              Regular
                            </span>
                          )}
                        </td>

                        {/* Orders count */}
                        <td className="py-4 px-6 font-semibold text-stone-800">
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-stone-100 rounded-lg">
                            <ShoppingBag className="w-3.5 h-3.5 text-stone-500" />
                            <span>
                              {cust.totalOrders} order
                              {cust.totalOrders > 1 ? "s" : ""}
                            </span>
                          </span>
                        </td>

                        {/* Favorite Dishes */}
                        <td className="py-4 px-6 max-w-xs truncate text-stone-600">
                          {cust.favoriteItems.length > 0 ? (
                            <span title={cust.favoriteItems.join(", ")}>
                              {cust.favoriteItems.slice(0, 2).join(", ")}
                              {cust.favoriteItems.length > 2
                                ? ` +${cust.favoriteItems.length - 2} more`
                                : ""}
                            </span>
                          ) : (
                            <span className="text-stone-400">
                              No items recorded
                            </span>
                          )}
                        </td>

                        {/* Total Spent */}
                        <td className="py-4 px-6 font-serif font-bold text-stone-900 text-sm">
                          ${cust.totalSpent.toFixed(2)}
                        </td>

                        {/* Last order timestamp */}
                        <td className="py-4 px-6 text-[11px] text-stone-400">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-stone-400" />
                            {cust.lastOrderDate
                              ? new Date(
                                  cust.lastOrderDate,
                                ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Main Table: Staff Tab */}
      {activeTab === "staff" && (
        <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50/75 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="py-4 px-6">Staff Member</th>
                  <th className="py-4 px-6">Assigned Role</th>
                  <th className="py-4 px-6">Access Level</th>
                  <th className="py-4 px-6">Contact Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredStaff.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-stone-50/60 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-stone-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900 text-xs">
                            {staff.name}
                          </p>
                          <p className="text-[11px] text-stone-400">
                            {staff.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-700 font-medium">
                      {staff.role}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        <ShieldCheck className="w-3 h-3 text-purple-600" />
                        <span>{staff.badge}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-stone-500 text-[11px]">
                      {staff.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersStaff;
