"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import NullData from "@/app/components/NullData";
import AddRating from "../AddRating";
import Loader from "@/app/components/Loader";
import axios from "axios";
import type { Product } from "@/Types";

const ProductPage = () => {
  const { id } = useParams(); 

  // ✅ Hooks should be at the top level
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Product ID:", id);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Invalid Product ID");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle invalid product ID before rendering
  if (!id) return <NullData title="Invalid Product ID" />;
  if (loading) return <Loader />;
  if (error || !product) return <NullData title={error || "Product not found"} />;

  return (
    <Container>
      <div className="flex flex-col mt-8 gap-4">
        <ProductDetails product={product} />
      </div>
      <div className="flex flex-col mt-8 gap-4">
        <AddRating product={product} />
        <ListRating product={product} />
      </div>
    </Container>
  );
};

export default ProductPage;
