import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User extends DefaultUser {
        expiredIn: number;
        accessToken: string;
        refreshToken: string;
        userName: string;
        name?: string | null;
        email?: string | null;
        picture?: string | null;
    }

    interface Session {
        accessToken: string;
        expiresAt: number;
        userName: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends NextAuthJWT {
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number;
        expiredIn: number;
        userName: string;
        iat?: number;
        exp?: number;
        jti?: string;
        sub?: string;
        name?: string | null;
        email?: string | null;
        picture?: string | null;
    }
}
