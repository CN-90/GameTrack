import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";


import prisma from "../../../../prisma/prisma";


export default NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            id: 'credentials',
            name: "credentials",

            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            async authorize(credentials, req) {
                let { email, password } = credentials;
                return await verifyCredentials(password, email);

            }
        }),
    ],
    callbacks: {
        async jwt({ token, user}) {    
            if(user) {  
                token.userID = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.userID;
            session.user.username = token.username;
            
            return session;
        },
    },
});


export async function verifyCredentials(canidatePassword, email) {
    let user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
        let confirmPassword = await bcrypt.compare(canidatePassword, user.password);
        if (confirmPassword) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
}
