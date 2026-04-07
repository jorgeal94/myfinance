# Usar imagen ligera de Node.js
FROM node:18-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY server.js ./
COPY contabilidad.html ./

# Crear carpeta de datos y asignar permisos
RUN mkdir data

# Exponer el puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV FINANCE_USER=admin
ENV FINANCE_PASS=admin123
ENV PORT=3000

# Comando para iniciar la aplicación
CMD [ "node", "server.js" ]