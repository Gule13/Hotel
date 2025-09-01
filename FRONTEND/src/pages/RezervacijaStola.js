import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from '../services/api';
import { RefreshContext } from '../context/RefreshContext';

const RezervacijaStola = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [stolovi, setStolovi] = useState([]);
  const [zauzetiStoIds, setZauzetiStoIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { triggerRefresh } = useContext(RefreshContext);

  // Učitavanje svih stolova
  useEffect(() => {
    API.get('/sto')
      .then(res => setStolovi(res.data))
      .catch(err => console.error('Greška pri dohvatanju stolova:', err));
  }, []);

  // Provera zauzetosti stolova
  useEffect(() => {
    if (step === 2 && date && start && end) {
      API.get('/rezervacija_stola/zauzeti', {
        params: { datum: date, od: start, do: end }
      })
        .then(res => setZauzetiStoIds(res.data))
        .catch(err => console.error('Greška pri proveri zauzetih:', err));
    }
  }, [step, date, start, end]);

  // Podnošenje datuma i vremena
  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (date && start && end && start < end) {
      setStep(2);
    } else {
      alert('Unesite validan datum i vreme.');
    }
  };

  // Slanje rezervacije
  const handleTableSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedTable) {
      alert('Izaberite sto');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Morate biti prijavljeni za rezervaciju.');
        return;
      }

      const payload = {
        StoID: selectedTable.ID,
        Datum: date,
        Od: start,
        Do: end
      };

      await API.post('/rezervacija_stola', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Rezervacija uspešno poslata!');
      triggerRefresh(); // 🔁 obavesti MojeRezervacije da se osveži

      // Resetuj formu
      setStep(1);
      setSelectedTable(null);
      setDate('');
      setStart('');
      setEnd('');
    } catch (err) {
      if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Greška prilikom slanja rezervacije.');
      }
      console.error(err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="page-wrapper rezervacija-stola-bg bdrss">
      <Navbar />
      <div className="container wide-container" style={{ paddingTop: '40px', marginBottom: '60px' }}>
        <h1>Rezervacija stola</h1>

        {step === 1 && (
          <form onSubmit={handleDateSubmit}>
            <label>Datum:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <label>Od:</label>
            <input type="time" value={start} onChange={(e) => setStart(e.target.value)} required />
            <label>Do:</label>
            <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} required />
            <button type="submit" className="btn">Prikaži slobodne stolove</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleTableSubmit}>
            <div className="tables-row">
              {stolovi.map((sto) => {
                const zauzet = zauzetiStoIds.includes(sto.ID);
                const inputId = `sto-${sto.ID}`;

                return (
                  <div key={sto.ID} className={`table-card-wrapper ${zauzet ? 'unavailable' : ''}`}>
                   <input
  type="radio"
  id={inputId}
  name="table"
  value={sto.ID}
  disabled={zauzet}
  checked={selectedTable?.ID === sto.ID}
  onChange={() => setSelectedTable(sto)}
  style={{ display: 'none' }} // ili potpuno izbaci style
/>

                    <label
  htmlFor={inputId}
  className="table-card"
  onClick={() => setSelectedTable(sto)}
>
                      <span className="table-icon"><i className="fas fa-utensils"></i></span>
                      <span className="table-name">Sto {sto.ID} ({sto.BrojStolica})</span>
                    </label>
                  </div>
                );
              })}
            </div>
            <button type="submit" className="btn" style={{ marginTop: '24px' }}>Rezerviši sto</button>
          </form>
        )}

        {errorMessage && (
          <div className="error-message" style={{ marginTop: '20px', color: 'red' }}>
            {errorMessage}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RezervacijaStola;
