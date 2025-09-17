const mysql = require('mysql2/promise');

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'peliculas_db',
  port: 3307, // Puerto personalizado para XAMPP
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para inicializar la base de datos
async function initDatabase() {
  try {
    // Crear la base de datos si no existe
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3307
    });
    
    await connection.query('CREATE DATABASE IF NOT EXISTS peliculas_db');
    await connection.end();
    
    // Crear tablas
    const conn = await pool.getConnection();
    
    // Tabla de usuarios
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user'
      )
    `);
    
    // Tabla de películas
    await conn.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        director VARCHAR(100) NOT NULL,
        anio INT NOT NULL,
        productora VARCHAR(100) NOT NULL,
        precio DECIMAL(10,2) NOT NULL
      )
    `);
    
    // Insertar películas de ejemplo si la tabla está vacía
    const [rows] = await conn.query('SELECT COUNT(*) as count FROM movies');
    if (rows[0].count === 0) {
      await conn.query(`
        INSERT INTO movies (titulo, director, anio, productora, precio) VALUES
        ('El Padrino', 'Francis Ford Coppola', 1972, 'Paramount Pictures', 15.99),
        ('Titanic', 'James Cameron', 1997, '20th Century Fox', 12.50),
        ('Avatar', 'James Cameron', 2009, '20th Century Fox', 19.99),
        ('Interestelar', 'Christopher Nolan', 2014, 'Warner Bros.', 18.75),
        ('El Rey León', 'Roger Allers', 1994, 'Walt Disney Pictures', 9.99)
      `);
    }
    
    conn.release();
    console.log('✅ Base de datos MySQL inicializada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos MySQL:', error);
    return false;
  }
}

module.exports = {
  pool,
  initDatabase
};