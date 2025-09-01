import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import API from "../services/api";

const NovostiID = () => {
  const { id } = useParams();
  const [novost, setNovost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/novosti/${id}`)
      .then((res) => {
        setNovost(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner" style={{ textAlign: "center", padding: "60px" }}>
        <p>Učitavanje novosti...</p>
      </div>
    );
  }

  if (!novost) {
    return <p style={{ textAlign: "center", padding: "60px" }}>Novost nije pronađena.</p>;
  }

  return (
    <div className="novostid-bg">
      <Navbar />

      <main className="novost-container" style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>{novost.naslov}</h1>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={`http://localhost:3001/${novost.slika_path}`}
            alt={novost.naslov}
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              marginBottom: "30px"
            }}
          />

          <div style={{ fontSize: "18px", lineHeight: "1.7", textAlign: "justify", padding: "0 10px" }}>
            <h2 style={{ marginBottom: "12px", textAlign: "left" }}>Opis</h2>
            <p>{novost.sadrzaj}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NovostiID;
