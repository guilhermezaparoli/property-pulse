import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";
export const dynamic = 'force-dynamic';

const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}