import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext); // dodato loading
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const adminRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // ✅ Ne prikazuj ništa dok se AuthContext još učitava
  if (loading) return null;

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
        <span className="logo-text">Luxury Hotel</span>
      </div>

      <nav className="nav">
        <ul>
          <li><Link to="/sobe">Sobe</Link></li>
          <li><a href="/#onama">O nama</a></li>
          <li><a href="/#contact">Kontakt</a></li>

          {user && user.TipKorisnikaID === 1 && (
            <li className="admin-dropdown" ref={adminRef}>
              <button
                className="user-icon-button"
                onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
              >
                Admin panel ▾
              </button>

              {adminDropdownOpen && (
                <div className="dropdown-panel admin-dropdown-panel">
                  <Link to="/admin" className="dropdown-line" style={{ all: 'unset', padding: '10px 16px', fontSize: '14px', textAlign: 'left', display: 'block', cursor: 'pointer' }}>Rezervacije soba</Link>
                  <Link to="/admin/rezervacije-stolova" className="dropdown-line" style={{ all: 'unset', padding: '10px 16px', fontSize: '14px', textAlign: 'left', display: 'block', cursor: 'pointer' }}>Rezervacije stolova</Link>
                  <Link to="/admin/novosti" className="dropdown-line" style={{ all: 'unset', padding: '10px 16px', fontSize: '14px', textAlign: 'left', display: 'block', cursor: 'pointer' }}>Novosti</Link>
                </div>
              )}
            </li>
          )}

          {user && user.KorisnickoIme ? (
            <li className="user-dropdown" ref={dropdownRef}>
              <button
                className="user-icon-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle size={24} />
              </button>

              {dropdownOpen && (
                <div className="dropdown-panel">
                  <div className="dropdown-line"><strong>{user.KorisnickoIme}</strong></div>
                  <div className="dropdown-line">{user.Email}</div>
                  <Link
                    to="/moje-rezervacije"
                    className="dropdown-line"
                    style={{ all: 'unset', padding: '10px 16px', fontSize: '14px', textAlign: 'left', display: 'block', cursor: 'pointer' }}
                  >
                    Moje rezervacije
                  </Link>
                  <button onClick={handleLogout} className="dropdown-line logout-button">Odjavi se</button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link to="/login"><FaUserCircle size={20} /> Prijavi se</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
