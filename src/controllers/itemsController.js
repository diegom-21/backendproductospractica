import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../models/itemModel.js';

export const getProducts = async (req, res) => {
  const products = await getAllProducts();
  res.json({
    message: 'Productos obtenidos exitosamente',
    count: products.length,
    data: products
  });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  
  const product = await getProductById(id);
  if (!product) {
    return res.status(404).json({ 
      message: 'Producto no encontrado',
      code: 'PRODUCT_NOT_FOUND'
    });
  }
  
  res.json({
    message: 'Producto encontrado',
    data: product
  });
};

export const createNewProduct = async (req, res) => {
  const { name, description, price } = req.body;
  
  const productId = await createProduct(name, description || '', price);
  
  // Obtener el producto creado para devolverlo
  const newProduct = await getProductById(productId);
  
  res.status(201).json({ 
    message: 'Producto creado correctamente ✅',
    data: newProduct
  });
};

export const updateExistingProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  
  // Verificar que el producto existe
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ 
      message: 'Producto no encontrado',
      code: 'PRODUCT_NOT_FOUND'
    });
  }
  
  // Actualizar solo los campos que se enviaron
  const updatedName = name || existingProduct.name;
  const updatedDescription = description !== undefined ? description : existingProduct.description;
  const updatedPrice = price || existingProduct.price;
  
  await updateProduct(id, updatedName, updatedDescription, updatedPrice);
  
  // Obtener el producto actualizado
  const updatedProduct = await getProductById(id);
  
  res.json({ 
    message: 'Producto actualizado correctamente ✅',
    data: updatedProduct
  });
};

export const removeProduct = async (req, res) => {
  const { id } = req.params;
  
  // Verificar que el producto existe
  const existingProduct = await getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ 
      message: 'Producto no encontrado',
      code: 'PRODUCT_NOT_FOUND'
    });
  }
  
  await deleteProduct(id);
  
  res.json({ 
    message: 'Producto eliminado correctamente ✅',
    deletedProduct: existingProduct
  });
};
