const express = require('express');
const router = express.Router();
const { getAll, getActivos, getById, create, update, remove } = require('../controllers/trabajadoresController');
const { authMiddleware, isAdmin } = require('../../../core/middleware/auth');

router.get('/', authMiddleware, getAll);
router.get('/activos', authMiddleware, getActivos);
router.get('/:id', authMiddleware, getById);
router.post('/', authMiddleware, isAdmin, create);
router.put('/:id', authMiddleware, isAdmin, update);
router.delete('/:id', authMiddleware, isAdmin, remove);

module.exports = router;
