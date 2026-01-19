# Plan de Pruebas Manuales - AdminCore

## Información General
- **Proyecto:** AdminCore - Sistema de Control de Asistencia y Horas Extras
- **Versión:** 1.0.0
- **Fecha:** Enero 2026
- **Responsable:** José Silva

## Objetivo
Verificar el funcionamiento correcto de los 3 formularios funcionales y validar que el sistema cumple con los requisitos establecidos para solucionar la problemática de control manual de asistencia.

---

## Casos de Prueba

### CP-001: Inicio de Sesión - Perfil Administrador

**Módulo:** Autenticación  
**Prioridad:** Alta  
**Prerequisitos:** Base de datos inicializada con usuarios de prueba

**Pasos:**
1. Abrir navegador y acceder a `http://localhost:3000`
2. Verificar redirección automática a `/views/auth/login.html`
3. Ingresar credenciales:
   - Email: `admin@admincore.cl`
   - Contraseña: `admin123`
4. Hacer clic en "Iniciar Sesión"

**Resultado Esperado:**
- Usuario autenticado correctamente
- Redirección a `/views/admin/dashboard.html`
- Sidebar muestra opciones: Dashboard, Usuarios, Trabajadores, Asistencia, Liquidaciones
- Top bar muestra nombre "Administrador Principal" y rol "Administrador"
- Token JWT almacenado en sessionStorage

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-001-login-admin.png`

---

### CP-002: Inicio de Sesión - Perfil Jefe de Turno

**Módulo:** Autenticación  
**Prioridad:** Alta  
**Prerequisitos:** Base de datos inicializada con usuarios de prueba

**Pasos:**
1. Cerrar sesión si hay una activa
2. Acceder a `/views/auth/login.html`
3. Ingresar credenciales:
   - Email: `jefe@admincore.cl`
   - Contraseña: `jefe123`
4. Hacer clic en "Iniciar Sesión"

**Resultado Esperado:**
- Usuario autenticado correctamente
- Redirección a `/views/jefe-turno/dashboard.html`
- Sidebar muestra opciones limitadas: Dashboard, Registrar Asistencia, Consultar Registros
- NO debe mostrar gestión de usuarios ni trabajadores
- Top bar muestra nombre "Jefe de Turno" y rol "Jefe de Turno"

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-002-login-jefe.png`

---

### CP-003: FORMULARIO 1 - Crear Usuario

**Módulo:** Gestión de Usuarios  
**Prioridad:** Alta  
**Prerequisitos:** Sesión iniciada como Administrador

**Pasos:**
1. Navegar a "Usuarios" en el sidebar
2. Hacer clic en botón "+ Nuevo Usuario"
3. Completar formulario con datos:
   - Nombre: `Usuario Prueba`
   - Email: `prueba@admincore.cl`
   - Contraseña: `prueba123`
   - Rol: `Jefe de Turno`
4. Hacer clic en "Guardar"

**Resultado Esperado:**
- Mensaje de éxito: "✓ Usuario creado exitosamente"
- Modal se cierra automáticamente
- Tabla se actualiza mostrando el nuevo usuario
- Usuario aparece con badge de rol "Jefe de Turno"
- Nuevo usuario tiene ID asignado por la base de datos

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-003-crear-usuario.png`

---

### CP-004: FORMULARIO 1 - Editar Usuario

**Módulo:** Gestión de Usuarios  
**Prioridad:** Alta  
**Prerequisitos:** Usuario creado en CP-003

**Pasos:**
1. En tabla de usuarios, localizar "Usuario Prueba"
2. Hacer clic en botón "Editar" (icono lápiz)
3. Verificar que modal se abre con datos actuales pre-cargados
4. Modificar nombre a: `Usuario Actualizado`
5. Hacer clic en "Actualizar"

**Resultado Esperado:**
- Mensaje de éxito: "✓ Usuario actualizado exitosamente"
- Modal se cierra automáticamente
- Tabla muestra el nombre actualizado
- Email y rol permanecen sin cambios
- Campo contraseña debe estar oculto en modo edición

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-004-editar-usuario.png`

---

### CP-005: FORMULARIO 1 - Eliminar Usuario

**Módulo:** Gestión de Usuarios  
**Prioridad:** Alta  
**Prerequisitos:** Usuario editado en CP-004

**Pasos:**
1. En tabla de usuarios, localizar "Usuario Actualizado"
2. Hacer clic en botón "Eliminar" (icono basura)
3. Verificar mensaje de confirmación: "¿Está seguro de eliminar este usuario?"
4. Confirmar eliminación

