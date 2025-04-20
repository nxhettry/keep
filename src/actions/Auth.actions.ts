"use server";
import { signInUserService, signUpUserService } from "@/lib/auth";

export const loginUserAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Email and password are required");

  try {
    await signInUserService(email, password);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login user");
  }
};

export const registerUserAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Email and password are required");

  try {
    await signUpUserService(email, password);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login user");
  }
};
