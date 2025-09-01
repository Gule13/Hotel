const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // ✅ ispravljeno

const Novosti = sequelize.define('Novosti', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Naslov: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'Naslov'
  },
  Tekst: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'Tekst'
  },
  Putanja: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'Putanja'
  }
}, {
  tableName: 'novosti',
  timestamps: false
});

module.exports = Novosti;
