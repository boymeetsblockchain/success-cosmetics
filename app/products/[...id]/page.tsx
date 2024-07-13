"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Product } from "@/types";
import products from "@/data/products.json";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { work } from "@/font";
import { Button } from "@/components/ui/button";

function getProductById(id: number): Product | undefined {
  return products.find((product: Product) => product.id === id);
}

function ProductPage() {
  const { id } = useParams();
  let productId: number;

  if (Array.isArray(id)) {
    productId = parseInt(id[0]);
  } else {
    productId = parseInt(id);
  }

  const product = getProductById(productId);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-7xl gap-5 justify-between px-4 py-20 sm:px-6 lg:px-8">
      <div className="images flex gap-x-10 flex-1">
        <div className="flex-col items-center gap-y-4 hidden md:flex">
          <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
            <Image src={`/${product.src}`} width={150} height={70} alt={product.name} />
          </div>
          <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
            <Image src={`/${product.src}`} width={150} height={70} alt={product.name} />
          </div>
        </div>
        <div>
          <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
            <Image src={`/${product.src}`} width={500} height={400} alt={product.name} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-y-3">
        <h1 className={cn("text-3xl md:text-4xl font-medium text text-wrap", work.className)}>{product.name}</h1>
        <h1 className={cn("text-lg text text-wrap text-justify")}>{product.description}</h1>
        <p className="text-green-600 mt-1 font-bold">₦{product.price}</p>
        <small className={cn("text-green-400 text-xs", work.className)}>Available</small>
        <div className="flex items-center gap-2 mt-4">
          <Button onClick={handleDecrement} className="bg-gray-200 text-gray-800 hover:bg-destructive hover:text-white px-4">-</Button>
          <span className="text-xl">{quantity}</span>
          <Button onClick={handleIncrement} className="bg-gray-200 text-gray-800 hover:bg-emerald-600 hover:text-white px-4">+</Button>
        </div>
        <Button className="mt-4 bg-barbie-pink text-white w-[200px] border transition-colors duration-300 ease-in-out hover:bg-white hover:text-barbie-pink hover:border-barbie-pink">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductPage;
