
import RegisterForm from "@/components/registerForm";

const RegisterPage = () => {
    return ( 
        <div className="my-10 px-4 md:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full md:w-[500px] p-6 h-auto shadow-lg shadow-black/10 bg-white rounded-lg">
            <h1 className="my-4 text-center font-medium text-3xl">Welcome to Success Cosmetics</h1>
              <RegisterForm/>
            </div>
        </div>
    );
}
 
export default RegisterPage;
