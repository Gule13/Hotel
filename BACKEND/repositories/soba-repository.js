const Soba = require('../models/Soba');
const TipSobe = require('../models/TipSobe');

class SobaRepository {
  async getAll() {
      console.log("Pozvana ruta /soba"); // DODAJ OVO
  return await Soba.findAll({
    include: [{ model: TipSobe, attributes: ['Naziv'] }]
  });
}


  async getById(id) {
    return await Soba.findByPk(id, { include: [{ model: TipSobe }] });
  }

  async create(data) {
    return await Soba.create(data);
  }

  async update(id, data) {
    const item = await Soba.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }

  async delete(id) {
    const item = await Soba.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return item;
  }
}

module.exports = new SobaRepository();
