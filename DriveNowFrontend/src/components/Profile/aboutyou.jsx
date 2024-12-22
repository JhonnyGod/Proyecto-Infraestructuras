import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";
import "./aboutyou.css"; // Archivo CSS para estilos personalizados
import Profile from './profile';
import useModalStore from "../../store/useModalStore";
import useUserStore from "../../store/useUserStore";
import axios from "axios";
import convertImageToWebp from "../../utils/convertwebp";

const Services = () => {

  const [userData, setUserData] = useState({
    username: "",
    name: "",
    lastname: "",
    document: "",
    phone: "",
    email: "",
    profilePic: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición

  const user = useUserStore();
  const id_usuario = user.user.user_id;

  useEffect(() => {
    getInfo();
  }, [user]);

  useEffect(() => {
    console.log("Nueva Data", userData);
  }, [userData]);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert('Por favor selecciona una imagen');
      return;
    }

    try {

      const convertion = await convertImageToWebp(file);
      const data = new FormData();
      data.append("image", convertion);

      const apiUrl = "https://api.imgbb.com/1/upload?key=da0fe51518faa206690e2d2d98bc6445"; // API de imgBB

      const img_petition = await axios.post(apiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (img_petition.data.success) {
        console.log(img_petition.data);

        const img_url = img_petition.data.data.url;
        setUserData({ ...userData, profilePic: img_url });
        persistenProfilePic(img_url);
      } else {
        throw new Error("Failed to upload image");
      }

    } catch (error) {
      console.error('Error al convertir o subir imagen:', error);
      alert('Hubo un error al cambiar la foto de perfil.');
    }

  };

  const persistenProfilePic = async (url) => {
    try {
      const petition = await axios.post('http://localhost:3000/usuario/actualizarfoto', {
        userId: id_usuario,
        profilePic: url
      })

      if (petition.status === 200) {
        console.log('Foto de perfil actualizada')
      } else {
        console.log('Error al actualizar la foto de perfil')
        console.log(petition)
      }

    } catch (error) {
      console.error('Error al actualizar la foto de perfil:', error);
      alert('Hubo un error al cambiar la foto de perfil.');
    }
  }

  const getInfo = async () => {
    const petition = await axios.post('http://localhost:3000/usuario/recuperarusuario', {
      userId: id_usuario
    })

    console.log(petition)

    if (petition.status === 200) {
      
      setUserData((prevData) => ({
        ...prevData,
        ...petition.data.user,
        profilePic: petition.data.user.profileImage,
      }));
    } else {
      console.log('Error al obtener la información')
      console.log(petition)
    }
  }

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  }

  const handleSaveChanges = async () => {
    try {
      const { profilePic, profileImage, ...dataToSave } = userData;
      const petition = await axios.post('http://localhost:3000/usuario/actualizar', {
        userId: id_usuario,
        ...dataToSave,
      });

      if (petition.status === 200) {
        alert('Cambios guardados');
        setIsEditing(false);
      } else {
        alert('Hubo un error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error al guardar los cambios', error);
      alert('Hubo un error al guardar los cambios');
    }
  }

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
            <h2>Tu informacion</h2>
          </div>
          <section className="about-me">
            <div className="profile-card">
              <div className="avatar-container">
                <img
                  src={userData.profilePic}
                  alt="Foto de perfil"
                  className="profile-avatar"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="file-input"
                />
              </div>
              <div className="profile-info">
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  />
                ) : (
                  <h3 className="profile-name">{userData.username}</h3>
                )}
              </div>
              <div className="profile-details">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                    <input
                      type="text"
                      value={userData.lastname}
                      onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                    />
                    <input
                      type="text"
                      value={userData.document}
                      onChange={(e) => setUserData({ ...userData, document: e.target.value })}
                    />
                    <input
                      type="text"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                    <input
                      type="text"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  </>
                ) : (
                  <>
                    <p><strong>Nombre:</strong> {userData.name}</p>
                    <p><strong>Apellido:</strong> {userData.lastname}</p>
                    <p><strong>Documento:</strong> {userData.document}</p>
                    <p><strong>Teléfono:</strong>{userData.phone}</p>
                    <p><strong>Correo:</strong> {userData.email}</p>
                  </>
                )}
              </div>
              <div className="profile-actions">
                <button
                  className="btn btn-edit"
                  onClick={isEditing ? handleSaveChanges : handleEditProfile}
                >
                  {isEditing ? 'Guardar Cambios' : '✏️ Editar Perfil'}
                </button>
              </div>
            </div>
          </section>
        </section>
        {openProfile && <Profile isOpen={openProfile} onClose={closeProfileModal} />}
      </main>
      <Footer />
    </div>
  );
};

export default Services;
