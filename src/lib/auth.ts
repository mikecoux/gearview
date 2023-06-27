import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from 'next-auth'
import { compare } from "bcryptjs";

const dataUrl = process.env.BASE_DATA_API_URL
const dataKey = process.env.DATA_API_KEY ?? ""

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        // The name to display on the sign in form
        name: "email.",
        // `credentials` is used to generate a form on the sign in page.
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
            
            // connect to Mongo 'users' collection
            // lookup user by provided email
            const res = await fetch(`${dataUrl}/action/findOne`, {
                method: "POST",
                headers: {
                    "api-key": dataKey,
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': '*'
                },
                body: JSON.stringify({
                    collection: 'users',
                    database: 'gearview-db',
                    dataSource: 'GearviewStarterCluster',
                    filter: {
                        email: credentials.email
                    }
                })
            })

            const user = await res.json()

            // check for a user response from Mongo
            // compare the provided pw with the hashed pw from the Mongo doc
            if (!user || !(await compare(credentials.password, user.document.password))) {
                return null;
            }
    
            return user.document
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