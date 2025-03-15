import "next-auth";

declare module "next-auth" {
  interface User {
    user_name?: string;
    rememberMe?: string;
  }

  interface Session {
    user?: {
      user_name?: string;
      email?: string;
      rememberMe?: string;
    };
    expires: Date;
    rememberMe?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    rememberMe?: string;
    exp?: number;
  }
}

declare module "next-auth/providers/credentials" {
  interface CredentialsConfig {
    rememberMe?: string; // Agregar `rememberMe` al tipo `CredentialsConfig`
  }
}
