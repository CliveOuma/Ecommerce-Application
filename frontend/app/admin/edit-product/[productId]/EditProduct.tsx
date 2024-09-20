import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { useState } from 'react';
import { Product } from '@/Types';

interface ProductFormFields {
  name: string;
  price: string; // Price can be a string, then parsed into a number
  category: string;
  description: string;
}

interface EditProductProps {
  product: Product;
  onProductUpdated: (product: Product) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onProductUpdated }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormFields>({
    defaultValues: {
      name: product.name,
      price: product.price.toString(), 
      category: product.category,
      description: product.description,
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ProductFormFields> = async (data) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error('Authentication token is missing. Please log in.');
        throw new Error("No authentication token found");
      }
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}`, {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        onProductUpdated(response.data);
        toast.success('Product updated successfully');
        router.push('/admin/manage-product'); 
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Authentication token is invalid or expired. Please log in again.');
      } else {
        console.error("Error updating product:", error);
        toast.error('Failed to update product');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Edit Product" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
        />
        <Input
          id="category"
          label="Category"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <TextArea
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className="flex space-x-4">
          <Button label="Update Product" type="submit" disabled={isLoading} />
        </div>
      </form>
    </>
  );
};

export default EditProduct;
