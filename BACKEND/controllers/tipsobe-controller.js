const repo = require('../repositories/tipsobe-repository');

exports.getAll = async (_, res) => res.json(await repo.getAll());
exports.getById = async (req, res) => {
  const x = await repo.getById(req.params.id);
  return x ? res.json(x) : res.status(404).json({ message: 'TipSobe not found' });
};
exports.create = async (req, res) => res.status(201).json(await repo.create(req.body));
exports.update = async (req, res) => {
  const x = await repo.update(req.params.id, req.body);
  return x ? res.json(x) : res.status(404).json({ message: 'TipSobe not found' });
};
exports.delete = async (req, res) => {
  const x = await repo.delete(req.params.id);
  return x ? res.json(x) : res.status(404).json({ message: 'TipSobe not found' });
};
