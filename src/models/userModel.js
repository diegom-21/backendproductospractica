import pool from '../config/db.js';

// Crear tabla de usuarios si no existe
export const initUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

// Buscar usuario por nombre
export const findUserByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

// Crear usuario nuevo
export const createUser = async (username, hashedPassword) => {
  await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
};
