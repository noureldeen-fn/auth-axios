import React from 'react';
import { ArrowRight, Sparkles, Star, Clock, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-brand-50/60 via-stone-50 to-stone-50">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-300/60 text-brand-900 text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Michelin Guide Selected 2026</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-[1.15] tracking-tight">
              An Epicurean Journey of <span className="text-brand-600 italic font-serif">Artisanal</span> Flavors
            </h1>

            {/* Description */}
            <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience harmonized culinary artistry where farm-fresh seasonal ingredients meet modern culinary techniques, curated by Chef Alessandro Rossi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#featured"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold rounded-2xl transition-all duration-200 shadow-glow hover:-translate-y-0.5"
              >
                <span>Explore Featured Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#info"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white hover:bg-stone-100 text-stone-800 font-semibold rounded-2xl border border-stone-200 shadow-soft transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Book a Table</span>
              </a>
            </div>

            {/* Quick Micro-Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-amber-500 mb-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-stone-900 text-sm ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-stone-500">Over 2,400+ Reviews</p>
              </div>

              <div className="text-center lg:text-left border-x border-stone-200 px-2">
                <div className="flex items-center justify-center lg:justify-start text-brand-600 mb-1">
                  <ChefHat className="w-4 h-4" />
                  <span className="font-bold text-stone-900 text-sm ml-1">100% Organic</span>
                </div>
                <p className="text-xs text-stone-500">Farm-to-Table Fresh</p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-stone-700 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold text-stone-900 text-sm ml-1">Open Daily</span>
                </div>
                <p className="text-xs text-stone-500">11:30 AM - 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Food Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000"
                  alt="A5 Wagyu Ribeye Dish"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-2.5 py-1 bg-brand-600/90 backdrop-blur-sm rounded-lg text-xs font-semibold uppercase tracking-wider mb-2">
                    Chef's Masterpiece
                  </span>
                  <h3 className="font-serif text-2xl font-bold">Pan-Seared Wagyu Ribeye</h3>
                  <p className="text-stone-200 text-xs mt-1">With smoked bone marrow butter & charred broccolini</p>
                </div>
              </div>

              {/* Floating Floating Pill 1: Rating Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-stone-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">
                  ★ 4.9
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Exceptional Dining</p>
                  <p className="text-[10px] text-stone-500">Top Rated in NYC</p>
                </div>
              </div>

              {/* Floating Floating Pill 2: Fresh Ingredients */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-card border border-stone-100 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm">
                  🌿
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Fresh Daily Sourced</p>
                  <p className="text-[10px] text-stone-500">Local Hudson Valley Farms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
