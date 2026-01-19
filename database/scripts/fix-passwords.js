// Script para generar y actualizar las contraseñas correctas
const bcrypt = require('bcryptjs');
const pool = require('../../backend/config/database');

async function updatePasswords() {
    try {
        // Generar hashes para las contraseñas
        const adminHash = await bcrypt.hash('admin123', 10);
        const jefeHash = await bcrypt.hash('jefe123', 10);
        
        console.log('Hashes generados:');
        console.log('admin123:', adminHash);
        console.log('jefe123:', jefeHash);
        
        // Actualizar usuarios
        await pool.query(
            'UPDATE usuarios SET password = $1 WHERE email = $2',
            [adminHash, 'admin@admincore.cl']
        );
        
        await pool.query(
            'UPDATE usuarios SET password = $1 WHERE email = $2',
            [jefeHash, 'jefe@admincore.cl']
        );
        
        console.log('\n✓ Contraseñas actualizadas correctamente');
        console.log('✓ admin@admincore.cl → admin123');
        console.log('✓ jefe@admincore.cl → jefe123');
        
        // Verificar
        const result = await pool.query('SELECT email, nombre FROM usuarios');
        console.log('\nUsuarios en la base de datos:');
        result.rows.forEach(u => console.log(`  - ${u.email} (${u.nombre})`));
        
        pool.end();
    } catch (error) {
        console.error('Error:', error);
        pool.end();
    }
}

updatePasswords();
