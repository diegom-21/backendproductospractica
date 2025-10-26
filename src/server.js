import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import itemsRoutes from './routes/itemsRoutes.js';
import { initUserTable } from './models/userModel.js';
import { initProductTable } from './models/itemModel.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { seedDatabase } from './utils/seeder.js';

dotenv.config();
const app = express();

// Middleware básico
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas principales
app.get('/', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando correctamente 🚀',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      testDb: '/test-db'
    }
  });
});

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/products', itemsRoutes);

// Ruta de prueba de base de datos
import pool from './config/db.js';
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ 
      message: 'Conexión a la base de datos exitosa ✅', 
      serverTime: rows[0].now,
      database: process.env.DB_NAME
    });
  } catch (error) {
    console.error('Error al conectar con la BD:', error);
    res.status(500).json({ 
      error: 'Error al conectar con la base de datos ❌',
      details: error.message
    });
  }
});

// Middleware de manejo de errores (debe ir al final)
app.use(notFound);
app.use(errorHandler);

// Inicialización del servidor
const startServer = async () => {
  try {
    // Inicializar tablas
    console.log('🔧 Inicializando base de datos...');
    await initUserTable();
    await initProductTable();
    
    // Seed inicial
    await seedDatabase();
    
    // Iniciar servidor
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
      console.log(`🌍 URL: http://localhost:${PORT}`);
      console.log(`📊 Test DB: http://localhost:${PORT}/test-db`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
