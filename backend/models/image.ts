import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  filename: string;
  contentType: string;
  imageData: Buffer;
}

const imageSchema = new Schema<IImage>({
  filename: String,
  contentType: String,
  imageData: Buffer
});

export const Image = mongoose.model<IImage>('Image', imageSchema);