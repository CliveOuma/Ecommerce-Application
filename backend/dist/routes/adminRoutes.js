"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const productController_1 = require("../controllers/productController");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
router.get('/admin-only', authMiddleware_1.requireAdmin, (req, res) => {
    res.send('Welcome, admin!');
});
router.get('/orders/summary', adminController_1.getOrderSummary);
router.get('/products/count', productController_1.getProductCount);
router.get('/users/count', adminController_1.getUserCount);
exports.default = router;
