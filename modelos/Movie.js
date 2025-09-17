// Modelo de película para MySQL
const { pool } = require('../db/mysqlConfig');

class Movie {
  constructor(movieData) {
    this.id = movieData.id;
    this.titulo = movieData.titulo;
    this.director = movieData.director;
    this.anio = movieData.anio;
    this.productora = movieData.productora;
    this.precio = movieData.precio;
  }

  async save() {
    try {
      const [result] = await pool.query(
        'INSERT INTO movies (titulo, director, anio, productora, precio) VALUES (?, ?, ?, ?, ?)',
        [this.titulo, this.director, this.anio, this.productora, this.precio]
      );
      this.id = result.insertId;
      return this;
    } catch (error) {
      console.error('Error al guardar película:', error);
      throw error;
    }
  }

  static async find(query = {}) {
    try {
      let sql = 'SELECT * FROM movies';
      const params = [];
      const conditions = [];
      
      if (query.anio && query.anio.$gt) {
        conditions.push('anio > ?');
        params.push(query.anio.$gt);
      }
      
      if (query.precio && query.precio.$lte) {
        conditions.push('precio <= ?');
        params.push(query.precio.$lte);
      }
      
      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
      }
      
      const [rows] = await pool.query(sql, params);
      
      return rows.map(row => new Movie({
        id: row.id,
        titulo: row.titulo,
        director: row.director,
        anio: row.anio,
        productora: row.productora,
        precio: row.precio
      }));
    } catch (error) {
      console.error('Error al buscar películas:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM movies WHERE id = ?',
        [id]
      );
      if (rows.length === 0) return null;
      
      return new Movie({
        id: rows[0].id,
        titulo: rows[0].titulo,
        director: rows[0].director,
        anio: rows[0].anio,
        productora: rows[0].productora,
        precio: rows[0].precio
      });
    } catch (error) {
      console.error('Error al buscar película por ID:', error);
      throw error;
    }
  }
}

module.exports = Movie;
