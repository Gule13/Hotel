import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RefreshContext } from '../context/RefreshContext';
import API from '../services/api';

const sobe = [
  {
    ID: 1,
    Naziv: 'Standard soba',
    Opis: 'Osnovna udobnost i funkcionalnost',
    Slika: '/Soba1.webp',
  },
  {
    ID: 2,
    Naziv: 'Deluxe soba',
    Opis: 'Više prostora i moderniji dizajn',
    Slika: '/Soba2.jpg',
  },
  {
    ID: 3,
    Naziv: 'Predsednički apartman',
    Opis: 'Vrhunski luksuz i privatnost',
    Slika: '/Soba3.webp',
  },
];

const Rezervacija = () => {
  const { triggerRefresh } = useContext(RefreshContext);
  const [step, setStep] = useState(1);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (checkin && checkout && checkout > checkin) {
      setStep(2);
    } else {
      alert('Unesite ispravne datume!');
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleNext = () => {
    if (selectedRoom) {
      setStep(3);
    } else {
      alert('Izaberite sobu!');
    }
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const korisnik = JSON.parse(localStorage.getItem('user'));
      if (!korisnik || !token) {
        alert("Morate biti prijavljeni za rezervaciju.");
        return;
      }

      const payload = {
        KorisnikID: korisnik.ID,
        SobaID: selectedRoom.ID,
        DatumOd: checkin,
        DatumDo: checkout,
      };

      await API.post('/rezervacija', payload);
      triggerRefresh?.();

      alert('Rezervacija uspešno kreirana!');
      setStep(1);
      setSelectedRoom(null);
      setCheckin('');
      setCheckout('');
    } catch (err) {
      alert('Greška prilikom kreiranja rezervacije');
      console.error('Greška prilikom rezervacije:', err.response?.data || err.message || err);

    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="login-bg rezervacija-page">
      <Navbar />
      <main className="login-wrapper">
        <div className="login-container">
          <h1>Rezervacija sobe</h1>

          {step === 1 && (
            <form className="date-form" onSubmit={handleDateSubmit}>
              <label>Datum dolaska</label>
              <input
                type="date"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                required
              />
              <label>Datum odlaska</label>
              <input
                type="date"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                required
              />
              <button type="submit" className="btn">Prikaži raspoloživost</button>
            </form>
          )}

    {step === 2 && (
  <div>
    <div className="room-cards" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      {sobe.map((room) => (
        <div
          key={room.ID}
          onClick={() => handleRoomSelect(room)}
          style={{
            backgroundImage: `url(${room.Slika})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px',
            width: '250px',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: 'pointer',
            position: 'relative',
            border: selectedRoom?.ID === room.ID ? '3px solid #4b9fff' : '3px solid transparent',
            transition: 'transform 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.6)',
              borderRadius: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              color: '#111',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            <h3 style={{ marginBottom: '5px' }}>{room.Naziv}</h3>
            <p style={{ fontWeight: '400', fontSize: '14px' }}>{room.Opis}</p>
          </div>
        </div>
      ))}
    </div>
    <button onClick={handleNext} className="btn" style={{ marginTop: '20px' }}>
      Izaberi sobu
    </button>
  </div>
)}



          {step === 3 && selectedRoom && (
            <div>
              <h2>Potvrda rezervacije</h2>
              <p><strong>Soba:</strong> {selectedRoom.Naziv}</p>
              <p><strong>Datum dolaska:</strong> {checkin}</p>
              <p><strong>Datum odlaska:</strong> {checkout}</p>
              <button className="btn" onClick={handleConfirm}>Potvrdi rezervaciju</button>
            </div>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Rezervacija;
