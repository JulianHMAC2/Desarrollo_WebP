const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initDatabase } = require('./db/mysqlConfig');
const authRoutes = require("./rutas/authRoutes");
const movieRoutes = require("./rutas/movieRoutes");

const app = express();

// Configuración de CORS más detallada
app.use(cors({
  origin: '*', // Permite cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas reales
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 4000;

// Inicializar la base de datos y el servidor
async function startServer() {
  try {
    // Inicializar la base de datos MySQL
    const dbInitialized = await initDatabase();
    
    if (dbInitialized) {
      console.log('✅ Conexión a MySQL establecida correctamente');
    } else {
      console.log('⚠️ Error al conectar con MySQL. Verifique que XAMPP esté ejecutándose en el puerto 3307');
    }
    
    // Iniciar el servidor
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();
