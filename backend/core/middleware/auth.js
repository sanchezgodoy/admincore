const { verifyToken } = require('../../utils/jwt');

const authMiddleware = (req, res, next) => {
    const token = req.session?.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }

    req.user = decoded;
    next();
};

const isAdmin = (req, res, next) => {
    if (req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'Acceso denegado. Requiere perfil de Administrador.' });
    }
    next();
};

const isJefeTurno = (req, res, next) => {
    if (req.user.rol !== 'Jefe de Turno' && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'Acceso denegado. Requiere perfil de Jefe de Turno.' });
    }
    next();
};

module.exports = {
    authMiddleware,
    isAdmin,
    isJefeTurno
};
