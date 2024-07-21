import { register } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const RegisterPage = () => {
    return ( 
        <div className="my-10 px-4 md:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full md:w-[500px] p-6 h-auto shadow-lg shadow-black/10 bg-white rounded-lg">
            <h1 className="my-4 text-center font-medium text-3xl">Welcome to Success Cosmetics</h1>
                <form action={register} className="space-y-6">
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
            </div>
        </div>
    );
}
 
export default RegisterPage;
