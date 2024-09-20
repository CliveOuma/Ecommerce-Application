
export type safeUser = {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
  orders?: Order[];
};

export interface User {
  id: string;
  name: string;
  email: string;
  orders: Order[];
}

export type Product = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
  images?:string[];
  reviews: Review[]; 
};


export type Order = {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  amount: number;
  currency: string;
  status: string;
  deliveryStatus: string | null;
  createdAt: Date;
  products: ProductOrder[];
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  } | null;
};

export type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

// Defines the structure of a product in an order
export interface ProductOrder {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  quantity: number;
  price: number;
}

export interface PaymentData {
  amount: number;
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber?: string; // Optional field for Mpesa
  stripePaymentMethodId?: string
}
