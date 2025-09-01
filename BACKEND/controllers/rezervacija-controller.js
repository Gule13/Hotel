// controllers/rezervacija-controller.js
const repo = require('../repositories/rezervacija-repository');

// ✅ Sve rezervacije (samo admin)
exports.getAll = async (_, res) => {
  try {
    const list = await repo.getAll();
    res.json(list);
  } catch (err) {
    console.error("Greška u getAll (rezervacije):", err);
    res.status(500).json({ message: "Greška pri dohvatanju rezervacija" });
  }
};

// ✅ Jedna rezervacija po ID
exports.getById = async (req, res) => {
  try {
    const x = await repo.getById(req.params.id);
    return x ? res.json(x) : res.status(404).json({ message: 'Rezervacija nije pronađena' });
  } catch (err) {
    console.error("Greška u getById (rezervacije):", err);
    res.status(500).json({ message: "Greška pri dohvatanju rezervacije" });
  }
};

// ✅ Samo moje rezervacije (ulogovani korisnik)
exports.getMine = async (req, res) => {
  try {
    if (!req.user?.ID) return res.status(401).json({ message: 'Niste prijavljeni' });
    const list = await repo.getByUserId(req.user.ID);
    res.json(list);
  } catch (err) {
    console.error("Greška u getMine (rezervacije):", err);
    res.status(500).json({ message: "Greška pri dohvatanju mojih rezervacija" });
  }
};

// ✅ Kreiranje rezervacije
exports.create = async (req, res) => {
  try {
    if (!req.user?.ID) return res.status(401).json({ message: 'Niste prijavljeni' });

    const isAdmin = req.user.TipKorisnikaID === 1;

    const KorisnikID =
      (isAdmin && (req.body.KorisnikID ?? req.body.korisnikID))
        ? Number(req.body.KorisnikID ?? req.body.korisnikID)
        : req.user.ID;

    const SobaID = req.body.SobaID ?? req.body.sobaId ?? req.body.soba?.ID;
    const DatumOd = req.body.DatumOd ?? req.body.datumOd;
    const DatumDo = req.body.DatumDo ?? req.body.datumDo;

    if (!SobaID || !DatumOd || !DatumDo) {
      return res.status(400).json({ message: "Nedostaju obavezna polja" });
    }

    const created = await repo.create({ KorisnikID, SobaID, DatumOd, DatumDo });
    res.status(201).json(created);
  } catch (err) {
    console.error("Greška u create (rezervacije):", err);
    res.status(500).json({ message: "Greška pri kreiranju rezervacije" });
  }
};

// ✅ Izmena rezervacije
exports.update = async (req, res) => {
  try {
    const isAdmin = req.user?.TipKorisnikaID === 1;

    const data = { ...req.body };

    // Ako je admin, može promeniti korisnika
    if (isAdmin && (req.body.KorisnikID ?? req.body.korisnikID)) {
      data.KorisnikID = Number(req.body.KorisnikID ?? req.body.korisnikID);
    }

    const x = await repo.update(req.params.id, data);
    return x ? res.json(x) : res.status(404).json({ message: 'Rezervacija nije pronađena' });
  } catch (err) {
    console.error("Greška u update (rezervacije):", err);
    res.status(500).json({ message: "Greška pri izmeni rezervacije" });
  }
};

// ✅ Brisanje rezervacije
exports.delete = async (req, res) => {
  try {
    const x = await repo.delete(req.params.id);
    return x ? res.json(x) : res.status(404).json({ message: 'Rezervacija nije pronađena' });
  } catch (err) {
    console.error("Greška u delete (rezervacije):", err);
    res.status(500).json({ message: "Greška pri brisanju rezervacije" });
  }
};
