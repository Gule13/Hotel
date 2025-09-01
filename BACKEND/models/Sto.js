const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sto = sequelize.define('Sto', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Red: DataTypes.INTEGER,
  Kolona: DataTypes.INTEGER,
  BrojStolica: DataTypes.INTEGER,
}, {
  tableName: 'sto',
  timestamps: false,
});

module.exports = Sto;
