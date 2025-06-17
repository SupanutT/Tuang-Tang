import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";
import { JWT, JWT as NextAuthJWT } from 'next-auth/jwt';

interface Token {
    message: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number,
    userName: string;
    expiredIn: number;
    iat: number;
    exp: number;
    jti: string;
}


async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/refreshToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken: token.refreshToken
            }),
        })
        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        // console.log(response)
        return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken,
            expiredIn: refreshedTokens.expiredIn,
            accessTokenExpires: Date.now() + refreshedTokens.expiredIn * 1000,
            userName: refreshedTokens.userName,
        } as JWT
    } catch (e) {
        return { ...token, error: "RefreshAccessTokenError" };
    }
}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
    },
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
                    console.log("tokenData from login", tokenData)
                    return tokenData;
                } else {
                    // console.log("tokenData from login: null")
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
            if (user) {
                const initialToken: JWT = {
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: Date.now() + user.expiredIn * 1000,
                    expiredIn: user.expiredIn,
                    userName: user.userName,
                    name: user.name || null,
                    email: user.email || null,
                    picture: user.image || null,
                };
                return initialToken;
            }

            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token;
            }
            return await refreshAccessToken(token)

        },
        async session({ session, token, user }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.expiresAt = token.accessTokenExpires as number;
                session.userName = token.userName as string;
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
