"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CartClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
    const router = useRouter();

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            // Simulate an API call or some async operation
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect to the checkout page
            router.push('/checkout');
        } catch (error) {
            console.error("Checkout failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex mt-28 flex-col items-center text-center px-4">
                <div className="text-2xl font-semibold">
                    Your cart is empty
                </div>
                <div className="mt-4">
                    <Link href="/" className="text-red-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-28 px-4 md:px-8 lg:px-16">
            <Heading title="Shopping Cart" center />
            <section className="mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="bg-white shadow-lg border-t-[1.5px] border-slate-200 rounded-lg">
                            <div className="p-4 border-b border-gray-200">
                                <h5 className="text-lg font-semibold">Product List</h5>
                            </div>
                            <div className="p-4 grid gap-4">
                                {cartProducts.map((item) => (
                                    <ItemContent key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white shadow-lg rounded-lg p-4 border-t-[1.5px] border-slate-200">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-xl mb-3">Subtotal</span>
                                <span>{formatPrice(cartTotalAmount)}</span>
                            </div>
                            <p className="text-slate-600 text-sm my-5">
                                Taxes and shipping calculated at checkout
                            </p>
                            <Button label="Checkout" onClick={handleCheckout} isLoading={isLoading} />
                            <div className="mt-3">
                                <Button label="Clear Cart" onClick={handleClearCart} outline />
                            </div>
                            <Link href="/" className="text-orange-700 flex items-center gap-1 mt-4">
                                <MdArrowBack />
                                <span>Continue Shopping</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CartClient;
