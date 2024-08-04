"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductTypes } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { work } from "@/font";
import { Button } from "@/components/ui/button";
import { getSingleProductById } from "@/actions/product";
import useCartStore from "@/store/cart";
import toast from "react-hot-toast";


const ProductPage = () => {
  const { addItemToCart } = useCartStore();
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const { id } = useParams();
  
  let productId: string;
  if (Array.isArray(id)) {
    productId = id[0]; // Extract the first element from the array
  } else {
    productId = id;
  }
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const productById = await getSingleProductById(productId);
        setProduct(productById);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const onAddToCart = () => {
    addItemToCart({ ...product, quantity: 1 });
    toast.success("Added to cart");
  };

  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-7xl gap-5 justify-between px-4 py-20 sm:px-6 lg:px-8">
      <div className="images flex gap-x-10 flex-1">
        <div className="flex-col items-center gap-y-4 hidden md:flex">
          <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
            {product.imageUrl && <Image src={product.imageUrl} width={150} height={70} alt={product.name} />}
          </div>
          <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
            {product.imageUrl && <Image src={product.imageUrl} width={150} height={70} alt={product.name} />}
          </div>
        </div>
        <div>
          <div className="min-h-[100px] min-w-[200px] w-auto h-auto border flex items-center justify-center shadow-lg shadow-black/20 py-4">
            {product.imageUrl && <Image src={product.imageUrl} width={500} height={400} alt={product.name} />}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-y-3">
        <h1 className={cn("text-3xl md:text-4xl font-medium text-wrap", work.className)}>{product.name}</h1>
        <h1 className="text-lg text-wrap text-justify">{product.description}</h1>
        <p className="text-green-600 mt-1 font-bold">₦{product.price}</p>
        <small className={cn("text-green-400 text-xs", work.className)}>Available</small>
        <Button 
          onClick={onAddToCart}
          className="mt-4 bg-barbie-pink text-white w-[200px] border transition-colors duration-300 ease-in-out hover:bg-white hover:text-barbie-pink hover:border-barbie-pink"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
