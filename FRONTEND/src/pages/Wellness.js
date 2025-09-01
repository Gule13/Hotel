import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const Wellness = () => {
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="page-wrapper">
       <Navbar />

      <section className="restaurant-section">
        <div className="restaurant-image">
          <img
            src="/Wellness.webp"
            alt="Wellness & Spa"
            className="wellness-img"
          />
        </div>
        <div className="restaurant-content">
          <h1>Dobrodošli u naš Wellness & Spa</h1>
          <p>
            Naš Wellness & Spa je oaza mira i luksuza, smeštena na ekskluzivnoj lokaciji,
            gde se spajaju priroda, tradicija i savremeni tretmani.
          {/* </p>
          <p> */}
            U prijatnom ambijentu, uz mirisne note, toplu vodu i pažljivo odabrane terapije,
            pružamo iskustvo koje obnavlja telo i duh. Naš restoran je savršeno mesto za opuštanje
            i uživanje u nezaboravnim trenucima sa porodicom i prijateljima.
          </p>
          {/* <p>
            Otvoreni smo za goste hotela, ali i za sve koji žele da uživaju u vrhunskoj relaksaciji i nezi.
          </p> */}
          <p className="working-hours-text">
            <strong>Radno vrijeme:</strong><br />
            08:30h - 23:00h
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wellness;
