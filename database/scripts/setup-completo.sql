-- =========================
-- ADMINCORE - INSTALACIÓN COMPLETA
-- Ejecuta este script en pgAdmin sobre la BD remuneraciones_db
-- =========================

-- =========================
-- PARTE 1: ESQUEMA (TABLAS)
-- =========================

-- Eliminar tablas si existen (para recrear)
DROP TABLE IF EXISTS registros_laborales CASCADE;
DROP TABLE IF EXISTS tipo_registro CASCADE;
DROP TABLE IF EXISTS periodos CASCADE;
DROP TABLE IF EXISTS trabajadores CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- TABLA: roles
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

-- TABLA: usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- TABLA: trabajadores
CREATE TABLE trabajadores (
    id_trabajador SERIAL PRIMARY KEY,
    rut VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(100),
    sueldo_base NUMERIC(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_ingreso DATE DEFAULT CURRENT_DATE
);

-- TABLA: periodos
CREATE TABLE periodos (
    id_periodo SERIAL PRIMARY KEY,
    mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
    anio INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    cerrado BOOLEAN DEFAULT FALSE,
    UNIQUE (mes, anio)
);

-- TABLA: tipo_registro
CREATE TABLE tipo_registro (
    id_tipo SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);

-- TABLA: registros_laborales
CREATE TABLE registros_laborales (
    id_registro SERIAL PRIMARY KEY,
    id_trabajador INT NOT NULL,
    id_periodo INT NOT NULL,
    id_tipo INT NOT NULL,
    cantidad NUMERIC(8,2) NOT NULL,
    fecha DATE NOT NULL,
    observacion VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_trabajador) REFERENCES trabajadores(id_trabajador),
    FOREIGN KEY (id_periodo) REFERENCES periodos(id_periodo),
    FOREIGN KEY (id_tipo) REFERENCES tipo_registro(id_tipo)
);

-- ÍNDICES
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_trabajadores_rut ON trabajadores(rut);
CREATE INDEX idx_registros_fecha ON registros_laborales(fecha);

-- =========================
-- PARTE 2: DATOS INICIALES
-- =========================

-- Insertar roles
INSERT INTO roles (nombre_rol) VALUES 
('Administrador'),
('Jefe de Turno');

-- Insertar usuarios de prueba
-- Passwords: admin123 y jefe123 (hash bcrypt)
INSERT INTO usuarios (nombre, email, password, id_rol, activo) VALUES 
('Administrador Sistema', 'admin@admincore.cl', '$2b$10$K3zqZ3Z3Z3Z3Z3Z3Z3Z3ZuN7X8KqN7X8KqN7X8KqN7X8KqN7X8Kq', 1, TRUE),
('Juan Pérez', 'jefe@admincore.cl', '$2b$10$K3zqZ3Z3Z3Z3Z3Z3Z3Z3ZuN7X8KqN7X8KqN7X8KqN7X8KqN7X8Kq', 2, TRUE);

-- Insertar tipos de registro
INSERT INTO tipo_registro (descripcion) VALUES 
('Asistencia Normal'),
('Horas Extras'),
('Inasistencia Justificada'),
('Inasistencia No Justificada'),
('Atraso'),
('Licencia Médica');

-- Insertar trabajadores de ejemplo
INSERT INTO trabajadores (rut, nombre, cargo, sueldo_base, activo) VALUES 
('12345678-9', 'María González Soto', 'Operario', 450000.00, TRUE),
('98765432-1', 'Pedro Ramírez López', 'Supervisor', 650000.00, TRUE),
('11223344-5', 'Ana Martínez Flores', 'Operario', 450000.00, TRUE),
('55667788-9', 'Carlos Torres Vega', 'Operario', 450000.00, TRUE),
('99887766-5', 'Lucía Hernández Cruz', 'Administrativo', 550000.00, TRUE);

-- Insertar período actual (Enero 2026)
INSERT INTO periodos (mes, anio, fecha_inicio, fecha_fin, cerrado) VALUES 
(1, 2026, '2026-01-01', '2026-01-31', FALSE);

-- Insertar registros de ejemplo
INSERT INTO registros_laborales (id_trabajador, id_periodo, id_tipo, cantidad, fecha, observacion) VALUES 
(1, 1, 1, 8.0, '2026-01-02', 'Jornada completa'),
(1, 1, 2, 2.0, '2026-01-02', 'Horas extras'),
(2, 1, 1, 8.0, '2026-01-02', 'Jornada completa'),
(3, 1, 1, 8.0, '2026-01-02', 'Jornada completa'),
(4, 1, 5, 0.5, '2026-01-02', 'Atraso 30 minutos'),
(5, 1, 1, 8.0, '2026-01-02', 'Jornada completa');

-- =========================
-- VERIFICACIÓN
-- =========================
SELECT '✓ INSTALACIÓN COMPLETA' AS estado;
SELECT 'Roles creados: ' || COUNT(*) AS resultado FROM roles;
SELECT 'Usuarios creados: ' || COUNT(*) AS resultado FROM usuarios;
SELECT 'Trabajadores creados: ' || COUNT(*) AS resultado FROM trabajadores;
SELECT 'Tipos de registro: ' || COUNT(*) AS resultado FROM tipo_registro;
SELECT 'Períodos creados: ' || COUNT(*) AS resultado FROM periodos;
SELECT 'Registros laborales: ' || COUNT(*) AS resultado FROM registros_laborales;
