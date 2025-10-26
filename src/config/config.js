export const config = {
  // Configuración del servidor
  port: process.env.PORT || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Configuración de JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_key',
    expiresIn: '24h'
  },
  
  // Configuración de la base de datos
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'testdb',
    port: process.env.DB_PORT || 3306
  },
  
  // Configuración de CORS
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  },
  
  // Límites
  limits: {
    bodySize: '10mb',
    requestTimeout: 30000
  }
};