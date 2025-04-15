import NextAuth, { AuthError } from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "@/app/features/users/validations";
import { getUserFromDb } from "@/app/utils/db";

export const { handlers, auth, signIn } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  return {
    adapter: PostgresAdapter(pool),
    providers: [
      Credentials({
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },

        authorize: async (credentials) => {
          try {
            const { email, password } =
              await signInSchema.parseAsync(credentials);

            const dbUser = await getUserFromDb(email, password);

            if (!dbUser || !dbUser.id || !dbUser.email) {
              console.log("Ocurrio un errror", dbUser.message);
              throw new AuthError();
            }

            return {
              id: dbUser.id,
              email: dbUser.email,
            };
          } catch (error) {
            if (error instanceof AuthError || error instanceof ZodError) {
              throw error;
            }

            return null;
          }
        },
      }),
    ],

    session: {
      strategy: "jwt",
    },

    jwt: {
      maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.AUTH_SECRET,
  };
});
