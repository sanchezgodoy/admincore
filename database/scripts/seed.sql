-- =========================
-- ADMINCORE - DATOS INICIALES
-- Datos de prueba para el sistema
-- =========================

-- Insertar roles del sistema
INSERT INTO roles (nombre_rol) VALUES 
('Administrador'),
('Jefe de Turno');

-- Insertar usuarios de prueba
-- Password: Admin123! (hash bcrypt)
INSERT INTO usuarios (nombre, email, password, id_rol, activo) VALUES 
('Administrador Sistema', 'admin@admincore.cl', '$2a$10$XqJk8YqhQvL6Zf0H7F9Z0.Vr9yV8H8Kf9X7Z0H7F9Z0Vr9yV8H8Kf', 1, TRUE),
('Juan Pérez', 'jefe@admincore.cl', '$2a$10$XqJk8YqhQvL6Zf0H7F9Z0.Vr9yV8H8Kf9X7Z0H7F9Z0Vr9yV8H8Kf', 2, TRUE);

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

-- Insertar algunos registros de ejemplo
INSERT INTO registros_laborales (id_trabajador, id_periodo, id_tipo, cantidad, fecha, observacion) VALUES 
(1, 1, 1, 8.0, '2026-01-02', 'Jornada completa'),
(1, 1, 2, 2.0, '2026-01-02', 'Horas extras'),
(2, 1, 1, 8.0, '2026-01-02', 'Jornada completa'),
(3, 1, 1, 8.0, '2026-01-02', 'Jornada completa'),
(4, 1, 5, 0.5, '2026-01-02', 'Atraso 30 minutos'),
(5, 1, 1, 8.0, '2026-01-02', 'Jornada completa');

-- Mensaje de confirmación
SELECT 'Datos iniciales cargados correctamente' AS mensaje;
SELECT 'Total roles: ' || COUNT(*) FROM roles;
SELECT 'Total usuarios: ' || COUNT(*) FROM usuarios;
SELECT 'Total trabajadores: ' || COUNT(*) FROM trabajadores;
SELECT 'Total tipos de registro: ' || COUNT(*) FROM tipo_registro;
