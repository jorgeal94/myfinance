const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de seguridad vía variables de entorno
const USERNAME = process.env.FINANCE_USER || 'admin';
const PASSWORD = process.env.FINANCE_PASS || 'admin123';
const DATA_FILE = path.join(__dirname, 'data', 'finance_data.json');

app.use(express.json());

// Middleware de Autenticación Basic Auth
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('Acceso denegado');
    
    const authPayload = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    if (authPayload[0] === USERNAME && authPayload[1] === PASSWORD) {
        next();
    } else {
        res.status(401).send('Credenciales inválidas');
    }
};

// Asegurar que la carpeta de datos existe
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Inicializar base de datos JSON si no existe
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        accounts: [
            { id: 'acc_1', name: 'Cuenta Corriente', type: 'checking', performance: 0 },
            { id: 'acc_2', name: 'Cuenta de Ahorro', type: 'savings', performance: 2.5 }
        ],
        transactions: [],
        goals: [],
        recurring: [],
        settings: { 
            emergencyFund: 0, 
            minChecking: 0, 
            emergencyAccountId: 'acc_2', 
            sweepAccountId: 'acc_1' 
        }
    }));
}

// API: Obtener datos
app.get('/api/data', auth, (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al leer los datos' });
    }
});

// API: Guardar datos
app.post('/api/save', auth, (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error al guardar los datos' });
    }
});

// Servir el frontend estático
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contabilidad.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`MyFinance Wealth corriendo en puerto ${PORT}`);
});