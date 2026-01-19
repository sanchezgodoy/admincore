# AdminCore

## Plataforma web modular de apoyo a la gestión administrativa

Sistema de control de asistencia y horas extras desarrollado como proyecto de título.

---

## ��� Descripción

AdminCore es una plataforma web que optimiza el registro y control de asistencia, inasistencias, atrasos y horas extraordinarias en pequeñas y medianas empresas. Facilita la consolidación de información para los procesos de liquidación de sueldos.

## ��� Características Principales

- ✅ Sistema de autenticación con dos perfiles diferenciados
- ✅ Gestión de usuarios y trabajadores
- ✅ Registro diario de asistencia y horas extras
- ✅ Generación de reportes por período
- ✅ Diseño 100% responsive (CSS puro, sin Bootstrap)
- ✅ Arquitectura modular y escalable
- ✅ Base de datos PostgreSQL normalizada (3FN)

## ��� Tecnologías Utilizadas

### Backend
- Node.js v16+
- Express.js
- PostgreSQL
- JWT para autenticación
- Bcrypt para encriptación

### Frontend
- HTML5
- CSS3 (Responsive, sin frameworks)
- JavaScript Vanilla

## ��� Estructura del Proyecto

```
Admincore/
├── backend/
│   ├── config/           # Configuración BD
│   ├── core/            # Núcleo del sistema
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── modules/         # Módulos funcionales
│   │   ├── trabajadores/
│   │   ├── asistencia/
│   │   └── liquidaciones/
│   ├── utils/           # Utilidades
│   └── server.js        # Servidor principal
├── frontend/
│   ├── assets/
│   │   ├── css/        # Estilos responsive
│   │   └── js/         # JavaScript
│   └── views/          # Vistas HTML
├── database/
│   └── scripts/        # SQL (schema + seed)
└── docs/               # Documentación
```

## ⚙️ Instalación y Configuración

### 1. Prerrequisitos

- Node.js v16 o superior
- PostgreSQL 12+
- Git

### 2. Clonar repositorio

```bash
git clone <url-repositorio>
cd Admincore
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus credenciales
```

### 5. Crear base de datos

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE admincore_db;

# Ejecutar scripts
\c admincore_db
\i database/scripts/schema.sql
\i database/scripts/seed.sql
```

### 6. Iniciar servidor

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### 7. Acceder al sistema

```
http://localhost:3000
```

## ��� Credenciales de Prueba

### Perfil Administrador
- **Email**: admin@admincore.cl
- **Contraseña**: Admin123!

### Perfil Jefe de Turno
- **Email**: jefe@admincore.cl
- **Contraseña**: Jefe123!

## ��� Base de Datos

El sistema utiliza PostgreSQL con 6 tablas principales:

1. **roles** - Perfiles de usuario
2. **usuarios** - Cuentas de acceso
3. **trabajadores** - Personal de la empresa
4. **periodos** - Períodos de liquidación
5. **tipo_registro** - Tipos de registros laborales
6. **registros_laborales** - Registros diarios consolidados

Normalización: **Tercera Forma Normal (3FN)**

## ��� Características Técnicas

### Diseño Responsive
- CSS puro sin Bootstrap
- Media queries para mobile, tablet y desktop
- Layout maestro con sidebar y top bar
- Adaptación completa a todos los dispositivos

### Seguridad
- Autenticación con JWT
- Contraseñas encriptadas con Bcrypt
- Control de acceso por roles
- Sesiones seguras

### Arquitectura
- Separación en capas (MVC)
- Core modular
- Módulos independientes
- Fácil escalabilidad

## ��� API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/verify` - Verificar sesión

### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

### Trabajadores
- `GET /api/trabajadores` - Listar trabajadores
- `GET /api/trabajadores/activos` - Trabajadores activos
- `POST /api/trabajadores` - Registrar trabajador
- `PUT /api/trabajadores/:id` - Modificar trabajador

### Asistencia
- `GET /api/asistencia` - Consultar registros
- `POST /api/asistencia` - Registrar asistencia
- `GET /api/asistencia/tipos` - Tipos de registro
- `GET /api/asistencia/periodo-actual` - Período actual

## ��� Testing

Plan de pruebas documentado en `tests/manual/` con al menos 10 casos de prueba manuales ejecutados y con evidencias.

## ��� Despliegue

El sistema está preparado para despliegue en:
- Render
- Railway  
- Heroku
- Vercel (con serverless functions)

## ��� Autor

**José Sánchez Godoy**  
Analista Programador  
Instituto Profesional Iplacex  
Proyecto de Título 2025

## ��� Licencia

Este proyecto es parte de un trabajo académico de titulación.

## ��� Contacto

Para consultas o sugerencias sobre el proyecto, contactar a través de la plataforma académica.

---

**AdminCore** - Sistema de Control de Asistencia y Horas Extras  
© 2026 - Todos los derechos reservados
