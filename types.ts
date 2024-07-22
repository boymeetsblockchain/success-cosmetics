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
  description: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}