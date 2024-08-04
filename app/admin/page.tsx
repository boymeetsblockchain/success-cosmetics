import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

async function page () {
  
    
  return (
    <div className=" max-w-6xl mx-auto px-4 h-screen py-8">
        <h1 className="text-center mb-4">Welcome to the Admin </h1>
        <div className="flex space-x-4 items-center justify-center">
            <Button className="bg-barbie-pink text-white hover:text-white hover:bg-barbie-pink">
               <Link href={'/admin/products'}>
                View Products
               </Link>
            </Button>
            <Button className="bg-barbie-pink text-white hover:text-white hover:bg-barbie-pink">
               <Link href={'/admin/addproduct'}>
                Add Products
               </Link>
            </Button>
            <Button className="bg-barbie-pink text-white hover:text-white hover:bg-barbie-pink">
               <Link href={'/admin/users'}>
                 View Users
               </Link>
            </Button>
            <Button className="bg-barbie-pink text-white hover:text-white hover:bg-barbie-pink">
              <Link href={'/admin/orders'}>
              View Orders
              </Link>
            </Button>
        </div>
    </div>
  )
}
export default page