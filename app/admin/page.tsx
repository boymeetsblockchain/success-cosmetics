import { Button } from "@/components/ui/button"
import Link from "next/link"

function page() {
    
  return (
    <div className=" max-w-6xl mx-auto px-4 h-screen py-8">
        <h1>Welcome to the Admin </h1>
        <div className="flex space-x-4 items-center justify-center">
            <Button className="bg-barbie-pink text-white hover:text-white hover:bg-barbie-pink">
               <Link href={'/admin/products'}>
                View Produxts
               </Link>
            </Button>
            <Button className="bg-barbie-pink text-white hover:text-white hover:bg-barbie-pink">
               <Link href={'/admin/addproduct'}>
                Add Produxts
               </Link>
            </Button>
            <Button className="bg-barbie-pink text-white hover:text-white hover:bg-barbie-pink">
               View Orders
            </Button>
        </div>
    </div>
  )
}
export default page