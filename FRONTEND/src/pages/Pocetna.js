import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const Pocetna = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Dobrodošli u Luxury Hotel</h1>
          <p>Uživajte u nesvakidašnjem luksuzu i besprekornoj usluzi</p>
          <a href="/novosti" className="btn-vise">Novosti</a>
        </div>
      </section>

      <section id="rooms" className="amenities">
        <h2>Naši Sadržaji</h2>
        <div className="amenities-container">
          <div className="amenities-left">
            <a href="/sobe" className="amenity-card rooms">
              <h3>Sobe</h3>
              <p>Otkrijte naše luksuzne sobe i apartmane, dizajnirane za vaš maksimalni komfor.</p>
            </a>
          </div>
          <div className="amenities-right">
            <a href="/restaurant" className="amenity-card restaurant">
              <h3>Restoran</h3>
              <p>Uživajte u vrhunskim jelima pripremljenim od strane naših talentovanih kuvara.</p>
            </a>
            <a href="/wellness" className="amenity-card spa">
              <h3>Wellness & Spa</h3>
              <p>Opustite se uz luksuzne tretmane i relaksaciju u našem spa centru.</p>
            </a>
            <a href="/gym" className="amenity-card gym">
              <h3>Teretana</h3>
              <p>Opremljena svim potrebnim spravama za trening, idealna za održavanje forme tokom boravka.</p>
            </a>
            <a href="/pool" className="amenity-card pool">
              <h3>Bazen</h3>
              <p>Uživajte u opuštanju pored našeg prelepog bazena sa pogledom na more.</p>
            </a>
          </div>
        </div>
      </section>

      <section id="onama" className="about">
        <div className="about-title">
          <h2>O nama</h2>
        </div>

        <div className="about-container">
          <div className="about-image">
            <img src="/Onama1.jpg" alt="O nama" />
          </div>
          <div className="about-text">
            <p>Naš hotel je otvorio svoja vrata gostima 2020. godine, sa vizijom da ponudi savršen spoj elegancije, komfora i autentičnog duha crnogorske obale.</p>
            <p>Kroz godine, iz malog, porodičnog hotela izrastao je luksuzni kompleks koji pruža vrhunsku uslugu, savremeni smeštaj, wellness i spa sadržaje, teretanu, bazen, restoran i bar.</p>
            <p>Danas smo sinonim za gostoprimstvo i mesto gde tradicija susreće savremeni luksuz.</p>
            <p>Naš cilj je da svaki gost doživi nezaboravno iskustvo, uživajući u luksuzu i personalizovanoj usluzi. Vaše zadovoljstvo je naš prioritet.</p>
          </div>
        </div>

        <div className="about-container reverse">
          <div className="about-text">
            <p>Uživajte u prelepom ambijentu našeg hotela, gde svaki detalj odiše elegancijom i pažnjom prema gostima.</p>
            <p>Naš tim se svakodnevno trudi da premaši očekivanja, pružajući vrhunsku uslugu sa osmehom i toplinom koja se pamti.</p>
            <p>Bilo da nas posećujete radi opuštanja, poslovnog putovanja ili proslave posebnih trenutaka, kod nas ćete pronaći savršen balans između privatnosti, komfora i pažljivo osmišljenih sadržaja.</p>
            <p>Boravak kod nas pretvaramo u ličnu priču luksuza i odmora, prilagođenu vašim potrebama i željama.</p>
          </div>
          <div className="about-image">
            <img src="/Onama2.webp" alt="Luksuzna soba" />
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-title">
          <h2>Kontaktirajte nas</h2>
          
        </div>

        <div className="contact-container">
          <div className="contact-info">
            
            <p><i className="fas fa-map-marker-alt"></i> <strong>Adresa:</strong> Slovenska plaža bb, Budva, Crna Gora</p>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.738646406243!2d18.835290115460866!3d42.287170879191914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c3b1cf72fffb7%3A0x58c7ffde5655b404!2sSlovenska%20Pla%C5%BEa!5e0!3m2!1sen!2sme!4v1690654846754!5m2!1sen!2sme"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* <div className="contact-form">
<div className="kontakt-card">
  <address className="kontakt-box" aria-label="Kontakt podaci">
    <h3 className="kontakt-naslov">Kontakt</h3>

    <div className="kontakt-red">
      <span className="kontakt-oznaka">Telefon</span>
      <a className="kontakt-link" href="tel:+38762123456">+387 62 123 456</a>
    </div>

    <div className="kontakt-red">
      <span className="kontakt-oznaka">Email (opšti)</span>
      <a className="kontakt-link" href="mailto:info@luxhotel.com">info@luxhotel.com</a>
    </div>

    <div className="kontakt-red">
      <span className="kontakt-oznaka">Email (rezervacije)</span>
      <a className="kontakt-link" href="mailto:rezervacije@luxhotel.com">rezervacije@luxhotel.com</a>
    </div>
  </address>
</div>


          </div> */}
          <div className="kontakt-card">
  <address className="kontakt-box" aria-label="Kontakt podaci">
    <h3 className="kontakt-naslov">Kontakt</h3>

    <div className="kontakt-red">
      <span className="kontakt-oznaka">Telefon</span>
      <a className="kontakt-link" href="tel:+38762123456">+387 62 123 456</a>
    </div>

    <div className="kontakt-red">
      <span className="kontakt-oznaka">Email (opšti)</span>
      <a className="kontakt-link" href="mailto:info@luxhotel.com">info@luxhotel.com</a>
    </div>

    <div className="kontakt-red">
      <span className="kontakt-oznaka">Email (rezervacije)</span>
      <a className="kontakt-link" href="mailto:rezervacije@luxhotel.com">rezervacije@luxhotel.com</a>
    </div>
  </address>
</div>
        </div>
      </section>
    </>
  );
};

export default Pocetna;
