import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import dishesApi from "../../api/dishesApi";
import { TableRowSkeleton } from "../../components/common/LoadingSkeleton";
import ErrorAlert from "../../components/common/ErrorAlert";
import Addfrm from "./Addfrm.jsx";

export const DishesListing = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'

  const categories = ["All", "Appetizer", "Main Course", "Dessert", "Beverage"];

  const [addfrm, setaddfrm] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handleEdit = (dish) => {
    setSelectedDish(dish);
    setaddfrm(true);
  };

  const handleAddNew = () => {
    setSelectedDish(null);
    setaddfrm(true);
  };

  const fetchDishes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dishesApi.getDishes({
        search: searchQuery,
        category: selectedCategory,
      });
      const items = Array.isArray(response) ? response : response.data || [];
      setDishes(items);
    } catch (err) {
      console.error("Failed to load dishes:", err);
      setError(err.message || "Unable to retrieve dishes from the server.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    // Debounce search query changes
    const timer = setTimeout(() => {
      fetchDishes();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchDishes]);

  const handleEditPlaceholder = (dish) => {
    alert(`Edit "${dish.name}" slot ready for Student 2 CRUD integration.`);
  };

  const handleDelete = async (dish) => {
    const dishId = dish.id || dish._id;

    if (window.confirm(`Are you sure you want to delete "${dish.name}"?`)) {
      try {
        await dishesApi.deleteDish(dishId);

        setDishes((prev) => prev.filter((d) => (d.id || d._id) !== dishId));
      } catch (err) {
        console.error("Failed to delete dish:", err);
        alert(
          err.response?.data?.message ||
            err.message ||
            "Failed to delete dish from server.",
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Dishes & Menu Catalog
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Manage culinary offerings, ingredients, price tiers, and featured
            status
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={fetchDishes}
            disabled={loading}
            className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 transition-colors shadow-soft"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              if (addfrm) {
                setaddfrm(false);
                setSelectedDish(null);
              } else {
                setSelectedDish(null);
                setaddfrm(true);
              }
            }}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-glow transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>{addfrm ? "Close Form" : "+ Add New Dish"}</span>
          </button>
          {addfrm && (
            <Addfrm
              isOpen={addfrm}
              initialDish={selectedDish}
              onClose={() => {
                setaddfrm(false);
                setSelectedDish(null);
              }}
              onSaveSuccess={() => {
                fetchDishes();
              }}
            />
          )}
        </div>
      </div>

      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish name, description, tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Category Pills / Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
          <div className="flex items-center space-x-1 shrink-0 text-xs font-semibold text-stone-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error State with Retry */}
      {error && (
        <ErrorAlert
          title="Failed to Load Dishes"
          message={error}
          onRetry={fetchDishes}
        />
      )}

      {/* Dishes Table Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase text-stone-500 font-semibold tracking-wider">
              <tr>
                <th className="py-4 px-6">Dish Information</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <>
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                  <TableRowSkeleton />
                </>
              ) : dishes.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-stone-400 text-sm"
                  >
                    No dishes found matching your search or filter criteria.
                  </td>
                </tr>
              ) : (
                dishes.map((dish) => (
                  <tr
                    key={dish.id || dish._id}
                    className="hover:bg-stone-50/70 transition-colors group"
                  >
                    {/* Dish Info with Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3.5">
                        <img
                          src={
                            dish.image ||
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200"
                          }
                          alt={dish.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-stone-200"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-stone-900 text-sm truncate">
                              {dish.name}
                            </span>
                            {dish.rating !== undefined &&
                              dish.rating !== null && (
                                <span className="inline-flex items-center space-x-0.5 text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
                                  <Star className="w-3 h-3 fill-amber-400" />
                                  <span>{Number(dish.rating).toFixed(1)}</span>
                                </span>
                              )}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-1 max-w-sm">
                            {dish.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs font-medium">
                        {dish.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <span className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                        ${Number(dish.price).toFixed(2)}
                      </span>
                    </td>

                    {/* Featured Status */}
                    <td className="py-4 px-4">
                      {dish.isFeatured ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded-full text-xs font-semibold">
                          <Sparkles className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-xs text-stone-400">Standard</span>
                      )}
                    </td>

                    {/* Availability Status */}
                    <td className="py-4 px-4">
                      {dish.available ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-600 text-xs font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Available</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-stone-400 text-xs font-medium">
                          <XCircle className="w-4 h-4" />
                          <span>Sold Out</span>
                        </span>
                      )}
                    </td>

                    {/* Actions (Prepared for Student 2) */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(dish)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-brand-600 hover:bg-stone-100 transition-colors"
                          title="Edit Dish"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(dish)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Dish (Student 2)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        {!loading && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <span>Showing {dishes.length} dishes in catalog</span>
            <span className="text-stone-400">
              Student 1 Base Listing Active • CRUD ready for Student 2
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishesListing;
