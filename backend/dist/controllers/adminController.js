"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCount = exports.getOrderSummary = void 0;
const order_1 = require("../models/order");
const user_1 = __importDefault(require("../models/user"));
const getOrderSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.Order.find(); // Fetch all orders
        const totalOrders = orders.length;
        const paidOrders = orders.filter(order => order.status === 'complete');
        const unpaidOrders = orders.filter(order => order.status !== 'complete');
        const totalSales = paidOrders.reduce((acc, order) => acc + order.amount, 0);
        res.status(200).json({
            totalOrders,
            totalSales,
            paidOrders: paidOrders.length,
            unpaidOrders: unpaidOrders.length,
        });
    }
    catch (error) {
        console.error('Error fetching order summary:', error);
        res.status(500).json({ message: 'Error fetching order summary' });
    }
});
exports.getOrderSummary = getOrderSummary;
const getUserCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCount = yield user_1.default.countDocuments();
        res.status(200).json({ count: userCount });
    }
    catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error fetching user count' });
    }
});
exports.getUserCount = getUserCount;
