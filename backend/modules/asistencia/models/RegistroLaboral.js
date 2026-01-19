const pool = require('../../../config/database');

class RegistroLaboral {
    static async getAll() {
        const query = `
            SELECT r.*, t.nombre as trabajador_nombre, t.rut, 
                   tr.descripcion as tipo_registro, p.mes, p.anio
            FROM registros_laborales r
            INNER JOIN trabajadores t ON r.id_trabajador = t.id_trabajador
            INNER JOIN tipo_registro tr ON r.id_tipo = tr.id_tipo
            INNER JOIN periodos p ON r.id_periodo = p.id_periodo
            ORDER BY r.fecha DESC, t.nombre
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    static async getByPeriodo(id_periodo) {
        const query = `
            SELECT r.*, t.nombre as trabajador_nombre, t.rut, tr.descripcion as tipo_registro
            FROM registros_laborales r
            INNER JOIN trabajadores t ON r.id_trabajador = t.id_trabajador
            INNER JOIN tipo_registro tr ON r.id_tipo = tr.id_tipo
            WHERE r.id_periodo = $1
            ORDER BY r.fecha DESC, t.nombre
        `;
        const result = await pool.query(query, [id_periodo]);
        return result.rows;
    }

    static async getByTrabajador(id_trabajador) {
        const query = `
            SELECT r.*, tr.descripcion as tipo_registro, p.mes, p.anio
            FROM registros_laborales r
            INNER JOIN tipo_registro tr ON r.id_tipo = tr.id_tipo
            INNER JOIN periodos p ON r.id_periodo = p.id_periodo
            WHERE r.id_trabajador = $1
            ORDER BY r.fecha DESC
        `;
        const result = await pool.query(query, [id_trabajador]);
        return result.rows;
    }

    static async create(id_trabajador, id_periodo, id_tipo, cantidad, fecha, observacion) {
        const query = `
            INSERT INTO registros_laborales (id_trabajador, id_periodo, id_tipo, cantidad, fecha, observacion)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const result = await pool.query(query, [id_trabajador, id_periodo, id_tipo, cantidad, fecha, observacion]);
        return result.rows[0];
    }

    static async getTiposRegistro() {
        const query = 'SELECT * FROM tipo_registro ORDER BY descripcion';
        const result = await pool.query(query);
        return result.rows;
    }

    static async getPeriodoActual() {
        const query = 'SELECT * FROM periodos WHERE cerrado = FALSE ORDER BY anio DESC, mes DESC LIMIT 1';
        const result = await pool.query(query);
        return result.rows[0];
    }
}

module.exports = RegistroLaboral;
