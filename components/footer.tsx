import { LocateIcon, MapPinIcon, PhoneCall } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Image from "next/image"

export const Footer =()=>{
    return (
        <footer className="bg-black text-white">
               <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 lg:px-8">
                  <div className=" flex flex-col  gap-y-4 gap-x-4 md:items-center md:flex-row-reverse justify-between">
                     <div className="flex space-y-3 flex-col">
                         <h1 className="text-lg text-left font-medium">SIGN UP FOR DISCOUNTS & UPDATES</h1>
                         <Input type="email" className="bg-gray-900 outline-none border-none  md:w-[600px] w-[400px] " placeholder="Enter your phone number or email address"/>
                         <Button className="bg-barbie-pink w-[200px]">
                            Subcribe
                         </Button>
                         <div className="text flex  gap-x-4">
                            <span className="underline text-sm">Return Policy</span>
                            <span className="underline text-sm">About Us</span>
                         </div>
                     </div>
                     <div className="flex space-y-3 flex-col">
                     <h1 className="text-lg text-left font-medium">CONTACT US</h1>
                     <span className="flex gap-x-3 text-20px"><PhoneCall/>08141889944</span>
                     <span className="flex gap-x-3 text-20px"><MapPinIcon/>No 81 adesuwa road by water resources junction, Benin City. Edo Nigeria. 300001</span>
                     <div>
                        <Image src={'/accepted.png'} width={150} height={20} alt="accepted"/>
                     </div>
                     </div>
                     <div>

                     </div>
                  </div>
               </div>

        </footer>
    )
}