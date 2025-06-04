import { authConfig } from "@/lib/auth.config";
import NextAuth from "next-auth";

// ⬇️ On crée un "handler" (le contrôleur de cette route)
// NextAuth retourne une fonction qui prend les requêtes Next.js
const handler = NextAuth(authConfig);

// ⬇️ On exporte le handler à la fois pour les requêtes GET et POST
// Car certaines routes comme /session sont GET, et d’autres comme /callback sont POST
export { handler as GET, handler as POST };