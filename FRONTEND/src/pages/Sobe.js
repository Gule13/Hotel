import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import API from '../services/api';


const Sobe = () => {
  const [sobe, setSobe] = useState([]);

  useEffect(() => {
    API.get('/soba')
      .then(res => setSobe(res.data))
      .catch(err => console.error('Greška pri dohvatanju soba:', err));
  }, []);

  return (
    <>
      <Navbar />

      <section className="room-details">
        <div className="room-description">
          <h2>Luksuzne Sobe</h2>
          <p>
            Naše luksuzne sobe nude vrhunski komfor i eleganciju. Opremljene su modernim nameštajem,
            prostranim dnevnim boravcima, privatnim balkonima i luksuznim kupatilima.
          </p>
          <ul>
            <li>Besplatan Wi-Fi</li>
            <li>Klima uređaj</li>
            <li>Mini bar</li>
            <li>Room service 24/7</li>
          </ul>
        </div>
      </section>


{localStorage.getItem('tipKorisnika') === '1' && (
  <section className="room-list">
    <h2>Pregled svih soba (ADMIN)</h2>
    {sobe.length === 0 ? (
      <p>Trenutno nema dostupnih soba.</p>
    ) : (
      <ul>
        {sobe.map(soba => (
          <li key={soba.ID}>
            Broj: {soba.BrojSobe}, Sprat: {soba.Sprat}, Tip: {soba.TipSobeID}
          </li>
        ))}
      </ul>
    )}
  </section>
)}


      
      <section className="apartment-section">
        <div className="apartment-image">
          <img src="/Soba1.webp" alt="Apartman" />
        </div>
        <div className="apartment-text">
          <h2>Standard Sobe</h2>
          <p>
            Naše standard sobe nude udoban i prijatan ambijent za boravak. Opremljene su francuskim ili dva odvojena kreveta,
            kupatilom, TV-om, klima uređajem, mini-barom i besplatnim Wi-Fi internetom.
          </p>
          <p>
            Idealne su za kratkoročni boravak.
            <p>
              Cijena: 100$/noć!
            </p>
            
          </p>
          <Link to="/rezervacija" className="btn-reserve">Rezerviši</Link>
        </div>
      </section>

      <section className="apartment-section">
        <div className="apartment-text">
          <h2>Deluxe Sobe</h2>
          <p>
            Naše deluxe sobe pružaju dodatni luksuz i prostranost. Opremljene su king-size krevetima,
            elegantnim nameštajem, modernim kupatilima i privatnim balkonima.
          </p>
          <p>
            Deluxe sobe uključuju dodatne pogodnosti kao što su aparat za kafu, premium kozmetika i usluga doručka u sobi.
            <p>
              Cijena: 500$/noć!
            </p>
          </p>
          <Link to="/rezervacija" className="btn-reserve">Rezerviši</Link>
        </div>
        <div className="apartment-image">
          <img src="/Soba2.jpg" alt="Deluxe Soba" />
        </div>
      </section>

      <section className="apartment-section">
        <div className="apartment-image">
          <img src="/Soba3.webp" alt="Predsednički Apartman" />
        </div>
        <div className="apartment-text">
          <h2>Predsednički Apartman</h2>
          <p>
            Predsednički apartman je vrhunac luksuza i elegancije. Opremljen je prostranim dnevnim boravkom,
            privatnom trpezarijom, luksuznim kupatilom i spavaćom sobom sa king-size krevetom.
          </p>
          <p>
            Uključuje privatnu terasu sa panoramskim pogledom i personalizovanu uslugu.
            <p>
               Cijena: 10.000$/noć!
            </p>
          </p>
          <Link to="/rezervacija" className="btn-reserve">Rezerviši</Link>
        </div>
      </section>

    </>
  );
};

export default Sobe;
