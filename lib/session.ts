import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/users";
import { Session } from "next-auth";
import { createUser } from "./actions/user.action";
import { SessionInterface } from "@/common.types";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await createUser(
          user.name as string,
          user.email as string,
          user.image as string
        );
      }
      return true;
    },
    async session({ session }): Promise<Session> {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user?.email });

      if (dbUser) {
        session.user._id = dbUser._id.toString();
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
