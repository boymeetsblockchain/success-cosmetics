"use client"

import CartItemCard from "@/components/CartItem";
import OrderValue from "@/components/OrderValue";
import useCartStore from "@/store/cart";
import Link from "next/link";

const CartPage = () => {
  const {cartItems}= useCartStore()

  if (cartItems && cartItems.length < 1) {
    return (
      <div className="h-72 flex flex-col items-center justify-center">
        <h2 className="text-3xl mt-10 mb-5 font-bold">Cart is Empty</h2>
        <Link
          href="/products"
          className="px-6 py-2 rounded-md text-white bg-barbie-pink"
        >
          Shop
        </Link>
      </div>
    );
  }

  return ( 
    <div className="p-4">
    <div className="">
      {cartItems?.map((item) => (
        <CartItemCard product={item} key={item.id} />
      ))}
      <div className=" bg-barbie-pink text-white flex-none w-full  ">
        <OrderValue />
      </div>
    </div> 
    </div>
   );
}
 
export default CartPage;