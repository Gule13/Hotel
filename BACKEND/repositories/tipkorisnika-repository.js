const TipKorisnika = require('../models/TipKorisnika');

class TipKorisnikaRepository {
  async getAll() { return TipKorisnika.findAll(); }
  async getById(id) { return TipKorisnika.findByPk(id); }
  async create(data) { return TipKorisnika.create(data); }
  async update(id, data) {
    const item = await TipKorisnika.findByPk(id);
    return item ? item.update(data) : null;
  }
  async delete(id) {
    const item = await TipKorisnika.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return item;
  }
}
module.exports = new TipKorisnikaRepository();
