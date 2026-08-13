import React, { useState } from 'react';
import { Clock, MapPin, Phone, Mail, Calendar, Users, CheckCircle, Sparkles } from 'lucide-react';

export const RestaurantInfo = () => {
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '2',
    date: '',
    time: '19:00',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setReservationSubmitted(true);
    setTimeout(() => {
      setReservationSubmitted(false);
      setFormData({ name: '', email: '', guests: '2', date: '', time: '19:00' });
    }, 4000);
  };

  return (
    <section id="info" className="py-24 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Information & Hours */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-brand-600" />
                <span>Visit & Experience</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Hours, Location & Reservations
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Whether celebrating an anniversary, hosting an executive dinner, or dropping in for an evening cocktail at the bar, our doors are open for you.
              </p>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-brand-600" />
                <span>Dining Service Hours</span>
              </h3>
              
              <div className="space-y-2.5 text-sm text-stone-600 divide-y divide-stone-200/60">
                <div className="flex justify-between items-center pt-1.5">
                  <span className="font-medium text-stone-800">Monday – Thursday</span>
                  <span className="text-stone-600">11:30 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between items-center pt-2.5">
                  <span className="font-medium text-stone-800">Friday – Saturday</span>
                  <span className="text-brand-600 font-semibold">11:30 AM – 11:30 PM</span>
                </div>
                <div className="flex justify-between items-center pt-2.5">
                  <span className="font-medium text-stone-800">Sunday Brunch & Dinner</span>
                  <span className="text-stone-600">10:30 AM – 9:30 PM</span>
                </div>
              </div>
            </div>

            {/* Contact Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-stone-900">Location</p>
                  <p className="text-stone-500 mt-0.5">482 Gastronomy Way, Manhattan, NY</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-stone-900">Direct Inquiries</p>
                  <p className="text-stone-500 mt-0.5">+1 (555) 382-7490</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Reservation Card */}
          <div className="lg:col-span-6">
            <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Table Request</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold">Reserve Your Table</h3>
                  <p className="text-stone-400 text-xs sm:text-sm">
                    Guaranteed seating for fine dining and chef tasting experiences.
                  </p>
                </div>

                {reservationSubmitted ? (
                  <div className="py-8 text-center space-y-3 bg-stone-800/80 rounded-2xl p-6 border border-brand-500/40">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="font-serif text-xl font-bold text-white">Table Request Received!</h4>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      Our host team will confirm your reservation via email within 15 minutes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Sophia Laurent"
                          className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="sophia@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Party Size</label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl bg-stone-800 border border-stone-700 text-sm text-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="6">6 Guests</option>
                          <option value="8+">8+ Guests (VIP)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Date</label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl bg-stone-800 border border-stone-700 text-sm text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">Preferred Time</label>
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl bg-stone-800 border border-stone-700 text-sm text-white focus:outline-none focus:border-brand-500"
                        >
                          <option value="17:30">5:30 PM</option>
                          <option value="18:30">6:30 PM</option>
                          <option value="19:30">7:30 PM</option>
                          <option value="20:30">8:30 PM</option>
                          <option value="21:30">9:30 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-glow hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      Confirm Table Reservation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantInfo;
