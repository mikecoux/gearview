import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import clientPromise from "./mongodb";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials):Promise<any> {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const client = await clientPromise;
        const coll = client.db("gearview-db").collection('users')
        const query = { email: credentials.email }

        const user = await coll.findOne(query)
        if (!user || !(await compare(credentials.password, user.password))) {
          return null
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          randomKey: "Hey cool",
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
