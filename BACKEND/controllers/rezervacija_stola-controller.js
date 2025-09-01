// controllers/rezervacija_stola-controller.js
const repo = require('../repositories/rezervacija_stola-repository');

// ✅ sve rezervacije (admin)
exports.getAll = async (_, res) => {
  try {
    const list = await repo.getAll();
    res.json(list);
  } catch (err) {
    console.error("Greška u getAll (rez. stolova):", err);
    res.status(500).json({ message: "Greška pri dohvatanju rezervacija stolova" });
  }
};

// ✅ jedna rezervacija po ID
exports.getById = async (req, res) => {
  try {
    const x = await repo.getById(req.params.id);
    return x ? res.json(x) : res.status(404).json({ message: 'Rezervacija stola nije pronađena' });
  } catch (err) {
    console.error("Greška u getById (rez. stolova):", err);
    res.status(500).json({ message: "Greška pri dohvatanju rezervacije stola" });
  }
};

// ✅ moje rezervacije (ulogovani korisnik)
exports.getMine = async (req, res) => {
  try {
    if (!req.user?.ID) return res.status(401).json({ message: 'Niste prijavljeni' });
    const list = await repo.getByUserId(req.user.ID);
    res.json(list);
  } catch (err) {
    console.error("Greška u getMine (rez. stolova):", err);
    res.status(500).json({ message: "Greška pri dohvatanju mojih rezervacija stolova" });
  }
};

// ✅ kreiranje rezervacije
exports.create = async (req, res) => {
  try {
    if (!req.user?.ID) return res.status(401).json({ message: 'Niste prijavljeni' });

    const isAdmin = req.user.TipKorisnikaID === 1;

    const KorisnikID =
      (isAdmin && (req.body.KorisnikID ?? req.body.korisnikID))
        ? Number(req.body.KorisnikID ?? req.body.korisnikID)
        : req.user.ID;

    const StoID = req.body.StoID ?? req.body.stoId ?? req.body.sto?.ID;
    const Datum = req.body.Datum ?? req.body.datum;
    const Od = req.body.Od ?? req.body.od;
    const Do = req.body.Do ?? req.body.do;

    if (!StoID || !Datum || !Od || !Do) {
      return res.status(400).json({ message: "Nedostaju obavezna polja" });
    }

    const created = await repo.create({ KorisnikID, StoID, Datum, Od, Do });
    res.status(201).json(created);
  } catch (err) {
    console.error("Greška u create (rez. stolova):", err);
    res.status(500).json({ message: "Greška pri kreiranju rezervacije stola" });
  }
};

// ✅ izmena rezervacije
exports.update = async (req, res) => {
  try {
    const isAdmin = req.user?.TipKorisnikaID === 1;
    const data = { ...req.body };

    if (isAdmin && (req.body.KorisnikID ?? req.body.korisnikID)) {
      data.KorisnikID = Number(req.body.KorisnikID ?? req.body.korisnikID);
    }

    const x = await repo.update(req.params.id, data);
    return x ? res.json(x) : res.status(404).json({ message: 'Rezervacija stola nije pronađena' });
  } catch (err) {
    console.error("Greška u update (rez. stolova):", err);
    res.status(500).json({ message: "Greška pri izmeni rezervacije stola" });
  }
};

// ✅ brisanje rezervacije
exports.delete = async (req, res) => {
  try {
    const x = await repo.delete(req.params.id);
    return x ? res.json(x) : res.status(404).json({ message: 'Rezervacija stola nije pronađena' });
  } catch (err) {
    console.error("Greška u delete (rez. stolova):", err);
    res.status(500).json({ message: "Greška pri brisanju rezervacije stola" });
  }
};
