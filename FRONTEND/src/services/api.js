import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: false, // ostavi false ako koristiš JWT u localStorage
});

// Interceptor za dodavanje tokena u svaki zahtev
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Greška pri dodavanju tokena:", e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor za odgovor - automatski odjavi ako token nije validan
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Neispravan ili istekao token, korisnik odjavljen.");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // automatski prebacuje na login
    }
    return Promise.reject(error);
  }
);

export default API;
