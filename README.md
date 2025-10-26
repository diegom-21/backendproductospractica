# Backend - API REST con Node.js

Backend completo para el proyecto de tienda con autenticación JWT y CRUD de productos.

## 🚀 Características

- **Autenticación JWT** - Login y registro de usuarios
- **CRUD completo** - Productos con operaciones Create, Read, Update, Delete
- **Middleware de seguridad** - Validaciones y manejo de errores
- **Base de datos MySQL** - Con modelos y conexión pool
- **Seeding automático** - Usuario admin y productos de ejemplo
- **API REST** - Endpoints bien estructurados

## 📋 Requisitos

- Node.js 18+ 
- MySQL 8.0+
- npm o yarn

## ⚙️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Edita el archivo `.env` con tus datos de MySQL:
   ```env
   PORT=4000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=""
   DB_NAME=testdb
   JWT_SECRET=clave_super_secreta
   ```

3. **Inicializar base de datos:**
   ```bash
   npm run init-db
   ```

## 🏃‍♂️ Ejecutar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

### Solo seeding
```bash
npm run seed
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Productos
- `GET /api/products` - Obtener todos los productos (público)
- `GET /api/products/:id` - Obtener producto por ID (público)
- `POST /api/products` - Crear producto (requiere auth)
- `PUT /api/products/:id` - Actualizar producto (requiere auth)
- `DELETE /api/products/:id` - Eliminar producto (requiere auth)

### Utilidades
- `GET /` - Estado del servidor
- `GET /test-db` - Probar conexión a BD

## 🔐 Usuario por defecto

**Username:** `admin`  
**Password:** `admin123`

⚠️ **Cambiar en producción**

## 📁 Estructura

```
src/
├── config/
│   └── db.js              # Configuración de MySQL
├── controllers/
│   ├── authController.js  # Controlador de autenticación
│   └── itemsController.js # Controlador de productos
├── middleware/
│   ├── authMiddleware.js      # Verificación JWT
│   ├── errorMiddleware.js     # Manejo de errores
│   └── validationMiddleware.js # Validaciones
├── models/
│   ├── userModel.js       # Modelo de usuarios
│   └── itemModel.js       # Modelo de productos
├── routes/
│   ├── authRoutes.js      # Rutas de autenticación
│   └── itemsRoutes.js     # Rutas de productos
├── utils/
│   ├── seeder.js          # Seeding de datos
│   └── init.js            # Inicialización de BD
└── server.js              # Archivo principal
```

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **MySQL2** - Driver de MySQL con soporte para promesas
- **bcryptjs** - Hash de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Variables de entorno
- **nodemon** - Auto-restart en desarrollo

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT con expiración
- Validación de datos de entrada
- Middleware de manejo de errores
- Prevención de inyección SQL con prepared statements

## 🌍 URLs de prueba

Una vez iniciado el servidor:

- **Servidor:** http://localhost:4000
- **Test BD:** http://localhost:4000/test-db
- **API Auth:** http://localhost:4000/api/auth
- **API Products:** http://localhost:4000/api/products

## 📝 Ejemplo de uso

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Crear producto (con token)
```bash
curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{"name":"Nuevo Producto","description":"Descripción","price":99.99}'
```

## 🚀 Despliegue

El backend está listo para desplegarse en cualquier plataforma que soporte Node.js:

- Heroku
- Railway
- Render
- DigitalOcean
- AWS EC2
- Google Cloud Platform

Solo asegúrate de configurar las variables de entorno apropiadas en tu plataforma de despliegue.