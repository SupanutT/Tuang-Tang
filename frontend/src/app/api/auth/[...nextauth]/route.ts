import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

interface Token {
  message: string;
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
  iat: number;
  exp: number;
  jti: string;
}

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
      console.log("token:", token)
      user = {
        expiredIn: token.expiredIn
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // console.log("-d-", token.expiredIn)
      session.user = token as any;
      // session.expires = token.;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/mybill"
    }
  },


}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }




