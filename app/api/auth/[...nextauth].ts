import {CredentialsProvider} from "next-auth/providers";
import axios from "../axios";
import NextAuth from "next-auth";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: ""},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const res = await axios.post(
                    "/api/v1/sign-in",
                    {
                        credentials
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    }
                )

                const user = res.data

                if (user) {
                    return user
                }

                return null
            }
        }),
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.accessToken = user.accessToken
                token.user = user.user
            }
            return token
        }
    },
    pages: {
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
        error: "/auth/error",
    }
}

export default NextAuth(authOptions)