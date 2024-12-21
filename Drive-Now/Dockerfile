# Usar una imagen base oficial de Node.js
FROM node:18

# Crear un directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "run", "dev"]
