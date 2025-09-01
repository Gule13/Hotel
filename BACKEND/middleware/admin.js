// middleware/admin.js
module.exports = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Niste prijavljeni' });
  }

  // Proveri da li je admin
  // ⚠️ u tvojoj bazi pretpostavljam da je TipKorisnikaID = 1 za admina
  if (user.TipKorisnikaID === 1) {
    return next();
  }

  return res.status(403).json({ message: 'Samo admini imaju pristup' });
};
