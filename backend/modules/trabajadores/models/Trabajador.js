const pool = require('../../../config/database');

class Trabajador {
    static async getAll() {
        const query = `SELECT * FROM trabajadores ORDER BY nombre`;
        const result = await pool.query(query);
        return result.rows;
    }

    static async getActivos() {
        const query = `SELECT * FROM trabajadores WHERE activo = TRUE ORDER BY nombre`;
        const result = await pool.query(query);
        return result.rows;
    }

    static async findById(id) {
        const query = `SELECT * FROM trabajadores WHERE id_trabajador = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async findByRut(rut) {
        const query = `SELECT * FROM trabajadores WHERE rut = $1`;
        const result = await pool.query(query, [rut]);
        return result.rows[0];
    }

    static async create(rut, nombre, cargo, sueldo_base) {
        const query = `
            INSERT INTO trabajadores (rut, nombre, cargo, sueldo_base)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [rut, nombre, cargo, sueldo_base]);
        return result.rows[0];
    }

    static async update(id, rut, nombre, cargo, sueldo_base, activo) {
        const query = `
            UPDATE trabajadores
            SET rut = $1, nombre = $2, cargo = $3, sueldo_base = $4, activo = $5
            WHERE id_trabajador = $6
            RETURNING *
        `;
        const result = await pool.query(query, [rut, nombre, cargo, sueldo_base, activo, id]);
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM trabajadores WHERE id_trabajador = $1', [id]);
    }
}

module.exports = Trabajador;
