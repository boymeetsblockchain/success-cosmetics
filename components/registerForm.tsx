"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { register } from "@/actions/user";
import toast from 'react-hot-toast'
import { AlertCircle } from "lucide-react";
function RegisterForm() {
  
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    async function ClientAction(formData: FormData) {
        const result = await register(formData);
        if (result?.error) {
            setErrorMessage(result.error);
        } else {
            router.push("/login");
            toast.success("User successfully registered");
        }
    }

    return (
        <form action={ClientAction} className="space-y-6">
      {errorMessage && <div className="text-destructive flex items-center gap-x-3 text-sm">
        <AlertCircle/>
        {errorMessage}</div>}

        <div>
            <Label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-700">Full Name</Label>
            <Input
                id="email" 
                type="text" 
                name='fullname'
                className=" focus:outline-none w-full py-5  px-4 rounded-none border-none"
                placeholder="Enter your Full name"
            />
        </div>
        <div>
            <Label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-700">Email</Label>
            <Input 
                id="email" 
                type="email"
                name='email' 
                className=" focus:outline-none w-full py-5  px-4 rounded-none border-none"
                placeholder="Enter your Email"
            />
        </div>
        <div>
            <Label htmlFor="password" className="block text-sm mb-2 font-medium text-gray-700">Password</Label>
            <Input 
                id="password" 
                type="password" 
                name='password'
                className=" focus:outline-none w-full py-5  px-4 rounded-none border-none"
                placeholder="Enter your Password"
            />
        </div>
          <span><Link className="my-2 text-sm text-barbie-pink"  href={'/login'}>
           Already have an Account?
          </Link> </span>
                <div className="">
            <Button
                type="submit"
                className="bg-barbie-pink text-white w-full  border border-transparent  transition-colors duration-300 ease-in-out hover:bg-white hover:text-barbie-pink hover:border-barbie-pink"
            >
                Sign Up
            </Button>
        </div>
    </form>
    );
}

export default RegisterForm;
