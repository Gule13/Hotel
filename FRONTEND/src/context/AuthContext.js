import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
  const stored = localStorage.getItem('user');
  console.log('🔄 AuthContext INIT. Učitani user iz localStorage:', stored);
  setUser(stored ? JSON.parse(stored) : null);
  setLoading(false);
}, []);


  useEffect(() => {
    // Ako se localStorage promeni u drugom tabu
    const handleStorage = () => {
      const stored = localStorage.getItem('user');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
<AuthContext.Provider value={{ user, login, logout, loading }}>


      {!loading && children}
    </AuthContext.Provider>
  );
};
