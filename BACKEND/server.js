// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const app = express();
// const PORT = 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Rute
// app.use('/korisnik', require('./routes/korisnik'));
// app.use('/tipkorisnika', require('./routes/tipkorisnika'));
// app.use('/tipsobe', require('./routes/tipsobe'));
// app.use('/soba', require('./routes/soba'));
// app.use('/rezervacija', require('./routes/rezervacija'));
// app.use('/sto', require('./routes/sto'));
// app.use('/rezervacija_stola', require('./routes/rezervacija_stola'));
// app.use('/novosti', require('./routes/novosti'));


// // Pokretanje servera
// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server pokrenut na portu ${PORT}`));
// }).catch(err => {
//   console.error('Greška prilikom konekcije na bazu:', err);
// });
// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/database');

// Učitaj sve modele (registracija asocijacija)
require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

/* -------------------- Middleware -------------------- */

// CORS (dozvoli front na 3000 i sve ostalo u dev)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON body
app.use(express.json());

// Statika za upload-ove (apsolutna putanja, cache 7d)
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    fallthrough: false,
    etag: true,
    maxAge: '7d'
  })
);

// (Opciono: eksplicitno exposes /uploads/novosti, ali /uploads već pokriva)
app.use(
  '/uploads/novosti',
  express.static(path.join(__dirname, 'uploads', 'novosti'), {
    fallthrough: false,
    etag: true,
    maxAge: '7d'
  })
);

// Jednostavan request logger
app.use((req, _res, next) => {
  console.log('>>>', req.method, req.originalUrl);
  next();
});

/* ----------------------- Rute ----------------------- */
app.use('/korisnik', require('./routes/korisnik'));
app.use('/tipkorisnika', require('./routes/tipkorisnika'));
app.use('/tipsobe', require('./routes/tipsobe'));
app.use('/soba', require('./routes/soba'));
app.use('/rezervacija', require('./routes/rezervacija'));
app.use('/sto', require('./routes/sto'));
app.use('/rezervacija_stola', require('./routes/rezervacija_stola'));
app.use('/novosti', require('./routes/novosti'));

// Health-check
app.get('/healthz', (_req, res) => res.json({ ok: true }));

// 404 fallback za nepostojeće rute
app.use((req, res) => {
  res.status(404).json({ message: `Ruta nije pronađena: ${req.method} ${req.originalUrl}` });
});

// Global error handler (da se ne bi rušio proces)
app.use((err, _req, res, _next) => {
  console.error('💥 Global error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

/* ------------------- Pokretanje --------------------- */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB konekcija OK');
    app.listen(PORT, () => console.log(`🚀 Server pokrenut na portu ${PORT}`));
  } catch (err) {
    console.error('❌ Greška prilikom konekcije na bazu:', err.message);
    process.exit(1);
  }
})();
