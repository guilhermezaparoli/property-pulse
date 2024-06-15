import GoogleProvider from "next-auth/providers/google";



export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    response_type: 'code',
                    access_type: 'offline'
                }
            }
        })
    ],
    callbacks: {
        async signIn({}) {

        },
        async session({}){

        }
    }
}