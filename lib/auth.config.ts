// On importe le type principal de config d'authentification
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt", 
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,         // à définir dans .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // à définir aussi
    }),

    // (credentials)
    CredentialsProvider({
      name: "Credentials", // Nom du provider

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // Fonction appelée lors de la tentative de connexion
      authorize: async (credentials) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials?.email },
    });

    if (!user || !user.password) return null;

    const isValid = await bcrypt.compare(credentials!.password, user.password);
    if (!isValid) return null;

    return user;
  } catch (error) {
    console.error("Erreur dans authorize():", error);
    return null;
  }
}

    }),
  ],

  // redirection si non authentifié
  // pages: {
  //   signIn: "/login", 
  // },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },


  secret: process.env.NEXTAUTH_SECRET,
};
