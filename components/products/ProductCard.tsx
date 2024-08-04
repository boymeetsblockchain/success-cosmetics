"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
  } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import useCartStore from "@/store/cart"
import toast from "react-hot-toast"
  
interface ProductCardProps {
    src:string,
    name:string,
    price:number,
    id: string,
    quantity?: number
}


export const ProductCard = ({src,name,price,quantity,id}:ProductCardProps)=>{
  const router= useRouter() 
  const {addItemToCart,cartItems}= useCartStore()
  const onAddToCart = () => {
    addItemToCart({name,price,id, imageUrl:src});
    toast.success("Added to cart");
  };

  const viewProducts= (id: string| number)=>{
   router.push(`/products/${id}`)
  }
   return(
    <Card  className="w-[302px] flex items-center relative flex-col py-6 h-[500px] justify-center cursor-pointer ">
    <CardContent  >
      <div className="max-h-[350px]">
      <Image src={src} width={250} height={350} alt="products" className=" transition-all duration-300 ease-in-out hover:scale-105  "  onClick={()=>viewProducts(id)} />
      </div>
      <CardTitle className="flex items-start mt-2 gap-y-1 flex-col">
        <p className="text-sm md:text-lg">{name}</p>
        <p className="text-green-600 mt-1 text-sm md:text-lg font-bold">
        {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "NGN",
                }).format(price)}
        </p>
      </CardTitle>
    </CardContent>

    <CardFooter>
  {
    quantity == 0 ? (
      <h1 className="text-center  font-bold text-red-500">
        Out of Stock
     </h1>
    ):(   <Button 
      onClick={onAddToCart}
     className="bg-barbie-pink text-white w-[200px]  text-sm md:text-lg border absolute bottom-4 right-10 transition-colors duration-300 ease-in-out hover:bg-white hover:text-barbie-pink hover:border-barbie-pink">
       Add to Cart
     </Button>)
  }
    </CardFooter>
  </Card>
  
    )
}