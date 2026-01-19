const pool = require('../../config/database');

class Usuario {
    static async findByEmail(email) {
        const query = `SELECT u.*, r.nombre_rol as rol FROM usuarios u
            INNER JOIN roles r ON u.id_rol = r.id_rol WHERE u.email = $1`;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    static async findById(id) {
        const query = `SELECT u.id_usuario, u.nombre, u.email, u.activo, r.nombre_rol as rol
            FROM usuarios u INNER JOIN roles r ON u.id_rol = r.id_rol WHERE u.id_usuario = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    static async getAll() {
        const query = `SELECT u.id_usuario, u.nombre, u.email, u.activo, r.nombre_rol as rol
            FROM usuarios u INNER JOIN roles r ON u.id_rol = r.id_rol ORDER BY u.nombre`;
        const result = await pool.query(query);
        return result.rows;
    }

    static async create(nombre, email, password, id_rol) {
        const query = `INSERT INTO usuarios (nombre, email, password, id_rol)
            VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, email`;
        const result = await pool.query(query, [nombre, email, password, id_rol]);
        return result.rows[0];
    }

    static async update(id, nombre, email, activo) {
        const query = `UPDATE usuarios SET nombre = $1, email = $2, activo = $3
            WHERE id_usuario = $4 RETURNING id_usuario, nombre, email`;
        const result = await pool.query(query, [nombre, email, activo, id]);
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
    }
}

module.exports = Usuario;
