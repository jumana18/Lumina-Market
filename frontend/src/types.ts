export interface Product {
  id: string;
  _id?: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  countInStock: number;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface UserInfo {
  user: User;
  token: string;
}

export interface Order {
  id: string;
  orderItems: any[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}
