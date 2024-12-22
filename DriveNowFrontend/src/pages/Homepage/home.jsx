// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import './home.css';
import Header from "../../components/header/header";
import axios from "axios";
import PaginaPrincipal from '../../components/homepage/vehicles-page/PaginaPrincipal';
import useUserStore from "../../store/useUserStore";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const { user } = useUserStore();
  const [vehicleData, setVehicleData] = useState([]);

  const getVehicles = async () => {
    try {
      const vehiclereq = await axios.post('http://localhost:3000/home/recuperarvehiculos');

      if (vehiclereq.status !== 200) {
        console.log('Error al obtener los vehículos');
      }

      const vehicledata = vehiclereq.data.vehiculos.vehicles;
      setVehicleData(vehicledata);
      
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };
  useEffect(() => {
    if (user) {
      getVehicles();
    }
    else {
      getVehicles();
    }
  }, [user]);

  return (
    <div>
      <Header />
      <section className="main-content-screen" id="1">
        <PaginaPrincipal vehiculos={vehicleData} />
      </section>
      <section className="maps">
        <iframe title="Ubicación de nuestras agencias"
          src="https://storage.googleapis.com/maps-solutions-o91kk67wdb/locator-plus/dezy/locator-plus.html"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          loading="lazy">
        </iframe>
      </section>
      <Footer />

    </div>

  );
};

export default Home;