**Resultado Esperado:**
- Mensaje de éxito: "✓ Usuario eliminado exitosamente"
- Usuario desaparece de la tabla inmediatamente
- Registro eliminado de la base de datos
- Confirmación previa previene eliminación accidental

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-005-eliminar-usuario.png`

---

### CP-006: FORMULARIO 2 - Crear Trabajador con Validación RUT

**Módulo:** Gestión de Trabajadores  
**Prioridad:** Alta  
**Prerequisitos:** Sesión iniciada como Administrador

**Pasos:**
1. Navegar a "Trabajadores" en el sidebar
2. Hacer clic en "+ Nuevo Trabajador"
3. Completar formulario:
   - RUT: `12345678-5` (RUT válido chileno)
   - Nombre: `Juan Pérez Gómez`
   - Cargo: `Operario`
   - Sueldo Base: `550000`
   - Activo: `Sí`
4. Verificar auto-formateo del RUT al salir del campo
5. Hacer clic en "Guardar"

**Resultado Esperado:**
- RUT se formatea automáticamente con puntos: `12.345.678-5`
- Validación de RUT chileno (algoritmo módulo 11) exitosa
- Mensaje de éxito: "✓ Trabajador creado exitosamente"
- Tabla muestra nuevo trabajador con sueldo formateado: `$550.000`
- Badge verde "Activo" visible

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-006-crear-trabajador.png`

---

### CP-007: FORMULARIO 2 - Validación RUT Inválido

**Módulo:** Gestión de Trabajadores  
**Prioridad:** Alta  
**Prerequisitos:** Modal de nuevo trabajador abierto

**Pasos:**
1. En modal de trabajador, ingresar RUT inválido: `12345678-9` (dígito verificador incorrecto)
2. Completar resto de campos obligatorios
3. Intentar guardar

**Resultado Esperado:**
- Mensaje de error: "El RUT ingresado no es válido"
- Formulario no se envía
- Campo RUT resaltado en rojo
- Usuario permanece en el formulario para corregir

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-007-validacion-rut.png`

---

### CP-008: FORMULARIO 2 - Editar Trabajador

**Módulo:** Gestión de Trabajadores  
**Prioridad:** Alta  
**Prerequisitos:** Trabajador creado en CP-006

**Pasos:**
1. Localizar "Juan Pérez Gómez" en la tabla
2. Hacer clic en "Editar"
3. Modificar:
   - Cargo: `Supervisor`
   - Sueldo Base: `750000`
4. Hacer clic en "Actualizar"

**Resultado Esperado:**
- Datos actualizados correctamente
- Tabla muestra "Supervisor" y "$750.000"
- RUT permanece sin cambios
- Mensaje de éxito mostrado

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-008-editar-trabajador.png`

---

### CP-009: FORMULARIO 3 - Registrar Asistencia Normal

**Módulo:** Registro de Asistencia (FUNCIONALIDAD CORE)  
**Prioridad:** Crítica  
**Prerequisitos:** Sesión como Jefe de Turno, periodo activo existente

**Pasos:**
1. Navegar a "Registrar Asistencia"
2. Verificar que período actual se muestra (ej: "Enero 2026")
3. Completar formulario:
   - Trabajador: Seleccionar "Juan Pérez Gómez"
   - Tipo: "Asistencia Normal"
   - Fecha: Fecha actual (auto-completada)
   - Cantidad: `8` (horas)
   - Observaciones: `Jornada completa sin novedades`
4. Hacer clic en "✓ Registrar Asistencia"

**Resultado Esperado:**
- Mensaje de éxito: "✓ Registro de asistencia guardado exitosamente"
- Formulario se limpia automáticamente
- Fecha vuelve a establecerse en hoy
- Tabla "Registros de Hoy" se actualiza mostrando el nuevo registro
- Registro incluye: trabajador, tipo (badge azul), cantidad, observación, hora de registro

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-009-registrar-asistencia.png`

---

### CP-010: FORMULARIO 3 - Registrar Horas Extras

**Módulo:** Registro de Asistencia  
**Prioridad:** Crítica  
**Prerequisitos:** Asistencia normal registrada en CP-009

**Pasos:**
1. En mismo formulario de registro
2. Completar:
   - Trabajador: Mismo "Juan Pérez Gómez"
   - Tipo: "Horas Extras"
   - Fecha: Fecha actual
   - Cantidad: `2.5` (horas)
   - Observaciones: `Trabajo adicional por requerimiento urgente`
3. Registrar

**Resultado Esperado:**
- Registro exitoso de horas extras
- Sistema acepta valores decimales (0.5 incrementos)
- Tabla actualizada con ambos registros del día
- Diferenciación visual entre Asistencia Normal y Horas Extras

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-010-horas-extras.png`

---

### CP-011: Consultar Registros con Filtros

**Módulo:** Consulta de Registros  
**Prioridad:** Media  
**Prerequisitos:** Registros creados en CP-009 y CP-010

**Pasos:**
1. Navegar a "Consultar Registros"
2. Aplicar filtros:
   - Trabajador: "Juan Pérez Gómez"
   - Tipo: "Todos"
   - Fecha Desde: Primer día del mes actual
   - Fecha Hasta: Último día del mes actual
3. Hacer clic en "Buscar"

