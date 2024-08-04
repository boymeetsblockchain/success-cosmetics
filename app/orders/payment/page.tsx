"use client";
import useTotalPrice from "@/store/totalprice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Clipboard } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { createOrder } from "@/actions/order";
import useCartStore from "@/store/cart";
import { CartProduct } from "@/types";
import useCheckoutStore from "@/store/checkout";

const Payment = () => {
  const { total } = useTotalPrice();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const { clearCart, cartItems } = useCartStore();
  const { shippingMethod } = useCheckoutStore();
  const userId = session?.user.id;


  const createOrderDescription = (cartItems: CartProduct[], shippingMethod: string) => {
    let totalAmount = 0;
    let description = 'Order Details:\n\n';
  
    cartItems.forEach((item) => {
 
  
      description += `Product: ${item.name}\n`;

    });

    description += `Shipping Method: ${shippingMethod}\n\n`;
    return description;
  };
  
  const orderDescription = createOrderDescription(cartItems, shippingMethod);

  const handleConfirmPayment = async () => {
    if (!userId) {
      toast.error("User not logged in");
      return;
    }
    try {
      const order = await createOrder({ userId, totalAmount: total, description: orderDescription });
      clearCart();
      toast.success("Order Created");
      router.push(`/orders/confirmation/${order.id}`);
    } catch (error) {
      toast.error("Failed to create order");
      console.error("Error creating order:", error);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("2051740856");
      setCopied(true);
      toast.success("Account Number Copied");
      setTimeout(() => setCopied(false), 2000); 
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  };

  return (
    <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col w-full max-w-7xl items-center justify-center mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bank Transfer Payment</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Total Amount to Transfer:</h2>
        <p className="text-xl font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
          }).format(total)}
        </p>
      </div>
      <div className="mb-6 shadow-md py-3 px-2 rounded-md">
        <h2 className="text-lg font-semibold">Bank Account Details:</h2>
        <div className="flex items-center">
          <p className="text-lg">Account Name: Iyare Success Itohanmwosa</p>
        </div>
        <div className="flex items-center">
          <p className="text-lg">Account Number: 2051740856</p>
          <button
            onClick={handleCopyToClipboard}
            className="ml-2 text-barbie-pink hover:text-barbie-pink-dark"
            title="Copy to clipboard"
          >
            <Clipboard className="w-5 h-5" />
          </button>
          {copied && <span className="ml-2 text-green-500">Copied!</span>}
        </div>
        <p className="text-lg">Bank: Kuda</p>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Instructions:</h2>
        <ol className="list-decimal list-inside">
          <li>Make the transfer using the details provided above.</li>
          <li>
            Once the transfer is complete, click the confirm payment button
            below.
          </li>
          <li>
            We will verify your payment and update your order status
            accordingly.
          </li>
        </ol>
      </div>
      <Button
        onClick={handleConfirmPayment}
        className="text-sm md:text-lg font-bold text-barbie-pink hover:bg-barbie-pink hover:text-white bg-white transition-colors duration-300 rounded-lg px-8 py-3"
      >
        Confirm Payment
      </Button>
    </div>
  );
};

export default Payment;
