import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions, Session } from "next-auth";
import connectDB from "@/config/database";
import User from "@/models/User";
import { Profile } from "next-auth";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google client ID or secret");
}

export const authOptions: NextAuthOptions = {
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
        async signIn({ profile }): Promise<string | boolean> {
            await connectDB();
console.log(profile)
            const userExists = await User.findOne({email: profile?.email})
console.log(userExists)
            if(!userExists){
                const username = profile?.name?.slice(0, 20)

                await User.create({
                    email: profile?.email,
                    username,
                    image: profile?.picture
                })
            }
            return true; // Return true to allow sign-in
        },
        async session({ session, token }): Promise<Session> {
          console.log(session)
            const user = await User.findOne({email: session.user?.email})

            session.user.id = user._id.toString()
            return session; // Return the session object
        }
    }
}
