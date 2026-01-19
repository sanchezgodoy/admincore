const Usuario = require('../models/Usuario');
const { hashPassword } = require('../../utils/hash');

const getAll = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

const getById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

const create = async (req, res) => {
    try {
        const { nombre, email, password, id_rol } = req.body;

        if (!nombre || !email || !password || !id_rol) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        const hashedPassword = await hashPassword(password);
        const nuevoUsuario = await Usuario.create(nombre, email, hashedPassword, id_rol);
        
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

const update = async (req, res) => {
    try {
        const { nombre, email, activo } = req.body;
        const usuarioActualizado = await Usuario.update(req.params.id, nombre, email, activo);
        res.json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

const remove = async (req, res) => {
    try {
        await Usuario.delete(req.params.id);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

module.exports = { getAll, getById, create, update, remove };
