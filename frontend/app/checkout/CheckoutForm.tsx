"use client";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/useCart";
import { PaymentData } from "@/Types";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

const CheckoutForm = () => {
    const { cartTotalAmount } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("mpesa");
    const formattedPrice = formatPrice(cartTotalAmount);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();

    const stripe = useStripe();
    const elements = useElements();

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);

        try {
            const paymentData: PaymentData = {
                amount: cartTotalAmount,
                fullName: data.fullName,
                email: data.email,
                address: data.address,
                city: data.city,
                zipCode: data.zipCode,
                country: data.country,
            };

            if (paymentMethod === "mpesa" && data.phoneNumber) {
                paymentData.phoneNumber = data.phoneNumber;
            }

            if (paymentMethod === "stripe" && stripe && elements) {
                const cardElement = elements.getElement(CardElement);
                if (!cardElement) {
                    throw new Error("Card details missing");
                }

                const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
                    type: "card",
                    card: cardElement,
                    billing_details: {
                        name: data.fullName,
                        email: data.email,
                        address: {
                            line1: data.address,
                            city: data.city,
                            postal_code: data.zipCode,
                            country: data.country,
                        },
                    },
                });

                if (error) {
                    throw new Error(error.message);
                }

                paymentData.stripePaymentMethodId = stripePaymentMethod?.id;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/${paymentMethod}`, paymentData);

            if (response.data.success) {
                toast.success("Payment successful!");
            } else {
                throw new Error("Payment processing failed");
            }

        } catch (error: any) {
            toast.error(error.message || "Payment failed.");
            console.error("Payment failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-20 px-4">
                <h2 className="font-semibold text-center text-xl mb-6">Enter your information to complete checkout</h2>

                <h3 className="font-semibold mb-3 pt-3">Billing Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <Input
                        id="fullName"
                        label="Full Name"
                        type="text"
                        required
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        required
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="address"
                        label="Street Address"
                        type="text"
                        required
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="city"
                        label="City"
                        type="text"
                        required
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="zipCode"
                        label="Zip/Postal Code"
                        type="text"
                        required
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="country"
                        label="Country"
                        type="text"
                        required
                        register={register}
                        errors={errors}
                    />
                </div>

                <h3 className="font-semibold mb-3 pt-3">Select Payment Method</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="mpesa"
                            checked={paymentMethod === "mpesa"}
                            onChange={() => setPaymentMethod("mpesa")}
                        />
                        <span className="ml-2">M-Pesa</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="stripe"
                            checked={paymentMethod === "stripe"}
                            onChange={() => setPaymentMethod("stripe")}
                        />
                        <span className="ml-2">Stripe</span>
                    </label>
                </div>

                {paymentMethod === "mpesa" && (
                    <Input
                        id="phoneNumber"
                        label="Phone Number"
                        type="text"
                        required
                        register={register}
                        errors={errors}
                    />
                )}

                {paymentMethod === "stripe" && (
                    <>
                        <h2 className="font-semibold mb-3 text-center">Pay with Card</h2>
                        <div className="mb-4">
                            <CardElement />
                        </div>
                    </>
                )}

                <div className="py-4 text-center text-slate-800 text-xl font-bold">
                    Total: {formattedPrice}
                </div>

                <Button label={isLoading ? "Processing..." : "Pay now"} disabled={isLoading} />
            </div>
        </form>
    );
};

const CheckoutPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default CheckoutPage;
