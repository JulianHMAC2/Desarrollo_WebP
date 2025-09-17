const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Acceso denegado. Token requerido." });

  try {
    // Extraer el token si viene con prefijo Bearer
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    const JWT_SECRET = process.env.JWT_SECRET || "claveSecreta";
    const decoded = jwt.verify(tokenValue, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error de autenticación:", err);
    res.status(400).json({ message: "Token no válido" });
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "No autorizado. Se requiere rol administrador." });
  }
  next();
}

module.exports = { authMiddleware, isAdmin };
