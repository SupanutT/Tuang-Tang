import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Username", type: "text", placeholder: "username" },
              password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
              const user = { id: '1', name: 'Jai', email: 'j@j.com'};

              if(user){
                return user;
              }else{
                return null
              }
              // // You need to provide your own logic here that takes the credentials
              // // submitted and returns either a object representing a user or value
              // // that is false/null if the credentials are invalid.
              // // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // // You can also use the `req` object to obtain additional parameters
              // // (i.e., the request IP address)
              // const res = await fetch("/your/endpoint", {
              //   method: 'POST',
              //   body: JSON.stringify(credentials),
              //   headers: { "Content-Type": "application/json" }
              // })
              // const user = await res.json()

              // // If no error and we have user data, return it
              // if (res.ok && user) {
              //   return user
              // }
              // // Return null if user data could not be retrieved
              // return null
            }
          })

    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    // pages: {
    //     // signIn: "/custom-signin", // Customize the sign-in page path
    //     // signOut: "/mybill", // Customize the sign-out page path
    //     // error: "/custom-error", // Customize the error page path
    //     // verifyRequest: "/custom-verify-request", // Customize the verify request page path
    //     // newUser: null, // Use null to disable the new user creation page
    // },
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
