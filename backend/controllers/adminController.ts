import { Request, Response } from 'express';
import { Order } from '../models/order';
import User from '../models/user';
import { Product } from '../models/product';

export const getOrderSummary = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();  

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
  } catch (error) {
    console.error('Error fetching order summary:', error);
    res.status(500).json({ message: 'Error fetching order summary' });
  }
};

export const getUserCount = async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Error fetching user count' });
  }
};

export const getProductCount = async (req: Request, res: Response) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({ count: productCount });
  } catch (error) {
    console.error('Error fetching product count:', error);
    res.status(500).json({ message: 'Error fetching product count' });
  }
};