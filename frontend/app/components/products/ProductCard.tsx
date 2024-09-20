"use client";
import Image from 'next/image'; 
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const router = useRouter();
    
    // Get images from Cloudinary
    const getCloudinaryUrl = (public_id: string) => {
        return `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}/${public_id}`;
    };

    // Calculate product rating based on reviews
    const productRating = Array.isArray(data.reviews) && data.reviews.length > 0
        ? data.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) / data.reviews.length
        : 0;

    return (
        <div 
            onClick={() => router.push(`/product/${data.id}`)} 
            className="col-span-1 cursor-pointer p-4 rounded-lg shadow-sm transition hover:scale-105 hover:shadow-xl text-center text-sm"
        >
            <div className="flex-col flex w-full gap-1 items-center">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden relative w-full">
                    {data.images && data.images[0] ? (
                        <Image
                        src={getCloudinaryUrl(data.images[0].public_id)}
                        alt={data.name}
                        fill
                        sizes="(max-width: 640px) (max-width: 768px) (max-width: 1024px)"
                        className="object-contain"
                    />
                    ) : (
                        <p>No Image Available</p>
                    )}
                </div>

                {/* Product Name */}
                <div className="mt-4 font-medium">
                    {truncateText(data.name)}
                </div>

                {/* Product Rating */}
                <div>
                    <Rating value={productRating} readOnly />
                </div>

                {/* Number of Reviews */}
                <div className="text-gray-500">
                    {Array.isArray(data.reviews) ? `${data.reviews.length} reviews` : 'No reviews'}
                </div>

                {/* Product Price */}
                <div className="font-semibold text-gray-600">
                    {formatPrice(data.price)}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
