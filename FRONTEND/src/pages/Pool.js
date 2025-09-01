import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// import '../styles.css';

const Pool = () => {
  return (
    <div className="restaurant-page">
       <Navbar />

      <section className="restaurant-section">
        <div className="restaurant-image">
          <img
            src="/Pool.jpg"
            alt="Restoran Soleil"
          />
        </div>
        <div className="restaurant-content">
          <h1>Dobrodošli u naš Bazen</h1>
          <p>
            Uživajte u opuštanju i osveženju u našem bazenu, savršenom mestu za relaksaciju i rekreaciju.
            Bazen je idealan za sve uzraste, bilo da želite da se opustite uz mirne talase ili da se osvežite
            tokom toplih dana. Uz prelepu okolinu, naš bazen pruža pravi ugođaj za vaš odmor. Pridružite nam se i uživajte u vodi koja osvežava vaše telo i um.
          </p>
          <p className="working-hours-text">
            <strong>Radno vrijeme:</strong><br />
            10:00h - 22:00h
          </p>
        </div>
      </section>
      
    </div>
    
  );
};

export default Pool;
