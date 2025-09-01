import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles.css';
import App from './App';

import { AuthProvider } from './context/AuthContext';
import { RefreshProvider } from './context/RefreshContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RefreshProvider>
        <App />
      </RefreshProvider>
    </AuthProvider>
  </React.StrictMode>
);


