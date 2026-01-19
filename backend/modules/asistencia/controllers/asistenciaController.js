const RegistroLaboral = require('../models/RegistroLaboral');

const getAll = async (req, res) => {
    try {
        const registros = await RegistroLaboral.getAll();
        res.json(registros);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ error: 'Error al obtener registros' });
    }
};

const getByPeriodo = async (req, res) => {
    try {
        const registros = await RegistroLaboral.getByPeriodo(req.params.id_periodo);
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener registros del período' });
    }
};

const getByTrabajador = async (req, res) => {
    try {
        const registros = await RegistroLaboral.getByTrabajador(req.params.id_trabajador);
        res.json(registros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener registros del trabajador' });
    }
};

const create = async (req, res) => {
    try {
        const { id_trabajador, id_periodo, id_tipo, cantidad, fecha, observacion } = req.body;

        if (!id_trabajador || !id_periodo || !id_tipo || !cantidad || !fecha) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados' });
        }

        const nuevoRegistro = await RegistroLaboral.create(
            id_trabajador, id_periodo, id_tipo, cantidad, fecha, observacion
        );
        
        res.status(201).json({ message: 'Registro creado exitosamente', registro: nuevoRegistro });
    } catch (error) {
        console.error('Error al crear registro:', error);
        res.status(500).json({ error: 'Error al crear registro' });
    }
};

const getTiposRegistro = async (req, res) => {
    try {
        const tipos = await RegistroLaboral.getTiposRegistro();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tipos de registro' });
    }
};

const getPeriodoActual = async (req, res) => {
    try {
        const periodo = await RegistroLaboral.getPeriodoActual();
        res.json(periodo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener período actual' });
    }
};

module.exports = { getAll, getByPeriodo, getByTrabajador, create, getTiposRegistro, getPeriodoActual };
