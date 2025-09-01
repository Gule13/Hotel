import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { RefreshContext } from '../context/RefreshContext';
import { useContext } from 'react';


const MojeRezervacije = () => {
  const [sobaRezervacije, setSobaRezervacije] = useState([]);
  const [stoRezervacije, setStoRezervacije] = useState([]);

  const { refreshFlag } = useContext(RefreshContext);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Morate biti prijavljeni');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const sobaRes = await API.get('/rezervacija/moje', config);
      const stoRes = await API.get('/rezervacija_stola/moje', config); // koristi rutu koja vraća SAMO korisnikove

      setSobaRezervacije(sobaRes.data);
      setStoRezervacije(stoRes.data);
    } catch (err) {
      console.error('Greška pri dohvaćanju rezervacija:', err);
      alert('Greška pri učitavanju rezervacija');
    }
  };

  fetchData();
}, [refreshFlag]); // dodaj ako koristiš osvežavanje u realnom vremenu


  return (
    <div className="login-bg login-page">
      <Navbar />
      <main className="login-wrapper">
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap', color: '#000' }}>
          {/* Rezervacije soba */}
          <div style={{ flex: '1 1 45%', maxWidth: '600px', color: '#000' }}>
            <h2 style={{ textAlign: 'center', background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>Rezervacije soba</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {sobaRezervacije.length === 0 ? (
                <p>Nemate rezervacija soba.</p>
              ) : (
                sobaRezervacije.map((r) => (
                  <div key={r.ID} style={itemStyle}>
                    <strong>Soba ID:</strong> {r.SobaID} <br />
                    <strong>Datum od:</strong> {r.DatumOd} <br />
                    <strong>Datum do:</strong> {r.DatumDo}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Rezervacije stolova */}
          <div style={{ flex: '1 1 45%', maxWidth: '600px', color: '#000' }}>
            <h2 style={{ textAlign: 'center', background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>Rezervacije stolova</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {stoRezervacije.length === 0 ? (
                <p>Nemate rezervacija stolova.</p>
              ) : (
                stoRezervacije.map((r) => (
                  <div key={r.ID} style={itemStyle}>
                    <strong>Sto ID:</strong> {r.StoID} <br />
                    <strong>Datum:</strong> {r.Datum} <br />
                    <strong>Vreme:</strong> {r.Od} - {r.Do}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

const itemStyle = {
  background: '#fff',
  margin: '10px',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  minWidth: '200px'
};

export default MojeRezervacije;
