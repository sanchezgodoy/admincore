const { Pool } = require('pg');
require('dotenv').config();

// Configuración para usar DATABASE_URL (Render/Producción) o variables individuales (Local)
const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'remuneraciones_db',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || '',
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        }
);

pool.on('connect', () => {
    console.log('✓ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('Error en la conexión con PostgreSQL:', err);
    process.exit(-1);
});

module.exports = pool;
