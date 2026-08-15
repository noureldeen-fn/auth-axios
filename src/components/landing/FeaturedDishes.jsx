import React, { useState, useEffect, useCallback } from "react";
import { Star, Sparkles, Plus, Clock } from "lucide-react";
import dishesApi from "../../api/dishesApi";
import { DishCardSkeleton } from "../common/LoadingSkeleton";
import { ErrorAlert } from "../common/ErrorAlert";
import { useCart } from "../../context/CartContext";

export const FeaturedDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const fetchFeaturedDishes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dishesApi.getFeaturedDishes();
      // Supports response format { data: [...] } or direct array [...]
      const items = Array.isArray(response) ? response : response.data || [];
      setDishes(items);
    } catch (err) {
      console.error("Failed to fetch featured dishes:", err);
      setError(
        err.message || "Unable to retrieve featured dishes at this time.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedDishes();
  }, [fetchFeaturedDishes]);

  return (
    <section id="featured" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Chef's Daily Selections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Signature Featured Dishes
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Each seasonal dish is an expression of pure flavor, prepared with
            artisanal care and presentation.
          </p>
        </div>

        {/* Error State with Retry */}
        {error && (
          <div className="max-w-2xl mx-auto mb-10">
            <ErrorAlert
              title="Failed to Load Featured Dishes"
              message={error}
              onRetry={fetchFeaturedDishes}
            />
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <DishCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {/* Dishes Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dishes.map((dish) => (
              <div
                key={dish.id || dish._id}
                className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={
                      dish.image ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                      {dish.category}
                    </span>
                    {dish.tags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 bg-brand-500/90 backdrop-blur-md text-white text-[11px] font-semibold rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {dish.rating && (
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm flex items-center space-x-1 text-xs font-bold text-stone-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{dish.rating.toFixed(1)}</span>
                      {dish.reviewsCount && (
                        <span className="text-[10px] text-stone-500 font-normal">
                          ({dish.reviewsCount})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-brand-600 transition-colors">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Price & Action (Ready for Student 2 Cart Integration) */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <span className="text-xs text-stone-400 block font-medium">
                        Price
                      </span>
                      <span className="text-2xl font-bold text-stone-900 font-serif">
                        ${Number(dish.price).toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(dish)}
                      className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white font-semibold text-xs rounded-xl transition-all duration-200 border border-brand-200/80 hover:border-transparent active:scale-95 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Order Dish</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && dishes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="text-stone-500 text-base">
              No featured dishes available currently.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDishes;
