import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pocetna from './pages/Pocetna';
import Sobe from './pages/Sobe';
import Login from './pages/Login';
import Register from './pages/Register';
import Rezervacija from './pages/Rezervacija';
import Restaurant from './pages/Restaurant';
import RezervacijaStola from './pages/RezervacijaStola';
import Wellness from './pages/Wellness';
import Pool from './pages/Pool';
import Gym from './pages/Gym';
import Novosti from './pages/Novosti'; // korisnička verzija
import MojeRezervacije from './pages/MojeRezervacije';
import Footer from './components/Footer';
import { RefreshProvider } from './context/RefreshContext';
import RezervacijeSoba from './pages/admin/RezervacijeSoba';
import RezervacijeStolova from './pages/admin/RezervacijeStolova';
import NovostiAdmin from './pages/admin/Novosti'; // admin verzija
import { AuthProvider } from './context/AuthContext';
import NovostDetalj from './pages/NovostDetalj';

function App() {
  return (
  <AuthProvider>
    <RefreshProvider>
      <Router>
        <div className="app-wrapper">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Pocetna />} />
              <Route path="/sobe" element={<Sobe />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rezervacija" element={<Rezervacija />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/rezervacijasto" element={<RezervacijaStola />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/pool" element={<Pool />} />
              <Route path="/gym" element={<Gym />} />
              <Route path="/novosti" element={<Novosti />} /> {/* korisničke novosti */}
              <Route path="/novosti/:id" element={<NovostDetalj />} />
              <Route path="/moje-rezervacije" element={<MojeRezervacije />} />
              <Route path="/admin" element={<RezervacijeSoba />} />
              <Route path="/admin/rezervacije-stolova" element={<RezervacijeStolova />} />
              <Route path="/admin/novosti" element={<NovostiAdmin />} /> {/* admin novosti */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </RefreshProvider>
  </AuthProvider>
  );
}

export default App;
