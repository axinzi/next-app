import { users } from '@/db/schema/users';
import NextAuth, { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db";
import { eq } from "drizzle-orm";
const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: "smtp.163.com",
        port: 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email) return null
        const user = await db.select().from(users).where(eq(users.email, credentials.email));
        // console.log(user)
        const data = user?.[0]
        if (!data) return null
        return data
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        // console.log('jwt token', token)
        // console.log('jwt user', user)
        token.id = user.id;
        token.role = user.role;

      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log('session', session)
      // console.log('session token', token)
      // console.log('session user', user)
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as typeof session.user.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/setting',
    signOut: '/setting',
    verifyRequest: '/setting',
  },
}
const handler = NextAuth(authOptions);
export { authOptions, handler as GET, handler as POST }