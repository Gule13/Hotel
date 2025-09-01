import React, { useEffect, useState } from "react";
import Navbar from '../../components/Navbar';
// import 
import Footer from '../../components/Footer';


import API from '../../services/api';

// import "../style.css";
import "./admin.css";


const APPI = 'http://localhost:3001';

export default function NovostiAdmin() {
  const [novosti, setNovosti] = useState([]);
  const [editID, setEditID] = useState(null);
  const [formData, setFormData] = useState({
    Naslov: "",
    Tekst: "",
    Putanja: null
  });

  useEffect(() => {
    fetchNovosti();
  }, []);

  const fetchNovosti = async () => {
    try {
      const res = await API.get("/novosti");
      setNovosti(res.data);
    } catch (err) {
      console.error("Greška pri dohvatu novosti:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Putanja") {
      setFormData((prev) => ({ ...prev, Putanja: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("Naslov", formData.Naslov);
    payload.append("Tekst", formData.Tekst);
    if (formData.Putanja) payload.append("Putanja", formData.Putanja);

    try {
      if (editID) {
        await API.put(`/novosti/${editID}`, payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Novost izmenjena");
        setEditID(null);
      } else {
        await API.post("/novosti", payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Novost dodata");
      }

      setFormData({ Naslov: "", Tekst: "", Putanja: null });
      fetchNovosti();
    } catch (err) {
      console.error("Greška pri čuvanju:", err);
      alert("Greška pri čuvanju novosti");
    }
  };

  const handleEdit = (n) => {
    setEditID(n.ID);
    setFormData({
      Naslov: n.Naslov,
      Tekst: n.Tekst,
      Putanja: null
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Da li ste sigurni?")) return;
    try {
      await API.delete(`/novosti/${id}`);
      alert("Novost obrisana");
      fetchNovosti();
    } catch (err) {
      console.error("Greška pri brisanju:", err);
    }
  };

  return (
    <div className="meni">
      <Navbar />
      <div className="admin-container">
        <h2 className="admin-title">Upravljanje novostima</h2>

        <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Naslov:</label>
          <input
            type="text"
            name="Naslov"
            value={formData.Naslov}
            onChange={handleChange}
            required
          />

          <label>Tekst:</label>
          <textarea
            name="Tekst"
            value={formData.Tekst}
            onChange={handleChange}
            required
          ></textarea>

          <label>Slika (opcionalno):</label>
          <input
            type="file"
            name="Putanja"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit">
            {editID ? "Sačuvaj izmene" : "Dodaj novost"}
          </button>
        </form>

        <h2 className="admin-title">Sve novosti</h2>
        <div className="filmovi-lista">
          {novosti.map((n) => (
            <div key={n.ID} className="film-item">
              {n.Putanja && (
               <img
                src={`${APPI}/uploads/novosti/${n.Putanja}`}
                alt={n.Naslov}
                className="film-slika"
              />
              )}

              <div className="film-info">
                <h3>{n.Naslov}</h3>
                <p>{n.Tekst}</p>
                <button className="edit-button" onClick={() => handleEdit(n)}>
                  Izmeni
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(n.ID)}
                >
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
