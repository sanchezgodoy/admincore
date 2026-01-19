const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/usuariosController');
const { authMiddleware, isAdmin } = require('../middleware/auth');

router.get('/', authMiddleware, isAdmin, getAll);
router.get('/:id', authMiddleware, getById);
router.post('/', authMiddleware, isAdmin, create);
router.put('/:id', authMiddleware, isAdmin, update);
router.delete('/:id', authMiddleware, isAdmin, remove);

module.exports = router;
