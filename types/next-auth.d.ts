import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      haschecklist?: boolean;
      premium?: boolean;
    };
  }

  interface User extends DefaultUser {
    haschecklist?: boolean;
    premium?: boolean;
  }
}
