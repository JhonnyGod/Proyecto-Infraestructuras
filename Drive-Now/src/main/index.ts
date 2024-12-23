//* Ejecución y configuración de express;

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "../database/connection";
import routes from "../routes/routes";
const cors = require('cors');
import cookieParser from "cookie-parser";

const corsOptions = {
    origin: [
      'http://localhost:8080', // Para desarrollo local
      'http://localhost:3001', // Otra URL local
      'http://frontend-service', // Nombre del servicio dentro del clúster
      'http://frontend-service.default.svc.cluster.local', // FQDN del servicio dentro del clúster
      'http://<EXTERNAL_IP>', // Dirección externa del LoadBalancer (reemplaza <EXTERNAL_IP> por la dirección que obtienes)
      'http://*.*.*.*' // Opción para permitir cualquier IP externa del LoadBalancer (ajusta según tus necesidades)
    ],
    credentials: true, // Permitir cookies y encabezados de autenticación
  };

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const connect = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conexión exitosa 😘😘😘");
    } catch (error) {
        console.log("Error en la conexión 😭😭😭", error);
    }
}

connect().then(() => {
    app.use('/', routes); 
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}).catch(error => {
    console.error('Database connection error:', error);
});
