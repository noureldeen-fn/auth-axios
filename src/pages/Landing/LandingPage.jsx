import React from 'react';
import Navbar from '../../components/common/Navbar';
import Hero from '../../components/landing/Hero';
import About from '../../components/landing/About';
import FeaturedDishes from '../../components/landing/FeaturedDishes';
import RestaurantInfo from '../../components/landing/RestaurantInfo';
import Footer from '../../components/common/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <FeaturedDishes />
        <RestaurantInfo />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
