import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";
import { getUserFromDb } from "@/app/utils/db";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  return {
    adapter: PostgresAdapter(pool),
    providers: [
      Google,
      Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          try {
            let user = null;

            const { email, password } =
              await signInSchema.parseAsync(credentials);

            // // logic to salt and hash password
            // const pwHash = saltAndHashPassword(password);

            // logic to verify if the user exists
            user = await getUserFromDb(email, password);

            if (!user) {
              // No user found, so this is their first attempt to loin
              // Optionally, this is also the place you could do a user registration
              throw new Error("Invalid credentials.");
            }

            // return JSON object with the user data
            console.log("datos del user", user);
            return user;
          } catch (error) {
            if (error instanceof ZodError) {
              // Return `null` to indicate that the credentials are invalid
              return null;
            }
          }
        },
      }),
    ],
    callbacks: {
      authorized: async ({ auth }) => {
        // Logged in users are authenticated, otherwise redirect to login page
        return !!auth;
      },
    },

    session: {
      strategy: "jwt",
    },

    secret: process.env.AUTH_SECRET,
  };
});
