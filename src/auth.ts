import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./db/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      // console.log(baseUrl);
      return baseUrl;
    },
    async session({ token, session }) {
      session.user = {
        ...session.user,
        id: token.sub as string,
      };
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  ...authConfig,
});
