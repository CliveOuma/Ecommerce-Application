"use client"
import { formatPrice } from "@/utils/formatPrice";
import { CartProductType }  from "../product/[id]/ProductDetails"
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps{
    item: CartProductType,
}


const ItemContent: React.FC<ItemContentProps> = ({item}) => {

    const {handleRemoveProductFromCart,handleCartQtyDecrease, handleCartQtyIncrease } = useCart()

    return ( 
        <div className="grid text-xs md:text-sm gap-4 border-[1.5px]
        border-slate-200 py-4 items-center"> 
        <div className="justift-self-start flex gap-2 md:gap-4">
            <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.selectedImg.image} alt={item.name}
                        fill className="object-contain"/>
                    </div>
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`/product/${item.id}`}>
                    {truncateText(item.name)}
                </Link>
                <div className="w-[70px]">
                    <button className="underline text-slate-500"
                    onClick={() => 
                        handleRemoveProductFromCart(item)}>
                        Remove
                    </button>

                </div>
            </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-center">
            <SetQuantity cartCounter={true}
            cartProduct={item} handleQtyDecrease={() => {handleCartQtyDecrease(item)}} handleQtyIncrease={() =>
             {handleCartQtyIncrease(item)}}/>
        </div>
        <div className="justify-self-end font-semibold">
            {formatPrice(item.price * item.quantity)}
        </div>

        </div>
     );
}
 
export default ItemContent;