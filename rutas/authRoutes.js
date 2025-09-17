const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modelos/User");

const router = express.Router();

// Ruta para ver usuarios (solo para demostración al profesor)
router.get("/users", async (req, res) => {
  try {
    // Esta ruta es solo para fines educativos y demostración
    // En un entorno de producción, nunca se deberían exponer las contraseñas hasheadas
    const users = await User.getAllUsers();
    res.json(users.map(user => ({
      id: user.id,
      username: user.username,
      hashedPassword: user.password,
      role: user.role
    })));
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Registro de usuario
router.post("/register", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    const { username, password, role } = req.body;
    
    // Validaciones
    if (!username || !password) {
      return res.status(400).json({ error: "Usuario y contraseña son requeridos" });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      username, 
      password: hashedPassword, 
      role: role || "user" // Valor por defecto si no se proporciona
    });
    
    const savedUser = await newUser.save();
    console.log("Usuario guardado:", savedUser);

    res.status(201).json({ message: "Usuario creado con éxito", userId: savedUser.id });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const JWT_SECRET = process.env.JWT_SECRET || "claveSecreta";
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
