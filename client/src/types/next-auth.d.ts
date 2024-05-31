import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      access: string;
      refresh: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    data: {
      accessToken: string;
      refreshToken: string;
      role: string;
    };
  }
}
