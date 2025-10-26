// Middleware para validar datos de entrada
export const validateRegister = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      message: 'Nombre de usuario y contraseña son requeridos' 
    });
  }
  
  if (username.length < 3) {
    return res.status(400).json({ 
      message: 'El nombre de usuario debe tener al menos 3 caracteres' 
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ 
      message: 'La contraseña debe tener al menos 6 caracteres' 
    });
  }
  
  // Limpiar datos
  req.body.username = username.trim().toLowerCase();
  next();
};

export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      message: 'Nombre de usuario y contraseña son requeridos' 
    });
  }
  
  // Limpiar datos
  req.body.username = username.trim().toLowerCase();
  next();
};

export const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ 
      message: 'Nombre y precio son campos obligatorios' 
    });
  }
  
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ 
      message: 'El precio debe ser un número mayor a 0' 
    });
  }
  
  if (name.trim().length < 2) {
    return res.status(400).json({ 
      message: 'El nombre debe tener al menos 2 caracteres' 
    });
  }
  
  // Limpiar datos
  req.body.name = name.trim();
  if (req.body.description) {
    req.body.description = req.body.description.trim();
  }
  
  next();
};

export const validateProductUpdate = (req, res, next) => {
  const { name, price } = req.body;
  
  if (name && name.trim().length < 2) {
    return res.status(400).json({ 
      message: 'El nombre debe tener al menos 2 caracteres' 
    });
  }
  
  if (price && (typeof price !== 'number' || price <= 0)) {
    return res.status(400).json({ 
      message: 'El precio debe ser un número mayor a 0' 
    });
  }
  
  // Limpiar datos si existen
  if (req.body.name) {
    req.body.name = req.body.name.trim();
  }
  if (req.body.description) {
    req.body.description = req.body.description.trim();
  }
  
  next();
};

export const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({ 
      message: 'ID debe ser un número válido mayor a 0' 
    });
  }
  
  req.params.id = parseInt(id);
  next();
};