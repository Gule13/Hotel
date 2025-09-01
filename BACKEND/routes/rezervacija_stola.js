const express = require('express');
const c = require('../controllers/rezervacija_stola-controller');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const r = express.Router();

r.get('/', c.getAll);
r.get('/moje', auth, c.getMine);      // ✅ DODATO
r.get('/:id', c.getById);

r.post('/', auth, c.create);
r.put('/:id', auth, c.update);
r.delete('/:id', auth, adminOnly, c.delete);

module.exports = r;
