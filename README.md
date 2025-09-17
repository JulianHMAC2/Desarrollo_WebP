# Integrantes

Alejandro Mejia Florez,
Julian Hoyos Moncada,
Alejandro Arango Munera.


Este proyecto es una aplicación web para la gestión de películas con autenticación de usuarios y roles de administrador. Permite a los usuarios registrarse, iniciar sesión, consultar películas y filtrarlas por año y precio. Los administradores tienen privilegios adicionales para crear nuevas películas.

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express.js**: Framework web para Node.js
- **MySQL**: Sistema de gestión de bases de datos relacional
- **JWT (JSON Web Tokens)**: Para autenticación segura
- **Bcrypt**: Para el hash seguro de contraseñas
- **Dotenv**: Para gestión de variables de entorno

### Frontend
- **HTML5**: Estructura de la página web
- **CSS3**: Estilos y diseño responsivo
- **JavaScript**: Interactividad y comunicación con la API
- **Fetch API**: Para realizar peticiones HTTP al backend

## Requisitos Previos

1. **Node.js** (v14.x o superior)
2. **MySQL** (v5.7 o superior) - Se recomienda XAMPP para entornos de desarrollo
3. **Git** para clonar el repositorio

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/JulianHMAC2/Desarrollo_WebP.git
cd Desarrollo_WebP
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar la Base de Datos

1. Inicia tu servidor MySQL (a través de XAMPP o directamente)
2. Crea una base de datos llamada `peliculas_db`
3. Ejecuta los siguientes scripts SQL para crear las tablas necesarias:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  director VARCHAR(100) NOT NULL,
  anio INT NOT NULL,
  productora VARCHAR(100) NOT NULL,
  precio DECIMAL(10,2) NOT NULL
);
```

### 4. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta los valores según tu configuración):

```
PORT=4000
JWT_SECRET=tu_clave_secreta_para_jwt
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_DATABASE=peliculas_db
DB_PORT=3307
```

## Ejecución

Para iniciar la aplicación en modo desarrollo:

```bash
node index.js
```

La aplicación estará disponible en: `http://localhost:4000`

## Estructura del Proyecto

```
├── db/
│   ├── inMemoryDB.js      # Base de datos en memoria (legacy)
│   └── mysqlConfig.js      # Configuración de conexión a MySQL
├── front/
│   └── index.html          # Interfaz de usuario
├── middleware/
│   └── authMiddleware.js   # Middleware de autenticación
├── modelos/
│   ├── Movie.js            # Modelo de películas
│   └── User.js             # Modelo de usuarios
├── rutas/
│   ├── authRoutes.js       # Rutas de autenticación
│   └── movieRoutes.js      # Rutas para gestión de películas
├── .env                    # Variables de entorno
├── index.js                # Punto de entrada de la aplicación
└── package.json            # Dependencias y scripts
```

## Características

### Autenticación y Usuarios

- **Registro de usuarios**: Creación de cuentas con nombre de usuario y contraseña
- **Inicio de sesión**: Autenticación mediante JWT
- **Roles**: Sistema de roles (usuario estándar y administrador)
- **Seguridad**: Contraseñas hasheadas con bcrypt

### Gestión de Películas

- **Consulta de películas**: Listado de todas las películas disponibles
- **Filtrado**: Búsqueda por año y precio
- **Creación de películas**: Exclusivo para administradores

## API Endpoints

### Autenticación

- `POST /api/auth/register`: Registro de nuevos usuarios
  ```json
  {
    "username": "usuario",
    "password": "contraseña",
    "role": "user" // o "admin"
  }
  ```

- `POST /api/auth/login`: Inicio de sesión
  ```json
  {
    "username": "usuario",
    "password": "contraseña"
  }
  ```

- `GET /api/auth/users`: Obtener todos los usuarios (requiere autenticación)

### Películas

- `GET /api/movies`: Obtener todas las películas (requiere autenticación)

- `GET /api/movies?anio=2020&precio=10`: Filtrar películas por año y precio (requiere autenticación)

- `POST /api/movies`: Crear nueva película (requiere rol de administrador)
  ```json
  {
    "titulo": "Nombre de la película",
    "director": "Nombre del director",
    "anio": 2023,
    "productora": "Nombre de la productora",
    "precio": 15.99
  }
  ```

## Seguridad

- Autenticación mediante tokens JWT
- Contraseñas hasheadas con bcrypt
- Middleware de autenticación para proteger rutas
- Validación de roles para acciones privilegiadas

## Migración de MongoDB a MySQL

Este proyecto fue migrado de MongoDB a MySQL. Los principales cambios incluyeron:

1. Reemplazo del esquema de MongoDB por tablas relacionales en MySQL
2. Adaptación de los modelos para usar consultas SQL en lugar de operaciones de MongoDB
3. Actualización de las referencias de ID de documentos a claves primarias de MySQL
4. Implementación de manejo de errores específico para MySQL
