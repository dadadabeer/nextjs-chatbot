import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './lib/zod'
import { saltAndHashPassword } from '@/utils/password'
import { getUserFromDb } from '@/utils/db'
import Google from 'next-auth/providers/google'

const authMode =
  process.env.AUTH_MODE ?? (process.env.NODE_ENV === 'production' ? 'oauth' : 'credentials')

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers:
    authMode === 'oauth'
      ? [Google]
      : [
          Credentials({
            credentials: {
              email: {},
              password: {},
            },
            authorize: async (credentials) => {
              try {
                let user = null

                const { email, password } = await signInSchema.parseAsync(credentials)

                const pwHash = saltAndHashPassword(password)
                user = await getUserFromDb(email, pwHash)

                if (!user) {
                  throw new Error('Invalid credentials.')
                }
                return user
              } catch {
                return null
              }
            },
          }),
        ],
  callbacks: {
    authorized: async ({ auth }) => {
      return Boolean(auth)
    },
  },
})
