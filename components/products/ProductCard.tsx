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
  
interface ProductCardProps {
    src:string,
    name:string,
    price:number,
    id:number | string,
}


export const ProductCard = ({src,name,price,id}:ProductCardProps)=>{
  const router= useRouter()

  const viewProducts= (id: string| number)=>{
   router.push(`/products/${id}`)
  }
   return(
    <Card  className="w-[302px] flex items-center relative flex-col py-6 h-[500px] justify-center cursor-pointer " onClick={()=>viewProducts(id)}>
    <CardContent  >
      <div className="max-h-[350px]">
      <Image src={src} width={250} height={350} alt="products" className=" transition-all duration-300 ease-in-out hover:scale-105  "  />
      </div>
      <CardTitle className="flex items-start mt-2 gap-y-1 flex-col">
        <p>{name}</p>
        <p className="text-green-600 mt-1  font-bold">₦{price}</p>
      </CardTitle>
    </CardContent>

    <CardFooter>
    <Button className="bg-barbie-pink text-white w-[200px] border absolute bottom-4 right-10 transition-colors duration-300 ease-in-out hover:bg-white hover:text-barbie-pink hover:border-barbie-pink">
      Add to Cart
    </Button>
    </CardFooter>
  </Card>
  
    )
}