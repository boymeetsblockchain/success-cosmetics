export interface ProductTypes{
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category?:string;
  quantity?: number;
  imageUrl?: string | null
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCardProps {
  imageUrl:string| null ;
  name:string,
  price:number,
  id: string,
  quantity?: number;
}

export type CartProduct = ProductCardProps & {
  quantity: number;
};

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: UserRole | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'USER' | 'ADMIN' | null;


export interface OrderProps {
  id: string;
  userId: string;
  totalAmount: number;
  description:string;
  isDelivered:Boolean
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}