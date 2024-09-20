"use client"
import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import { CartProductType } from '@/app/product/[id]/ProductDetails';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductsToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider: React.FC<Props> = ({ currentUser, ...props }) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProduct] = useState<CartProductType[] | null>(null);

    const router = useRouter();

    // Load cartItems from localStorage
    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems');
        const TheCartProducts: CartProductType[] | null = JSON.parse(cartItems || '[]');
        setCartProduct(TheCartProducts);
    }, []);

    // Calculate totals
    useEffect(() => {
        if (cartProducts) {
            const { total, qty } = cartProducts.reduce((acc, item) => {
                const itemTotal = item.price * item.quantity;
                acc.total += itemTotal;
                acc.qty += item.quantity;
                return acc;
            }, {
                total: 0,
                qty: 0
            });
            setCartTotalQty(qty);
            setCartTotalAmount(total);
        }
    }, [cartProducts]);

    const handleAddProductsToCart = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            if (!prev) return [product];
            
            const existingProductIndex = prev.findIndex((item) => item.id === product.id);
            let updatedCart = [...prev];

            if (existingProductIndex !== -1) {
                // Product already in cart; update quantity
                updatedCart[existingProductIndex].quantity += product.quantity;
                toast.success('Product quantity updated successfully');
            } else {
                // New product; add to cart
                updatedCart = [...prev, product];
                toast.success('Product added successfully');
            }

            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            if (!prev) return null;
            
            const updatedCart = prev.filter((item) => item.id !== product.id);
            toast.success('Product removed successfully');
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            if (!prev) return prev;

            const existingIndex = prev.findIndex((item) => item.id === product.id);
            if (existingIndex === -1) return prev;

            const updatedCart = [...prev];
            if (updatedCart[existingIndex].quantity < 99) {
                updatedCart[existingIndex].quantity++;
                toast.success('Quantity increased');
            } else {
                toast.error('Maximum quantity reached');
            }

            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            if (!prev) return prev;

            const existingIndex = prev.findIndex((item) => item.id === product.id);
            if (existingIndex === -1) return prev;

            const updatedCart = [...prev];
            if (updatedCart[existingIndex].quantity > 1) {
                updatedCart[existingIndex].quantity--;
                toast.success('Quantity decreased');
            } else {
                toast.error('Minimum quantity reached');
            }

            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleClearCart = useCallback(() => {
        setCartProduct(null);
        setCartTotalQty(0);
        localStorage.setItem('cartItems', JSON.stringify([]));
    }, []);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductsToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }

    return context;
};
