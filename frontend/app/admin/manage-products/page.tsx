"use client";
import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import { useCallback, useEffect, useState, Suspense } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader";
import { Product } from "@/Types";

const ManageProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
                toast.error("An error occurred while fetching products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = useCallback((id: string) => {
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="pt-8">
            <Container>
                {/* Suspense wrapper for managing async components */}
                <Suspense fallback={<Loader/>}>
                    <ManageProductsClient products={products} onDelete={handleDeleteProduct} />
                </Suspense>
            </Container>
        </div>
    );
};

export default ManageProducts;
