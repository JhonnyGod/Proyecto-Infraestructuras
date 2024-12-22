import React, { useState, useEffect } from 'react';
import profileImage from '../../Assets/profile.png';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/utilcomponents/alert.css';
import useUserStore from '../../store/useUserStore';
//* Comentario para verificar que se suban cambios del de git al de Azure
export const Login = () => {
  const {user, setUser} = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertClass, setAlertClass] = useState('');
  const navigate = useNavigate();

  //TODO: Hay que modificar los status de la respuesta en el backend, y dado cada uno de ellas agregar al front mensajes de error para cada uno
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRequest = await axios.post('http://localhost:3000/usuario/login', { //* Solicitud HTTP a la URL local del backend
        email: email,
        password: password,
      
      },{
        withCredentials: true,
      });

      if (loginRequest.status != 200) { //*Si el Estado es diferente de OK, devolver un mensaje de error
        console.log('Inicio de sesión fallido');
        setAlertMessage('Inicio de sesión fallido, verifica tus credenciales.');
        showAlertWithAnimation();
      }

      const data = loginRequest.data//* Tomo la información del usuario que me devuelve el backend
      console.log(data);

      if (data.user && data.user.email && data.user.id_user) {

        setUser({
          user_id: data.user.id_user,
          username: data.user.username,
          email: data.user.email,
          isAdmin: data.user.isAdmin,
        });
      }
      navigate('/');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setAlertMessage('Inicio de sesión fallido, verifica tus credenciales.');
      showAlertWithAnimation();
    }
  };

  const forgotPasswordRecover = async (e) => {
    e.preventDefault();
    navigate('/recover');
  }

  const register = async (e) => {
    e.preventDefault();
    navigate('/register');
  }

  const showAlertWithAnimation = () => {
    setShowAlert(true);
    setAlertClass('alert-fall');

    setTimeout(() => {
      setAlertClass('alert-rise');


      setTimeout(() => {
        setShowAlert(false);
        setAlertClass('');
      }, 500);
    }, 3000);
  };

  const handleHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (user && user.token) {
      navigate('/home');  
    }
  }, [user, navigate]);

  return (

    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <div className="forgot-password">
            <a href="#" className="Return" onClick={handleHome} > Regresar </a>
          </div>
          <div className="profile-image-container">
            <img src={profileImage} alt="Perfil" className="profile-image" />
          </div>
          <h2 className="title">Iniciar Sesión</h2>
          <div className="input-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="Ingresa tu correo"
            />
            <i className="fas fa-envelope icon"></i>
          </div>
          <div className="input-group">
            <label htmlFor="password" className="label">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              placeholder="Ingresa tu contraseña"
            />
            <i className="fas fa-lock icon" ></i>
          </div>
          <button type="submit" className="button">Iniciar</button>
          <div className="link">
            <div className="forgot-password">
              <a href="#" className="forgot-password-link" onClick={forgotPasswordRecover}>¿Olvidaste tu contraseña?</a>
            </div>
            <div className="register">
              <a href="#" className="register-link" onClick={register}>¿No tienes una cuenta?</a>
            </div>
          </div>
          {showAlert && (
            <div className={`alert ${alertClass}`}>
              <p>{alertMessage}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
