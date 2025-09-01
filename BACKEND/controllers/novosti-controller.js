// controllers/novosti-controller.js
const path = require('path');
const Novosti = require('../models/Novosti');

// helper: uzmi samo ime fajla, bez foldera
function asFileName(input) {
  if (!input) return null;
  return path.basename(input); // npr. '/uploads/novosti/a.png' -> 'a.png'
}

// helper: napravi URL/relativnu putanju koju frontend može da koristi
function asPublicPath(fileName) {
  if (!fileName) return null;
  // vraćamo relativno: /uploads/novosti/<ime>
  // (ako koristiš proxy u frontu, radiće i kroz :3000;
  // a direktno radi i na :3001 jer server expozuje /uploads)
  return `/uploads/novosti/${fileName}`;
}

exports.getAll = async (_req, res) => {
  try {
    const rows = await Novosti.findAll({ order: [['ID','DESC']] });
    const data = rows.map(r => {
      const obj = r.toJSON();
      const fileName = asFileName(obj.Putanja);
      return {
        ...obj,
        Putanja: fileName,          // uvek samo ime u polju Putanja
        Slika: asPublicPath(fileName) // dodatno, kompletna relativna putanja
      };
    });
    res.json(data);
  } catch (e) {
    console.error('Greška getAll novosti:', e);
    res.status(500).json({ message: 'Greška pri dohvatanju novosti' });
  }
};

exports.getById = async (req, res) => {
  try {
    const n = await Novosti.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Novost nije pronađena' });
    const obj = n.toJSON();
    const fileName = asFileName(obj.Putanja);
    res.json({
      ...obj,
      Putanja: fileName,
      Slika: asPublicPath(fileName)
    });
  } catch (e) {
    console.error('Greška getById novosti:', e);
    res.status(500).json({ message: 'Greška' });
  }
};

// Ako koristiš MULTER (file upload):
//   - rute: upload.single('Putanja')
//   - front šalje FormData sa <input type="file" name="Putanja">
exports.create = async (req, res) => {
  try {
    const { Naslov, Tekst } = req.body;
    if (!Naslov || !Tekst) return res.status(400).json({ message: 'Naslov i Tekst su obavezni' });

    // ako je uploadovan fajl -> čuvamo IME fajla
    // ako nije, a prosleđen je string (URL/putanja) -> izvuci samo ime
    const fileName = req.file
      ? req.file.filename
      : asFileName(req.body.Putanja);

    const created = await Novosti.create({
      Naslov,
      Tekst,
      Putanja: fileName || null
    });

    const obj = created.toJSON();
    res.status(201).json({
      ...obj,
      Putanja: fileName || null,
      Slika: asPublicPath(fileName)
    });
  } catch (e) {
    console.error('Greška pri čuvanju novosti:', e);
    res.status(500).json({ message: 'Greška pri čuvanju novosti' });
  }
};

exports.update = async (req, res) => {
  try {
    const n = await Novosti.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Novost nije pronađena' });

    const { Naslov, Tekst } = req.body;
    const data = {};
    if (Naslov !== undefined) data.Naslov = Naslov;
    if (Tekst !== undefined) data.Tekst = Tekst;

    let fileName = null;
    if (req.file) {
      fileName = req.file.filename;
      data.Putanja = fileName;
    } else if (req.body.Putanja !== undefined) {
      fileName = asFileName(req.body.Putanja);
      data.Putanja = fileName || null;
    }

    const updated = await n.update(data);
    const obj = updated.toJSON();
    const finalFileName = asFileName(obj.Putanja);
    res.json({
      ...obj,
      Putanja: finalFileName,
      Slika: asPublicPath(finalFileName)
    });
  } catch (e) {
    console.error('Greška pri izmeni novosti:', e);
    res.status(500).json({ message: 'Greška pri izmeni novosti' });
  }
};

exports.delete = async (req, res) => {
  try {
    const n = await Novosti.findByPk(req.params.id);
    if (!n) return res.status(404).json({ message: 'Novost nije pronađena' });
    await n.destroy();
    res.json({ message: 'Obrisano' });
  } catch (e) {
    console.error('Greška pri brisanju novosti:', e);
    res.status(500).json({ message: 'Greška pri brisanju novosti' });
  }
};
