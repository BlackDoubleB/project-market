import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "User is required" })
    .min(1, "User is required")
    .email("Invalid User"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  rememberMe: string().refine((val) => val === "true" || val === "false", {
    message: 'Remember me must be either "true" or "false"',
  }),
});
