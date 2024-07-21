"use server";

import bcrypt from "bcryptjs";
import User from "@/models/User";
import { redirect } from "next/navigation";
import connectDb from "@/lib/db";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

const register = async (formData: FormData) => {
  const name = formData.get("fullname") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  await connectDb()

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();
  redirect('/login')
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
