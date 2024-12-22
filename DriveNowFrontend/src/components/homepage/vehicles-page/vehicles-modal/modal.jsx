import React, { useEffect, useState } from 'react';
import './styles.css';
import useUserStore from '../../../../store/useUserStore';
import { useNavigate, useLocation } from 'react-router-dom';
import StyledDatePicker from './DatePicker/Datepicker';
import GooglePayComponent from '../../../../payments/GooglePayButton';
import usePaymentStatus from '../../../../store/PaymentStatus';
import axios from 'axios'; // Importar Axios para las solicitudes HTTP
export default function VehiculoModal({
    vehiculo,
    onClose,
    isEditMode = false, // Esto será controlado por la ruta
    onEditSave = () => { },
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, hasSession, getId } = useUserStore();
    const [payment, setOpenPayment] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { paymentStatus, setPaymentStatus } = usePaymentStatus();
    const [priceString, setPriceString] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [rentNotification, setRentNotification] = useState(false);
    const [isRentNotificationSent, setIsRentNotificationSent] = useState(false);

    // Estado para los datos del vehículo
    const [editableFormData, setEditableFormData] = useState({
        idvehiculo: vehiculo.idvehiculo,
        nombre: vehiculo.nombre,
        matricula: vehiculo.matricula,
        tipovehiculo: vehiculo.tipovehiculo,
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        cilindraje: vehiculo.cilindraje,
        marca: vehiculo.marca,
        capacidad: vehiculo.capacidad,
        combustible: vehiculo.combustible,
        image_src: vehiculo.image_src,
        descripcion: vehiculo.descripcion,
        valor_dia: vehiculo.valor_dia,
    });

    const colorMap = {
        rojo: 'red',
        azul: 'blue',
        verde: 'green',
        amarillo: 'yellow',
        blanco: 'white',
        negro: 'black',
        gris: 'gray',
    };

    const navigate = useNavigate();
    const location = useLocation();

    const isInEditMode = location.pathname === '/homeedition';

    useEffect(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        if (paymentStatus === 'SUCCESS' && !isRentNotificationSent) { // Solo ejecuta si no se ha enviado aún
            setIsRentNotificationSent(true); // Marca como enviado para evitar repeticiones
            setOpenPayment(false);
            setIsOpen(false);
            setRentNotification(true);
    
            navigate('/', {
                state: { rentNotification: true } // Enviar el estado solo una vez
            });
    
            setTimeout(() => {
                setPaymentStatus(null);
                onClose();
            }, 300);
        }
    }, [paymentStatus, navigate, onClose, setPaymentStatus, isRentNotificationSent]);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRent = () => {
        setOpenPayment(true)
    };

    const confirmRental = (calculatedTotalPrice) => {
        const priceString = calculatedTotalPrice.toString();
        setPriceString(priceString);
    };

    const handleRentPetition = async () => {
        const [startDate, endDate] = dateRange;

        if (startDate && endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const calculatedTotalPrice = diffDays * vehiculo.valor_dia;
            confirmRental(calculatedTotalPrice);
            setTotalPrice(calculatedTotalPrice);

            const transaction_user_id = useUserStore.getState().user.user_id;

            setTransactionData({
                idvehiculo: vehiculo.idvehiculo,
                idusuario: transaction_user_id,
                fecha_inicio: startDate,
                fecha_fin: endDate,
            });
        } else {
            console.log("Por favor selecciona ambas fechas.");
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (e.target.type === 'file') {
            setEditableFormData({
                ...editableFormData,
                [name]: files[0],
            });
        } else {
            setEditableFormData({
                ...editableFormData,
                [name]: value,
            });
        }
    };

    const handleSave = async () => {
        try {
            // Realizamos la solicitud POST al backend para actualizar la información del vehículo
            const response = await axios.post('http://localhost:3000/vehiculos/editarvehiculo', editableFormData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.ok) {
                alert('Vehículo actualizado con éxito');
                onEditSave(editableFormData);  // Pasamos los datos actualizados al padre
                handleClose();  // Cerramos el modal
            } else {
                alert('Error al actualizar el vehículo: ' + response.data.message);
            }
        } catch (error) {
            alert('Error al guardar los cambios: ' + error.message);
        }
    };

    const handleDelete = async () => {

        try {
            const deletePetition = await axios.post('http://localhost:3000/vehiculos/eliminarvehiculo', {
                idvehiculo: editableFormData.idvehiculo,
            });

            if (deletePetition.status === 200) {
                alert('Vehículo eliminado con éxito');
                onClose();
            }

        } catch (error) {

            console.log('Error al eliminar el vehículo:', error);
        }
    }

    return (
        paymentStatus === 'SUCCESS' ? null : (
            <div className={`vm-modal-overlay ${isOpen ? 'vm-open' : ''}`} onClick={handleClose}>
                <div className={`vm-modal-content ${isOpen ? 'vm-open' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <button className="vm-modal-close" onClick={handleClose}>×</button>
                    {payment ? null : (
                        <div className="vm-modal-body">
                            <div className="vm-vehicle-details">
                                <div className="vm-vehicle-image-container">
                                    {isInEditMode ? (
                                        <>
                                            <input
                                                type="file"
                                                name="image_src"
                                                onChange={handleChange}
                                                className="vm-image-edit"
                                            />
                                            <img
                                                src={
                                                    editableFormData.image_src instanceof File
                                                        ? URL.createObjectURL(editableFormData.image_src) // Vista previa del archivo seleccionado
                                                        : editableFormData.image_src || vehiculo.image_src // Enlace existente
                                                }
                                                alt="Vista previa"
                                                className="vm-vehicle-image"
                                            />
                                        </>
                                    ) : (
                                        <img
                                            src={vehiculo.image_src}
                                            alt={vehiculo.nombre}
                                            className="vm-vehicle-image"
                                        />
                                    )}
                                </div>

                                <div className="vm-vehicle-info">
                                    <h2 className="vm-vehicle-title">
                                        {isInEditMode ? (  // Aquí también controlamos si está en modo edición
                                            <input
                                                type="text"
                                                name="nombre"
                                                value={editableFormData.nombre}
                                                onChange={handleChange}
                                                placeholder="Nombre del vehículo"
                                                className="vm-vehicle-title-input"
                                            />
                                        ) : (
                                            vehiculo.nombre
                                        )}
                                    </h2>

                                    <div className="vm-vehicle-features">
                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🚗</span>
                                            {isInEditMode ? (
                                                <input
                                                    type="text"
                                                    name="tipovehiculo"
                                                    value={editableFormData.tipovehiculo}
                                                    onChange={handleChange}
                                                    placeholder="Tipo de vehículo"
                                                />
                                            ) : (
                                                <span>Tipo: {vehiculo.tipovehiculo}</span>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🏷️</span>
                                            {isInEditMode ? (
                                                <input
                                                    type="text"
                                                    name="marca"
                                                    value={editableFormData.marca}
                                                    onChange={handleChange}
                                                    placeholder="Marca"
                                                />
                                            ) : (
                                                <span>Marca: {vehiculo.marca}</span>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🎨</span>
                                            {isInEditMode ? (
                                                <input
                                                    type="text"
                                                    name="color"
                                                    value={editableFormData.color}
                                                    onChange={handleChange}
                                                    placeholder="Color"
                                                />
                                            ) : (
                                                <li style={{ listStyleType: 'none' }}>
                                                    <div className='text-color'>Color {vehiculo.color}</div>
                                                    <span
                                                        className="color-bubble"
                                                        style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }} />
                                                </li>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">📅</span>
                                            {isInEditMode ? (
                                                <input
                                                    type="text"
                                                    name="modelo"
                                                    value={editableFormData.modelo}
                                                    onChange={handleChange}
                                                    placeholder="Modelo"
                                                />
                                            ) : (
                                                <span>Modelo: {vehiculo.modelo}</span>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🔧</span>
                                            {isInEditMode ? (
                                                <input
                                                    type="text"
                                                    name="cilindraje"
                                                    value={editableFormData.cilindraje}
                                                    onChange={handleChange}
                                                    placeholder="Cilindraje"
                                                />
                                            ) : (
                                                <span>Cilindraje: {vehiculo.cilindraje}</span>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🏋️</span>
                                            {isInEditMode ? (
                                                <input
                                                    type="text"
                                                    name="capacidad"
                                                    value={editableFormData.capacidad}
                                                    onChange={handleChange}
                                                    placeholder="Capacidad"
                                                />
                                            ) : (
                                                <span>Capacidad: {vehiculo.capacidad}</span>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">⛽</span>
                                            {isInEditMode ? (
                                                <input
                                                    type="text"
                                                    name="combustible"
                                                    value={editableFormData.combustible}
                                                    onChange={handleChange}
                                                    placeholder="Combustible"
                                                />
                                            ) : (
                                                <span>Combustible: {vehiculo.combustible}</span>
                                            )}
                                        </div>

                                    </div>
                                    <div className="vm-vehicle-full-description">
                                        <h3>Descripción</h3>
                                        {isInEditMode ? (
                                            <textarea
                                                name="descripcion"
                                                value={editableFormData.descripcion}
                                                onChange={handleChange}
                                                placeholder="Descripción del vehículo"
                                                className="vm-vehicle-description-input"
                                            />
                                        ) : (
                                            <p>{vehiculo.descripcion}</p>
                                        )}
                                    </div>
                                    {isInEditMode ? (
                                        // Modo edición: el precio es editable
                                        <input
                                            type="number"
                                            name="valor_dia"
                                            value={editableFormData.valor_dia}
                                            onChange={handleChange}
                                            className="price-input"
                                            placeholder="Valor por día"
                                        />
                                    ) : (
                                        // Modo no edición: el precio es solo texto
                                        <p>{vehiculo.valor_dia} USD</p>
                                    )}

                                    {isInEditMode ? (
                                        <button className="save-button" onClick={handleSave}>
                                            Guardar Cambios
                                        </button>
                                    ) : (
                                        <button
                                            className="vm-rent-button"
                                            onClick={() => hasSession() ? handleRent() : handleLogin()}
                                        >
                                            {hasSession() ? 'Alquilar' : 'Logearse'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {payment && (
                        <div className="payment-body">
                            <div className="payment-modal">
                                {/* Botón de cerrar del modal de pago */}
                                <button className="close-button-style" onClick={() => setOpenPayment(false)}>
                                    ×
                                </button>

                                <h1 className="payment-title">
                                    Selecciona tu fecha de inicio y finalización de alquiler
                                </h1>

                                <div className="start-date-space">
                                    <StyledDatePicker
                                        dateRange={dateRange}
                                        setDateRange={setDateRange}
                                    />
                                </div>
                                <button className="accept-button" onClick={handleRentPetition}>
                                    Aceptar
                                </button>

                                {totalPrice > 0 && (
                                    <div className="payment-summary">
                                        <p className="payment-total">Total a pagar: ${totalPrice}</p>
                                        <GooglePayComponent className='gpayButton ' transactionData={transactionData} priceString={priceString} />
                                    </div>
                                )}
                                {isInEditMode ? (
                                    <button className="delete-vehicle" onClick={handleDelete}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-trash"
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6L5 6 5 19a2 2 0 002 2h10a2 2 0 002-2V6z"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                        Eliminar vehículo
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    )}
            </div >
            </div >
        )
    );
}
