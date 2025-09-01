import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar";
// import "./admin.css";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './admin.css';


import API from "../../services/api";

export default function RezervacijeSoba() {
  const [rezervacije, setRezervacije] = useState([]);
  const [korisnici, setKorisnici] = useState([]);
  const [sobe, setSobe] = useState([]);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    fetchRezervacije();
    fetchKorisnici();
    fetchSobe();
  }, []);

  const fetchRezervacije = async () => {
    try {
      const res = await API.get("/rezervacija");
      setRezervacije(res.data);
    } catch (err) {
      console.error("Greška pri dohvatu rezervacija:", err);
    }
  };

  const fetchKorisnici = async () => {
    try {
      const res = await API.get("/korisnik");
      setKorisnici(res.data);
    } catch (err) {
      console.error("Greška pri dohvatu korisnika:", err);
    }
  };

  const fetchSobe = async () => {
    try {
      const res = await API.get("/soba"); // Sobe uključuju i TipSobe
      setSobe(res.data);
    } catch (err) {
      console.error("Greška pri dohvatu soba:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      KorisnikID: form.korisnikID.value,
      SobaID: form.sobaID.value,
      DatumOd: form.datumOd.value,
      DatumDo: form.datumDo.value,
    };

    try {
      if (editID) {
        await API.put(`/rezervacija/${editID}`, data);
        alert("Rezervacija izmenjena.");
        setEditID(null);
      } else {
        await API.post("/rezervacija", data);
        alert("Rezervacija dodata.");
      }

      fetchRezervacije();
      form.reset();
    } catch (err) {
      console.error("Greška pri slanju:", err);
    }
  };

  const handleEdit = (rez) => {
    setEditID(rez.ID);
    const form = document.querySelector(".admin-form");
    form.korisnikID.value = rez.KorisnikID;
    form.sobaID.value = rez.Soba?.ID;
    form.datumOd.value = rez.DatumOd;
    form.datumDo.value = rez.DatumDo;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete rezervaciju?")) {
      try {
        await API.delete(`/rezervacija/${id}`);
        alert("Rezervacija obrisana.");
        fetchRezervacije();
      } catch (err) {
        console.error("Greška pri brisanju:", err);
      }
    }
  };

  return (
    <div className="meni">
      <Navbar />

      <div className="admin-container">
        <h2 className="admin-title">Upravljanje rezervacijama</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Korisnik:</label>
          <select name="korisnikID" required>
            <option value="">-- Izaberi korisnika --</option>
            {korisnici.map((k) => (
              <option key={k.ID} value={k.ID}>
                {k.Ime} ({k.Email})
              </option>
            ))}
          </select>

          <label>Tip sobe:</label>
          <select name="sobaID" required>
            <option value="">-- Izaberi tip sobe --</option>
            {sobe.map((s) => (
              <option key={s.ID} value={s.ID}>
                {s.TipSobe?.Naziv}
              </option>
            ))}
          </select>

          <label>Datum od:</label>
          <input type="date" name="datumOd" required />
          <label>Datum do:</label>
          <input type="date" name="datumDo" required />

          <button type="submit">
            {editID ? "Sačuvaj izmene" : "Dodaj rezervaciju"}
          </button>
        </form>

        <h2 className="admin-title">Sve rezervacije</h2>
        <div className="filmovi-lista">
          {rezervacije.map((rez) => (
            <div key={rez.ID} className="film-item">
              <div className="film-info">
                <p>
                  <strong>Korisnik:</strong> {rez.Korisnik?.Ime} ({rez.Korisnik?.Email})
                </p>
                <p>
                  <strong>Tip sobe:</strong> {rez.Soba?.TipSobe?.Naziv}
                </p>
                <p><strong>Od:</strong> {rez.DatumOd}</p>
                <p><strong>Do:</strong> {rez.DatumDo}</p>
                <button className="edit-button" onClick={() => handleEdit(rez)}>
                  Izmeni
                </button>
                <button className="delete-button" onClick={() => handleDelete(rez.ID)}>
                  Obriši
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
