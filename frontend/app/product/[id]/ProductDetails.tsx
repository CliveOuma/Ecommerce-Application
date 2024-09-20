"use client";

import { useCallback, useState, useEffect } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button"; 
import SetQuantity from "@/app/components/products/SetQuantity";
import ProductImage from "@/app/components/ProductImage";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";

interface ProductDetailsProps {
    product: any;
}

export interface CartProductType {
    id: string;
    name: string;
    description: string;
    brand: string;
    category: string;
    selectedImg: selectedImgType;
    quantity: number;
    price: number;
}

interface selectedImgType {
    color: string;
    colorCode: string;
    image: string;
}

const Horizontal = () => {
    return <hr className="w-[40%] my-2"></hr>;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductsToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartProductType | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (product) {
            setCartProduct({
                id: product._id,
                name: product.name,
                description: product.description,
                brand: product.brand,
                category: product.category,
                selectedImg: { ...product.images[0] },
                quantity: 1,
                price: product.price,
            });
        }
    }, [product]);

    useEffect(() => {
        setIsProductInCart(false);

        if (cartProducts && product) {
            const existingIndex = cartProducts.findIndex((item) => item.id === product._id);

            if (existingIndex > -1) {
                setIsProductInCart(true);
            }
        }
    }, [cartProducts, product]);

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct) {
            setCartProduct((prev) => ({
                ...prev!,
                quantity: prev!.quantity + 1,
            }));
        }
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct && cartProduct.quantity > 1) {
            setCartProduct((prev) => ({
                ...prev!,
                quantity: prev!.quantity - 1,
            }));
        }
    }, [cartProduct]);

    const handleAddToCart = () => {
        if (cartProduct) {
            handleAddProductsToCart(cartProduct);
        }
    };

    const handleWhatsAppOrder = () => {
        if (cartProduct) {
            const message = `Hello, I would like to order the following product:
            \nName: ${cartProduct.name}
            \nDescription: ${cartProduct.description}
            \nBrand: ${cartProduct.brand}
            \nCategory: ${cartProduct.category}
            \nQuantity: ${cartProduct.quantity}
            \nPrice: $${cartProduct.price}`;
            
            const encodedMessage = encodeURIComponent(message);
            window.location.href = `https://wa.me/+254740719423?text=${encodedMessage}`;
        }
    };

    if (!product || !cartProduct) {
        return <div>Loading...</div>;
    }

    const productRating =
        product.reviews.length > 0
            ? product.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) /
              product.reviews.length
            : 0;

    return (
        <div className="grid mt-28 grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} />
            <div className="gap-1 flex flex-col text-slate-500 text-sm">
                <h1 className="text-3xl font-medium text-slate-700">{product.name}</h1>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify">{product.description}</div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORY:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND:</span> {product.brand}
                </div>
                <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                    {product.inStock ? "In stock" : "out of stock"}
                </div>
                <Horizontal />
                {isProductInCart ? (
                    <>
                        <p className="mb-2 text-slate-500 flex items-center gap-1">
                            <MdCheckCircle size={20} className="text-teal-400" />
                            <span>Product Added to Cart</span>
                        </p>
                        <div className="max-w-[300px]">
                            <Button
                                label="View cart"
                                outline
                                onClick={() => {
                                    router.push("/cart");
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <SetQuantity
                            cartProduct={cartProduct}
                            handleQtyIncrease={handleQtyIncrease}
                            handleQtyDecrease={handleQtyDecrease}
                        />
                        <Horizontal />
                        <div className="max-w-[300px] cursor-pointer mb-2">
                            <Button label="Add To Cart" onClick={handleAddToCart} />
                        </div>
                        <div className="max-w-[300px] cursor-pointer">
                        <Button label="Order via WhatsApp" onClick={handleWhatsAppOrder} 
                        custom="bg-green-500 hover:bg-green-600 text-white"/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;