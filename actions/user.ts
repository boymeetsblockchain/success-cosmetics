"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { db } from "@/lib/db";

const register = async (formData: FormData) => {
  const name = formData.get("fullname") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  // check if user exists
  const userExist = await db.user.findUnique({
    where:{
      email
    }
  })

  if(userExist){
    throw new Error ("Email Exists")
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data:{
      name,
      email,
      password :hashedPassword,
    }
  })
  console.log("User created", newUser)
};

const login = async (formData:FormData)=>{
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
}

export { register,login };
