import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './utils/zod'
import { saltAndHashPassword } from '@/utils/password'
import Google from 'next-auth/providers/google'

const authMode =
  process.env.AUTH_MODE ?? (process.env.NODE_ENV === 'production' ? 'oauth' : 'credentials')

const TEST_USER = {
  id: '1',
  name: process.env.TEST_USER_NAME,
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
}

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
                const { email, password } = await signInSchema.parseAsync(credentials)
                const pwHash = saltAndHashPassword(password)
                if (email !== TEST_USER.email || pwHash !== TEST_USER.password) {
                  throw new Error('Invalid credentials.')
                }
                return {
                  id: TEST_USER.id,
                  name: TEST_USER.name,
                  email: TEST_USER.email,
                }
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
