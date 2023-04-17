import { PrismaAdapter } from "@next-auth/prisma-adapter";
import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleAuthProvider from "next-auth/providers/google";
import prisma from "../../../../prisma/prisma";
import bcrypt from "bcryptjs";


export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            id: 'credentials',
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
          
            async authorize(credentials, req) {
                let { email, password } = credentials;
                return await verifyCredentials(password, email);

            }
        }),
        GoogleAuthProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: true,
                    email: profile.email
                }
            },
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "pages/login/index"
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.type === 'credentials') {
                return user;
            }
            console.log(user)
            console.log(account)
            console.log(profile)
            
        }
    }
});




// Find User to see if exists, and then checks if provided password matches the user's password
export async function verifyCredentials(canidatePassword, email) {
    let user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
        // Any object returned will be saved in `user` property of the JWT
        let confirmPassword = await bcrypt.compare(canidatePassword, user.password);
        if (confirmPassword) {
            return user
        } else {
            return false
        }
    } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null
    }
}

