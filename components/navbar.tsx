"use client";
import React, { useState } from "react";
import { work, great } from "@/font";
import Link from "next/link";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { Folders, LogOut, SearchIcon, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import useCartStore from "@/store/cart";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
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
            <div className="md:hidden flex items-center gap-x-4">
              <Link href={'/cart'} className="relative inline-block">
                <ShoppingCart size={24} className="text-gray-800" />
                {cartCount > 0 && (
                  <small className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-barbie-pink text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </small>
                )}
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-all duration-300"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-white shadow-lg z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <h1 className={cn("text-lg md:text-2xl font-bold", great.className)}>Success Cosmetics</h1>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-all duration-300"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-4 py-3 space-y-3">
            {status === "authenticated" ? (
              <>
                <Link href="/profile" className="flex items-center gap-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SI</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-sm">Hi, {session?.user?.name}</p>
                </Link>
                <div className="flex flex-col space-y-2">
                  <p className="flex items-center gap-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 cursor-pointer" onClick={onSignOut}>
                    <LogOut /> Sign Out
                  </p>
                  <Link href={'/orders/orderlist'} className="flex items-center gap-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    <Folders /> Orders
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link href={'/admin'} className="bg-barbie-pink text-white py-2 px-3 hover:bg-white hover:text-barbie-pink shadow-md border-barbie-pink border">
                      Admin Panel
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link href={'/register'} className="text-sm font-medium hover:text-barbie-pink">Register</Link>
                <Link href={'/login'} className="text-sm font-medium hover:text-barbie-pink">Login</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
