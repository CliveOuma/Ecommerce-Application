import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { getProductCount } from '../controllers/productController';
import { getOrderSummary, getUserCount } from '../controllers/adminController';

const router = Router();


router.get('/admin-only', requireAdmin, (req, res) => {
    res.send('Welcome, admin!');
});

router.get('/orders/summary', getOrderSummary); 
router.get('/products/count', getProductCount);   
router.get('/users/count', getUserCount);           

export default router;

