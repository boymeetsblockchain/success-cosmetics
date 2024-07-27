import Image from "next/image";
import useCartStore from "@/store/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemCardProps {
  name: string;
  price: number;
  id: string;
  imageUrl: string | null;
  quantity: number;
}

interface CardProductProps {
  product: CartItemCardProps;
}

const CartItemCard = ({ product }: CardProductProps) => {
  const { increaseQuantity, decreaseQuantity, removeItemFromCart } = useCartStore();

  const onIncreaseQuantity = (productId: string) => {
    increaseQuantity(productId);
  };

  const onDecreaseQuantity = (productId: string) => {
    decreaseQuantity(productId);
  };

  const onRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };

  return (
    <div className="flex flex-col w-full  p-4 rounded-md shadow-lg bg-white mb-4">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="w-1/4">
              <Image
                src={product.imageUrl || "/default-image.png"}
                alt="Product image"
                width={100}
                height={100}
                className="rounded-md"
              />
            </td>
            <td className="w-1/2 text-center">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-green-600 font-medium text-lg mt-2">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "NGN",
                }).format(product.price * product.quantity)}
              </p>
              <p className="text-gray-700 font-medium mt-2">
                Quantity: {product.quantity}
              </p>
            </td>
            <td className="w-1/4 text-center">
              <div className="flex justify-center items-center gap-3">
                <button
                  onClick={() => onIncreaseQuantity(product.id)}
                  title="Increase quantity"
                  className="bg-barbie-pink p-2 text-white rounded-full hover:bg-pink-600 transition-colors"
                >
                  <Plus />
                </button>
                <button
                  onClick={() => onDecreaseQuantity(product.id)}
                  title="Decrease quantity"
                  className="bg-barbie-pink p-2 text-white rounded-full hover:bg-pink-600 transition-colors"
                >
                  <Minus />
                </button>
                <button
                  onClick={() => onRemoveItem(product.id)}
                  title="Remove item from cart"
                  className="bg-red-600 p-2 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <Trash2 />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartItemCard;
