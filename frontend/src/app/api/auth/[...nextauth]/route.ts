import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({

      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const tokenData = await userLogIn(credentials.username, credentials.password);
        if (tokenData) {
          // console.log("tokenData : ", tokenData)
          return tokenData;
        } else {
          return null
        }

      }
    })
  ],
  // session: { strategy: "jwt"},
  callbacks: {
    async jwt({ token, user }) {
      console.log("user:", user)
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      // console.log("user:", user)
      console.log("----", session.user)
      return session;
    }
  }

}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }




