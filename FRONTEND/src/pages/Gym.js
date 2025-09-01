import React, { useEffect } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
;


const Gym = () => {
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    
    <div className="gym-page">
       <Navbar />

      <main className="gym-main">
        <section className="restaurant-section">
          <div className="restaurant-image">
            <img src="/gym.jpg" alt="Teretana" />
          </div>
          <div className="restaurant-content">
            <h1>Dobrodošli u našu Teretanu</h1>
            <p>
              Naša teretana je savršeno mesto za postizanje vaših fitness ciljeva. Opremljeni najnovijom opremom,
              nudimo sve što vam je potrebno za efikasan trening. Bilo da želite da poboljšate kondiciju, povećate
              snagu ili oblikujete telo, naš tim stručnjaka će vam pomoći da postignete rezultate.
              Teretana je otvorena za sve – od početnika do profesionalaca.
            </p>
            <p className="working-hours-text">
              <strong>Radno vrijeme:</strong><br />
              10:00h - 23:00h
            </p>
          </div>
        </section>
      </main>
    <Footer />
    </div>
  );
};

export default Gym;
