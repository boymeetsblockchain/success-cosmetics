import Link from "next/link";
import { CartProduct } from "@/types";
import useCartStore from "@/store/cart";
import { Button } from "./ui/button";
import useCheckoutStore from "@/store/checkout";
import { useRouter } from "next/navigation";


const OrderValue = () => {
  const router = useRouter()
  const getTotal = (cartItems: CartProduct[]) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity!;
      totalPrice += item.price! * item.quantity!;
    });
    return { totalPrice, totalQuantity };
  };
  const {}= useCheckoutStore()
  const { cartItems } = useCartStore();

  const { totalQuantity: quantity, totalPrice: price } = getTotal(cartItems);

  const setCartPrice = useCheckoutStore((state) => state.setCartPrice);

  const handleCheckout = () => {
    setCartPrice(price);
    router.push('/orders/checkout')
  };

  return (
    <div className="p-6  w-full mx-auto">
      <div className="text-center mb-5">
        <h3 className="text-sm md:text-lg ">
          Total Quantity: <span className="font-bold ">{quantity}</span>
        </h3>
        <h3 className="text-sm md:text-lg mt-3">
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
  
          <Button
            onClick={handleCheckout}
            className="text-sm md:text-lg font-bold text-barbie-pink hover:bg-barbie-pink hover:text-white bg-white transition-colors duration-300 rounded-lg px-8 py-3"
          >
            Checkout
          </Button>
        
      </div>
    </div>
  );
};

export default OrderValue;
