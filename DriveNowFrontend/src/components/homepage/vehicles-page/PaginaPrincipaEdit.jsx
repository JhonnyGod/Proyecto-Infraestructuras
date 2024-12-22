import React, { useEffect, useState } from "react";
import "./styles.css";
import VehiculoModal from "./vehicles-modal/modal";
import useModalStore from "../../../store/useModalStore";

const PaginaPrincipalEdit = ({ vehiculos, onUpdateVehiculo }) => {
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const openProfile = useModalStore((state) => state.openProfile); 
  const setOpenProfile = useModalStore((state) => state.setOpenProfile);
  const vehiclesPerPage = 20; // Número máximo de vehículos por página.


  // Calcular los índices para la paginación.
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehiculos.slice(indexOfFirstVehicle, indexOfLastVehicle);

  // Calcular el número total de páginas.
  const totalPages = Math.ceil(vehiculos.length / vehiclesPerPage);

  // Funciones de paginación.
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (vehiculo) => {
    setSelectedVehiculo(vehiculo); // Abrimos el modal con el vehículo seleccionado.
  };

  const closeModal = () => {
    setSelectedVehiculo(null); // Cerramos el modal.
  };

  const saveVehiculo = (updatedVehiculo) => {
    onUpdateVehiculo(updatedVehiculo); // Llama a la función de actualización.
    closeModal(); // Cierra el modal después de guardar.
  };

  return (
    
    <div className="page-container">
      <h1 className="main-title">Edicion de Vehiculos</h1>
      <main className="main-content">
        <div className="vehicles-list">
          {currentVehicles.map((vehiculo) => (
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
                    <li>Color: {vehiculo.color}</li>
                  </ul>
                  <button
                    className="details-button"
                    onClick={() => openModal(vehiculo)} // Abrir modal al hacer click en "Editar"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      </main>

      {/* Modal de edición */}
      {selectedVehiculo && (
        <VehiculoModal
          vehiculo={selectedVehiculo}
          onClose={closeModal}
          isEditMode={true}
          onEditSave={saveVehiculo} // Guarda los cambios en el vehículo
        />
      )}
    </div>
  );
};

export default PaginaPrincipalEdit;
