import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./db/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signin", account);
      if (account?.provider === "google") {
        const existUser = await prisma.user.findUnique({
          where: { email: String(user.email) },
        });
        // console.log("existUser", existUser);
        if (existUser) {
          // Link the Google account to the existing user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {
              userId: existUser.id,
            },
            create: {
              userId: existUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state as string,
            },
          });
          return true;
        }
      }
      if (account?.provider === "github") {
        const existUser = await prisma.user.findUnique({
          where: { email: String(user.email) },
        });
        // console.log("existUser", existUser);
        if (existUser) {
          // Link the Google account to the existing user
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {
              userId: existUser.id,
            },
            create: {
              userId: existUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state as string,
            },
          });
          return true;
        }
      }
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
