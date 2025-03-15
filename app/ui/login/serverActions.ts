"use server";

import { signIn } from "@/auth";

export async function signInWithCredentials(
  email: string,
  password: string,
  rememberMe: string,
) {
  return await signIn("credentials", {
    email,
    password,
    rememberMe,
    redirectTo: "/dashboard",
  });
}
