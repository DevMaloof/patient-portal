import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      verified: boolean; // ✅ custom field
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    verified: boolean; // ✅ added here too
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string;
    email?: string;
    verified: boolean; // ✅ added to JWT
  }
}
