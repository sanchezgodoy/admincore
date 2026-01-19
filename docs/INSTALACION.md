# Guía de Instalación y Deployment - AdminCore

## ��� Requisitos Previos

### Software Necesario
- **Node.js** >= 16.0.0 ([Descargar](https://nodejs.org/))
- **PostgreSQL** >= 12.0 ([Descargar](https://www.postgresql.org/download/))
- **Git** (opcional, para clonar repositorio)
- **Navegador moderno** (Chrome, Firefox, Edge, Safari)

### Conocimientos Recomendados
- Comandos básicos de terminal
- Configuración de bases de datos PostgreSQL
- Variables de entorno

---

## ��� Instalación Local (Desarrollo)

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Opción A: Clonar desde repositorio Git
git clone [URL-DEL-REPOSITORIO]
cd Admincore

# Opción B: Si descargaste ZIP
# Extraer y navegar a la carpeta
cd Admincore
```

### Paso 2: Instalar Dependencias de Node.js

```bash
npm install
```

Esto instalará:
- express (servidor web)
- pg (driver PostgreSQL)
- bcryptjs (hash de contraseñas)
- jsonwebtoken (autenticación JWT)
- express-session (gestión de sesiones)
- dotenv (variables de entorno)
- cors (seguridad CORS)

### Paso 3: Configurar Base de Datos PostgreSQL

#### 3.1 Crear Base de Datos

```sql
-- Conectar a PostgreSQL con tu cliente favorito (pgAdmin, DBeaver, psql)
CREATE DATABASE admincore_db;
```

#### 3.2 Ejecutar Script de Esquema

```bash
# Desde la terminal, en la carpeta del proyecto
psql -U tu_usuario -d admincore_db -f database/scripts/schema.sql
```

O copiar y ejecutar manualmente el contenido de `database/scripts/schema.sql` en tu cliente SQL.

#### 3.3 Cargar Datos de Prueba (Opcional pero Recomendado)

```bash
psql -U tu_usuario -d admincore_db -f database/scripts/seed.sql
```

Esto creará:
- 2 roles (Administrador, Jefe de Turno)
- 2 usuarios de prueba:
  - `admin@admincore.cl` / `admin123`
  - `jefe@admincore.cl` / `jefe123`
- 5 trabajadores de ejemplo
- 6 tipos de registro (Asistencia, Horas Extras, etc.)
- 1 período activo (Enero 2026)

### Paso 4: Configurar Variables de Entorno

Copiar el archivo de ejemplo:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=admincore_db
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_postgres

# Servidor
PORT=3000
NODE_ENV=development

# Sesiones
SESSION_SECRET=cambiar-por-string-aleatorio-seguro-ej-g7K2pQw8xL4nM9vR
SESSION_NAME=admincore_session

# JWT
JWT_SECRET=cambiar-por-otro-string-aleatorio-ej-bN5yH8tP3qX9wZ4m
JWT_EXPIRES_IN=24h
```

**IMPORTANTE:** Cambiar los secretos (`SESSION_SECRET` y `JWT_SECRET`) por strings aleatorios únicos en producción.

### Paso 5: Iniciar el Servidor

```bash
npm start
```

Salida esperada:
```
✓ Servidor corriendo en puerto 3000
✓ Conectado a PostgreSQL
Entorno: development
URL: http://localhost:3000
```

### Paso 6: Acceder al Sistema

Abrir navegador en: **http://localhost:3000**

Credenciales de prueba:
- **Administrador:** `admin@admincore.cl` / `admin123`
- **Jefe de Turno:** `jefe@admincore.cl` / `jefe123`

---

## ��� Deployment en Producción

### Opción 1: Render.com (Recomendado - Gratis)

#### 1.1 Subir Código a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [URL-TU-REPOSITORIO]
git push -u origin main
```

#### 1.2 Crear Base de Datos en Render

1. Ir a [render.com](https://render.com) y crear cuenta
2. Crear nuevo **PostgreSQL** database:
   - Name: `admincore-db`
   - Plan: Free
   - Region: Oregon (US West) o más cercano
3. **Guardar** las credenciales que aparecen (Internal Database URL)

#### 1.3 Ejecutar Scripts en Base de Datos Render

Conectar a la base de datos usando las credenciales:

```bash
psql postgresql://admincore_db_user:CONTRASEÑA@HOSTNAME/admincore_db
```

Ejecutar:
```sql
\i database/scripts/schema.sql
\i database/scripts/seed.sql
```

#### 1.4 Crear Web Service

1. En Render, crear nuevo **Web Service**
2. Conectar con tu repositorio GitHub
3. Configurar:
   - **Name:** admincore
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node backend/server.js`
   - **Plan:** Free

#### 1.5 Configurar Variables de Entorno

En Render, ir a **Environment** y agregar:

```
DB_HOST=[copiar-desde-database-info]
DB_PORT=5432
DB_NAME=admincore_db
DB_USER=[copiar-desde-database-info]
DB_PASSWORD=[copiar-desde-database-info]
PORT=3000
NODE_ENV=production
SESSION_SECRET=[generar-string-aleatorio]
SESSION_NAME=admincore_prod
JWT_SECRET=[generar-string-aleatorio]
JWT_EXPIRES_IN=24h
```

**Generar strings aleatorios seguros:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 1.6 Deploy

Render automáticamente hará deploy. URL final: `https://admincore.onrender.com`

---

### Opción 2: Railway.app (Alternativa Fácil)

#### 2.1 Instalar Railway CLI

```bash
npm install -g @railway/cli
railway login
```

#### 2.2 Inicializar Proyecto

```bash
railway init
railway add postgresql
```

#### 2.3 Configurar Variables de Entorno

```bash
railway variables set SESSION_SECRET=$(openssl rand -hex 32)
railway variables set JWT_SECRET=$(openssl rand -hex 32)
railway variables set NODE_ENV=production
```

#### 2.4 Deploy

```bash
railway up
```

Railway asignará URL automáticamente.

---

### Opción 3: Vercel + Supabase (Frontend + Database)

#### 3.1 Backend en Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Crear `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/server.js"
    }
  ]
}
```

#### 3.2 Base de Datos en Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar scripts SQL en el SQL Editor
3. Copiar connection string
4. Configurar en Vercel:

```bash
vercel env add DB_HOST
vercel env add DB_PASSWORD
# ... (resto de variables)
```

---

## ��� Configuración de Producción

### Seguridad

1. **Cambiar todos los secretos:**
   ```bash
   # Generar nuevos secretos
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Configurar CORS en producción:**
   Editar `backend/server.js`:
   ```javascript
   const corsOptions = {
     origin: 'https://tu-dominio.com',
     credentials: true
   };
   app.use(cors(corsOptions));
   ```

3. **HTTPS obligatorio** (Render y Railway lo incluyen automáticamente)

4. **Variables de entorno:**
   - NUNCA commitear archivo `.env`
   - Usar secretos únicos por entorno
   - Rotar secretos periódicamente

### Optimización

1. **Comprimir respuestas:**
   ```bash
   npm install compression
   ```
   
   En `server.js`:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Rate limiting:**
   ```bash
   npm install express-rate-limit
   ```

3. **Logging en producción:**
   ```bash
   npm install morgan
   ```

---

## ��� Verificación Post-Deployment

### Checklist

- [ ] Base de datos accesible y con datos iniciales
- [ ] Servidor responde en la URL de producción
- [ ] Login funcional con usuarios de prueba
- [ ] 3 formularios funcionan correctamente:
  - [ ] Gestión de Usuarios (CRUD)
  - [ ] Gestión de Trabajadores (CRUD + validación RUT)
  - [ ] Registro de Asistencia (CREATE + consultas)
- [ ] Ambos perfiles de usuario funcionan:
  - [ ] Administrador (acceso completo)
  - [ ] Jefe de Turno (acceso limitado)
- [ ] Sesiones persisten correctamente
- [ ] Logout funciona y limpia sesión
- [ ] Interfaz responsive en mobile
- [ ] Sin errores en consola del navegador
- [ ] Sin errores 500 en logs del servidor

### Pruebas Rápidas

```bash
# Verificar conexión a base de datos
curl https://tu-app.onrender.com/api/auth/verify

# Verificar endpoint de login
curl -X POST https://tu-app.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admincore.cl","password":"admin123"}'
```

---

## ��� Solución de Problemas

### Error: "Cannot connect to database"

**Causa:** Credenciales incorrectas o base de datos no accesible

**Solución:**
1. Verificar variables de entorno `DB_*`
2. Probar conexión manual:
   ```bash
   psql postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```
3. Verificar firewall/whitelist en hosting

### Error: "Port already in use"

**Causa:** Puerto 3000 ocupado por otra aplicación

**Solución:**
```bash
# Cambiar puerto en .env
PORT=3001

# O matar proceso existente
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### Error: "Session secret not set"

**Causa:** Variables `SESSION_SECRET` o `JWT_SECRET` no definidas

**Solución:**
Verificar que `.env` está creado y contiene:
```env
SESSION_SECRET=tu_secreto_aqui
JWT_SECRET=otro_secreto_aqui
```

### Frontend muestra "Failed to fetch"

**Causa:** CORS bloqueado o servidor no responde

**Solución:**
1. Verificar que servidor está corriendo
2. Revisar URL en `frontend/assets/js/api.js`:
   ```javascript
   const API_URL = 'http://localhost:3000/api';  // Desarrollo
   // const API_URL = 'https://tu-app.com/api';  // Producción
   ```

---

## ��� Contacto y Soporte

**Proyecto:** AdminCore - Sistema de Control de Asistencia  
**Autor:** José Silva  
**Email:** [tu-email]  
**Repositorio:** [URL-GitHub]

---

## ��� Notas Finales

### Credenciales Iniciales (Cambiar en Producción)

| Usuario | Email | Contraseña | Rol |
|---------|-------|-----------|-----|
| Admin | admin@admincore.cl | admin123 | Administrador |
| Jefe | jefe@admincore.cl | jefe123 | Jefe de Turno |

**⚠️ IMPORTANTE:** Cambiar estas contraseñas después del primer login en producción.

### Respaldo de Base de Datos

```bash
# Backup
pg_dump -U usuario -d admincore_db > backup_$(date +%Y%m%d).sql

# Restore
psql -U usuario -d admincore_db < backup_20260115.sql
```

### Próximos Pasos

1. Ejecutar plan de pruebas manual (tests/manual/casos-prueba.md)
2. Documentar evidencias con screenshots
3. Completar análisis de resultados
4. Actualizar documentación con URL de producción
5. Compartir acceso con profesor/evaluador

---

**¡Sistema listo para deployment y uso en producción!** ���
