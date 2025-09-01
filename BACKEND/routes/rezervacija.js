const express = require('express');
const c = require('../controllers/rezervacija-controller');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const r = express.Router();

// (privremeno možeš videti koje funkcije stižu)
// console.log('rezervacija-controller exports:', Object.keys(c));

r.get('/', c.getAll);
r.get('/moje', auth, c.getMine);
r.get('/:id', c.getById);

r.post('/', auth, c.create);
r.put('/:id', auth, c.update);
r.delete('/:id', auth, adminOnly, c.delete);

module.exports = r;
