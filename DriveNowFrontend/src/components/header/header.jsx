import React, { useEffect } from "react";
import './header.css';
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useModalStore from "../../store/useModalStore";
import axios from "axios";

function Header() {

  const [searchterm, setSearchTerm] = React.useState('')
  const [keyDown, setKeyDown] = React.useState(false)
  const [openSearchFilters, setOpenSearchFilters] = React.useState(false)
  const [term, setTerm] = React.useState('')
  const inputRef = React.useRef(null)

  const [searchedData, setSearchedData] = React.useState([])

  useEffect(() => {
    if (searchedData.length > 0) {
      console.log("Data a renderizar: ", searchedData)
    }
  }, [searchedData])

  const handleSelectChange = (event) => {
    const termValue = event.target.value;
    inputRef.current.focus();
    setTerm(termValue)
  }
  const handleClick = () => {
    setOpenSearchFilters(true)
  }

  const searchfunction = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const pressEnter = (event) => {
    if (event.key === 'Enter') {
      setKeyDown(true)
    }
  }

  useEffect(() => {
    if (searchterm !== '' && keyDown === true && term !== '') {
      console.log("SearchTerm: ", searchterm)
      console.log("Term: ", term)
      setKeyDown(false)
      sendSearchPetition(searchterm, term)
    }
  }, [searchterm, keyDown, term])

  const sendSearchPetition = async (searchterm, term) => {
    const petition = await axios.post('http://localhost:3000/usuario/buscar', {
      searchterm: searchterm,
      filterattribute: term
    })

    if (petition.status !== 200) {
      alert('Error al buscar')
    }
    alert("Petición exitosa")

    setSearchedData(petition.data.vehicles)
    navigate('/searchresults', { state: { vehicles: petition.data.vehicles } })
  }


  const navigate = useNavigate();
  const { hasSession, clearUser } = useUserStore();
  const setOpenProfile = useModalStore((state) => state.setOpenProfile);

  const goHome = () => {
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const openProfile = () => {
    setOpenProfile(true);
    console.log('Abriendo perfil');
  }

  const about = () => {
    navigate('/about')
  }

  const service = () => {
    navigate('/service')
  }


  return (
    <div className="main-screen">
      <header className="header">
        <div className="logo">
          <img src="https://i.ibb.co/zVPsLGf/imagen-2024-11-03-193947179-removebg-preview.png" alt="Logotipo" onClick={goHome} />
        </div>

        <input type="text" className="input-header" id="input-header" placeholder="Buscar..." onClick={handleClick} onChange={searchfunction} onKeyDown={pressEnter} ref={inputRef} />
        {openSearchFilters ?
          <div className="ventana-opciones">
            <h5 className="opciones-titulo">¿Tu búsqueda es sobre?</h5>
            <select name="filter-options" className="combobox-opciones" onChange={handleSelectChange}>
              <option value="combustible">Combustible</option>
              <option value="capacidad">Capacidad</option>
              <option value="nombre">Nombre</option>
              <option value="tipovehiculo">Tipo de vehículo</option>
              <option value="modelo">Modelo</option>
              <option value="color">Color</option>
              <option value="cilindraje">Cilindraje</option>
              <option value="marca">Marca</option>
            </select>
          </div> : null}

        <nav className="nav">
          <ul>
            <li><a href="#home" onClick={goHome}>Inicio</a></li>
            <li><a href="#about" onClick={about}>Sobre Nosotros</a></li>
            <li><a href="#services" onClick={service}>Servicios</a></li>
            <li><a href="#contact">Contacto</a></li>

          </ul>
        </nav>

        <div className="buttonsUser">
          {hasSession() ? (
            <div className="profile-container" onClick={openProfile}>
              <button className="profile" onClick={openProfile}>
                <img className='profileimg' src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="" />
              </button>
              <p className="profile-text">Mi perfil</p>
            </div>
          ) : null}
          {hasSession() ? null : <button className="buttonSing" onClick={handleLogin}>Iniciar Sesión</button>}
          {hasSession() ? null : <button className="buttonSing" onClick={handleRegisterClick}>Regístrate</button>}
        </div>
      </header>
    </div>
  );
}

export default Header;