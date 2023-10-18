import CredentialsProvider from "next-auth/providers/credentials";
import axios from "../../../../lib/axios";
import NextAuth, {NextAuthOptions} from "next-auth";


export const authOptions: NextAuthOptions = {
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
                    .catch(error => {
                        throw error
                    })

                if (user) {
                    console.log(user)
                    return user
                }

                return null
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user}: { token: any, user: any }) {
            if (user) {
                console.log("Current User: ", user)
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
            return url.startsWith(baseUrl) ? url : baseUrl
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

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}



