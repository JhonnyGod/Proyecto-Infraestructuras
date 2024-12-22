import React, { useState } from "react";
import './settings.css';
import Header from "../../components/header/header";
import useModalStore from "../../store/useModalStore";
import Profile from "../../components/Profile/profile";
import Footer from "../../components/Footer/Footer";
import AddModal from "../../components/Settings-pages/add-modal/add-modal";
import { useNavigate } from "react-router-dom";

const Settings = () => {

    const navigate = useNavigate();
    const { openProfile, setOpenProfile } = useModalStore();
    const [addModal, setOpenAddModal] = useState(false);
    

    const openProfileModal = () => {
        setOpenProfile(true);
    }

    const closeProfileModal = () => {
        setOpenProfile(false);
    }

    const openAddModal = () => {
        setOpenAddModal(true);
    }

    const closeAddModal = () => {
        setOpenAddModal(false);
    }

    const gohomeedition = () => {
        navigate('/homeedition');
    }

    const openDevolutionsPage = () => {
        navigate('/devolutions');
    }
    return (
        <div>
            <div className="header-container">
                <Header />
            </div>
            <h1 className="main-title">Bienvenido a la configuración</h1>
            <div className="options-container">
                <div className="add-container" onClick={openAddModal}>
                    <h2 className="add-title">Añadir</h2>
                    <div className="add-description-container">
                        <svg className='add-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#022F40" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#022F40" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        <p className="add-description-text">Añade un nuevo vehículo</p>
                    </div>
                </div>
                <div className="edit-container" onClick={gohomeedition}>
                    <h2 className="edit-title">Editar</h2>
                    <div className="edit-description-container">
                        <svg classname="editt-icon" width={'150px'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#022F40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#022F40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <p className="edit-description-text">Edita la información de tus vehículos</p>
                    </div>
                </div>
                <div className="devolution-container" onClick={openDevolutionsPage}>
                    <h2 className="devolution-title">Devoluciones</h2>
                    <div className="devolution-description-container">
                    <svg className="devolution-icon" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.9098 12.3488L14.5198 7.32881C14.4298 7.00881 14.6098 6.67881 14.9198 6.57881L19.8798 4.96881" stroke="#022F40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.0198 19.7888C17.0198 20.7088 20.2698 18.9288 21.2798 15.8188C22.2898 12.7088 20.6698 9.44882 17.6698 8.53882" stroke="#022F40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.4198 12.4988H11.4498" stroke="#022F40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.4198 6.62878H11.4498" stroke="#022F40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2.4198 18.3688H11.4498" stroke="#022F40" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <p className="add-description-text">Verifica tus devoluciones</p>
                    </div>
                </div>
                {openProfile && <Profile isOpen={openProfileModal} onClose={closeProfileModal} />}
                {addModal ? <AddModal closeModal={() => setOpenAddModal(false)} /> : null}
            </div>
            <div className="footer-section">
                <Footer />
            </div>
        </div>
    )
}

export default Settings;