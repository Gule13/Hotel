const Sto = require('../models/Sto');

class StoRepository {
  async getAll() { return Sto.findAll(); }
  async getById(id) { return Sto.findByPk(id); }
  async create(data) { return Sto.create(data); }
  async update(id, data) {
    const item = await Sto.findByPk(id);
    return item ? item.update(data) : null;
  }
  async delete(id) {
    const item = await Sto.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return item;
  }
}
module.exports = new StoRepository();
