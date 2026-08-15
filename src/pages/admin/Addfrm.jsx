import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  X,
  Utensils,
  DollarSign,
  Image as ImageIcon,
  Tag,
  Star,
  Loader2,
  Sparkles,
} from "lucide-react";
import dishesApi from "../../api/dishesApi";

export const Addfrm = ({
  isOpen,
  onClose,
  onSaveSuccess,
  initialDish = null,
}) => {
  const isEditMode = Boolean(initialDish);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      category: "Main Course",
      price: "",
      rating: 4.8,
      image: "",
      description: "",
      isFeatured: false,
      available: true,
      tags: "",
    },
  });

  useEffect(() => {
    if (initialDish) {
      reset({
        name: initialDish.name || "",
        category: initialDish.category || "Main Course",
        price: initialDish.price || "",
        rating: initialDish.rating || 4.8,
        image: initialDish.image || "",
        description: initialDish.description || "",
        isFeatured: initialDish.isFeatured || false,
        available:
          initialDish.available !== undefined
            ? initialDish.available
            : initialDish.isAvailable !== undefined
              ? initialDish.isAvailable
              : true,
        tags: Array.isArray(initialDish.tags)
          ? initialDish.tags.join(", ")
          : initialDish.tags || "",
      });
    } else {
      reset({
        name: "",
        category: "Main Course",
        price: "",
        rating: 4.8,
        image: "",
        description: "",
        isFeatured: false,
        available: true,
        tags: "",
      });
    }
  }, [initialDish, reset, isOpen]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price) || 0,
        rating: data.rating !== "" ? Number(data.rating) : 4.8,
        isFeatured: Boolean(data.isFeatured),
        available: Boolean(data.available),
        isAvailable: Boolean(data.available),
        tags: data.tags
          ? data.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      if (isEditMode) {
        await dishesApi.updateDish(initialDish.id || initialDish._id, payload);
      } else {
        await dishesApi.createDish(payload);
      }

      onSaveSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to save dish:", err);
      alert(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while saving the dish.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] my-auto">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                {isEditMode ? "Edit Culinary Offering" : "Add New Dish"}
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500 line-clamp-1">
                {isEditMode
                  ? "Update dish details, pricing, and status"
                  : "Add a new item to the menu catalog"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar"
          noValidate
        >
          {/* Dish Name */}
          <div>
            <label
              className="block text-xs font-semibold text-stone-700 mb-1"
              htmlFor="name"
            >
              Dish Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Chicken Shawarma"
              className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl border bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:bg-white transition-all ${
                errors.name
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-stone-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              }`}
              {...register("name", { required: "Dish name is required" })}
            />
            {errors.name && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                className="block text-xs font-semibold text-stone-700 mb-1"
                htmlFor="category"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                {...register("category")}
              >
                <option value="Main Course">Main Course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div>
              <label
                className="block text-xs font-semibold text-stone-700 mb-1"
                htmlFor="price"
              >
                Price ($ / EGP) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.price
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-stone-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  }`}
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                  })}
                />
              </div>
              {errors.price && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Image & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label
                className="block text-xs font-semibold text-stone-700 mb-1"
                htmlFor="image"
              >
                Image URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <input
                  id="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className={`w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:bg-white transition-all ${
                    errors.image
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-stone-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  }`}
                  {...register("image", { required: "Image URL is required" })}
                />
              </div>
              {errors.image && (
                <p className="text-[11px] text-red-500 mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* <div>
              <label
                className="block text-xs font-semibold text-stone-700 mb-1"
                htmlFor="rating"
              >
                Rating (1 - 5)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <input
                  id="rating"
                  type="number"
                  step="0.1"
                  max="5"
                  min="1"
                  className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                  {...register("rating")}
                />
              </div>
            </div> */}
          </div>

          {/* Tags */}
          <div>
            <label
              className="block text-xs font-semibold text-stone-700 mb-1"
              htmlFor="tags"
            >
              Tags (Comma separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Tag className="w-4 h-4" />
              </div>
              <input
                id="tags"
                type="text"
                placeholder="Chef Special, Organic, Spicy"
                className="w-full pl-9 pr-3.5 py-2 sm:py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                {...register("tags")}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-xs font-semibold text-stone-700 mb-1"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows="3"
              placeholder="Describe flavors, ingredients, preparation..."
              className={`w-full px-3.5 py-2 rounded-xl border bg-stone-50/50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:bg-white transition-all resize-none ${
                errors.description
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-stone-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              }`}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Toggles */}
          <div className="p-3 sm:p-4 rounded-xl bg-stone-50 border border-stone-100 flex flex-col sm:flex-row gap-3 justify-between">
            {/* <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-brand-600 rounded border-stone-300 focus:ring-brand-500"
                {...register("isFeatured")}
              />
              <div>
                <span className="text-xs font-bold text-stone-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-600" /> Featured Dish
                </span>
                <span className="text-[10px] sm:text-[11px] text-stone-500 block">
                  Highlight on landing page
                </span>
              </div>
            </label> */}

            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500"
                {...register("available")}
              />
              <div>
                <span className="text-xs font-bold text-stone-800">
                  In Stock & Available
                </span>
                <span className="text-[10px] sm:text-[11px] text-stone-500 block">
                  Allow orders
                </span>
              </div>
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-end space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 sm:py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white font-semibold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEditMode ? "Update Dish" : "Save & Publish"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addfrm;
