"use client";

import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import Avatar from "@/app/components/Avatar";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  // Check if product and product.reviews are valid
  if (!product || !Array.isArray(product.reviews) || product.reviews.length === 0) {
    return null;
  }

  return (
    <div>
      <Heading title="Product Review" />
      <div className="text-sm mt-2 ">
        {product.reviews.map((review: any) => (
          <div key={review.id} className="max-w-[300px]">
            <div className="flex gap-2 items-center">
              <Avatar src={review.user?.image || ""} />
              <div className="font-semibold">{review.user?.name || "Anonymous"}</div>
              <div className="font-light">
                {moment(review.createdAt).fromNow()}
              </div>
            </div>
            <div className="mt-2">
              <Rating value={review.rating} readOnly />
              <div className="ml-2">{review.comment}</div>
              <hr className="mt-4 mb-4"></hr>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRating;
