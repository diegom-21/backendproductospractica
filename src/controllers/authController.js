import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserByUsername, createUser } from '../models/userModel.js';

dotenv.config();

export const register = async (req, res) => {
  const { username, password } = req.body;
  
  // Verificar si el usuario ya existe
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return res.status(409).json({ 
      message: 'El usuario ya existe',
      code: 'USER_EXISTS'
    });
  }

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Crear usuario
  await createUser(username, hashedPassword);
  
  res.status(201).json({ 
    message: 'Usuario creado correctamente ✅',
    username: username
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  
  // Buscar usuario
  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ 
      message: 'Credenciales incorrectas',
      code: 'INVALID_CREDENTIALS'
    });
  }

  // Verificar contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ 
      message: 'Credenciales incorrectas',
      code: 'INVALID_CREDENTIALS'
    });
  }

  // Generar token
  const token = jwt.sign(
    { 
      id: user.id, 
      username: user.username 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );

  res.json({ 
    message: 'Login exitoso ✅',
    token,
    user: {
      id: user.id,
      username: user.username,
      created_at: user.created_at
    }
  });
};
