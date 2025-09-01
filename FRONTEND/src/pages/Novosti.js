// src/pages/Novosti.js
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
// import '../styles/novosti.css';

const API = 'http://localhost:3001';

export default function Novosti() {
  const [novosti, setNovosti] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${API}/novosti`)
      .then(res => res.json())
      .then(data => setNovosti(Array.isArray(data) ? data : []))
      .catch(err => console.error('Greška pri dohvatanju novosti:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />

      {/* Info o korisniku (po želji ostavi/ukloni) */}
      {/* <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
        {user ? `Prijavljen kao: ${user.KorisnickoIme}` : 'Niste prijavljeni'}
      </div> */}

      <section className="novosti-section">
        <h1 className="novosti-title">Novosti</h1>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Učitavanje…</p>
        ) : novosti.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Nema trenutno dostupnih novosti.</p>
        ) : (
          <div className="novosti-grid">
            {novosti.map((n) => (
              <Link key={n.ID} to={`/novosti/${n.ID}`} className="novost-link">
                <article className="novost-kartica">
                  {n.Putanja && (
                    <img
                      src={`${API}/uploads/novosti/${n.Putanja}`}
                      alt={n.Naslov}
                      className="novost-slika"
                    />
                  )}
                  <div className="novost-body">
                    <h3 className="novost-title">{n.Naslov}</h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
