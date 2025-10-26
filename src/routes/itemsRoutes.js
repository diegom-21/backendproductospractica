import express from 'express';
import {
    getProducts,
    getProduct,
    createNewProduct,
    updateExistingProduct,
    removeProduct,
} from '../controllers/itemsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { 
    validateProduct, 
    validateProductUpdate, 
    validateId 
} from '../middleware/validationMiddleware.js';
import { asyncHandler } from '../middleware/errorMiddleware.js';

const router = express.Router();

// Público - Obtener productos
router.get('/', asyncHandler(getProducts));
router.get('/:id', validateId, asyncHandler(getProduct));

// Protegido (solo admin) - CRUD completo
router.post('/', verifyToken, validateProduct, asyncHandler(createNewProduct));
router.put('/:id', verifyToken, validateId, validateProductUpdate, asyncHandler(updateExistingProduct));
router.delete('/:id', verifyToken, validateId, asyncHandler(removeProduct));

export default router;
