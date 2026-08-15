import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UtensilsCrossed,
  Home,
  ArrowLeft,
  SearchX,
  ChefHat,
} from "lucide-react";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-8 relative z-10">
        <Link to="/" className="inline-flex items-center space-x-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform duration-200">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <span className="font-serif font-bold text-3xl text-white tracking-tight">
            Savory<span className="text-brand-500">Bistro</span>
          </span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-stone-850 py-10 px-6 sm:px-12 shadow-2xl rounded-3xl border border-stone-800 backdrop-blur-xl">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-stone-900/80 border border-stone-700/80 flex items-center justify-center text-brand-500 mb-6 shadow-inner relative">
            <ChefHat className="w-10 h-10 text-brand-400 animate-pulse" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-stone-400 mb-8 leading-relaxed">
            Sorry, the page you are looking for does not exist.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-stone-600 text-white text-xs font-semibold transition-all duration-200 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white text-xs font-semibold transition-all duration-200 shadow-glow active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
