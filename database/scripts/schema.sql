-- =========================
-- ADMINCORE - ESQUEMA DE BASE DE DATOS
-- Sistema de Control de Asistencia y Horas Extras
-- Autor: José Sánchez Godoy
-- Fecha: Enero 2026
-- =========================

-- Eliminar tablas si existen (para recrear)
DROP TABLE IF EXISTS registros_laborales CASCADE;
DROP TABLE IF EXISTS tipo_registro CASCADE;
DROP TABLE IF EXISTS periodos CASCADE;
DROP TABLE IF EXISTS trabajadores CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- =========================
-- TABLA: roles
-- Perfiles de usuario del sistema
-- =========================
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

-- =========================
-- TABLA: usuarios
-- Cuentas de acceso al sistema
-- =========================
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

-- =========================
-- TABLA: trabajadores
-- Personal de la empresa
-- =========================
CREATE TABLE trabajadores (
    id_trabajador SERIAL PRIMARY KEY,
    rut VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(100),
    sueldo_base NUMERIC(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_ingreso DATE DEFAULT CURRENT_DATE
);

-- =========================
-- TABLA: periodos
-- Períodos de liquidación
-- =========================
CREATE TABLE periodos (
    id_periodo SERIAL PRIMARY KEY,
    mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
    anio INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    cerrado BOOLEAN DEFAULT FALSE,
    UNIQUE (mes, anio)
);

-- =========================
-- TABLA: tipo_registro
-- Tipos de registros laborales
-- =========================
CREATE TABLE tipo_registro (
    id_tipo SERIAL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL UNIQUE
);

-- =========================
-- TABLA: registros_laborales
-- Registros diarios de asistencia, horas extras, etc.
-- =========================
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

-- =========================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =========================
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_trabajadores_rut ON trabajadores(rut);
CREATE INDEX idx_registros_fecha ON registros_laborales(fecha);
CREATE INDEX idx_registros_trabajador ON registros_laborales(id_trabajador);
CREATE INDEX idx_registros_periodo ON registros_laborales(id_periodo);

-- =========================
-- COMENTARIOS EN TABLAS
-- =========================
COMMENT ON TABLE roles IS 'Perfiles de usuario: Administrador, Jefe de Turno';
COMMENT ON TABLE usuarios IS 'Cuentas de acceso al sistema';
COMMENT ON TABLE trabajadores IS 'Personal de la empresa';
COMMENT ON TABLE periodos IS 'Períodos mensuales de liquidación';
COMMENT ON TABLE tipo_registro IS 'Tipos: Asistencia, Horas Extras, Inasistencia, Atraso';
COMMENT ON TABLE registros_laborales IS 'Registros diarios consolidados';
