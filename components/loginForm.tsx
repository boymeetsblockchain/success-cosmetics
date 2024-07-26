"use client"
import { login } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from 'react-hot-toast'
import { AlertCircle } from "lucide-react"
import { useState } from "react";
const LoginForm =()=>{
      
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");


    async function ClientAction(formData: FormData) {
        const result = await login(formData);
        if (result?.error) {
            setErrorMessage(result.error);
            toast.error(result.error);
        } else {
            router.push("/");
            toast.success("User successfully logged in");
        }
    }
 return(
    <form action={ClientAction} className="space-y-6">
            {errorMessage && <div className="text-destructive flex items-center gap-x-3 text-sm">
        <AlertCircle/>
        {errorMessage}</div>}
    <div>
            <Label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-700">Email</Label>
            <Input 
                id="email" 
                type="email" 
                name= "email"
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
        <div className="flex items-center justify-between">
        <span><Link className="my-2 text-sm text-barbie-pink"  href={'/register'}>
        Don&apos;t have an account ? 
          </Link> </span>
            <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                </a>
            </div>
        </div>
        <div className="">
            <Button
                type="submit"
                className="bg-barbie-pink text-white w-full  border border-transparent  transition-colors duration-300 ease-in-out hover:bg-white hover:text-barbie-pink hover:border-barbie-pink"
            >
            Login
            </Button>
        </div>
    </form>
 )
}

export default LoginForm