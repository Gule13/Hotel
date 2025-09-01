// models/Soba.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Soba = sequelize.define('Soba', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ID'
  },
  // Nema BrojSobe
  TipSobeID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'TipSobeID' // ako u bazi piše npr. tip_sobe_id, ovde promeni
  }
}, {
  tableName: 'soba',
  timestamps: false
});

module.exports = Soba;
