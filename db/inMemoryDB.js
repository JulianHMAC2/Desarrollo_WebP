// Base de datos en memoria para pruebas

const users = [];

// Películas de ejemplo precargadas
const movies = [
  {
    id: "1",
    titulo: "El Padrino",
    director: "Francis Ford Coppola",
    anio: 1972,
    productora: "Paramount Pictures",
    precio: 15.99
  },
  {
    id: "2",
    titulo: "Titanic",
    director: "James Cameron",
    anio: 1997,
    productora: "20th Century Fox",
    precio: 12.50
  },
  {
    id: "3",
    titulo: "Avatar",
    director: "James Cameron",
    anio: 2009,
    productora: "20th Century Fox",
    precio: 19.99
  },
  {
    id: "4",
    titulo: "Interestelar",
    director: "Christopher Nolan",
    anio: 2014,
    productora: "Warner Bros.",
    precio: 18.75
  },
  {
    id: "5",
    titulo: "El Rey León",
    director: "Roger Allers",
    anio: 1994,
    productora: "Walt Disney Pictures",
    precio: 9.99
  }
];

module.exports = {
  users,
  movies
};