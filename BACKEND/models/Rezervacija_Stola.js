const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Korisnik = require('./Korisnik');
const Sto = require('./Sto');

const Rezervacija_Stola = sequelize.define('Rezervacija_Stola', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  KorisnikID: DataTypes.INTEGER,
  StoID: DataTypes.INTEGER,
  Datum: DataTypes.DATEONLY,
  Od: DataTypes.TIME,
  Do: DataTypes.TIME,
}, {
  tableName: 'rezervacija_stola',
  timestamps: false,
});

Rezervacija_Stola.belongsTo(Korisnik, { foreignKey: 'KorisnikID' });
Rezervacija_Stola.belongsTo(Sto, { foreignKey: 'StoID' });

module.exports = Rezervacija_Stola;