**Resultado Esperado:**
- Tabla muestra todos los registros del trabajador en el período
- Contador muestra "2 registros encontrados"
- Información completa: trabajador, RUT, tipo, fecha, cantidad, observación, fecha/hora de registro
- Filtros funcionan correctamente en combinación

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-011-consultar-registros.png`

---

### CP-012: Validación de Campos Obligatorios

**Módulo:** Registro de Asistencia  
**Prioridad:** Media  
**Prerequisitos:** Formulario de registro abierto

**Pasos:**
1. Intentar enviar formulario vacío (sin seleccionar trabajador ni tipo)
2. Observar validación HTML5

**Resultado Esperado:**
- Formulario no se envía
- Campos requeridos resaltados por navegador
- Mensajes de validación nativos mostrados
- Usuario no puede guardar datos incompletos

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-012-validacion-campos.png`

---

### CP-013: Logout y Seguridad de Sesión

**Módulo:** Autenticación  
**Prioridad:** Alta  
**Prerequisitos:** Sesión activa

**Pasos:**
1. Hacer clic en botón "Cerrar Sesión"
2. Verificar redirección a login
3. Intentar acceder directamente a `/views/admin/dashboard.html`

**Resultado Esperado:**
- Sesión terminada correctamente
- sessionStorage limpiado (no hay token ni datos de usuario)
- Acceso directo a rutas protegidas redirige automáticamente a login
- Sistema previene acceso no autorizado

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-013-logout.png`

---

### CP-014: Responsividad - Vista Mobile

**Módulo:** Interfaz de Usuario  
**Prioridad:** Media  
**Prerequisitos:** Sistema funcional

**Pasos:**
1. Abrir DevTools del navegador (F12)
2. Activar modo responsive
3. Configurar viewport: 375x667 (iPhone SE)
4. Navegar por diferentes vistas

**Resultado Esperado:**
- Sidebar se oculta automáticamente en mobile
- Botón hamburguesa (☰) visible y funcional
- Tablas tienen scroll horizontal
- Cards se apilan verticalmente
- Formularios se adaptan a una columna
- Sin elementos cortados ni overflow horizontal
- Texto legible sin zoom

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-014-mobile.png`

---

### CP-015: Dashboard - Estadísticas en Tiempo Real

**Módulo:** Dashboard Administrador  
**Prioridad:** Media  
**Prerequisitos:** Datos de prueba en base de datos

**Pasos:**
1. Acceder a dashboard de administrador
2. Verificar las 4 tarjetas estadísticas
3. Verificar tabla de actividad reciente

**Resultado Esperado:**
- Total de Usuarios: Muestra conteo correcto
- Total de Trabajadores: Muestra conteo de trabajadores activos
- Registros del Mes: Suma de registros del período actual
- Horas Extras del Mes: Suma de horas extras
- Tabla muestra últimos 10 registros ordenados por fecha descendente
- Actualización automática cada 60 segundos

**Resultado Obtenido:** [A completar durante prueba]  
**Estado:** [ ] Aprobado [ ] Rechazado  
**Evidencia:** Screenshot `CP-015-dashboard.png`

---

## Resumen de Cobertura

### Módulos Probados
- ✓ Autenticación (2 casos)
- ✓ Gestión de Usuarios - FORMULARIO 1 (3 casos)
- ✓ Gestión de Trabajadores - FORMULARIO 2 (3 casos)
- ✓ Registro de Asistencia - FORMULARIO 3 (4 casos)
- ✓ Consultas y Reportes (1 caso)
- ✓ Seguridad y Sesiones (1 caso)
- ✓ Responsividad (1 caso)

### Distribución por Prioridad
- **Crítica:** 2 casos (Registro de asistencia core)
- **Alta:** 9 casos (Autenticación, CRUDs, seguridad)
- **Media:** 4 casos (Consultas, UI, estadísticas)

### Criterios de Aceptación
- ✓ Los 3 formularios funcionales deben pasar todos los casos
- ✓ Validaciones deben prevenir datos incorrectos
- ✓ Seguridad debe prevenir accesos no autorizados
- ✓ Sistema debe ser completamente responsive
- ✓ Sin errores de consola JavaScript
- ✓ Sin errores 500 en el servidor

---

## Notas de Ejecución

**Fecha de Ejecución:** [A completar]  
**Navegador Utilizado:** [Chrome / Firefox / Edge]  
**Resolución de Pantalla:** [Especificar]  
**Estado General:** [ ] Todos Aprobados [ ] Con Observaciones [ ] Con Fallos

**Observaciones Generales:**
[Espacio para anotar comportamientos inesperados, mejoras sugeridas, o bugs encontrados]

---

## Conclusiones del Plan de Pruebas

Este plan de pruebas valida:

1. **Cumplimiento de Requisitos Funcionales:** Los 3 formularios requeridos están completamente funcionales
2. **Solución a la Problemática:** El sistema digitaliza el proceso manual de control de asistencia
3. **Calidad del Software:** Validaciones, seguridad y experiencia de usuario implementadas
4. **Requisitos Técnicos:** 6 tablas en 3NF, 2 perfiles de usuario, CSS responsive sin Bootstrap
5. **Preparación para Producción:** Sistema listo para deployment y uso real

**Próximos Pasos tras Pruebas:**
- Documentar evidencias (screenshots)
- Completar análisis de resultados
- Realizar deployment en hosting
- Actualizar documentación final
