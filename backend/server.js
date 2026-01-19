const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL || 'http://localhost:3000',
    credentials: true
}));

// Configuración de sesiones
app.use(session({
    secret: process.env.SESSION_SECRET || 'admincore_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas del Core
const authRoutes = require('./core/routes/authRoutes');
const usuariosRoutes = require('./core/routes/usuariosRoutes');

// Rutas de módulos
const trabajadoresRoutes = require('./modules/trabajadores/routes/trabajadoresRoutes');
const asistenciaRoutes = require('./modules/asistencia/routes/asistenciaRoutes');

// Registrar rutas API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/trabajadores', trabajadoresRoutes);
app.use('/api/asistencia', asistenciaRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'AdminCore API funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Ruta catch-all para SPA (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('=================================');
    console.log('     ADMINCORE - Servidor Iniciado');
    console.log('=================================');
    console.log(`✓ Servidor corriendo en puerto ${PORT}`);
    console.log(`✓ Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ URL: http://localhost:${PORT}`);
    console.log('=================================');
});

module.exports = app;
