#!/usr/bin/env node

import dotenv from 'dotenv';
import { initUserTable } from '../models/userModel.js';
import { initProductTable } from '../models/itemModel.js';
import { seedDatabase } from './seeder.js';

dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('🚀 Iniciando configuración de la base de datos...');
    
    // Crear tablas
    console.log('📋 Creando tablas...');
    await initUserTable();
    await initProductTable();
    
    // Seed inicial
    console.log('🌱 Ejecutando seeding...');
    await seedDatabase();
    
    console.log('✅ Base de datos configurada correctamente');
    console.log('\n📝 Datos de acceso:');
    console.log('   👤 Usuario: admin');
    console.log('   🔑 Contraseña: admin123');
    console.log('\n🔗 Endpoints disponibles:');
    console.log('   POST /api/auth/login - Iniciar sesión');
    console.log('   POST /api/auth/register - Registrar usuario');
    console.log('   GET /api/products - Obtener productos');
    console.log('   POST /api/products - Crear producto (requiere auth)');
    console.log('   PUT /api/products/:id - Actualizar producto (requiere auth)');
    console.log('   DELETE /api/products/:id - Eliminar producto (requiere auth)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al configurar la base de datos:', error);
    process.exit(1);
  }
};

initializeDatabase();