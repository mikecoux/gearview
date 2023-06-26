import CredentialsProvider from "next-auth/providers/credentials";
import { userLogin } from "./requests";
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "email.",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "example@example.com" },
          password: { label: "Password", type: "password" }
        },

        // creates the user session if authorized
        // returning 'null' alerts the user of a login error
        async authorize(credentials, req) {
            // Error if email & password are not supplied
            if (!credentials?.email || !credentials.password) {
                return null
            }
            
            const user = await userLogin(credentials)
    
            if (user) {
                return user

            } else {
                return null
            }
        }
    })],
    // redirect to custom login page
    pages: {
        signIn: "/login"
    },
    // jwt is default
    // this is redundant
    session: {
        strategy: "jwt"
    },
    // callbacks allow you to return more data than the session default
    // data flows from authentication -> jwt -> session
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u._id,
                    username: u.username
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username
                }
            }
        }
    }
}