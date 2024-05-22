import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { config } from "./config/config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/zod";
import { prisma } from "./db/prisma";

export default {
  providers: [
    Google({
      clientId: config.AUTH_GOOGLE_ID,
      clientSecret: config.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: config.AUTH_GITHUB_ID,
      clientSecret: config.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials);
        // console.log(email, password);
        const user = await prisma.user.findUnique({
          where: { email },
        });
        const validPassword = await bcrypt.compare(
          password,
          String(user?.password)
        );
        // return user object with the their profile data
        if (!user || !validPassword) return null;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
