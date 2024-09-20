import mongoose, { Document, Schema } from 'mongoose';

interface Image {
  url: string;
  public_id: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  images: Image[];
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
});

export const Product = mongoose.model<IProduct>('Product', productSchema);