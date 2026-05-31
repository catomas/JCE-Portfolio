import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import prisma from '@/lib/prisma'

/**
 * Auth.js v5 configuration with Credentials provider.
 * - Sessions stored in database with 24h TTL
 * - bcrypt password verification
 * - Generic error messages (never reveal which field failed)
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          // Generic error - don't reveal that email doesn't exist
          return null
        }

        // Verify password with bcrypt
        const isPasswordValid = await compare(password, user.passwordHash)

        if (!isPasswordValid) {
          // Generic error - don't reveal that password is wrong
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours TTL
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email ?? ''
        session.user.name = token.name ?? null
      }
      return session
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
      const isLoginPage = request.nextUrl.pathname === '/admin/login'

      if (isAdminRoute && !isLoginPage && !isLoggedIn) {
        const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
        return Response.redirect(
          new URL(`/admin/login?callbackUrl=${callbackUrl}`, request.nextUrl.origin)
        )
      }

      // If logged in and trying to access login page, redirect to dashboard
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/admin', request.nextUrl.origin))
      }

      return true
    },
  },
  secret: process.env.AUTH_SECRET,
})
