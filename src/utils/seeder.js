import bcrypt from 'bcryptjs';
import { findUserByUsername, createUser } from '../models/userModel.js';
import { getAllProducts, createProduct } from '../models/itemModel.js';

export const createAdminUser = async () => {
  try {
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    
    // Verificar si ya existe un usuario admin
    const existingAdmin = await findUserByUsername(adminUsername);
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await createUser(adminUsername, hashedPassword);
      console.log('✅ Usuario administrador creado exitosamente');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      console.log('   ⚠️  CAMBIA ESTA CONTRASEÑA EN PRODUCCIÓN');
    } else {
      console.log('✅ Usuario administrador ya existe');
    }
  } catch (error) {
    console.error('❌ Error al crear usuario administrador:', error);
  }
};

export const createSampleProducts = async () => {
  try {
    const products = await getAllProducts();
    
    if (products.length === 0) {
      const sampleProducts = [
        {
          name: 'Laptop Gaming',
          description: 'Laptop para gaming con tarjeta gráfica dedicada',
          price: 1299.99
        },
        {
          name: 'Mouse Inalámbrico',
          description: 'Mouse ergonómico con conexión Bluetooth',
          price: 29.99
        },
        {
          name: 'Teclado Mecánico',
          description: 'Teclado mecánico RGB para gaming',
          price: 89.99
        },
        {
          name: 'Monitor 4K',
          description: 'Monitor 27" con resolución 4K y tecnología HDR',
          price: 399.99
        },
        {
          name: 'Auriculares Bluetooth',
          description: 'Auriculares inalámbricos con cancelación de ruido',
          price: 199.99
        }
      ];

      for (const product of sampleProducts) {
        await createProduct(product.name, product.description, product.price);
      }
      
      console.log('✅ Productos de ejemplo creados exitosamente');
    } else {
      console.log('✅ Ya existen productos en la base de datos');
    }
  } catch (error) {
    console.error('❌ Error al crear productos de ejemplo:', error);
  }
};

export const seedDatabase = async () => {
  console.log('🌱 Iniciando seeding de la base de datos...');
  await createAdminUser();
  await createSampleProducts();
  console.log('🌱 Seeding completado');
};