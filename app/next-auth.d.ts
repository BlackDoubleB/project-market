import "next-auth";

declare module "next-auth" {
  interface User {
    user_name?: string;
  }

  interface Session {
    user?: User & {
      user_name?: string;
    };
  }
}
