import CredentialsProvider from "next-auth/providers/credentials";
// import { userLogin } from "./requests";
import type { NextAuthOptions } from 'next-auth'
import { compare } from "bcryptjs";
import mongoClient from "@/lib/mongodb";


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
            const client = await mongoClient;
            const coll = client.db("gearview-db").collection('users')
            const query = { email: credentials.email }
            const user:any = await coll.findOne(query)

            // check for a user response from Mongo
            // compare the provided pw with the hashed pw from the Mongo doc
            if (!user || !(await compare(credentials.password, user.password))) {
                return null;
            }
    
            return user
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