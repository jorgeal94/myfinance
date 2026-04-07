🏦 MyFinance Wealth Server v4.6

Bienvenido a MyFinance Wealth, tu gestor de patrimonio personal diseñado para el auto-alojamiento. Esta aplicación transforma tu servidor doméstico en un centro de control financiero privado, seguro y accesible desde cualquier dispositivo de tu red local.

🔥 Características Principales

Multicuenta Total: Crea y gestiona cuentas Corrientes, de Ahorro, Inversiones (ETFs, Fondos) y Plazos Fijos sin límites.

Inteligencia Financiera:

Cálculo automático de TAE/Rendimientos mensuales.

Sistema de Cascada (Waterfall): Tus ahorros se asignan a tus metas según la prioridad que tú definas.

Módulo de Importación CSV: Carga extractos bancarios de cualquier entidad y evita duplicados automáticamente.

Automatización Avanzada:

Recurrentes: Registra gastos fijos (alquiler, nómina) una sola vez.

Barrido (Sweep): El exceso de saldo en corriente se mueve solo a tus ahorros.

Privacidad de Hierro: Todo se queda en tu servidor. Protegido por login privado.

🚀 Despliegue Automático desde GitHub (Sin descargas manuales)

Si tienes el código en un repositorio de GitHub (público o privado con token), puedes configurar Dockge para que construya la aplicación directamente desde la URL. Esto evita tener que descargar los archivos server.js o Dockerfile manualmente.

Pasos en Dockge:

Crear nuevo Stack: Haz clic en "Compose" y nómbralo myfinance.

Configurar el YAML: Pega el código de abajo. Fíjate que en la sección build usamos la URL de tu repositorio en lugar de un punto ..

Variables de Entorno: Define FINANCE_USER y FINANCE_PASS en el panel de Dockge.

Desplegar: Pulsa "Deploy". Docker clonará el repo en un contenedor temporal, construirá la imagen y la lanzará.

YAML Optimizado para GitHub:

version: '3.8'

services:
  finance-app:
    # Docker descargará y construirá todo desde tu repo automáticamente
    build: [https://github.com/TU_USUARIO/TU_REPO.git](https://github.com/TU_USUARIO/TU_REPO.git)
    container_name: myfinance_pro
    ports:
      - "3000:3000"
    environment:
      - FINANCE_USER=${FINANCE_USER:-admin}
      - FINANCE_PASS=${FINANCE_PASS:-admin123}
      - PORT=3000
    volumes:
      - ./data:/usr/src/app/data
    restart: unless-stopped


Tip para Repos Privados: Si tu repositorio es privado, usa el formato: build: https://TOKEN@github.com/usuario/repo.git.

📦 Estructura del Proyecto (en GitHub)

Para que el despliegue automático funcione, tu repositorio debe contener:

├── server.js
├── contabilidad.html
├── package.json
├── Dockerfile
└── .gitignore


🛡️ Seguridad y Backup

Acceso: La aplicación es accesible en http://<IP-DE-TU-SERVER>:3000.

Backup: Aunque el código venga de GitHub, tus datos bancarios se guardan en la carpeta local ./data de tu servidor. Haz copia de seguridad del archivo finance_data.json periódicamente.

Actualización: Cuando subas cambios a GitHub, simplemente pulsa "Update" o "Redeploy" en Dockge. Docker volverá a bajar el código fresco y reconstruirá la app manteniendo tus datos intactos.

📝 Notas de Versión (v4.6)

Importador CSV: Añadida capacidad para mapear columnas bancarias dinámicamente.

GitHub Sync: Soporte para compilación remota directa desde repositorio.

Gestión de Patrimonio: Edición y borrado dinámico de todas las cuentas.

Desarrollado con ❤️ para los amantes del self-hosting y la libertad financiera.
