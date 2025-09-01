const TipSobe = require('../models/TipSobe');

class TipSobeRepository {
  async getAll() { return TipSobe.findAll(); }
  async getById(id) { return TipSobe.findByPk(id); }
  async create(data) { return TipSobe.create(data); }
  async update(id, data) {
    const item = await TipSobe.findByPk(id);
    return item ? item.update(data) : null;
  }
  async delete(id) {
    const item = await TipSobe.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return item;
  }
}
module.exports = new TipSobeRepository();
