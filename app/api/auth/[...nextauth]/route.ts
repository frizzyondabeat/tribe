import CredentialsProvider from "next-auth/providers/credentials";
import axios from "../../../../lib/axios";
import NextAuth, {NextAuthOptions} from "next-auth";


export const authOptions: NextAuthOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "credentials",
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const {email, password} = credentials as { email: string, password: string }

                console.log("Logging in with email: ", email)

                const user = await axios.post(
                    "/api/v1/auth/login",
                    {
                        email,
                        password
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    }
                )
                    .then(res => res.data)
                    .catch(err => {
                        console.log("Error Logging in: ", err?.response?.status, err?.response?.statusText)
                        return null
                    })

                if (user) {
                    return user
                }

                return null

                // return new Promise((resolve, reject) => {
                //     // Introduce a delay of 1000 milliseconds (1 second)
                //     setTimeout(() => {
                //         // Replace this with your actual login logic
                //         const user = {
                //             message: "test",
                //             data: {
                //                 firstName: "test",
                //                 lastName: "test",
                //                 email: "asassa",
                //                 userType: "SUPER_ADMIN",
                //                 uuid: "asasas",
                //             },
                //         };
                //
                //         if (user) {
                //             // @ts-ignore
                //             resolve(user);
                //         } else {
                //             reject("Login failed");
                //         }
                //     }, 1000);
                // });
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({token, user}: { token: any, user: any }) {
            if (user) {
                token.accessToken = user?.message
                token.user = user?.data
            }

            return token
        },
        async session({session, token}: { session: any, token: any }) {
            session.accessToken = token.accessToken
            session.user = token.user
            session.user.name = session.user?.firstName + " " + session.user?.lastName
            session.user.id = session.user?.uuid
            session.user.role = session.user?.userType
            return session
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            else return baseUrl
        },
        async signIn({user}) {
            return !!user;
        }
    },
    pages: {
        signIn: "/sign-in",
        // signOut: "/sign-out",
        // error: "/auth/error",
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}



