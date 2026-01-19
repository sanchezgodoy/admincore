const Trabajador = require('../models/Trabajador');

const getAll = async (req, res) => {
    try {
        const trabajadores = await Trabajador.getAll();
        res.json(trabajadores);
    } catch (error) {
        console.error('Error al obtener trabajadores:', error);
        res.status(500).json({ error: 'Error al obtener trabajadores' });
    }
};

const getActivos = async (req, res) => {
    try {
        const trabajadores = await Trabajador.getActivos();
        res.json(trabajadores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener trabajadores activos' });
    }
};

const getById = async (req, res) => {
    try {
        const trabajador = await Trabajador.findById(req.params.id);
        if (!trabajador) {
            return res.status(404).json({ error: 'Trabajador no encontrado' });
        }
        res.json(trabajador);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener trabajador' });
    }
};

const create = async (req, res) => {
    try {
        const { rut, nombre, cargo, sueldo_base } = req.body;

        if (!rut || !nombre || !sueldo_base) {
            return res.status(400).json({ error: 'RUT, nombre y sueldo base son requeridos' });
        }

        const nuevoTrabajador = await Trabajador.create(rut, nombre, cargo, sueldo_base);
        res.status(201).json({ message: 'Trabajador creado exitosamente', trabajador: nuevoTrabajador });
    } catch (error) {
        console.error('Error al crear trabajador:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'El RUT ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear trabajador' });
    }
};

const update = async (req, res) => {
    try {
        const { rut, nombre, cargo, sueldo_base, activo } = req.body;
        const trabajadorActualizado = await Trabajador.update(
            req.params.id, rut, nombre, cargo, sueldo_base, activo
        );
        res.json({ message: 'Trabajador actualizado exitosamente', trabajador: trabajadorActualizado });
    } catch (error) {
        console.error('Error al actualizar trabajador:', error);
        res.status(500).json({ error: 'Error al actualizar trabajador' });
    }
};

const remove = async (req, res) => {
    try {
        await Trabajador.delete(req.params.id);
        res.json({ message: 'Trabajador eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar trabajador' });
    }
};

module.exports = { getAll, getActivos, getById, create, update, remove };
