const express = require('express');
const c = require('../controllers/korisnik-controller');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const router = express.Router();

// VAŽNO: middleware i handleri moraju biti FUNKCIJE, bez zagrada!
router.get('/', auth, adminOnly, c.getAll);
router.get('/:id', auth, c.getById);

// auth endpoints
router.post('/register', c.register);
router.post('/login', c.login);

// CRUD (admin only)
router.post('/', auth, adminOnly, c.create);
router.put('/:id', auth, adminOnly, c.update);
router.delete('/:id', auth, adminOnly, c.delete);

module.exports = router;
