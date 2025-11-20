import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User, UserModel } from "@/Models/userModel";
import dbConnect from "@/lib/dbConnect";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        if (!user.isVerified) throw new Error("Please verify your email before logging in");

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          name: user.fullname,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token.id as string;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 7 * 24 * 60 * 60, 
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
