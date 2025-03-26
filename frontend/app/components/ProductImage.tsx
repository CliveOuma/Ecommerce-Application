import Image from "next/image";

interface ProductImageProps {
    cartProduct: any;
}

const ProductImage: React.FC<ProductImageProps> = ({ cartProduct }) => {

    return (
        <div className="w-full max-w-[400px]">
            <Image
                src={cartProduct?.selectedImg?.image}
                alt={cartProduct?.name || "Product Image"}
                width={400}
                height={400}
                className="object-cover rounded-lg"
            />
        </div>
    );
};

export default ProductImage;
