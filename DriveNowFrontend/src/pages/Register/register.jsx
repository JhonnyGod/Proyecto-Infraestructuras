import './register.css';
import image from '../../Assets/fondo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptEmails, setAcceptEmails] = useState(false);
  const navigate = useNavigate();

  const apiURL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    recontra: '',
    documento_: '',
    telefono_: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const createNewUser = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.recontra) {
      console.log('Las contraseñas no coinciden');
      setFormData({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        recontra: '',
        documento: '',
        telefono: ''
      });
    }
    //TODO: Esto toca corregirlo resto pero ya esta casi listo, se pueden registrar usuarios mientras
    
    else {
      try {
        const dataSend = {
          username: formData.user_name,
          firstname: formData.first_name,
          lastname: formData.last_name,
          email: formData.email,
          password: formData.password,
          documento: formData.documento_,
          telefono: formData.telefono_
        };
        const petition = await axios.post(`${apiURL}/usuario/registrarse`, dataSend);

        if (petition.status === 200) {
          console.log('Usuario creado exitosamente');
          navigate('/');
        }
        else {
          console.error('Error al crear usuario');
        }

      } catch (error) {
        console.error('Error al crear usuario:', error);
      }
    }
  }

  const login_return = async (e) => {
    e.preventDefault();
    navigate('/Login');
  }


  //TODO: Crear la lógica para el registro de usuario y ajustar el diseño de esta vista
  return (
    <>
      <div className="registro-container">
        <div className="imagen-lateral">
          <img src={'https://cdn.dribbble.com/users/992933/screenshots/4608688/media/f046153ea09fd6e833184c5cd209aee9.gif'} alt="Persona en coche" />
          <h2 className='overlay-text'>Bienvenido a Drive Now!🚗</h2>
          <h1 className='presentation'>Regístrate para acceder a nuestros servicios.</h1>
        </div>
        <div className="formulario-registro">
          <h2 className='tittle'>Registro de usuario</h2>
          <form onSubmit={createNewUser}>
            <input className="username-label" type="text" name="user_name" placeholder="Ingrese su nombre de usuario" value={formData.username} onChange={handleInputChange} />
            <div className="name">
              <input className="Nombre" type="text" name='first_name' placeholder="Ingrese su nombre" value={formData.nombre} onChange={handleInputChange} />
              <input className="Apellido" type="text" name='last_name' placeholder="Ingrese su apellido" value={formData.value} onChange={handleInputChange} />
            </div>
            <input className="email_register" type="email" name='email' placeholder="Ingrese su correo" value={formData.value} onChange={handleInputChange} />
            <div className="contraseñas">
              <input className="contra" type="password" name='password' placeholder="Ingrese una contraseña" value={formData.value} onChange={handleInputChange} />
              <input className="Recontra" type="password" name='recontra' placeholder="Confirma tu contraseña" value={formData.value} onChange={handleInputChange} />
            </div>
            <input className="documento" type="text" name='documento_' placeholder="Ingrese numero de identificación" value={formData.value} onChange={handleInputChange} />
            <input className="telefono" type="text" name='telefono_' placeholder="Ingrese su número de teléfono" value={formData.value} onChange={handleInputChange} />
            <div className="checkbox-container">
              <label>
                <div className={`toggle-button ${acceptTerms ? 'active' : ''}`} onClick={() => setAcceptTerms(prev => !prev)}>
                  <div className="toggle-switch" />
                </div>
                Acepto términos y condiciones
              </label>
              <label>
                <div className={`toggle-button ${acceptEmails ? 'active' : ''}`} onClick={() => setAcceptEmails(prev => !prev)}>
                  <div className="toggle-switch" />
                </div>
                Acepto el envío de información a través de correos
              </label>
            </div>
            <button className="Registrar" type="submit">Registrar</button>
            <div className="return_login">
              <a href="#" className="Regreso" onClick={login_return} > ¿Ya tienes cuenta? </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default Register;