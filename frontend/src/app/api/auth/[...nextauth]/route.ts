import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({

          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "Username" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

            if(!credentials) return null
            const user = await userLogIn(credentials.username, credentials.password)


            if(user){
                return user
            }else{
                return null
            }
          }
        })
    ],
    session: { strategy: "jwt"},
    callbacks: {
        async jwt( { token } ) {
            console.log(token)
            return token
        },
        // async session( { session, token, user } ){
        //     session.user = token
        //     return session
        // }
    }

}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
