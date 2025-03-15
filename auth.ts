import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";
import { getUserFromDb } from "@/app/utils/db";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  return {
    adapter: PostgresAdapter(pool),
    providers: [
      Credentials({
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          try {
            let user = null;

            const { email, password } =
              await signInSchema.parseAsync(credentials);

            user = await getUserFromDb(email, password);

            if (!user) {
              throw new Error("Invalid credentials.");
            }
            console.log("datos del user", user);
            return user;
          } catch (error) {
            if (error instanceof ZodError) {
              return null;
            }
          }
        },
      }),
    ],
    callbacks: {
      authorized: async ({ auth }) => {
        return !!auth;
      },
    },

    session: {
      strategy: "jwt",
    },

    secret: process.env.AUTH_SECRET,
  };
});
