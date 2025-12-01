import React from 'react';
import Hero from '@/components/home/Hero';
import JoinUs from '@/components/home/JoinUs';
import Networks from '@/components/home/Networks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';

/**
 * Home Page
 * Landing page showcasing Paystrata's features and services
 */
const Home: React.FC = () => {
  return (
    <div className="page-wrapper flex flex-col min-h-screen w-full overflow-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Networks />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
