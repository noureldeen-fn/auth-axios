import React from 'react';
import { Award, Flame, Leaf, Utensils, HeartHandshake } from 'lucide-react';

export const About = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Heirloom & Organic',
      description: 'We partner directly with sustainable micro-farms across the region to harvest vegetables and herbs at peak ripeness.',
    },
    {
      icon: Flame,
      title: 'Wood-Fired Mastery',
      description: 'Our custom white-oak wood ovens infuse nuanced smoke and deep caramelized notes into our meats and artisan breads.',
    },
    {
      icon: Award,
      title: 'Michelin Lineage',
      description: 'Under the guidance of Chef Alessandro Rossi, our brigade brings Michelin-starred precision and discipline to every plate.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Images Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-card border border-stone-100 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
                  alt="Chef Alessandro Rossi preparing dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-stone-900 text-white p-5 rounded-2xl">
                <p className="font-serif text-2xl font-bold text-brand-400">18+</p>
                <p className="text-xs text-stone-300 uppercase tracking-wider font-semibold mt-1">
                  Years of Culinary Mastery
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-brand-50 border border-brand-200/60 p-5 rounded-2xl text-brand-900">
                <HeartHandshake className="w-6 h-6 text-brand-600 mb-2" />
                <p className="font-bold text-sm">Farm-Direct Partners</p>
                <p className="text-xs text-brand-700 mt-1">100% locally traceable</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-card border border-stone-100 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600"
                  alt="Restaurant ambiance"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold">
              <Utensils className="w-3.5 h-3.5 text-brand-600" />
              <span>Our Culinary Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Rooted in Tradition, Elevated by Modern Passion
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              Founded in 2008 in the heart of the culinary district, <strong className="text-stone-900 font-semibold">SavoryBistro</strong> was born from a singular passion: honoring authentic European culinary roots while fearlessly incorporating contemporary flavor profiles.
            </p>

            <p className="text-stone-600 text-base leading-relaxed">
              Every sauce is simmered for over 36 hours, pasta is extruded fresh by hand every morning before sunrise, and our butchery selections adhere to the strictest ethical sourcing standards. For our guests, dining is not merely a meal—it is an intimate celebration of flavor, texture, and aroma.
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-100/60 text-brand-700 flex items-center justify-center">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-stone-900 text-sm">{pillar.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
