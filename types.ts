// types.ts
export interface Product {
    id: number;
    src: string;
    name: string;
    price: number;
    description: string;
    quantity?:number
  }
  

export interface ProductTypes{
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category?:string;
  quantity?: number;
  imageUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}


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