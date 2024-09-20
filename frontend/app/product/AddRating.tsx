"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import { Rating } from "@mui/material";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { Product } from '@/Types'; 

interface AddRatingProps {
  product: Product; 
}

const AddRating: React.FC<AddRatingProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0,
    }
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error('No rating selected');
    }

    const ratingData = {
      ...data,
      productId: product._id,
    };

    try {
      await axios.post('/api/rating', ratingData);
      toast.success('Rating submitted');
      router.refresh();
      reset();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue('rating', newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label="Rate Product"
        onClick={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AddRating;
