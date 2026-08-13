import React from 'react';

/**
 * Dish Card Skeleton Loader
 */
export const DishCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-soft animate-pulse flex flex-col h-full">
      <div className="h-52 bg-stone-200 w-full animate-shimmer" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-stone-200 rounded-md w-24" />
            <div className="h-4 bg-stone-200 rounded-md w-12" />
          </div>
          <div className="h-6 bg-stone-200 rounded-md w-3/4" />
          <div className="h-3.5 bg-stone-100 rounded-md w-full" />
          <div className="h-3.5 bg-stone-100 rounded-md w-4/5" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="h-6 bg-stone-200 rounded-md w-16" />
          <div className="h-9 bg-stone-200 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};

/**
 * Table Row Skeleton for Admin Dishes Listing
 */
export const TableRowSkeleton = ({ columns = 5 }) => {
  return (
    <tr className="animate-pulse border-b border-stone-100">
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-stone-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-stone-200 rounded w-36" />
            <div className="h-3 bg-stone-100 rounded w-24" />
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="h-4 bg-stone-200 rounded w-20" />
      </td>
      <td className="py-4 px-4">
        <div className="h-4 bg-stone-200 rounded w-16" />
      </td>
      <td className="py-4 px-4">
        <div className="h-6 bg-stone-200 rounded-full w-20" />
      </td>
      <td className="py-4 px-4 text-right">
        <div className="h-8 bg-stone-200 rounded-lg w-16 ml-auto" />
      </td>
    </tr>
  );
};

/**
 * StatCard Skeleton Loader
 */
export const StatCardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-soft animate-pulse flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 bg-stone-200 rounded w-28" />
        <div className="h-8 bg-stone-200 rounded w-20" />
        <div className="h-3 bg-stone-100 rounded w-32" />
      </div>
      <div className="w-12 h-12 rounded-2xl bg-stone-200" />
    </div>
  );
};

/**
 * Full Page Spinner / Suspense Fallback
 */
export const PageLoader = ({ message = 'Loading SavoryBistro...' }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <div className="absolute font-serif font-bold text-brand-600 text-xs">SB</div>
      </div>
      <p className="text-stone-500 font-medium text-sm animate-pulse">{message}</p>
    </div>
  );
};

export default {
  DishCardSkeleton,
  TableRowSkeleton,
  StatCardSkeleton,
  PageLoader,
};
