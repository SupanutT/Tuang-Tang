import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

interface Token {
    message: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number,
    expiredIn: number;
    iat: number;
    exp: number;
    jti: string;
}


async function refreshAccessToken(token: Token) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/refreshToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: token.refreshToken
            }),
        })
        const response = await res.json();
        // console.log(response)
        return {
            ...token,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            expiredIn: response.expiredIn,
            accessTokenExpires: Date.now() + response.expiredIn * 1000
        }
    } catch (e) {
        return { ...token }
    }
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
                    return tokenData;
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        // maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user && 'expiredIn' in user) {
                return {
                    ...user,
                    accessTokenExpires: Date.now() + user.expiredIn * 1000
                }
            }
            if (Date.now() < token.accessTokenExpires) {
                return token
            }
            return await refreshAccessToken(token)

        },
        async session({ session, token, user }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.expiresAt = token.accessTokenExpires as number;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + '/mybill'
        }
    },
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
