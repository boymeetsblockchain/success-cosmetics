import Link from "next/link";
import { CartProduct } from "@/types";
import useCartStore from "@/store/cart";
import { Button } from "./ui/button";

const getTotal = (cartItems: CartProduct[]) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalQuantity += item.quantity!;
    totalPrice += item.price! * item.quantity!;
  });
  return { totalPrice, totalQuantity };
};

const OrderValue = () => {
  const { cartItems } = useCartStore();

  const { totalQuantity: quantity, totalPrice: price } = getTotal(cartItems);

  return (
    <div className="p-6  w-full mx-auto">
      <div className="text-center mb-5">
        <h3 className="text-xl ">
          Total Quantity: <span className="font-bold ">{quantity}</span>
        </h3>
        <h3 className="text-xl  mt-3">
          Total Price:{" "}
          <span className="font-bold ">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "NGN",
            }).format(price)}
          </span>
        </h3>
      </div>

      <div className="flex justify-center ">
        <Link href="/order/checkout">
          <Button className="text-xl font-bold text-barbie-pink hover:bg-barbie-pink hover:text-white bg-white transition-colors duration-300 rounded-lg px-8 py-3">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderValue;
