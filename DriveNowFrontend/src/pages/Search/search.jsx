import React, { useState } from "react";
import Header from "../../components/header/header";
import { useLocation } from "react-router-dom";
import VehiculoModal from '../../components/homepage/vehicles-page/vehicles-modal/modal';
import './search.css';

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
    //? Se pueden añadir mas colores, incluso con rgb
};

const ResultsPage = () => {
    const location = useLocation();
    const vehicles = location.state?.vehicles || [];
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);

    // Estado y configuración de la paginación.
    const [currentPage, setCurrentPage] = useState(1);
    const vehiclesPerPage = 10; // Número de vehículos por página.

    // Calcular índices de paginación.
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

    // Total de páginas.
    const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

    // Manejo de botones de paginación.
    const handleNextPagee = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPagee = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const openModal = (vehiculo) => {
        console.log(vehiculo);
        setSelectedVehiculo(vehiculo);
    };

    const closeModal = () => {
        setSelectedVehiculo(null);
    };

    return (
        <div className="search-page-main-container">
            <Header />
            <h2 className="search-title">Resultados de tu búsqueda</h2>
            <div className="coincidences-container">
                {vehicles.length === 0 ? (
                    <p>No se encontraron resultados.</p>
                ) : (
                    currentVehicles.map((vehiculo) => (
                        <div key={vehiculo.idvehiculo} className="vehicle-item">
                            <div className="vehicle-card">
                                <img
                                    src={vehiculo.image_src}
                                    alt={vehiculo.nombre}
                                    className="vehicle-image"
                                />
                                <div className="vehicle-info">
                                    <h2 className="vehicle-title">{vehiculo.nombre}</h2>
                                    <ul className="vehicle-features">
                                        <li>Tipo: {vehiculo.tipovehiculo}</li>
                                        <li>Marca: {vehiculo.marca}</li>
                                        <li>
                                            Color:
                                            <span
                                                className="color-bubble"
                                                style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}>
                                            </span>
                                            {vehiculo.color}
                                        </li>
                                    </ul>
                                    <button
                                        className="details-button"
                                        onClick={() => openModal(vehiculo)}
                                    >
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {/* Paginación */}
            <div className="paginationserch">
                <button onClick={handlePrevPagee} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>
                    Página {currentPage} de {totalPages}
                </span>
                <button onClick={handleNextPagee} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>

            <Modal vehiculo={selectedVehiculo} onClose={closeModal} />
        </div>
    );
};

export default ResultsPage;
