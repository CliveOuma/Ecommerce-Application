import { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, getProducts, getProductById }  from '../controllers/productController';
import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/products', createProduct);
router.put('/products/:id', requireAdmin, updateProduct);
router.delete('/products/:id', requireAdmin, deleteProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

export default router;