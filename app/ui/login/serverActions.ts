"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInWithCredentials(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      //redirect: true,
      redirectTo: "/dashboard",
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid credentialss",
      };
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Incorrect Form",
      };
    }

    return {
      success: false,
      message: "An Error Occurred",
    };
  }
}
