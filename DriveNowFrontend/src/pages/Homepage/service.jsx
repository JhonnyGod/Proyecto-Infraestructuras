// src/pages/services.jsx
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";
import Profile from '../../components/Profile/profile';
import useModalStore from '../../store/useModalStore';

import "./homeedition.css";


const Services = () => {
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
      <main className="services-main-content">
        <section className="services-container">
          <div className="services-header">
            <h2>Servicios</h2>
            <p>
              Ofrecemos una experiencia única para que alquilar un vehículo sea cómodo, rápido y emocionante. Conoce lo que nos hace diferentes.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Alquiler 100% en Línea</h3>
              <p>
                Realiza todo el proceso de alquiler desde nuestra plataforma, de forma segura y sin complicaciones.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Entrega a Domicilio</h3>
              <p>
                Recibe el vehículo en la puerta de tu casa o en la ubicación que prefieras, sin costo adicional.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>Soporte al Cliente</h3>
              <p>
                Estamos aquí para ayudarte en cada paso, con atención personalizada las 24 horas.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Variedad de Vehículos</h3>
              <p>
                Encuentra el vehículo perfecto para cualquier ocasión: trabajo, aventura o lujo.
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

export default Services;
