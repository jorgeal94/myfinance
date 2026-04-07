🏦 MyFinance Wealth Server v4.6

Gestor de finanzas personales avanzado diseñado para ser auto-alojado mediante Docker.

✨ Características

💰 Gestión Multicuenta: Corriente, Ahorro e Inversiones.

📈 Rentabilidad Automática: Cálculo de TAE mensual por cuenta.

🌊 Metas en Cascada: Priorización de ahorro inteligente.

📥 Importador CSV: Carga extractos bancarios y detecta duplicados.

🔒 Acceso Protegido: Autenticación por usuario/contraseña.

🐳 Docker-Ready: Fácil despliegue con Docker Compose.

🚀 Despliegue con Dockge o Docker Compose

Crea una carpeta para el proyecto en tu servidor.

Coloca los archivos server.js, contabilidad.html, package.json, Dockerfile y docker-compose.yml.

(Opcional) Edita el docker-compose.yml para establecer tu usuario y contraseña.

Lanza el contenedor:

docker-compose up -d --build


Accede a través de http://tu-ip-servidor:3000.

📁 Estructura de Datos

La aplicación guarda toda la información en data/finance_data.json. Gracias al volumen configurado en Docker, tus datos persistirán aunque reinicies o actualices el contenedor.

Desarrollado para la gestión patrimonial privada y segura.
