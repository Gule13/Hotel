const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipKorisnika = sequelize.define('TipKorisnika', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Naziv: { type: DataTypes.STRING(100), allowNull: false },
}, {
  tableName: 'tipkorisnika',
  timestamps: false,
});

module.exports = TipKorisnika;
