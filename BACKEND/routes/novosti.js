const express = require('express');
const path = require('path');
const multer = require('multer');
const c = require('../controllers/novosti-controller');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', 'uploads', 'novosti')),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random()*1e9) + path.extname(file.originalname))
});
const upload = multer({ storage });

const r = express.Router();

// Javno
r.get('/', c.getAll);
r.get('/:id', c.getById);

// Admin
r.post('/', auth, adminOnly, upload.single('Putanja'), c.create);
r.put('/:id', auth, adminOnly, upload.single('Putanja'), c.update);
r.delete('/:id', auth, adminOnly, c.delete);

module.exports = r;
