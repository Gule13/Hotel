const express = require('express');
const c = require('../controllers/sto-controller');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const r = express.Router();
r.get('/', c.getAll);
r.get('/:id', c.getById);
r.post('/', auth, adminOnly, c.create);
r.put('/:id', auth, adminOnly, c.update);
r.delete('/:id', auth, adminOnly, c.delete);
module.exports = r;
