// Middleware global para manejo de errores
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Error de validación',
      error: err.message
    });
  }
  
  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Token inválido'
    });
  }
  
  // Error de JWT expirado
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expirado'
    });
  }
  
  // Error de base de datos - duplicado
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      message: 'Ya existe un registro con esos datos'
    });
  }
  
  // Error de base de datos - conexión
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      message: 'Error de conexión a la base de datos'
    });
  }
  
  // Error interno del servidor
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
};

// Middleware para rutas no encontradas
export const notFound = (req, res, next) => {
  res.status(404).json({
    message: `Ruta ${req.originalUrl} no encontrada`
  });
};

// Middleware para capturar errores asíncronos
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};