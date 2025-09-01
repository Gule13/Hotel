
const repo = require('../repositories/soba-repository');

const Soba = require('../models/Soba');
const TipSobe = require('../models/TipSobe');


exports.getAll = async (req, res) => {
  try {
    const sobe = await repo.getAll();
    res.json(sobe);
  } catch (err) {
    console.error("Greška u getAll:", err);
    res.status(500).json({ error: "Greška prilikom dohvatanja soba" });
  }
};



exports.getById = async (req, res) => {
  const item = await repo.getById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Soba not found' });
  res.json(item);
};

exports.create = async (req, res) => {
  const created = await repo.create(req.body);
  res.status(201).json(created);
};

exports.update = async (req, res) => {
  const updated = await repo.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: 'Soba not found' });
  res.json(updated);
};

exports.delete = async (req, res) => {
  const deleted = await repo.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Soba not found' });
  res.json(deleted);
};
