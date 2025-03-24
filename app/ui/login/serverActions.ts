"use server";

import { signIn } from "@/auth";

export async function signInWithCredentials(email: string, password: string) {
  return await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}
