import NextAuth, { Session } from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "@neondatabase/serverless";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";
import { getUserFromDb } from "@/app/utils/db";

declare module "next-auth" {
  interface Session {
    error?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  return {
    adapter: PostgresAdapter(pool),
    providers: [
      Credentials({
        credentials: {
          email: {},
          password: {},
          rememberMe: {},
        },
        // authorize: async (credentials) => {
        //   try {
        //     let user = null;
        //     const { email, password, rememberMe } =
        //       await signInSchema.parseAsync(credentials);
        //     user = await getUserFromDb(email, password);
        //
        //     if (!user) {
        //       throw new Error("Invalid credentials.");
        //     }
        //     console.log("datos del user", user);
        //     return { ...user, rememberMe }; // Pasar `rememberMe`
        //   } catch (error) {
        //     if (error instanceof ZodError) {
        //       return null;
        //     }
        //   }
        // },

        authorize: async (credentials) => {
          try {
            console.log("Credenciales recibidas en authorize:", credentials); // Log de las credenciales

            let user = null;
            const { email, password, rememberMe } =
              await signInSchema.parseAsync(credentials);

            // Convertir rememberMe a booleano si es necesario
            const rememberMeBoolean = rememberMe === "true";

            console.log("rememberMe en authorize:", rememberMeBoolean); // Log para depuración

            console.log("Buscando usuario en la base de datos..."); // Log de búsqueda
            user = await getUserFromDb(email, password);

            if (!user) {
              console.log("Usuario no encontrado o contraseña incorrecta."); // Log de error
              throw new Error("Invalid credentials.");
            }

            console.log("Usuario encontrado:", user); // Log de éxito
            return { ...user, rememberMe }; // Enviar como string
          } catch (error) {
            if (error instanceof ZodError) {
              console.log("Error de validación:", error.errors); // Log de error de validación
              return null;
            }
            console.log("Error en authorize:", error); // Log de error general
            throw error;
          }
        },
      }),
    ],
    callbacks: {
      // authorized: async ({ auth }) => {
      //   return !!auth;
      // },
      // async jwt({ token, user }) {
      //   if (user) {
      //     token.rememberMe = user.rememberMe; // Ahora es un string
      //     token.exp =
      //       user.rememberMe === "true"
      //         ? // ? Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 // 30 días
      //           // : Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 1 día
      //           Math.floor(Date.now() / 1000) + 60 * 3 // 3 minutos
      //         : Math.floor(Date.now() / 1000) + 60 * 2; // 2 minutos
      //     console.log("Token generado:", {
      //       ...token,
      //       exp: new Date(token.exp * 1000).toLocaleString(), // Fecha legible
      //     });
      //   }
      //   return token;
      // },
      async jwt({ token, user }) {
        if (user) {
          token.rememberMe = user.rememberMe;
          token.exp =
            user.rememberMe === "true"
              ? Math.floor(Date.now() / 1000) + 60 * 3 // 3 minutos
              : Math.floor(Date.now() / 1000) + 60 * 2; // 2 minutos
          console.log("Token generado:", {
            ...token,
            exp: new Date(token.exp * 1000).toLocaleString(), // Fecha legible
          });
        }

        // Invalidar token si ha expirado
        if (token.exp && Date.now() / 1000 > token.exp) {
          console.log("Token expirado, invalidando...");
          return null;
        }

        return token;
      },
      // async session({ session, token }) {
      //   if (typeof token.rememberMe === "string") {
      //     session.rememberMe = token.rememberMe; // Ahora es un string
      //   }
      //   if (typeof token.exp === "number") {
      //     session.expires = new Date(token.exp * 1000); // Asignar un objeto Date
      //     // Verificar si el token ha expirado
      //     if (Date.now() > token.exp * 1000) {
      //       console.log("Token expirado. Cerrando sesión...");
      //       (session as any).error = "TokenExpired"; // Marcar la sesión como expirada
      //     }
      //   }
      //   return session;

      async session({ session, token }) {
        if (typeof token.rememberMe === "string") {
          session.rememberMe = token.rememberMe; // Ahora es un string
        }
        if (typeof token.exp === "number") {
          session.expires = new Date(token.exp * 1000); // Asignar un objeto Date
          // Verificar si el token ha expirado
          if (Date.now() > token.exp * 1000) {
            console.log("Token expirado. Cerrando sesión...");
            (session as any).error = "TokenExpired"; // Marcar la sesión como expirada
          }
        }
        return session;
      },
    },

    session: {
      strategy: "jwt",
    },

    secret: process.env.AUTH_SECRET,
  };
});
