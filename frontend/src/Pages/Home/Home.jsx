import React from 'react';
import HeroSection from '../../components/HeroSection';
import About from '../../components/About';
import Qualities from '../../components/Qualities';
import WhoAreWe from '../../components/WhoAreWe';
import Team from '../../components/Team';
import Reservation from '../../components/Reservation';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <>
      {/* Home Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* About Us Section */}
      <section id="about">
        <About />
      </section>

      {/* Services Section */}
      <section id="services">
        <Qualities />
      </section>

      {/* Who Are We Section */}
      <section id="whoAreWe">
        <WhoAreWe />
      </section>

      {/* Team Section */}
      <section id="team">
        <Team />
      </section>

      {/* Reservation Section */}
      <section id="reservation">
        <Reservation />
      </section>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Home;