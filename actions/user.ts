"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { db } from "@/lib/db";

const register = async (formData: FormData) => {
  const name = formData.get("fullname") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!name || !email || !password) {
      return { error: "Missing required fields" };
  }

  // check if user exists
  const userExist = await db.user.findUnique({
      where: { email }
  });

  if (userExist) {
      return { error: "Email already exists" };
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
      await db.user.create({
          data: {
              name,
              email,
              password: hashedPassword,
          }
      });
      return { success: true };
  } catch (error) {
      return { error: "Something went wrong" };
  }
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
     return { success:"User Logged in"}
  } catch (error) {
    return { error: "Invalid Email or password" };
  }
}


const getUsers = async()=>{
  const users = await db.user.findMany({})
  return users
}


export { register,login,getUsers}
