
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/korisnik/login', {
        KorisnickoIme: username,
        Lozinka: password
      });

      const { token, user } = res.data;

      if (!user) {
        throw new Error("Prijava nije uspela. Korisnik nije pronađen.");
      }

      login(user, token);

      alert('Uspešna prijava!');

      if (user.TipKorisnikaID === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Greška prilikom prijave');
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="login-bg login-page">
      <Navbar />
      <main className="login-wrapper">
        <div className="login-container">
          <h2>Prijavi se</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Korisničko ime"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Lozinka"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn">Prijavi se</button>
          </form>
          <p>Nemate nalog? <Link to="/register">Registrujte se</Link></p>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Login;
