const jwt = require('jsonwebtoken');
const repo = require('../repositories/korisnik-repository');

exports.getAll = async (_, res) => res.json(await repo.getAll());

exports.getById = async (req, res) => {
  const x = await repo.getById(req.params.id);
  return x ? res.json(x) : res.status(404).json({ message: 'Korisnik not found' });
};

exports.register = async (req, res) => {
  // 🚫 bez hash-a, lozinka ide direktno u DB
  const created = await repo.create(req.body);
  res.status(201).json(created);
};

exports.login = async (req, res) => {
  const username = req.body.username ?? req.body.KorisnickoIme;
  const password = req.body.password ?? req.body.Lozinka;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nedostaju kredencijali' });
  }

  const user = await repo.getByUsername(username);
  if (!user) return res.status(401).json({ message: 'Neispravni kredencijali' });

  // 🚫 bez bcrypt — samo plain tekst poređenje
  if (user.Lozinka !== password) {
    return res.status(401).json({ message: 'Neispravni kredencijali' });
  }

  const token = jwt.sign(
    { ID: user.ID, TipKorisnikaID: user.TipKorisnikaID, username: user.KorisnickoIme },
    process.env.JWT_SECRET || 'tajni_kljuc',
    { expiresIn: '7d' }
  );

  res.json({ token, user });
};

exports.create = async (req, res) => res.status(201).json(await repo.create(req.body));

exports.update = async (req, res) => {
  const x = await repo.update(req.params.id, req.body);
  return x ? res.json(x) : res.status(404).json({ message: 'Korisnik not found' });
};

exports.delete = async (req, res) => {
  const x = await repo.delete(req.params.id);
  return x ? res.json(x) : res.status(404).json({ message: 'Korisnik not found' });
};
