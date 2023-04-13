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
                let user = await prisma.user.findUnique({ where: { email: email } });
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    const confirmPassword = await bcrypt.compare(password, user.password);
                    if (confirmPassword) {
                        return user
                    } else {
                        console.log("Email or password is incorrect");
                        throw new Error("Email or password is incorrect")
                    }
                } else {

                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
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
    // callbacks: {
    //     signIn: async (user, account, profile) => {
    //         console.log("This is the callback that's running...")
    //     }
    // }
});


// GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
//   })