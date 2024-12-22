# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json (si existe)
COPY Drive-Now/package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente del proyecto al contenedor
COPY . .

# Exponer el puerto en el que la app va a escuchar
EXPOSE 3000

# Comando por defecto para ejecutar el contenedor
CMD ["npx", "ts-node", "src/main/index.ts"]
