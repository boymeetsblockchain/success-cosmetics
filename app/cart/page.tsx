"use client"
import { useState, useEffect } from "react";
import { Product } from "@/types";
import products from "@/data/products.json";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>(products.slice(0, 2));
  const [totalPrice, setTotalPrice] = useState<number>(0);

 

  const handleIncrement = (id: number) => {
    setCartProducts(cartProducts.map(product =>
      product.id === id ? { ...product, quantity: (product.quantity || 1) + 1 } : product
    ));
  };

  const handleDecrement = (id: number) => {
    setCartProducts(cartProducts.map(product =>
      product.id === id ? { ...product, quantity: (product.quantity || 1) - 1 } : product
    ));
  };

  const handleRemove = (id: number) => {
    setCartProducts(cartProducts.filter(product => product.id !== id));
  };

  const calculateTotalPrice = () => {
    const total = cartProducts.reduce((sum, product) => {
      return sum + (product.price * (product.quantity || 1));
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartProducts]);

  return (
    <div className="my-10 px-4 md:px-6 lg:px-8 flex flex-col items-center">
      <h1 className="my-10 text-4xl font-bold">Your Cart</h1>
{
    cartProducts.length === 0 ? (
       <>
        <h1 className="my-10 text-3xl font-medium">Cart is Empty</h1>
          <Button className="bg-barbie-pink text-white font-medium rounded-none w-[200px] hover:text-barbie-pink hover:bg-white border shadow-md shadow-black/30">
            <Link href={'/products'}>CONTINUE SHOPPING</Link>
          </Button>
       </>

    ) :(
        <div className="cart w-full max-w-4xl">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Actions</th>
              <th className="border border-gray-300 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border border-gray-300 p-2">
                  <Image src={`/${product.src}`} width={50} height={50} alt={product.name} />
                </td>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">₦{product.price}</td>
                <td className="border border-gray-300 p-2">
                  <div className="flex items-center justify-center">
                    <Button onClick={() => handleDecrement(product.id)} className="bg-gray-200 text-gray-800 px-2">-</Button>
                    <span className="mx-2">{product.quantity || 1}</span>
                    <Button onClick={() => handleIncrement(product.id)} className="bg-gray-200 text-gray-800 px-2">+</Button>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <Button onClick={() => handleRemove(product.id)} className="bg-red-500 text-white px-2">Remove</Button>
                </td>
                <td className="border border-gray-300 p-2">₦{product.price * (product.quantity || 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <Button className="text-lg font-bold flex gap-x-4" >
            <Link href={'/checkout'}>
            Checkout: <span> ₦{totalPrice}</span></Link>
          </Button>
        </div>
      </div>
    )
}
    </div>
  );
};

export default CartPage;
