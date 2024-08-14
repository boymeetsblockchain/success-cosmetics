"use client";
import React, { useState } from "react";
import { work, great } from "@/font";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Folders, LogOut, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import useCartStore from "@/store/cart";


export const Navbar = () => {
  const { data: session, status } = useSession();
  const { cartItems } = useCartStore();
  const cartCount = cartItems.length;
  const onSignOut = () => {
    toast.success("Successfully Logged out");
    signOut();
  };

  return (
    <nav className={cn("sticky top-0 left-0 right-0 z-50 bg-white shadow", work.className)}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex flex-shrink-0 items-center">
            <h1 className={cn("md:text-2xl text-lg font-bold", great.className)}>Success Cosmetics</h1>
          </Link>
          <div className="flex items-center space-x-4">
            {status === "authenticated" ? (
              <>
                <div className="hidden md:flex items-center gap-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-x-3">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SI</AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-xs md:text-sm">Hi, {session?.user?.name}</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white">
                      <DropdownMenuItem className="flex items-center cursor-pointer gap-x-3" onClick={onSignOut}>
                        <LogOut />
                        <span className="text-sm font-medium">Sign Out</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-x-3">
                        <Folders />
                        <Link href={'/orders/orderlist'} className="text-sm font-medium">Orders</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href={'/cart'} className="relative inline-block">
                    <ShoppingCart size={24} className="text-gray-800" />
                    {cartCount > 0 && (
                      <small className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-barbie-pink text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                        {cartCount}
                      </small>
                    )}
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link href={'/admin'} className="bg-barbie-pink text-white py-2 px-3 hover:bg-white hover:text-barbie-pink shadow-md border-barbie-pink border">
                      Admin Panel
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-x-3">
                <Link href={'/register'} className="text-sm font-medium hover:text-barbie-pink">Register</Link>
                <Link href={'/login'} className="text-sm font-medium hover:text-barbie-pink">Login</Link>
                <Link href={'/cart'} className="relative inline-block">
                  <ShoppingCart size={24} className="text-gray-800" />
                  {cartCount > 0 && (
                    <small className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-barbie-pink text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                      {cartCount}
                    </small>
                  )}
                </Link>
              </div>
            )}
            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-x-4 px-2">
      
              {status === "authenticated" && (
        <div className="flex  md:hidden bg-white ">
          <Link href="/profile" className="flex items-center gap-x-3 px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        
            <p className="font-medium hidden text-xs">Hi, {session?.user?.name}</p>
          </Link>
          <Link href="/orders/orderlist" className="flex items-center text-xs gap-x-3 px-3 py-2  font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            <Folders className="hidden md:block" />
            Orders
          </Link>
          <div  className="flex items-center text-xs gap-x-3 px-3 py-2 text-nowrap font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
           onClick={onSignOut}>
            <LogOut  className="hidden md:block"/> Sign Out
          </div>
          {session.user.role === "ADMIN" && (
            <Link href={'/admin'} className="bg-barbie-pink hidden text-white  py-2 px-3 m-3 hover:bg-white hover:text-barbie-pink shadow-md border-barbie-pink border text-center">
              Admin Panel
            </Link>
          )}
        </div>
      )}
      {status !== "authenticated" && (
        <div className="flex  md:hidden bg-white ">
          <Link href={'/register'} className="text-sm font-medium px-3 py-2 hover:text-barbie-pink">Register</Link>
          <Link href={'/login'} className="text-sm font-medium px-3 py-2 hover:text-barbie-pink">Login</Link>
        </div>
      )}
        <Link href={'/cart'} className="relative inline-block">
                <ShoppingCart size={24} className="text-gray-800" />
                {cartCount > 0 && (
                  <small className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-barbie-pink text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </small>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
