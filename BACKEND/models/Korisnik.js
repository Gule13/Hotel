const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipKorisnika = require('./TipKorisnika');

const Korisnik = sequelize.define('Korisnik', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Ime: DataTypes.STRING(100),
  Email: DataTypes.STRING(150),
  KorisnickoIme: DataTypes.STRING(100),
  Lozinka: DataTypes.STRING(255),
  TipKorisnikaID: DataTypes.INTEGER,
}, {
  tableName: 'korisnik',
  timestamps: false,
});

Korisnik.belongsTo(TipKorisnika, { foreignKey: 'TipKorisnikaID' });

module.exports = Korisnik;
