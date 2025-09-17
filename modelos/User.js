// Modelo de usuario para MySQL
const { pool } = require('../db/mysqlConfig');
const bcrypt = require('bcryptjs');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.username = userData.username;
    this.password = userData.password;
    this.role = userData.role || "user";
  }

  async save() {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [this.username, this.password, this.role]
      );
      this.id = result.insertId;
      return this;
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  }

  static async findOne(query) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [query.username]
      );
      if (rows.length === 0) return null;
      
      return new User({
        id: rows[0].id,
        username: rows[0].username,
        password: rows[0].password,
        role: rows[0].role
      });
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      if (rows.length === 0) return null;
      
      return new User({
        id: rows[0].id,
        username: rows[0].username,
        password: rows[0].password,
        role: rows[0].role
      });
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      return rows.map(row => new User({
        id: row.id,
        username: row.username,
        password: row.password,
        role: row.role
      }));
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw error;
    }
  }
}

module.exports = User;
