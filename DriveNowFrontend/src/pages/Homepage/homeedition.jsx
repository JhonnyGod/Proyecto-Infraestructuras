import React, { useState, useEffect } from "react";
import "./home.css";
import PaginaPrincipalEdit from "../../components/homepage/vehicles-page/PaginaPrincipaEdit";
import axios from "axios";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";

const HomeEdition = () => {
  const [vehiculos, setVehiculos] = useState([]);

  const getVehicles = async () => {
    try {
      const response = await axios.post("http://localhost:3000/home/recuperarvehiculos");
      setVehiculos(response.data.vehiculos.vehicles);
    } catch (error) {
      console.error("Error al recuperar vehículos:", error);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <div>
      <Header />
      <PaginaPrincipalEdit vehiculos={vehiculos} />
      <Footer />
    </div>
  );
};

export default HomeEdition;
