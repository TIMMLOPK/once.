import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const {
    handlers: { GET, POST },
    auth
} = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    })],
})
