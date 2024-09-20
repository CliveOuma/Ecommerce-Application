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
exports.getProductCount = exports.getProductById = exports.getProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const product_1 = require("../models/product");
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description, category, inStock, images } = req.body;
        if (!name || !price || !description || !category || !images) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const newProduct = new product_1.Product({
            name,
            price,
            description,
            category,
            inStock,
            images
        });
        yield newProduct.save();
        res.status(201).send(newProduct);
    }
    catch (error) {
        console.error('Error saving product:', error);
        res.status(400).send({ message: 'Product not saved' });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, description, category, inStock, images } = req.body;
        const updatedProduct = yield product_1.Product.findByIdAndUpdate(id, {
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
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(400).send({ message: 'Error updating product' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield product_1.Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product and images deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});
exports.deleteProduct = deleteProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.Product.find();
        res.status(200).send(products);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send({ message: 'Error fetching products' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid Product ID' });
    }
    try {
        const product = yield product_1.Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).send({ message: 'Error fetching product' });
    }
});
exports.getProductById = getProductById;
const getProductCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productCount = yield product_1.Product.countDocuments();
        res.status(200).json({ count: productCount });
    }
    catch (error) {
        console.error('Error fetching product count:', error);
        res.status(500).json({ message: 'Error fetching product count' });
    }
});
exports.getProductCount = getProductCount;
