import mongoose, { Schema, Document } from 'mongoose';

interface Order extends Document {
  amount: number;
  status: 'complete' | 'pending' | 'cancelled';  // or other statuses
  createdAt: Date;
}

const orderSchema = new Schema<Order>({
  amount: { type: Number, required: true },
  status: { type: String, enum: ['complete', 'pending', 'cancelled'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<Order>('Order', orderSchema);
