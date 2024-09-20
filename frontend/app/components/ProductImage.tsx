import Image from "next/image";
import { CartProductType } from "../product/[id]/ProductDetails";

interface ProductImageProps {
    cartProduct: CartProductType,
}

const ProductImage: React.FC<ProductImageProps> = ({ cartProduct }) => {
    return ( 
        <div className="h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] gap-2 grid grid-cols-6">
            <div className="col-span-6 aspect-square relative">
                <Image src={cartProduct.selectedImg.image} alt={cartProduct.name} fill className="w-full object-contain h-full" />
            </div>
        </div>
     );
}
 
export default ProductImage;
