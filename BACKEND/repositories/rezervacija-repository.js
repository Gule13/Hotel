const Rezervacija = require('../models/Rezervacija');
const Korisnik = require('../models/Korisnik');
const Soba = require('../models/Soba');
const TipSobe = require('../models/TipSobe');

class RezervacijaRepository {
  async getAll() {
    return Rezervacija.findAll({
      include: [
        { model: Korisnik, attributes: ['Ime','Email','KorisnickoIme'] },
        { model: Soba, include: [{ model: TipSobe, attributes: ['Naziv'] }] }
      ],
      order: [['ID', 'DESC']]
    });
  }
  async getById(id) {
    return Rezervacija.findByPk(id, {
      include: [
        { model: Korisnik, attributes: ['Ime','Email','KorisnickoIme'] },
        { model: Soba, include: [{ model: TipSobe, attributes: ['Naziv'] }] }
      ]
    });
  }
  async getByUserId(userId) {
    return Rezervacija.findAll({
      where: { KorisnikID: userId },
      include: [{ model: Soba, include: [{ model: TipSobe, attributes: ['Naziv'] }] }],
      order: [['ID', 'DESC']]
    });
  }
  async create(data) { return Rezervacija.create(data); }
  async update(id, data) { const x = await Rezervacija.findByPk(id); return x ? x.update(data) : null; }
  async delete(id) { const x = await Rezervacija.findByPk(id); if (!x) return null; await x.destroy(); return x; }
}
module.exports = new RezervacijaRepository();
