const Korisnik = require('../models/Korisnik');
const TipKorisnika = require('../models/TipKorisnika');

class KorisnikRepository {
  async getAll() {
    return Korisnik.findAll({ include: [{ model: TipKorisnika, attributes: ['Naziv'] }] });
  }
  async getById(id) {
    return Korisnik.findByPk(id, { include: [{ model: TipKorisnika, attributes: ['Naziv'] }] });
  }
  async getByEmail(email) { return Korisnik.findOne({ where: { Email: email } }); }
  async getByUsername(username) { return Korisnik.findOne({ where: { KorisnickoIme: username } }); }
  async create(data) { return Korisnik.create(data); }
  async update(id, data) {
    const item = await Korisnik.findByPk(id);
    return item ? item.update(data) : null;
  }
  async delete(id) {
    const item = await Korisnik.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return item;
  }
}
module.exports = new KorisnikRepository();
