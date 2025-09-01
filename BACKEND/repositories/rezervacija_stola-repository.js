const Model = require('../models/Rezervacija_Stola');
const Korisnik = require('../models/Korisnik');
const Sto = require('../models/Sto');

class Rezervacija_StolaRepository {
  async getAll() {
    return Model.findAll({
      include: [{ model: Korisnik }, { model: Sto }],
      order: [['ID', 'DESC']]
    });
  }

  async getById(id) {
    return Model.findByPk(id, { include: [{ model: Korisnik }, { model: Sto }] });
  }

  // ✅ DODATO: samo za jednog korisnika
  async getByUserId(userId) {
    return Model.findAll({
      where: { KorisnikID: userId },
      include: [{ model: Sto }],
      order: [['ID', 'DESC']]
    });
  }

  async create(data) { return Model.create(data); }

  async update(id, data) {
    const item = await Model.findByPk(id);
    return item ? item.update(data) : null;
  }

  async delete(id) {
    const item = await Model.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return item;
  }
}

module.exports = new Rezervacija_StolaRepository();
