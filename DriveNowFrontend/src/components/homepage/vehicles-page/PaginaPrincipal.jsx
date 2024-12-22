import React, { useState, useRef, useEffect } from 'react';
import { FaCar, FaTruck, FaMotorcycle, FaPaintBrush, FaCogs } from 'react-icons/fa';
import VehiculoModal from './vehicles-modal/modal';
import useModalStore from '../../../store/useModalStore';
import Profile from '../../Profile/profile';
import { useLocation } from 'react-router-dom';
import './styles.css';
import  Alert from '../../Alert/alert';

const Modal = ({ vehiculo, onClose }) => {
  return vehiculo ? <VehiculoModal vehiculo={vehiculo} onClose={onClose} /> : null;
};

const colorMap = {
  rojo: 'red',
  azul: 'blue',
  verde: 'green',
  amarillo: 'yellow',
  blanco: 'white',
  negro: 'black',
  gris: 'gray',
};

const VehicleCard = ({ vehiculo, openModal }) => (
  <div className="vehicle-card">
    <img src={vehiculo.image_src} alt={vehiculo.nombre} className="vehicle-image" />
    <div className="vehicle-info">
      <h2 className="vehicle-title">{vehiculo.nombre}</h2>
      <div className="vehicle-features">
        <div className="feature">
          <FaCar />
          <span>{vehiculo.tipovehiculo}</span>
        </div>
        <div className="feature">
          <FaCogs />
          <span>{vehiculo.marca}</span>
        </div>
        <div className="feature">
          <FaPaintBrush />
          <span>{vehiculo.color}</span>
          <span
            className="color-bubble"
            style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}
          ></span>
        </div>
        <div className="vehicle-price">
          <span className="vehicle-price-label">Valor de alquiler:</span>
          <span className="vehicle-price-value">${vehiculo.valor_dia.toFixed(2)}</span>
        </div>
      </div>
      <button className="details-button" onClick={() => openModal(vehiculo)}>
        Ver detalles
      </button>
    </div>
  </div>
);

const VehicleSection = ({ title, vehicles, icon, openModal }) => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction, steps = 5) => {
    const container = sectionRef.current;
    const cardWidth = container.scrollWidth / vehicles.length; // Ancho de una tarjeta
    const totalItems = vehicles.length;
    const visibleItems = Math.floor(container.offsetWidth / cardWidth); // Tarjetas visibles en pantalla

    let newIndex = currentIndex;

    if (direction === 'left') {
      // Desplazar hacia la izquierda
      newIndex = (newIndex - steps + totalItems) % totalItems;
    } else if (direction === 'right') {
      // Desplazar hacia la derecha
      newIndex = (newIndex + steps) % totalItems;
    }

    setCurrentIndex(newIndex);

    // Calcular el desplazamiento total
    const totalScroll = newIndex * cardWidth;

    container.scrollTo({
      left: totalScroll, // Mueve al índice correcto directamente
      behavior: 'smooth',
    });
  };

  return (
    <section className="vehicle-section">
      <h1 className="section-title">
        {icon}
        {title}
      </h1>
      <div className="vehicles-wrapper">
        <button className="scroll-button left" onClick={() => handleScroll('left')}>
          ❮
        </button>
        <div className="vehicles-container" ref={sectionRef}>
          {vehicles.map((vehiculo) => (
            <VehicleCard key={vehiculo.idvehiculo} vehiculo={vehiculo} openModal={openModal} />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => handleScroll('right')}>
          ❯
        </button>
      </div>
    </section>
  );
};

const PaginaPrincipal = ({ vehiculos }) => {
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const openProfile = useModalStore((state) => state.openProfile);
  const setOpenProfile = useModalStore((state) => state.setOpenProfile);
  const location = useLocation();
  const { rentNotification } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [showRentNotification, setShowRentNotification] = useState(false);


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  // ... otras funciones y efectos

  const closeAlert = () => {
    setShowAlert(false);
  };

  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setAlertType('success');
    setShowAlert(true);
  };

  const showErrorAlert = (message) => {
    setAlertMessage(message);
    setAlertType('error');
    setShowAlert(true);
  };
  // Effect for handling rent notification
  useEffect(() => {
    let timeoutId;

    if (rentNotification) {
      setShowRentNotification(true);

      timeoutId = setTimeout(() => {
        setShowRentNotification(false);
        // Clear the location state after hiding the notification
        if (window.history.replaceState) {
          window.history.replaceState(
            { ...location.state, rentNotification: null },
            document.title,
            location.pathname
          );
        }
      }, 5000);
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [rentNotification, location]);

  // Effect for payment success modal
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('paymentSuccess') === 'true') {
      setShowModal(true);
    }
  }, [location]);

  const openModal = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
  };

  const closeModal = () => {
    setSelectedVehiculo(null);
  };

  const closeProfileModal = () => {
    setOpenProfile(false);
  };

  const openProfileModal = () => {
    setOpenProfile(true);
  };

  const carros = vehiculos.filter((vehiculo) => vehiculo.tipovehiculo === 'Coche');
  const camionetas = vehiculos.filter((vehiculo) => vehiculo.tipovehiculo === 'Camioneta');
  const motos = vehiculos.filter((vehiculo) => vehiculo.tipovehiculo === 'Moto');

  return (
    <div className="page-container">
      <main className="main-content">
        <h2 className="main-title">Nuestros vehículos</h2>

        {showRentNotification && (
          <div className="fixed top-4 right-4 z-50">
            <Alert
              type="success"
              message="¡Operación completada con éxito!"
              onClose={closeAlert}
            />
          </div>
        )}

        <VehicleSection title="Carros" vehicles={carros} icon={<FaCar />} openModal={openModal} />
        <VehicleSection title="Camionetas" vehicles={camionetas} icon={<FaTruck />} openModal={openModal} />
        <VehicleSection title="Motos" vehicles={motos} icon={<FaMotorcycle />} openModal={openModal} />
      </main>

      <Modal vehiculo={selectedVehiculo} onClose={closeModal} />
      {openProfile && <Profile isOpen={openProfile} onClose={closeProfileModal} />}
    </div>
  );
};

export default PaginaPrincipal;
