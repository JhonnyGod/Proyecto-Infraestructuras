// src/pages/About.jsx
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";
import useModalStore from '../../store/useModalStore'
import Profile from '../../components/Profile/profile';
import './homeedition.css';

const About = () => {
  const setOpenProfile = useModalStore((state) => state.setOpenProfile);

  const openProfile = () => {
    setOpenProfile(true);
  }

  const closeProfileModal = () => {
    setOpenProfile(false);
  }

  return (
    <div>
      <Header />
      <main className="about-main-content">
        <section className="about-hero">
          <h2>Sobre Nosotros</h2>
          <p>
          Bienvenido a nuestra plataforma de alquiler de vehículos, donde la innovación, la comodidad y la calidad
          se combinan para ofrecerte una experiencia única.
          </p>
        </section>

        <section className="about-info-stacked">
          <div className="info-section">
            <div className="icon-wrapper">
              <i className="fas fa-bullseye"></i>
            </div>
            <div className="info-text">
              <h3>Nuestra Misión</h3>
              <p>
                En nuestra empresa, nos dedicamos a revolucionar la forma en que las personas alquilan vehículos.
                Garantizamos acceso rápido y seguro a una amplia gama de opciones, desde carros y camionetas hasta motos
                y vehículos acuáticos, todo desde la comodidad de tu hogar.
              </p>
            </div>
          </div>

          <div className="info-section reverse">
            <div className="info-text">
              <h3>Nuestro Compromiso</h3>
              <p>
                Nos enfocamos en brindar una experiencia de usuario excepcional, con una plataforma fácil de usar y un
                servicio confiable. Nuestro sistema de entrega a la puerta asegura que el vehículo alquilado llegue a tu
                ubicación de manera rápida y eficiente.
              </p>
            </div>
            <div className="icon-wrapper">
              <i className="fas fa-handshake"></i>
            </div>
          </div>

          <div className="info-section">
            <div className="icon-wrapper">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div className="info-text">
              <h3>Innovación</h3>
              <p>
              Ofrecemos un sistema totalmente en línea. Desde la selección del vehículo hasta el pago y la confirmación,
              todo se realiza directamente en nuestra página web, redefiniendo la experiencia de alquiler.
              </p>
            </div>
          </div>
        </section>
        {openProfile && <Profile isOpen={openProfile} onClose={closeProfileModal} />}
      </main>
      <Footer />
    </div>
  );
};

export default About;
