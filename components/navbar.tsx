import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { LogOut, SearchIcon, ShoppingCart, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  
export const Navbar = () => {
    return (
        <nav className="bg-white shadow">
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex flex-shrink-0 items-center">
                        <Image src="/logo.jpg" height={30} width={70} alt="logo" />
                    </Link>
                    <div className="relative flex items-center">
                        <Input className="pl-10 pr-4 py-2 border rounded-lg" placeholder="Search..." />
                        <div className="absolute left-2">
                            <SearchIcon className="h-5 w-5 text-gray-500" />
                        </div>
                    </div>
                    <div className=" flex items-center gap-x-4">
                    <DropdownMenu>
  <DropdownMenuTrigger className="flex items-center gap-x-3">
  <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
  
</Avatar>
<p className="font-medium text-sm">Hi, Success</p>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem className="flex items-center gap-x-3 "> <User2/> <span className="text-sm font-medium">
    My Profile</span></DropdownMenuItem>
    <DropdownMenuItem className="flex items-center gap-x-3"> <LogOut/> <span className="text-sm font-medium">
    SignOut</span></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
<div>
    <ShoppingCart size={24}/>
</div>
</div>

                </div>
            </div>
        </nav>
    );
};
