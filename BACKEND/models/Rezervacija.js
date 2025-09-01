const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Korisnik = require('./Korisnik');
const Soba = require('./Soba');

const Rezervacija = sequelize.define('Rezervacija', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  KorisnikID: DataTypes.INTEGER,
  SobaID: DataTypes.INTEGER,
  DatumOd: DataTypes.DATEONLY,
  DatumDo: DataTypes.DATEONLY,
}, {
  tableName: 'rezervacija',
  timestamps: false,
});

Rezervacija.belongsTo(Korisnik, { foreignKey: 'KorisnikID' });
Rezervacija.belongsTo(Soba, { foreignKey: 'SobaID' });

module.exports = Rezervacija;
