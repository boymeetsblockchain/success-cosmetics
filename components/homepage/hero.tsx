import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className={cn("relative h-[600px] bg-center bg-cover flex items-center flex-col gap-y-4 justify-center ")} style={{ backgroundImage: 'url("/hero1.jpg")' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center flex items-center flex-col gap-y-3 text-white">
        <h1 className="text-4xl md:text-7xl  font-bold">
          Welcome to Success Cosmetics
        </h1>
        <h2 className="text-lg  md:text-3xl font-normal">
          Any item not currently on the site is out of stock and undergoing restock
        </h2>
        <Button className="bg-barbie-pink text-white w-[200px] border border-transparent  transition-colors duration-300 ease-in-out hover:bg-white hover:text-barbie-pink hover:border-barbie-pink">
            <Link href={'/products'}>
            View Availabe Products
            </Link>
        </Button>
      </div>
    </div>
  );
};
