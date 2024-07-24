"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleProductById } from "@/actions/product";
import { ProductTypes } from "@/types";
import { Loader } from "@/components/loader";
import Image from "next/image";
import { work } from "@/font";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteSingleProduct } from "@/actions/product";

const AdminSingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const deleteProduct=async(productId:string)=>{ 
    await deleteSingleProduct(productId)
   }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id === "string") {
          const fetchedProduct = await getSingleProductById(id);
          setProduct(fetchedProduct);
        } else {
          throw new Error("Invalid product ID");
        }
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return  <Loader loading={loading}/>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-7xl gap-5 justify-between px-4 py-20 sm:px-6 lg:px-8">
    <div className="images flex gap-x-10 flex-1">
      <div className="flex-col items-center gap-y-4 hidden md:flex">
        <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
        {
          product.imageUrl && (
              <Image src={product.imageUrl} width={150} height={70} alt={product.name} />
          )
        }
        </div>
        <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
        {
          product.imageUrl && (
              <Image src={product.imageUrl} width={150} height={70} alt={product.name} />
          )
        }
        </div>
      </div>
      <div>
        <div className="min-h-[100px] min-w-[200px] border flex items-center justify-center shadow-lg shadow-black/20 py-4">
        {
          product.imageUrl && (
              <Image src={product.imageUrl} width={500} height={400} alt={product.name} />
          )
        }
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col items-start gap-y-3">
      <h1 className={cn("text-3xl md:text-4xl font-medium text text-wrap", work.className)}>{product.name}</h1>
      <h1 className={cn("text-lg text text-wrap text-justify")}>{product.description}</h1>
      <p className="text-green-600 mt-1 font-bold">₦{product.price}</p>
      <small className={cn("text-green-400 text-xs", work.className)}>Available</small>
      <div className="flex items-center gap-2 mt-4">
      </div>
      <Button 
      onClick={()=>deleteProduct(product.id)}
      className="mt-4 bg-red-500 text-white w-[200px] border transition-colors duration-300 ease-in-out hover:bg-white hover:text-red-500 ">
        Delete Product
      </Button>
    </div>
  </div>
  );
};

export default AdminSingleProduct;
