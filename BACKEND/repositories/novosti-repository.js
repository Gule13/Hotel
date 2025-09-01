const Novosti = require('../models/Novosti');

exports.getAll = async () => await Novosti.findAll();
exports.getById = async (id) => await Novosti.findByPk(id);
exports.create = async (data) => await Novosti.create(data);
exports.update = async (id, data) => {
  const novost = await Novosti.findByPk(id);
  if (!novost) return null;
  return await novost.update(data);
};
exports.delete = async (id) => {
  const novost = await Novosti.findByPk(id);
  if (!novost) return null;
  await novost.destroy();
  return novost;
};
