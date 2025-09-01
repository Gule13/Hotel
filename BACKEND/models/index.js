const TipKorisnika = require('./TipKorisnika');
const Korisnik = require('./Korisnik');
const TipSobe = require('./TipSobe');
const Soba = require('./Soba');
const Rezervacija = require('./Rezervacija');
const Sto = require('./Sto');
const Rezervacija_Stola = require('./Rezervacija_Stola');
const Novosti = require('./Novosti');

// TipKorisnika – Korisnik
TipKorisnika.hasMany(Korisnik, { foreignKey: 'TipKorisnikaID' });
Korisnik.belongsTo(TipKorisnika, { foreignKey: 'TipKorisnikaID' });

// TipSobe – Soba
TipSobe.hasMany(Soba, { foreignKey: 'TipSobeID' });
Soba.belongsTo(TipSobe, { foreignKey: 'TipSobeID' });

// Korisnik/Soba – Rezervacija
Korisnik.hasMany(Rezervacija, { foreignKey: 'KorisnikID' });
Rezervacija.belongsTo(Korisnik, { foreignKey: 'KorisnikID' });
Soba.hasMany(Rezervacija, { foreignKey: 'SobaID' });
Rezervacija.belongsTo(Soba, { foreignKey: 'SobaID' });

// Korisnik/Sto – Rezervacija_Stola
Korisnik.hasMany(Rezervacija_Stola, { foreignKey: 'KorisnikID' });
Rezervacija_Stola.belongsTo(Korisnik, { foreignKey: 'KorisnikID' });
Sto.hasMany(Rezervacija_Stola, { foreignKey: 'StoID' });
Rezervacija_Stola.belongsTo(Sto, { foreignKey: 'StoID' });

module.exports = {
  TipKorisnika, Korisnik, TipSobe, Soba, Rezervacija, Sto, Rezervacija_Stola, Novosti
};
