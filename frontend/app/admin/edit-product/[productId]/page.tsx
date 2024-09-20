"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { Product } from '@/Types';
import EditProduct from './EditProduct';
import Loader from '@/app/components/Loader';
import AdminNav from '@/app/components/admin/AdminNav';
import Container from '@/app/components/Container';
import FormWrap from '@/app/components/FormWrap';

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
          console.log('Product fetched:', response.data); 
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product data:', error);
          setError('Failed to load product data.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }
  }, [id]);
  
  const handleProductUpdated = (updatedProduct: Product) => {
    router.push('/admin/manage-product');
  };

  const handleClose = () => {
    // Redirect to manage incidents page when closing the form
    router.push('/admin/manage-product');
  };

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>; 

  if (!product) return <p>No product data available.</p>; 

  return (
    <>
    <AdminNav/>
    <Container>
    <FormWrap>
      <EditProduct
        product={product} 
        onProductUpdated={handleProductUpdated} 
      />
    </FormWrap>
    </Container>
    </>
  );
};

export default EditProductPage;
