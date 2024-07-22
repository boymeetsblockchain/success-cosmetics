import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { db } from "./lib/db";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:PrismaAdapter(db),
  session:{strategy:"jwt"},
  providers: [
    Credentials ({
      name: "Credentials",
     credentials: {
       email: {
         label: "Email",
         type: "email",
         placeholder: "email@example.com",
       },
       password: { label: "Password", type: "password" },
     },  
     authorize : async(credentials)=>{
      if (!credentials || !credentials.email || !credentials.password) {
        return null;
      }
      
      const user = await db.user.findUnique({
        where: { email: credentials.email  as string},
      });


      if (!user) {
        throw new Error("No user found with this email");
      }
        
      const isValid = await compare(credentials.password as string, user.password as string);

      if (!isValid) {
        throw new Error("Incorrect password");
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
     }
    })
  ],
  pages: {
    signIn: "/login",
  },

})