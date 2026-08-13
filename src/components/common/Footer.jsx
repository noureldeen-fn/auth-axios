import React from 'react';
import { UtensilsCrossed, Heart, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-2xl text-white tracking-tight">
                Savory<span className="text-brand-500">Bistro</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Crafting unforgettable culinary memories through artisanal gastronomy, heritage ingredients, and heartfelt hospitality.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 hover:text-white flex items-center justify-center text-stone-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="text-stone-400 hover:text-brand-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-stone-400 hover:text-brand-400 transition-colors">
                  Our Story & Philosophy
                </a>
              </li>
              <li>
                <a href="#featured" className="text-stone-400 hover:text-brand-400 transition-colors">
                  Featured Dishes
                </a>
              </li>
              <li>
                <a href="#info" className="text-stone-400 hover:text-brand-400 transition-colors">
                  Reservations & Hours
                </a>
              </li>
              <li>
                <Link to="/login" className="text-stone-400 hover:text-brand-400 transition-colors">
                  Staff & Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
                <span>482 Gastronomy Way, Culinary District, Metropolis, NY 10012</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <span>+1 (555) 382-7490</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <span>reservations@savorybistro.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-white text-lg font-semibold">Join The Tasting Club</h4>
            <p className="text-stone-400 text-sm">
              Receive seasonal chef tasting invites, wine pairing notes, and private event announcements.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} SavoryBistro Restaurant Management. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Collaborative Restaurant Project</span>
            <span>•</span>
            <span className="flex items-center">
              Crafted with <Heart className="w-3.5 h-3.5 text-brand-500 mx-1 inline" /> for fine food enthusiasts
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
