const express = require("express");
const Movie = require("../modelos/Movie");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Crear película (solo admin)
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consultar todas las películas (logueados)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consultar por año y precio
router.get("/filtro", authMiddleware, async (req, res) => {
  try {
    const { anio, precio } = req.query;
    const movies = await Movie.find({
      anio: { $gt: parseInt(anio) || 0 },
      precio: { $lte: parseFloat(precio) || 9999 }
    });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
