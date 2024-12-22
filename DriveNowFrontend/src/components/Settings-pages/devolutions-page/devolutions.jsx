import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "../../header/header";
import './devolutions.css';
import { useNavigate } from 'react-router-dom';

const Devolutions = () => {
    const navigator = useNavigate();
    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        const getProcesses = async () => {
            try {
                const response = await axios.post('http://localhost:3000/usuario/devoluciones');
                if (response.status === 200) {
                    console.log(response.data);
                    setProcesses(response.data.processes);
                }
            } catch (error) {
                console.log('Error al obtener los procesos');
                console.log(error);
            }
        };
        getProcesses();
    }, []);

    const handleAcceptDevolution = (id) => {
        finishDevolution(id);
    };

    const finishDevolution = async (id) => {
        console.log(id);
        try {
            const petition = await axios.post('http://localhost:3000/vehiculos/aceptardevolucion', {
                idalquiler: id
            });
            if (petition.status !== 200) {
                alert('Error al aceptar la devolución');
            }
        alert('Devolución aceptada');
        navigator('/devolutions');
        } catch (error) {
            console.error('Error al aceptar la devolución', error);
            alert('Error al aceptar la devolución');
        }
        
    }
    return (
        <div>
            <Header />
            <div className="devolutions-page-main-container">
                <h1 className="devolutions-page-title">Devoluciones</h1>
                <div className="devolutions-page-list">
                    {processes.map((process) => (
                        <div key={process.idalquiler} className="devolutions-page-item">
                            <div className="devolutions-page-vehicle-info">
                                <img
                                    src={process.vehiculo.image_src}
                                    alt={process.vehiculo.nombre}
                                    className="devolutions-page-vehicle-image"
                                />
                            </div>
                            <div className="devolutions-page-details">
                                <h3 className="devolutions-page-vehicle-name">{process.vehiculo.nombre}</h3>
                                <p className="devolutions-page-vehicle-matricula">Matrícula: {process.vehiculo.matricula}</p>
                                <div className="devolutions-page-client-info">
                                    <p><strong>Cliente:</strong> {process.cliente.nombre} ({process.cliente.documento})</p>
                                    <p><strong>Teléfono:</strong> {process.cliente.phone}</p>
                                </div>
                                <div className="devolutions-page-date-info">
                                    <p><strong>Fecha fin:</strong> {process.fecha_fin}</p>
                                    <p><strong>Fecha devolución:</strong> {process.fecha_devolucion}</p>
                                </div>
                                <button
                                    className="devolutions-page-accept-button"
                                    onClick={() => handleAcceptDevolution(process.idalquiler)}
                                >
                                    Aceptar devolución
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Devolutions;
