// models/TipSobe.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipSobe = sequelize.define('TipSobe', {
  ID:    { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, field: 'ID' },
  Naziv: { type: DataTypes.STRING(100), allowNull: false, field: 'Naziv' }
}, {
  tableName: 'tipsobe', // tačan naziv tabele u tvojoj bazi
  timestamps: false
});

module.exports = TipSobe;
