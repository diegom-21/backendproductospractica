import pool from '../config/db.js';

// Crear tabla si no existe
export const initProductTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('✅ Tabla "products" lista');
  } catch (error) {
    console.error('❌ Error al inicializar la tabla products:', error);
  }
};

// CRUD
export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

export const createProduct = async (name, description, price) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
    [name, description, price]
  );
  return result.insertId;
};

export const updateProduct = async (id, name, description, price) => {
  await pool.query(
    'UPDATE products SET name=?, description=?, price=? WHERE id=?',
    [name, description, price, id]
  );
};

export const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id=?', [id]);
};
