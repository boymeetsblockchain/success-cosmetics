"use client"
import { login } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
    
        const response = await login(formData);
    
        if (response?.error) {
          setError(response.error);
        } else {
          setError(null);
          router.push("/");
        }
      };
    
    return ( 
        <div className="my-10 px-4 md:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full md:w-[500px] p-6 h-auto shadow-lg shadow-black/10 bg-white rounded-lg">
            <h1 className="my-4 text-center font-medium text-3xl">Welcome Back!</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="text-red-500">{error}</div>}
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
            </div>
        </div>
    );
}
 
export default LoginPage;
