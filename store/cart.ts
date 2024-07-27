import { create } from "zustand";
import { CartProduct, ProductTypes } from "@/types";
import { persist } from "zustand/middleware";
interface CartState {
  cartItems: CartProduct[];
  addItemToCart: (item: ProductTypes) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
}

const useCartStore = create(persist<CartState>((set, get) => ({
  cartItems: [],
  addItemToCart: (item) => {
    const itemExists = get().cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    const transformedItem: CartProduct = {
      ...item,
      imageUrl: item.imageUrl ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsmLFxOdjMeHerVb9NAVwNtOeiviU920Htvg&s',  
      quantity: itemExists ? itemExists.quantity + 1 : 1
    };

    if (itemExists) {
      set({
        cartItems: get().cartItems.map(cartItem =>
          cartItem.id === item.id ? transformedItem : cartItem
        )
      });
    } else {
      set({
        cartItems: [...get().cartItems, transformedItem]
      });
    }
  },
  increaseQuantity: (productId :string) => {
    const itemExists = get().cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (itemExists) {
      if (typeof itemExists.quantity === "number") {
        itemExists.quantity++;
      }

      set({ cartItems: [...get().cartItems] });
    }
  },
  decreaseQuantity: (productId:string) => {
    const itemExists = get().cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (itemExists) {
      if (typeof itemExists.quantity === "number") {
        if (itemExists.quantity === 1) {
          const updatedCartItems = get().cartItems.filter(
            (item) => item.id !== productId
          );
          set({ cartItems: updatedCartItems });
        } else {
          itemExists.quantity--;
          set({ cartItems: [...get().cartItems] });
        }
      }
    }
  },
 
  removeItemFromCart: (productId) => {
    const itemExists = get().cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (itemExists) {
      if (typeof itemExists.quantity === "number") {
        const updatedCartItems = get().cartItems.filter(
          (item) => item.id !== productId
        );
        set({ cartItems: updatedCartItems });
      }
    }
  },
}),
{
  name: "cart-items",
}


))

export default useCartStore;
