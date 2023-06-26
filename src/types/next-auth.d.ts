import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    // returned by getSession() & getServerSession()
    // extends the user property interface
    interface Session {
        user: {
            id:string
            email:string
            username:string
        }
    }
}