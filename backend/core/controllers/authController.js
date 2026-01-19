const Usuario = require('../models/Usuario');
const { comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/jwt');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const usuario = await Usuario.findByEmail(email);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        if (!usuario.activo) {
            return res.status(401).json({ error: 'Usuario inactivo' });
        }

        const isValidPassword = await comparePassword(password, usuario.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = generateToken({
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        });

        req.session.token = token;
        req.session.user = {
            id: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.json({ message: 'Sesión cerrada exitosamente' });
    });
};

const verify = (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.json({ authenticated: false });
    }
};

module.exports = { login, logout, verify };
