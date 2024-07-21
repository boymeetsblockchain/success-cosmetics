import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db";
import User from "./models/User";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
   Credentials({
    credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize :async(credentials)=>{
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }

        await connectDb();
        const user = await User.findOne({ email }).select("+password");
        

        if (!user) {
          throw new Error("Invalid email or password");
        }

        if (!user.password) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }

        const userData = {
          name :user.name,
          email: user.email,
          id: user._id,
        };

        return userData;
      },

    
   })
  ],
  pages: {
    signIn: "/login",
  },

})