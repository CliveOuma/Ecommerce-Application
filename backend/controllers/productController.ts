import { Request, Response } from 'express';
import { Product } from '../models/product';
import mongoose from 'mongoose';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category, inStock, images } = req.body;
    
    if (!name || !price || !description || !category || !images) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      inStock,
      images
    });

    await newProduct.save();
    res.status(201).send(newProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(400).send({ message: 'Product not saved' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, inStock, images } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      price,
      description,
      category,
      inStock,
      images 
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).send({ message: 'Error updating product' });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send({ message: 'Product and images deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Error fetching products' });
  }
};
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid Product ID' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching product' });
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
