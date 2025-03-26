"use client";

import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from "react";
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
    const cartRef = useRef<CartProductType[] | null>(null);

    const router = useRouter();

    // Load cartItems from localStorage only once when component mounts
    useEffect(() => {
        const cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            const parsedCart: CartProductType[] = JSON.parse(cartItems);
            setCartProduct(parsedCart);
            cartRef.current = parsedCart;
        }
    }, []);

    // Calculate totals whenever cart changes
    useEffect(() => {
        if (!cartProducts) return;
        const { total, qty } = cartProducts.reduce((acc, item) => {
            acc.total += item.price * item.quantity;
            acc.qty += item.quantity;
            return acc;
        }, { total: 0, qty: 0 });

        setCartTotalQty(qty);
        setCartTotalAmount(total);
    }, [cartProducts]);

    // Function to update localStorage
    const updateCartStorage = (cart: CartProductType[]) => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
        cartRef.current = cart;
    };

    // Add product to cart
    const handleAddProductsToCart = useCallback((product: CartProductType) => {
        let message = "";

        setCartProduct((prev) => {
            if (!prev) {
                message = 'Product added successfully';
                updateCartStorage([product]);
                return [product];
            }

            const existingProductIndex = prev.findIndex((item) => item.id === product.id);
            let updatedCart = [...prev];

            if (existingProductIndex !== -1) {
                updatedCart[existingProductIndex].quantity += product.quantity;
                message = 'Product quantity updated successfully';
            } else {
                updatedCart.push(product);
                message = 'Product added successfully';
            }

            updateCartStorage(updatedCart);
            return updatedCart;
        });

        if (message) toast.success(message); // ✅ Call toast *after* state update
    }, []);

    // Remove product from cart
    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            if (!prev) return null;
            const updatedCart = prev.filter((item) => item.id !== product.id);
            updateCartStorage(updatedCart);
            return updatedCart;
        });

        toast.success('Product removed successfully'); // ✅ Call toast *after* state update
    }, []);

    // Increase quantity
    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            if (!prev) return prev;
            const updatedCart = prev.map((item) =>
                item.id === product.id && item.quantity < 99
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            updateCartStorage(updatedCart);
            return updatedCart;
        });

        toast.success('Quantity increased'); // ✅ Call toast *after* state update
    }, []);

    // Decrease quantity
    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            if (!prev) return prev;
            const updatedCart = prev.map((item) =>
                item.id === product.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );

            updateCartStorage(updatedCart);
            return updatedCart;
        });

        toast.success('Quantity decreased'); // ✅ Call toast *after* state update
    }, []);

    // Clear cart
    const handleClearCart = useCallback(() => {
        setCartProduct(null);
        setCartTotalQty(0);
        setCartTotalAmount(0);
        updateCartStorage([]);

        toast.success('Cart cleared successfully'); // ✅ Call toast *after* state update
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
