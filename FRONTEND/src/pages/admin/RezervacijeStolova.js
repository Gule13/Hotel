import React, { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from '../../components/Navbar';  // ✅
import Footer from '../../components/Footer';  // ✅

import "./admin.css";

export default function RezervacijeStolova() {
  const [rezervacije, setRezervacije] = useState([]);
  const [korisnici, setKorisnici] = useState([]);
  const [stolovi, setStolovi] = useState([]);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    fetchRezervacije();
    fetchKorisnici();
    fetchStolovi();
  }, []);

  const fetchRezervacije = async () => {
    try {
      const res = await API.get("/rezervacija_stola");
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

  const fetchStolovi = async () => {
    try {
      const res = await API.get("/sto");
      setStolovi(res.data);
    } catch (err) {
      console.error("Greška pri dohvatu stolova:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      KorisnikID: form.korisnikID.value,
      StoID: form.stoID.value,
      Datum: form.datum.value,
      Od: form.od.value,
      Do: form.do.value,
    };

    try {
      if (editID) {
        await API.put(`/rezervacija_stola/${editID}`, data);
        alert("Rezervacija izmenjena.");
        setEditID(null);
      } else {
        await API.post("/rezervacija_stola", data);
        alert("Rezervacija dodata.");
      }

      fetchRezervacije();
      form.reset();
    } catch (err) {
      console.error("Greška pri čuvanju rezervacije:", err);
    }
  };

  const handleEdit = (rez) => {
    setEditID(rez.ID);
    const form = document.querySelector(".admin-form");
    form.korisnikID.value = rez.KorisnikID;
    form.stoID.value = rez.StoID;
    form.datum.value = rez.Datum;
    form.od.value = rez.Od;
    form.do.value = rez.Do;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete rezervaciju?")) {
      try {
        await API.delete(`/rezervacija_stola/${id}`);
        alert("Rezervacija obrisana.");
        fetchRezervacije();
      } catch (err) {
        console.error("Greška pri brisanju rezervacije:", err);
      }
    }
  };

  return (
    <div className="meni">
      <Navbar />

      <div className="admin-container">
        <h2 className="admin-title">Upravljanje rezervacijama stolova</h2>

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

          <label>Sto:</label>
          <select name="stoID" required>
            <option value="">-- Izaberi sto --</option>
            {stolovi.map((s) => (
              <option key={s.ID} value={s.ID}>
                Red {s.Red}, Kolona {s.Kolona} ({s.BrojStolica} stolica)
              </option>
            ))}
          </select>

          <label>Datum:</label>
          <input type="date" name="datum" required />

          <label>Od:</label>
          <input type="time" name="od" required />

          <label>Do:</label>
          <input type="time" name="do" required />

          <button type="submit">{editID ? "Sačuvaj izmene" : "Dodaj rezervaciju"}</button>
        </form>

        <h2 className="admin-title">Sve rezervacije</h2>
        <div className="filmovi-lista">
          {rezervacije.map((rez) => (
            <div key={rez.ID} className="film-item">
              <div className="film-info">
                <h4>Rezervacija #{rez.ID}</h4>
                <p><strong>Korisnik ID:</strong> {rez.KorisnikID}</p>
                <p><strong>Sto ID:</strong> {rez.StoID}</p>
                <p><strong>Datum:</strong> {rez.Datum}</p>
                <p><strong>Od:</strong> {rez.Od}</p>
                <p><strong>Do:</strong> {rez.Do}</p>
                <button className="edit-button" onClick={() => handleEdit(rez)}>Izmeni</button>
                <button className="delete-button" onClick={() => handleDelete(rez.ID)}>Obriši</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
