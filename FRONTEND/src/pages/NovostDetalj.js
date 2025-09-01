import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


const API = 'http://localhost:3001';

export default function NovostDetalj() {
  const { id } = useParams();
  const [novost, setNovost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/novosti/${id}`);
        if (!res.ok) throw new Error('no /novosti/:id');
        setNovost(await res.json());
      } catch {
        try {
          const listRes = await fetch(`${API}/novosti`);
          const list = await listRes.json();
          const found = Array.isArray(list) ? list.find(x => String(x.ID) === String(id)) : null;
          setNovost(found || null);
        } catch {
          setNovost(null);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const paragraphs = (text) =>
    (text || '')
      .split(/\n{2,}|\r\n\r\n|\r\r/)      // deli na prazne redove
      .map(s => s.trim())
      .filter(Boolean);

  return (
    <div>
      <Navbar />

      <section className="novost-hero">
        {loading ? (
          <p>Učitavanje…</p>
        ) : !novost ? (
          <p>Novost nije pronađena.</p>
        ) : (
          <>
            <div className="novost-hero-grid">
              <div className="novost-hero-media">
                {novost.Putanja && (
                  <img
                    src={`${API}/uploads/novosti/${novost.Putanja}`}
                    alt={novost.Naslov}
                  />
                )}
              </div>

              <div className="novost-hero-content">
                <h1 className="novost-hero-title">{novost.Naslov}</h1>

                <div className="novost-hero-text">
                  {paragraphs(novost.Tekst).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="novost-hero-cta">
                  <Link to="/novosti" className="btn">
                    ← Nazad na sve novosti
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
