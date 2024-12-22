import React, { useState } from "react";
import './add-modal.css';
import axios from "axios";
import convertImageToWebp from "../../../utils/convertwebp";


//todo: Hacer el formulario anti imbéciles, es decir, cambiar los inputs por comboboxes
//TODO: Cuando se agregan vehículos, el tipo debe ser el exacto de la bd, (Coche, Moto, Camioneta), voy a cambiarlo por Comboboxes 
//* Si no no se muestran.
// completado jhonny traga bolas perra
const AddModal = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        matricula: '',
        tipovehiculo: '',
        modelo: '',
        color: '',
        cilindraje: '',
        marca: '',
        capacidad: '',
        combustible: '',
        image_src: null,
        descripcion: '',
        valor_dia: '',
    });


    const handleAddClose = () => {
        closeModal();
    }

    const handleAddSubmit = async (event) => {
        event.preventDefault();

        const vehicleData = {
            nombre: formData.nombre,
            matricula: formData.matricula,
            tipovehiculo: formData.tipovehiculo,
            modelo: formData.modelo,
            color: formData.color,
            cilindraje: formData.cilindraje,
            marca: formData.marca,
            capacidad: formData.capacidad,
            combustible: formData.combustible,
            image_src: null,
            descripcion: formData.descripcion,
            valor_dia: formData.valor_dia,
        };

        try {
            const file = formData.image_src;
            const convertion = await convertImageToWebp(file);
            const data = new FormData();
            data.append("image", convertion);

            const apiUrl = "https://api.imgbb.com/1/upload?key=da0fe51518faa206690e2d2d98bc6445" //! Me quedó grande ponerlo en .env jajaj

            const img_petition = await axios.post(apiUrl, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (img_petition.data.success) {
                console.log(img_petition.data);
            } else {
                throw new Error("Failed to upload image");
            }

            const img_url = img_petition.data.data.url
            vehicleData.image_src = img_url;

            console.log(vehicleData);

            const backend_request = await axios.post('http://localhost:3000/admin/crearvehiculo', vehicleData);
            if (backend_request.status === 200) {
                alert('Vehículo creado exitosamente');
                closeModal();
            }
            else {
                console.error('Error al crear vehículo');
            }
        } catch (error) {
            console.error('Error al convertir vehículo:', error);

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image_src: file,
        });
    };

    const handleImageClick = () => {
        document.getElementById("image-input").click();
    };

    const handleReplaceImage = () => {
        setFormData({
            ...formData,
            image_src: null,
        });
    };

    return (
        <div className="add-modal-container">
            <div className="add-form-container">
                <form onSubmit={handleAddSubmit}>
                    <div className="form-header">
                        <h2>Añadir Vehículo</h2>
                        <button type="button" className="close-modal-btn" onClick={handleAddClose}>X</button>
                    </div>
                    <div className="form-content">
                        {/* Left Side: Image Upload */}
                        <div className="image-upload-container">
                            {!formData.image_src ? (
                                <button
                                    type="button"
                                    className="image-upload-button"
                                    onClick={handleImageClick}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="48px"
                                        height="48px"
                                    >
                                        <path d="M12 4v16m8-8H4" strokeWidth="2" stroke="currentColor" fill="none" />
                                    </svg>
                                    <span>Agregar Imagen</span>
                                </button>
                            ) : (
                                <div className="image-preview-container">
                                    <img src={URL.createObjectURL(formData.image_src)} alt="Vista previa" />
                                    <button
                                        type="button"
                                        className="replace-image-button"
                                        onClick={handleReplaceImage}
                                    >
                                        Reemplazar Imagen
                                    </button>
                                </div>
                            )}
                            <input
                                id="image-input"
                                type="file"
                                name="image_src"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Right Side: Form Fields */}
                        <div className="form-fields-container">
                            <label htmlFor="nombre">
                                Nombre del Vehículo
                                <input
                                    id="nombre"
                                    className="form-input"
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="matricula">
                                Matrícula
                                <input
                                    id="matricula"
                                    className="form-input"
                                    type="text"
                                    name="matricula"
                                    value={formData.matricula}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="tipo">
                                Tipo
                                <select
                                    id="tipo"
                                    className="form-input"
                                    type="text"
                                    name="tipovehiculo"
                                    value={formData.tipovehiculo}
                                    onChange={handleChange}
                                    defaultValue={formData.tipovehiculo}
                                >
                                    <option value="" disabled>Selecciona el tipo</option>
                                    <option value="Coche">Coche</option>
                                    <option value="Camioneta">Camioneta</option>
                                    <option value="Moto">Moto</option>
                                </select>
                            </label>

                            <label htmlFor="modelo">
                                Modelo
                                <input
                                    id="modelo"
                                    className="form-input"
                                    type="text"
                                    name="modelo"
                                    value={formData.modelo}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="color">
                                Color
                                <input
                                    id="color"
                                    className="form-input"
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="cilindraje">
                                Cilindraje
                                <input
                                    id="cilindraje"
                                    className="form-input"
                                    type="text"
                                    name="cilindraje"
                                    value={formData.cilindraje}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="marca">
                                Marca
                                <input
                                    id="marca"
                                    className="form-input"
                                    type="text"
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="capacidad">
                                Capacidad
                                <input
                                    id="capacidad"
                                    className="form-input"
                                    type="text"
                                    name="capacidad"
                                    value={formData.capacidad}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="combustible">
                                Combustible
                                <select
                                    id="combustible"
                                    className="form-input"
                                    name="combustible"
                                    value={formData.combustible}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Tipo de combustible</option>
                                    <option value="gasolina">Gasolina</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="hibrido">Híbrido</option>
                                    <option value="electrico">Eléctrico</option>
                                </select>
                            </label>
                            <label htmlFor="descripcion">
                                Descripción
                                <textarea
                                    id="descripcion"
                                    className="form-input"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    placeholder="Añade una descripción del vehículo"
                                    rows="3"
                                ></textarea>
                            </label>
                            <label htmlFor="valor_dia">
                                Valor por Día
                                <input
                                    id="valor_dia"
                                    className="form-input"
                                    type="number"
                                    name="valor_dia"
                                    value={formData.valor_dia}
                                    onChange={handleChange}
                                    placeholder="Ejemplo: 100.00"
                                />
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Añadir Vehículo</button>
                </form>
            </div>

        </div>
    );
};

export default AddModal;
