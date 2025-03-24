import "next-auth";

declare module "next-auth" {
  interface User {
    user_name?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user?: {
      user_name?: string;
      email?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number; // Marca de tiempo para la expiración del access token
    refreshExpiresAt?: number; // Marca de tiempo para la expiración del refresh token
  }
}
