"use client";

import { useEffect, useState,} from "react";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import axios from "axios";
import { Product } from "@/Types";
import Loader from "./components/Loader";


const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        console.log("Products:", response.data); 
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Shuffle products algorithm
  function shuffleArray(array: Product[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {shuffledProducts.map((product: Product, index: number) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
      </Container>
    </div>
  );
};

export default HomePage;
