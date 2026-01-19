const express = require('express');
const router = express.Router();
const { getAll, getByPeriodo, getByTrabajador, create, getTiposRegistro, getPeriodoActual } = require('../controllers/asistenciaController');
const { authMiddleware, isJefeTurno } = require('../../../core/middleware/auth');

router.get('/', authMiddleware, getAll);
router.get('/periodo/:id_periodo', authMiddleware, getByPeriodo);
router.get('/trabajador/:id_trabajador', authMiddleware, getByTrabajador);
router.post('/', authMiddleware, isJefeTurno, create);
router.get('/tipos', authMiddleware, getTiposRegistro);
router.get('/periodo-actual', authMiddleware, getPeriodoActual);

module.exports = router;
