import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        accessToken: String,
        expiresAt: Number,
    }
}
