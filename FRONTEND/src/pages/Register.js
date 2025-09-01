import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Register() {
  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/korisnik/register', {
        Ime: ime,
        Email: email,
        KorisnickoIme: username,
        Lozinka: password,
        TipKorisnikaID: 2 // default: običan korisnik
      });

      alert('Uspešna registracija!');
      navigate('/login');
    } catch (err) {
  console.log('Greška pri registraciji:', err); // Dodaj ovu liniju
  alert(err.response?.data?.message || 'Greška prilikom registracije');
}

  };
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="login-bg login-page">
      <Navbar />

      <main className="login-wrapper">
        <div className="login-container">
          <h2>Registruj se</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Ime"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Korisničko ime"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Lozinka"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn">Registruj se</button>
          </form>
          <p>Već imate nalog? <Link to="/login">Prijavite se</Link></p>
        </div>
      </main>
    {/* <Footer /> */}
    </div>
    
  );
}

export default Register;
