import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartPrice: number;
  shippingPrice: number;
  shippingMethod: string;
  setCartPrice: (price: number) => void;
  setShippingPrice: (price: number) => void;
  setShippingMethod: (method: string) => void;
}

const useCheckoutStore = create(
  persist<CartState>(
    (set) => ({
      cartPrice: 0,
      shippingPrice: 0,
      shippingMethod: "",
      setCartPrice: (price) => set({ cartPrice: price }),
      setShippingPrice: (price) => set({ shippingPrice: price }),
      setShippingMethod: (method) => set({ shippingMethod: method }),
    }),
    {
      name: "checkout-storage", 
    }
  )
);

export default useCheckoutStore;
