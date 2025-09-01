import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// import '../styles.css';

const Restaurant = () => {
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
            src="/restaurant.jpg"
            alt="Restoran Soleil"
          />
        </div>
        <div className="restaurant-content">
          <h1>Dobrodošli u naš Restoran</h1>
          <p>
            Restoran nudi jedinstveno iskustvo uz prelepi pogled na more. Uživajte u specijalitetima pripremljenim od strane naših vrhunskih kuvara, uz pažljivo odabrana vina i koktele.
          </p>
          <p>
            Naš restoran je savršeno mesto za opuštanje i uživanje u nezaboravnim trenucima sa porodicom i prijateljima.
          </p>
          <div className="restaurant-row">
            <p className="working-hours-text" style={{ marginBottom: 0 }}>
              <strong>Radno vrijeme:</strong><br />
              07:00h - 23:00h
            </p>
            <Link to="/rezervacijasto" className="btn-reserves">Rezervišite Vaš sto</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Restaurant;
