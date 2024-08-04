"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import useCheckoutStore from "@/store/checkout";
import useTotalPrice from "@/store/totalprice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { shippingMethods } from "@/data/shippinmethod";

const ShippingOptions = () => {
  const { cartPrice, setShippingPrice, shippingPrice, setShippingMethod} = useCheckoutStore();
  const { setTotalPrice } = useTotalPrice();
  const [selectedMethod, setSelectedMethod] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (selectedMethod) {
      setTotalPrice(cartPrice + shippingPrice);
      setShippingMethod(selectedMethod)
    } else {
      setTotalPrice(cartPrice);
    }
  }, [cartPrice, shippingPrice, setTotalPrice, selectedMethod,setShippingMethod]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMethod = shippingMethods.find(
      (method) => method.method === e.target.value
    );
    if (selectedMethod) {
      setShippingPrice(selectedMethod.price);
      setSelectedMethod(selectedMethod.method);
    }
  };

  const onPayment = () => {
    if (!selectedMethod) {
      toast.error("Please select a shipping method");
    } else {
      router.push("/orders/payment");
    }
  };

  const totalPrice = selectedMethod ? cartPrice + shippingPrice : cartPrice;

  return (
    <div className="my-5 px-4 md:px-6 lg:px-8 flex flex-col w-full max-w-7xl items-center justify-center mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Select Shipping Method for{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN",
        }).format(cartPrice)}
      </h2>

      <form className="space-y-4 w-full max-w-4xl">
        {shippingMethods.map((method, index) => (
          <div key={index} className="flex items-center justify-between border-b-2">
            <div className="shipping-method  p-4 rounded-lg flex items-center gap-x-4 w-full">
              <Input
                type="radio"
                name="shippingMethod"
                value={method.method}
                checked={selectedMethod === method.method}
                onChange={handleChange}
                className="hidden"
                id={`radio-${index}`}
              />
              <label htmlFor={`radio-${index}`} className="relative flex items-center justify-center w-6 h-6 border border-gray-300 rounded-full cursor-pointer">
                <span className={`w-4 h-4 bg-barbie-pink rounded-full transition-transform transform ${selectedMethod === method.method ? 'scale-100' : 'scale-0'}`}></span>
              </label>
              <Label className="flex flex-col">
                <span className="text-sm font-medium">{method.method}</span>
                <span className="text-sm text-gray-500">{method.details}</span>
              </Label>
            </div>
            <div>
              <span className="text-sm text-gray-700">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "NGN",
                }).format(method.price)}
              </span>
            </div>
          </div>
        ))}
      </form>
      <div className="text-center mt-5">
        <h3 className="text-sm md:text-lg">
          Total Price:{" "}
          <span className="font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "NGN",
            }).format(totalPrice)}
          </span>
          {selectedMethod && ` for delivery at ${selectedMethod}`}
        </h3>
      </div>
      <Button
        onClick={onPayment}
        className="text-sm md:text-lg font-bold hover:text-barbie-pink hover:bg-white text-white bg-barbie-pink transition-colors duration-300 rounded-lg px-8 py-3"
      >
        Proceed to Payment
      </Button>
    </div>
  );
};

export default ShippingOptions;
